"use client";

import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col lg:flex-row bg-[#020617] min-h-screen text-white font-jakarta">
            <AdminSidebar />
            <main className="flex-1 p-4 md:p-10">
                {children}
            </main>
        </div>
    );
}
