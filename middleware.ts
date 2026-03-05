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

// Lazy-initialize rate limiters only when Upstash credentials are available
let globalRateLimit: Ratelimit | null = null;
let authRateLimit: Ratelimit | null = null;

function getRateLimiters() {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        return null;
    }
    if (!globalRateLimit) {
        const redis = Redis.fromEnv();
        globalRateLimit = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(50, "10 s"),
            analytics: true,
        });
        authRateLimit = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(5, "1 m"),
            analytics: true,
        });
    }
    return { globalRateLimit, authRateLimit: authRateLimit! };
}
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl } = req;
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // Rate limiting check
    try {
        const limiters = getRateLimiters();
        if (limiters) {
            const isAuthReq = authRoutes.includes(nextUrl.pathname) || nextUrl.pathname.startsWith(apiAuthPrefix);
            if (isAuthReq) {
                const { success: authSuccess, limit: authLimit, reset: authReset, remaining: authRemaining } = await limiters.authRateLimit.limit(`auth_${ip}`);
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

            const { success, limit, reset, remaining } = await limiters.globalRateLimit.limit(`global_${ip}`);
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
    } catch {
        // Rate limiting failure is non-critical — allow the request through
    }
    const isLoggedIn = !!req.auth;
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
