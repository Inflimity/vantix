"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/mail";

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Minimum 8 characters required" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
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

    // Send Welcome Email (Non-blocking: we don't await this to keep UI snappy, or we can await inside a try-catch)
    // For critical emails like "Verify Email", we should await. For "Welcome", it's fine to fire and forget or await safely.
    try {
        await sendWelcomeEmail(email, fullName);
    } catch {
        // Welcome email is non-critical; silently continue
    }

    return { success: "User created!" };
};
