"use client";

import { useState } from "react";
import Link from "next/link";
import { logout } from "@/actions/logout";

export default function UserSidebar() {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    return (
        <>
            <header className="lg:hidden flex justify-between items-center p-6 bg-[#0F172A] border-b border-[#1E293B]">
                <div className="font-black text-xl tracking-tighter uppercase">
                    VANTIX<span className="text-blue-500">.</span>
                </div>
                <button onClick={() => setSideBarOpen(true)} className="text-white">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </header>

            <aside
                className={`fixed lg:relative top-0 left-0 bg-[#0F172A] w-64 h-screen border-r border-[#1E293B] p-6 transition-transform duration-300 z-50 lg:translate-x-0 ${sideBarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center mb-10">
                    <div className="font-black text-2xl tracking-tighter uppercase">
                        VANTIX<span className="text-blue-500">.</span>
                    </div>
                    <button
                        onClick={() => setSideBarOpen(false)}
                        className="lg:hidden text-gray-400"
                    >
                        ✕
                    </button>
                </div>

                <nav className="space-y-2">
                    <Link
                        href="/dashboard"
                        onClick={() => setSideBarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1E293B] text-blue-500 font-bold"
                    >
                        <span>📊</span> Dashboard
                    </Link>
                    <Link
                        href="/dashboard/investments"
                        onClick={() => setSideBarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1E293B] hover:text-blue-500 transition font-bold"
                    >
                        <span>💰</span> My Investments
                    </Link>
                    <Link
                        href="/dashboard/deposit"
                        onClick={() => setSideBarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1E293B] hover:text-blue-500 transition font-bold"
                    >
                        <span>📥</span> Deposit
                    </Link>
                    <Link
                        href="/dashboard/withdraw"
                        onClick={() => setSideBarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1E293B] hover:text-blue-500 transition font-bold"
                    >
                        <span>📤</span> Withdraw
                    </Link>
                    <Link
                        href="/dashboard/referrals"
                        onClick={() => setSideBarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1E293B] hover:text-blue-500 transition font-bold"
                    >
                        <span>👥</span> Referrals
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        onClick={() => setSideBarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1E293B] hover:text-blue-500 transition font-bold"
                    >
                        <span>⚙️</span> Settings
                    </Link>
                    <div className="pt-10">
                        <button
                            onClick={() => {
                                logout();
                                setSideBarOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-950/30 transition font-bold"
                        >
                            <span>🔒</span> Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {sideBarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSideBarOpen(false)}></div>
            )}
        </>
    );
}
