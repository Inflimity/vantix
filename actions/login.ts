"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const LoginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await db.user.findUnique({
        where: { email }
    });

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Invalid credentials!" };
    }

    // Default redirect
    let redirectUrl = "/dashboard";
    if (existingUser.role === "ADMIN") {
        redirectUrl = "/admin";
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        return { success: "Logged in!", redirectUrl };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        // Re-throw non-auth errors (e.g. network issues)
        return { error: "Something went wrong!" };
    }
};
