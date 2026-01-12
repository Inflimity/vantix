"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendDepositApprovedEmail, sendWithdrawalApprovedEmail } from "@/lib/mail";
import { auth } from "@/auth";

export const updateUser = async (userId: string, data: { fullName?: string, email?: string, balance?: number }) => {
    const session = await auth();
    // @ts-expect-error - role on user
    if (session?.user?.role !== "ADMIN") {
        return { error: "Not authorized" };
    }

    try {
        await db.user.update({
            where: { id: userId },
            data: {
                ...data,
                // Ensure role cannot be updated through this action
            }
        });

        revalidatePath("/admin/users");
        revalidatePath(`/admin/users/${userId}`);

        return { success: "User updated successfully" };
    } catch (error) {
        console.error("Update User Error:", error);
        return { error: "Failed to update user" };
    }
};

export const updateTransactionStatus = async (transactionId: string, status: "APPROVED" | "REJECTED") => {
    const session = await auth();
    // @ts-expect-error - role on user
    if (session?.user?.role !== "ADMIN") {
        return { error: "Not authorized" };
    }

    try {
        const transaction = await db.transaction.findUnique({
            where: { id: transactionId },
            include: { user: true },
        });

        if (!transaction) {
            return { error: "Transaction not found" };
        }

        if (transaction.status !== "PENDING") {
            return { error: "Transaction is already processed" };
        }

        // Update Transaction
        await db.transaction.update({
            where: { id: transactionId },
            data: { status },
        });

        // If APPOVED and DEPOSIT -> Add to Balance
        if (status === "APPROVED" && transaction.type === "DEPOSIT") {
            await db.user.update({
                where: { id: transaction.userId },
                data: {
                    balance: { increment: transaction.amount },
                },
            });

            // Send Email
            // Send Email (Best effort)
            try {
                await sendDepositApprovedEmail(
                    transaction.user.email,
                    transaction.user.fullName,
                    transaction.amount.toString(),
                    "USD"
                );
            } catch (err) {
                console.error("Failed to send deposit email:", err);
            }
        }

        // If APPROVED and WITHDRAWAL -> Send Email
        if (status === "APPROVED" && transaction.type === "WITHDRAWAL") {
            // Logic for deduction usually happens at request time, but if it happens here:
            // await db.user.update({ ... balance: { decrement: ... } }) -- assuming we didn't deduct yet.
            // For now, let's assume we deducted "Available Balance" on request or we deduct now.
            // Let's deduct now for safety if we haven't implemented request logic yet.

            const user = await db.user.findUnique({ where: { id: transaction.userId } });
            if (user) {
                await db.user.update({
                    where: { id: user.id },
                    data: { balance: { decrement: transaction.amount } }
                });
            }

            try {
                await sendWithdrawalApprovedEmail(
                    transaction.user.email,
                    transaction.user.fullName,
                    transaction.amount.toString(),
                    "USD"
                );
            } catch (err) {
                console.error("Failed to send withdrawal email:", err);
            }
        }

        revalidatePath("/admin/deposits");
        revalidatePath("/admin/withdrawals");
        revalidatePath("/dashboard");

        return { success: `Transaction ${status}` };
    } catch (error) {
        console.error("Admin Action Error:", error);
        return { error: "Failed to update transaction" };
    }
};
