import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Perform a very light operation to keep the connection active
        await db.$queryRaw`SELECT 1`;

        return NextResponse.json({
            status: "alive",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Keep-alive ping failed:", error);
        return NextResponse.json(
            { error: "Failed to ping database" },
            { status: 500 }
        );
    }
}
