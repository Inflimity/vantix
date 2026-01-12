"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const invest = async (planId: string, amount: number) => {
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

        // 3. Perform Transaction (Atomic)
        await db.$transaction([
            // Deduct balance
            db.user.update({
                where: { id: userId },
                data: { balance: { decrement: amount } }
            }),
            // Create investment
            db.investment.create({
                data: {
                    userId,
                    planId,
                    amount,
                    status: "ACTIVE",
                    endDate: new Date(Date.now() + plan.cycleHours * 60 * 60 * 1000),
                }
            }),
            // Create record transaction
            db.transaction.create({
                data: {
                    userId,
                    type: "WITHDRAWAL", // We treat this as a internal debit for records
                    amount,
                    status: "APPROVED",
                    gateway: "PLATFORM_INVESTMENT",
                    walletAddress: plan.name,
                }
            })
        ]);

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/investments");

        return { success: `Successfully invested $${amount} in ${plan.name}!` };
    } catch (error) {
        console.error("Investment Error:", error);
        return { error: "Failed to process investment" };
    }
};
