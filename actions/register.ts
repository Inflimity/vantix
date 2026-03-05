"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { sendWelcomeEmail, notifyAdminNewSignup } from "@/lib/mail";

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Minimum 8 characters required" }),
    fullName: z.string().min(1, { message: "Name is required" }),
});

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        const firstError = validatedFields.error.issues[0]?.message || "Invalid fields!";
        return { error: firstError };
    }

    const { email, password, fullName } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    await db.user.create({
        data: {
            fullName,
            email,
            password: hashedPassword,
        },
    });

    // Send Welcome Email + Admin Notification (best-effort)
    try {
        await sendWelcomeEmail(email, fullName);
    } catch {
        // Welcome email is non-critical; silently continue
    }

    try {
        await notifyAdminNewSignup(fullName, email);
    } catch {
        // Admin notification is non-critical
    }

    return { success: "User created!" };
};
