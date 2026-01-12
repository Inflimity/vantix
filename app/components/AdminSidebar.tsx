"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/logout";
import { useState } from "react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { name: 'Overview', path: '/admin', icon: '🏠' },
        { name: 'User Management', path: '/admin/users', icon: '👥' },
        { name: 'Global Ledger', path: '/admin/transactions', icon: '📖' },
        { name: 'Pending Deposits', path: '/admin/deposits', icon: '📥' },
        { name: 'Payout Requests', path: '/admin/withdrawals', icon: '📤' },
        { name: 'Plan Settings', path: '/admin/plans', icon: '📈' },
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-50">
                <div className="font-black text-xl tracking-tighter text-white uppercase">
                    VANTIX<span className="text-orange-500">_ROOT</span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-[#0F172A] border-r border-[#1E293B] p-8 flex flex-col transition-transform duration-300 transform
                lg:translate-x-0 lg:static lg:min-h-screen
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="mb-12 hidden lg:block">
                    <div className="font-black text-2xl tracking-tighter text-white uppercase">VANTIX<span className="text-orange-500">_ROOT</span></div>
                    <p className="text-[9px] text-gray-500 font-bold tracking-[0.3em] mt-2">System Administrator</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition font-bold text-sm ${isActive(item.path) ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                            <span>{item.icon}</span> {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto border-t border-gray-800 pt-6">
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-4 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-500/10 rounded-xl transition"
                    >
                        <span>⚠️</span> Exit Terminal
                    </button>
                </div>
            </aside>
        </>
    );
}
