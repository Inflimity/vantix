"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendDepositApprovedEmail, sendWithdrawalApprovedEmail, notifyAdminDeposit, notifyAdminWithdrawal, sendInvestmentActivatedEmail, notifyAdminInvestment } from "@/lib/mail";
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
                ...validatedFields.data,
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

        // PERFORM ATOMIC UPDATES
        await db.$transaction(async (tx) => {
            // 1. Update Transaction Status
            await tx.transaction.update({
                where: { id: transactionId },
                data: { status },
            });

            // 2. Handle Logic based on Type and Status
            if (status === "APPROVED" && transaction.type === "DEPOSIT") {
                if (transaction.targetPlanId) {
                    const plan = await tx.investmentPlan.findUnique({
                        where: { id: transaction.targetPlanId }
                    });

                    if (plan && Number(transaction.amount) >= Number(plan.minDeposit)) {
                        const endDate = new Date();
                        endDate.setHours(endDate.getHours() + plan.cycleHours);

                        await tx.investment.create({
                            data: {
                                userId: transaction.userId,
                                planId: plan.id,
                                amount: transaction.amount,
                                status: "ACTIVE",
                                endDate: endDate
                            }
                        });
                    } else {
                        await tx.user.update({
                            where: { id: transaction.userId },
                            data: { balance: { increment: transaction.amount } }
                        });
                    }
                } else {
                    await tx.user.update({
                        where: { id: transaction.userId },
                        data: { balance: { increment: transaction.amount } }
                    });
                }
            } else if (transaction.type === "WITHDRAWAL" && status === "REJECTED") {
                // Refund the user balance
                await tx.user.update({
                    where: { id: transaction.userId },
                    data: { balance: { increment: transaction.amount } }
                });
            }
        });

        // Post-transaction notifications (Best effort, non-blocking)
        try {
            if (status === "APPROVED") {
                if (transaction.type === "DEPOSIT") {
                    await sendDepositApprovedEmail(transaction.user.email, transaction.user.fullName, transaction.amount.toString(), "USD");
                    await notifyAdminDeposit(transaction.user.fullName, transaction.user.email, transaction.amount.toString(), "USD");
                } else if (transaction.type === "WITHDRAWAL") {
                    await sendWithdrawalApprovedEmail(transaction.user.email, transaction.user.fullName, transaction.amount.toString(), "USD");
                    await notifyAdminWithdrawal(transaction.user.fullName, transaction.user.email, transaction.amount.toString(), "USD");
                }
            }
        } catch {
            // Emailing is non-critical
        }

        revalidatePath("/admin/deposits");
        revalidatePath("/admin/withdrawals");
        revalidatePath("/dashboard");

        return { success: `Transaction ${status}` };
    } catch {
        return { error: "Failed to update transaction" };
    }
};
