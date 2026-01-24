"use client";

import Link from "next/link";
import { useState, useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        startTransition(() => {
            newPassword({ password }, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
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
                        Secure Reset Protocol
                    </span>
                </div>
            </div>

            <div className="w-full max-w-[380px] bg-[#0F172A] border-2 border-[#1E293B] p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                            New Password
                        </label>
                        <input
                            type="password"
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
                        {isPending ? "Updating Credentials..." : "Reset Password"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                    <Link
                        href="/login"
                        className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-gray-400 transition"
                    >
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function NewPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
                <p>Loading secure interface...</p>
            </div>
        }>
            <NewPasswordForm />
        </Suspense>
    );
}
