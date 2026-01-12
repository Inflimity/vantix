"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        startTransition(() => {
            login({ email, password })
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                    if (data?.success) {
                        setSuccess(data.success);
                        // Optionally redirect here if not handled by middleware/auth
                        router.push("/dashboard");
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#020617] text-white font-jakarta">
            <div className="w-full max-w-[360px] text-center mb-8">
                <h1 className="text-3xl font-black tracking-tighter uppercase">
                    VANTIX<span className="text-blue-600">.</span>
                </h1>
                <div className="inline-block px-3 py-1 bg-blue-900/20 border border-blue-500/30 rounded-full mt-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">
                        Secure Protocol Active
                    </span>
                </div>
            </div>

            <div className="w-full max-w-[380px] bg-[#0F172A] border-2 border-[#1E293B] p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                            Email Address
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-[14px] py-[10px] outline-none transition-all duration-200 focus:border-blue-500 focus:bg-[#0F172A] text-sm"
                            required
                            disabled={isPending}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-1.5 ml-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                Access Key
                            </label>
                            <a href="#" className="text-[10px] font-bold text-blue-500 uppercase">
                                Forgot?
                            </a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-[14px] py-[10px] outline-none transition-all duration-200 focus:border-blue-500 focus:bg-[#0F172A] text-sm"
                            required
                            disabled={isPending}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500">
                            <p>{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                            <p>{success}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl uppercase text-xs tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 disabled:opacity-50"
                    >
                        {isPending ? "Connecting..." : "Log In"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-xs">
                        New Partner?{" "}
                        <Link
                            href="/signup"
                            className="text-white font-bold hover:text-blue-500"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <Link
                    href="/"
                    className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-gray-400 transition"
                >
                    ← Back to Homepage
                </Link>
            </div>
        </div>
    );
}
