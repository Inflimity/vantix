"use client";

import { useState, useTransition } from "react";
import { invest } from "@/actions/invest";
import { useRouter } from "next/navigation";

export default function InvestForm({ plan, userBalance }: { plan: any, userBalance: number }) {
    const [amount, setAmount] = useState(Number(plan.minDeposit));
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const profit = (amount * Number(plan.roiPercent)) / 100;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            const result = await invest(plan.id, amount);
            if (result.error) {
                setError(result.error);
            } else {
                router.push("/dashboard/investments");
            }
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8">
            <div>
                <div className="flex justify-between items-end mb-4">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Investment Principal (USD)
                    </label>
                    <span className="text-[10px] font-bold text-blue-500">
                        Available: ${userBalance.toFixed(2)}
                    </span>
                </div>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <span className="text-2xl font-black text-blue-500">$</span>
                    </div>
                    <input
                        type="number"
                        min={Number(plan.minDeposit)}
                        max={Number(plan.maxDeposit)}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-3xl text-white pl-12 pr-6 py-6 text-3xl font-black outline-none focus:border-blue-500 transition-all"
                        required
                    />
                </div>
                <p className="text-[10px] text-gray-500 mt-4 uppercase font-bold">
                    Range: ${Number(plan.minDeposit)} - ${Number(plan.maxDeposit)}
                </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Net Profit Yield:</span>
                    <span className="text-emerald-400 font-bold">+${profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-white/5 pt-3">
                    <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Payline:</span>
                    <span className="text-white font-black text-lg">${(amount + profit).toFixed(2)}</span>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all duration-300 shadow-lg active:scale-95 ${isPending
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20"
                    }`}
            >
                {isPending ? "Connecting to Pool..." : "Confirm & Activate"}
            </button>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-xs font-bold uppercase text-center">
                    {error}
                </div>
            )}
        </form>
    );
}
