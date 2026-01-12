"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/mail";

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    fullName: z.string().min(1, { message: "Name is required" }),
});

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
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
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }

    return { success: "User created!" };
};
