"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const WalletSchema = z.object({
    currency: z.string().min(1, "Currency is required").max(20),
    address: z.string().min(10, "Wallet address must be at least 10 characters").max(200),
    label: z.string().max(100).optional(),
});

export const upsertWalletAddress = async (values: z.infer<typeof WalletSchema>) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        return { error: "Not authorized" };
    }

    const validatedFields = WalletSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { currency, address, label } = validatedFields.data;

    try {
        await db.walletAddress.upsert({
            where: { currency: currency.toUpperCase() },
            update: { address, label },
            create: { currency: currency.toUpperCase(), address, label },
        });

        revalidatePath("/admin/wallets");
        revalidatePath("/dashboard/deposit");

        return { success: `Wallet for ${currency.toUpperCase()} saved` };
    } catch {
        return { error: "Failed to save wallet address" };
    }
};

export const deleteWalletAddress = async (id: string) => {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        return { error: "Not authorized" };
    }

    try {
        await db.walletAddress.delete({ where: { id } });
        revalidatePath("/admin/wallets");
        revalidatePath("/dashboard/deposit");
        return { success: "Wallet address deleted" };
    } catch {
        return { error: "Failed to delete wallet address" };
    }
};

export const getWalletAddresses = async () => {
    return db.walletAddress.findMany({
        orderBy: { currency: "asc" },
    });
};
