"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const WithdrawSchema = z.object({
    amount: z.number().positive({ message: "Amount must be positive" }),
    walletAddress: z.string().min(1, { message: "Wallet address is required" }),
    walletType: z.string().default("Crypto"),
});

export const requestWithdrawal = async (amount: number, walletAddress: string, walletType: string = "Crypto") => {
    const validatedFields = WithdrawSchema.safeParse({ amount, walletAddress, walletType });
    if (!validatedFields.success) {
        return { error: "Invalid input" };
    }

    const session = await auth();
    if (!session?.user?.id) return { error: "Not authorized" };

    try {
        const user = await db.user.findUnique({
            where: { id: session.user.id }
        });

        if (!user || Number(user.balance) < amount) {
            return { error: "Insufficient balance" };
        }

        // Create a PENDING withdrawal transaction
        await db.$transaction([
            db.user.update({
                where: { id: user.id },
                data: { balance: { decrement: amount } }
            }),
            db.transaction.create({
                data: {
                    userId: user.id,
                    type: "WITHDRAWAL",
                    amount: amount,
                    status: "PENDING",
                    gateway: walletType, // Using gateway for network type
                    walletAddress: walletAddress
                }
            })
        ]);

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/withdraw");
        return { success: "Withdrawal request submitted for approval" };
    } catch {
        return { error: "Failed to process withdrawal request" };
    }
};
