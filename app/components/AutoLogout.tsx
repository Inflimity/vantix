"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AutoLogout() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [lastActivity, setLastActivity] = useState<number>(Date.now());

    // 30 minutes inactivity timeout
    const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

    useEffect(() => {
        // If not authenticated, do nothing
        if (status === "unauthenticated") return;

        // Auto-logout if session expires on the NextAuth side
        if (session?.expires && Date.now() > new Date(session.expires).getTime()) {
            handleLogout("Your session has expired. Please log in again.");
            return;
        }

        // --- Inactivity Timeout Handling ---

        // Track valid user activities
        const updateActivity = () => setLastActivity(Date.now());

        const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
        events.forEach(event => document.addEventListener(event, updateActivity));

        const interval = setInterval(() => {
            const timeSinceLastActivity = Date.now() - lastActivity;
            if (timeSinceLastActivity > INACTIVITY_TIMEOUT_MS) {
                handleLogout("You have been logged out due to inactivity.");
            }
        }, 10000); // Check every 10 seconds

        return () => {
            events.forEach(event => document.removeEventListener(event, updateActivity));
            clearInterval(interval);
        };
    }, [status, session, lastActivity]);

    const handleLogout = async (message: string) => {
        toast.error(message);
        await signOut({ redirect: false });
        router.push("/login");
    };

    return null;
}
