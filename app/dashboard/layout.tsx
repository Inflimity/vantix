"use client";

import UserSidebar from "../components/UserSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col lg:flex-row bg-[#020617] min-h-screen text-white font-jakarta">
            <UserSidebar />
            <main className="flex-1 p-6 lg:p12 max-h-screen overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
