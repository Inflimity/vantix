"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const requestWithdrawal = async (amount: number, walletAddress: string, walletType: string = "Crypto") => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authorized" };

    if (amount <= 0) return { error: "Invalid amount" };
    if (!walletAddress) return { error: "Wallet address is required" };

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
    } catch (error) {
        console.error("Withdrawal Error:", error);
        return { error: "Failed to process withdrawal request" };
    }
};
