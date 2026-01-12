"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// currency is passed but currently unused in schema. Ideally add 'currency' field to Transaction model.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createDeposit = async (amount: number, currency: string) => {
    const session = await auth();

    if (!session?.user?.email) {
        return { error: "Not authorized" };
    }

    if (amount <= 0) {
        return { error: "Invalid amount" };
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
            // We can store the chosen currency in a metadata field if needed, 
            // but for now the schema only has 'amount'. We assume USD/Base currency.
            // If schema supports it, we'd add currency. Assuming amount is USD value.
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/deposits");

    return { success: "Deposit request submitted" };
};
