
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
// import { PrismaClient } from "@prisma/client"

// Since we can't directly use Prisma Client in Edge (Middleware), we often use a separate fetch or mock
// But for standard auth.config in NextAuth v5, we define providers.
// We will separate the Prisma Adapter usage to auth.ts which runs in Node environment.

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
});

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    // We need to fetch user from DB. 
                    // Note: In NextAuth v5 beta, this code runs on server, so we can use Prisma IF we are not in Edge runtime.
                    // However, auth.config.ts is often used in Middleware (Edge).
                    // For simplicity, we will assume standard Node runtime for now or implement a workaround if Edge is enforced.
                    // Since we are using standard `next-auth`, we put the heavy lifting in `auth.ts`.

                    return null; // This is just the config shape, logic is in auth.ts
                }
                return null;
            }
        })
    ],
} satisfies NextAuthConfig
