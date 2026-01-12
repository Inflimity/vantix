"use client";

import { useState } from "react";
import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 px-6 py-4">
            <div className="max-w-6xl mx-auto bg-[#0F172A] border border-blue-900/30 rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg shadow-black/50 relative">
                <div className="font-extrabold text-xl tracking-tighter text-white">
                    VANTIX<span className="text-emerald-500">.</span>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-bold text-gray-400">
                    <a href="#features" className="hover:text-emerald-400 transition">
                        Benefits
                    </a>
                    <a href="#market" className="hover:text-emerald-400 transition">
                        Market
                    </a>
                    <a href="#pricing" className="hover:text-emerald-400 transition">
                        Offers
                    </a>
                    <a href="#faq" className="hover:text-emerald-400 transition">
                        Support
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <GoogleTranslate />
                    <Link
                        href="/login"
                        className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-500 transition text-center"
                    >
                        Get Started
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {!mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div
                        onClick={() => setMobileMenuOpen(false)}
                        className="absolute top-full left-0 right-0 mt-3 p-4 bg-[#0F172A] border border-blue-900/30 rounded-2xl shadow-2xl md:hidden z-50"
                    >
                        <div className="flex flex-col gap-4 text-center">
                            <a
                                href="#features"
                                className="py-3 text-gray-400 font-bold hover:text-emerald-400 border-b border-white/5"
                            >
                                Benefits
                            </a>
                            <a
                                href="#market"
                                className="py-3 text-gray-400 font-bold hover:text-emerald-400 border-b border-white/5"
                            >
                                Market
                            </a>
                            <a
                                href="#pricing"
                                className="py-3 text-gray-400 font-bold hover:text-emerald-400 border-b border-white/5"
                            >
                                Offers
                            </a>
                            <a
                                href="#faq"
                                className="py-3 text-gray-400 font-bold hover:text-emerald-400 border-b border-white/5"
                            >
                                Support
                            </a>
                            <Link
                                href="/login"
                                onClick={(e) => e.stopPropagation()}
                                className="bg-blue-600 text-white py-4 rounded-xl font-black mt-2 shadow-lg shadow-blue-600/20 text-center block uppercase tracking-widest transition active:scale-95"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
