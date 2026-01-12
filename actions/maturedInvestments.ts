"use server";

import { db } from "@/lib/db";

/**
 * Checks and processes any ACTIVE investments that have reached their endDate.
 * Returns Capital + Profit to the user's balance.
 */
export const processMaturedInvestments = async (userId: string) => {
    try {
        // Find ACTIVE investments for this user that have ended
        const maturedInvestments = await db.investment.findMany({
            where: {
                userId,
                status: "ACTIVE",
                endDate: { lte: new Date() }
            },
            include: {
                plan: true
            }
        });

        if (maturedInvestments.length === 0) return;

        console.log(`Processing ${maturedInvestments.length} matured investments for user ${userId}`);

        for (const investment of maturedInvestments) {
            const capital = Number(investment.amount);
            const roiPercent = Number(investment.plan.roiPercent);
            const profit = (capital * roiPercent) / 100;
            const totalReturn = capital + profit;

            // Perform atomic update for each matured investment
            await db.$transaction([
                // 1. Credit User Balance and Total Earned
                db.user.update({
                    where: { id: userId },
                    data: {
                        balance: { increment: totalReturn },
                        totalEarned: { increment: profit }
                    }
                }),
                // 2. Mark Investment as COMPLETED
                db.investment.update({
                    where: { id: investment.id },
                    data: { status: "COMPLETED" }
                }),
                // 3. Create Transaction record for the return
                db.transaction.create({
                    data: {
                        userId,
                        type: "DEPOSIT", // Treated as an internal credit
                        amount: totalReturn,
                        status: "APPROVED",
                        gateway: "INVESTMENT_RETURN",
                        walletAddress: investment.plan.name
                    }
                })
            ]);
        }
    } catch (error) {
        console.error("Error processing matured investments:", error);
    }
};
