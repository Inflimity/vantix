"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { processMaturedInvestments } from "./maturedInvestments";

export const getDashboardData = async () => {
    const session = await auth();

    if (!session?.user?.email) {
        return { error: "Not authorized" };
    }

    // 1. Find the user ID first
    const basicUser = await db.user.findUnique({
        where: { email: session.user.email },
        select: { id: true }
    });

    if (!basicUser) return { error: "User not found" };

    // 2. Process matured investments BEFORE fetching data
    await processMaturedInvestments(basicUser.id);

    // 3. Fetch full data
    const user = await db.user.findUnique({
        where: { id: basicUser.id },
        include: {
            investments: {
                include: { plan: true }
            },
            transactions: {
                orderBy: { createdAt: 'desc' },
                take: 20
            }
        }
    });

    const plans = await db.investmentPlan.findMany();

    if (!user) {
        return { error: "User not found" };
    }

    return { user, plans };
};
