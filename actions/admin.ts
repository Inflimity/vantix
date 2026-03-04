"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendDepositApprovedEmail, sendWithdrawalApprovedEmail } from "@/lib/mail";
import { auth } from "@/auth";
import { z } from "zod";

const UpdateUserSchema = z.object({
    fullName: z.string().min(1).optional(),
    email: z.string().email().optional(),
    balance: z.number().optional(),
});

export const updateUser = async (userId: string, data: { fullName?: string, email?: string, balance?: number }) => {
    const validatedFields = UpdateUserSchema.safeParse(data);
    if (!validatedFields.success || !userId) {
        return { error: "Invalid input fields" };
    }

    const session = await auth();
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
    } catch {
        return { error: "Failed to update user" };
    }
};

const UpdateTransactionSchema = z.object({
    transactionId: z.string().min(1),
    status: z.enum(["APPROVED", "REJECTED"]),
});

export const updateTransactionStatus = async (transactionId: string, status: "APPROVED" | "REJECTED") => {
    const validatedFields = UpdateTransactionSchema.safeParse({ transactionId, status });
    if (!validatedFields.success) {
        return { error: "Invalid input fields" };
    }

    const session = await auth();
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
            } catch {
                // Email sending is best-effort
            }
        }

        // If WITHDRAWAL
        if (transaction.type === "WITHDRAWAL") {
            if (status === "APPROVED") {
                try {
                    await sendWithdrawalApprovedEmail(
                        transaction.user.email,
                        transaction.user.fullName,
                        transaction.amount.toString(),
                        "USD"
                    );
                } catch {
                    // Email sending is best-effort
                }
            } else if (status === "REJECTED") {
                // Refund the user balance
                await db.user.update({
                    where: { id: transaction.userId },
                    data: { balance: { increment: transaction.amount } }
                });
            }
        }

        revalidatePath("/admin/deposits");
        revalidatePath("/admin/withdrawals");
        revalidatePath("/dashboard");

        return { success: `Transaction ${status}` };
    } catch {
        return { error: "Failed to update transaction" };
    }
};
