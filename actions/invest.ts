"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendInvestmentEmail, notifyAdminInvestment } from "@/lib/mail";
import { TransactionType } from "@prisma/client";

const InvestSchema = z.object({
    planId: z.string().min(1),
    amount: z.number().positive({ message: "Amount must be positive" }),
});

export const invest = async (planId: string, amount: number) => {
    const validatedFields = InvestSchema.safeParse({ planId, amount });
    if (!validatedFields.success) {
        return { error: "Invalid input" };
    }

    const session = await auth();
    if (!session?.user?.id) {
        return { error: "You must be logged in to invest" };
    }

    const userId = session.user.id;

    try {
        // 1. Fetch User and Plan
        const user = await db.user.findUnique({ where: { id: userId } });
        const plan = await db.investmentPlan.findUnique({ where: { id: planId } });

        if (!user) return { error: "User not found" };
        if (!plan) return { error: "Invalid plan selected" };

        // 2. Validate Amount
        if (amount < Number(plan.minDeposit)) {
            return { error: `Minimum investment for this plan is $${plan.minDeposit}` };
        }
        if (amount > Number(plan.maxDeposit)) {
            return { error: `Maximum investment for this plan is $${plan.maxDeposit}` };
        }
        if (Number(user.balance) < amount) {
            return { error: "Insufficient balance" };
        }

        // 3. Perform Transaction (Atomic Request)
        await db.$transaction([
            // Deduct balance immediately to "lock" the funds for the request
            db.user.update({
                where: { id: userId },
                data: { balance: { decrement: amount } }
            }),
            // Create a PENDING investment transaction for admin approval
            db.transaction.create({
                data: {
                    userId,
                    type: "INVESTMENT" as any,
                    amount,
                    status: "PENDING",
                    targetPlanId: planId,
                    gateway: "PLATFORM_INVESTMENT",
                    walletAddress: plan.name,
                }
            })
        ]);

        // Send notification to admin about the new request
        try {
            await notifyAdminInvestment(user.fullName, user.email, plan.name, amount.toString(), "USD");
        } catch {
            // Non-critical
        }

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/investments");

        return { success: `Investment request for $${amount} in ${plan.name} submitted for approval!` };
    } catch {
        return { error: "Failed to process investment" };
    }
};
