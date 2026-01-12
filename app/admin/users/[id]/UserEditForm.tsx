"use client";

import { useState, useTransition } from "react";
import { updateUser } from "@/actions/admin";
import { useRouter } from "next/navigation";

interface UserEditFormProps {
    user: {
        id: string;
        fullName: string | null;
        email: string | null;
        balance: number;
    };
}

export default function UserEditForm({ user }: UserEditFormProps) {
    const [fullName, setFullName] = useState(user.fullName || "");
    const [email, setEmail] = useState(user.email || "");
    const [balance, setBalance] = useState(user.balance.toString());
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        startTransition(() => {
            updateUser(user.id, {
                fullName,
                email,
                balance: parseFloat(balance)
            }).then((data) => {
                if (data.error) setError(data.error);
                if (data.success) {
                    setSuccess(data.success);
                    router.refresh();
                }
            });
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-4 py-3 outline-none focus:border-blue-500 transition-all font-bold text-sm"
                        required
                        disabled={isPending}
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-4 py-3 outline-none focus:border-blue-500 transition-all font-bold text-sm"
                        required
                        disabled={isPending}
                    />
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Current Balance (USD)</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-bold">$</span>
                    <input
                        type="number"
                        step="0.01"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-emerald-400 pl-8 pr-4 py-4 outline-none focus:border-emerald-500 transition-all font-black text-xl"
                        required
                        disabled={isPending}
                    />
                </div>
                <p className="text-[9px] text-gray-500 mt-2 ml-1 italic">Warning: Manual balance adjustments take effect immediately.</p>
            </div>

            {error && (
                <div className="bg-red-500/15 border border-red-500/20 p-3 rounded-xl text-red-500 text-[10px] font-bold uppercase text-center">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-emerald-500/15 border border-emerald-500/20 p-3 rounded-xl text-emerald-500 text-[10px] font-bold uppercase text-center">
                    {success}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
                {isPending ? "Confirming Updates..." : "Save Protocol Changes"}
            </button>
        </form>
    );
}
