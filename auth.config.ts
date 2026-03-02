
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
                    return null; // This is just the config shape, logic is in auth.ts
                }
                return null;
            }
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                // @ts-expect-error - Role is not in default Session type
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            return token;
        }
    },
} satisfies NextAuthConfig
