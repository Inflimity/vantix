"use client";
import { useState, useEffect, useTransition } from "react";
import { invest } from "@/actions/invest";

type PlanKey = 'beginner' | 'beginnersPro' | 'professional' | 'expertBusiness' | 'promo';

interface Plan {
    name: string;
    roi: number;
    hours: number;
    min: number;
    max: number;
}

const plans: Record<PlanKey, Plan> = {
    beginner: { name: 'BEGINNER', roi: 6, hours: 15, min: 50, max: 499 },
    beginnersPro: { name: 'BEGINNERS PRO', roi: 8, hours: 20, min: 500, max: 1499 },
    professional: { name: 'PROFESSIONAL', roi: 11, hours: 24, min: 1500, max: 14999 },
    expertBusiness: { name: 'EXPERT BUSINESS', roi: 26, hours: 36, min: 15000, max: 100000000 },
    promo: { name: 'PROMO', roi: 10, hours: 5, min: 2500, max: 6000 }
};

export default function Calculator() {
    const [selectedPlan, setSelectedPlan] = useState<PlanKey>('beginner');
    const [amount, setAmount] = useState<number>(100);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const plan = plans[selectedPlan];

    // Derived values
    const profit = (amount * plan.roi) / 100;
    const hourlyProfit = profit / plan.hours;
    const totalReturn = amount + profit;

    const handleInvest = () => {
        setError(null);
        setSuccess(null);
        startTransition(async () => {
            const result = await invest(plan.name, amount);
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(result.success || "Investment successful!");
            }
        });
    };

    return (
        <section id="calculator" className="py-20 px-6 max-w-4xl mx-auto">
            <div className="bg-[#0F172A] border border-blue-500/30 rounded-[50px] p-8 md:p-12 shadow-2xl shadow-blue-900/20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-2 text-white">Profit <span className="text-emerald-400">Calculator</span></h2>
                    <p className="text-gray-400 text-sm">Principal is debited from your <span className="text-blue-400">Liquid Balance</span> and returned with yield.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Select Your Plan</label>
                            <select
                                value={selectedPlan}
                                onChange={(e) => setSelectedPlan(e.target.value as PlanKey)}
                                className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
                            >
                                <option value="beginner">Beginner (6% ROI / 15 hrs)</option>
                                <option value="beginnersPro">Beginners Pro (8% ROI / 20 hrs)</option>
                                <option value="professional">Professional (11% ROI / 24 hrs)</option>
                                <option value="expertBusiness">Expert Business (26% ROI / 36 hrs)</option>
                                <option value="promo">Promo (10% ROI / 5 hrs)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Investment Amount ($)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                                className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
                                placeholder="e.g. 100"
                            />
                            <p className="text-[10px] text-gray-500 mt-2">Min: ${plan.min} | Max: ${plan.max}</p>
                        </div>
                    </div>

                    <div className="bg-black/40 rounded-3xl p-8 border border-white/5 flex flex-col justify-center">
                        <div className="mb-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Expected Net Profit</p>
                            <div className="text-4xl font-black text-emerald-400">${profit.toFixed(2)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Hourly Return</p>
                                <div className="text-xl font-bold text-white">${hourlyProfit.toFixed(3)}</div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total Payline</p>
                                <div className="text-xl font-bold text-white">${totalReturn.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={handleInvest}
                        disabled={isPending}
                        className={`w-full py-4 text-white font-black uppercase tracking-widest rounded-2xl transition shadow-lg active:scale-95 ${isPending ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20"
                            }`}
                    >
                        {isPending ? "Processing..." : "Invest Now"}
                    </button>
                    {error && <p className="text-red-500 text-xs font-bold mt-4 text-center uppercase tracking-widest">{error}</p>}
                    {success && <p className="text-emerald-500 text-xs font-bold mt-4 text-center uppercase tracking-widest">{success}</p>}
                </div>
            </div>
        </section>
    );
}

