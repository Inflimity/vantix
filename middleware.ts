import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Define a general rate limit (e.g., 50 requests per 10 seconds per IP)
// For auth routes, we might want stricter limits, but let's start with a global limit.
const globalRateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "10 s"),
    analytics: true,
});

const authRateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
});

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl } = req;
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // Rate limiting check
    try {
        if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
            const isAuthReq = authRoutes.includes(nextUrl.pathname) || nextUrl.pathname.startsWith(apiAuthPrefix);
            if (isAuthReq) {
                const { success: authSuccess, limit: authLimit, reset: authReset, remaining: authRemaining } = await authRateLimit.limit(`auth_${ip}`);
                if (!authSuccess) {
                    return new NextResponse("Too Many Authentication Attempts", {
                        status: 429,
                        headers: {
                            "X-RateLimit-Limit": authLimit.toString(),
                            "X-RateLimit-Remaining": authRemaining.toString(),
                            "X-RateLimit-Reset": authReset.toString(),
                        },
                    });
                }
            }

            const { success, limit, reset, remaining } = await globalRateLimit.limit(`global_${ip}`);
            if (!success) {
                return new NextResponse("Too Many Requests", {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": reset.toString(),
                    },
                });
            }
        }
    } catch (error) {
        console.error("Rate limit error:", error);
    }
    const isLoggedIn = !!req.auth;
    // @ts-expect-error - role is mapped in auth.ts
    const userRole = req.auth?.user?.role;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminRoute = nextUrl.pathname.startsWith("/admin");
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    if (isAdminRoute && userRole !== "ADMIN") {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
