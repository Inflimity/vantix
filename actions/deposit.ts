"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const DepositSchema = z.object({
    amount: z.number().positive({ message: "Amount must be a positive number" }),
    currency: z.string().optional(),
    targetPlanId: z.string().optional(), // [NEW] Link deposit to investment
});

// currency is passed but currently unused in schema. Ideally add 'currency' field to Transaction model.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createDeposit = async (amount: number, currency: string, targetPlanId?: string) => {
    const validatedFields = DepositSchema.safeParse({ amount, currency, targetPlanId });
    if (!validatedFields.success) {
        return { error: "Invalid input" };
    }

    const session = await auth();

    if (!session?.user?.email) {
        return { error: "Not authorized" };
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return { error: "User not found" };
    }

    await db.transaction.create({
        data: {
            userId: user.id,
            amount: amount,
            type: "DEPOSIT",
            status: "PENDING",
            targetPlanId: targetPlanId || null,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/deposits");

    return { success: "Deposit request submitted" };
};
