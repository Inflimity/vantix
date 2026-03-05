"use client";

import { useState, useTransition, useEffect } from "react";
import { createDeposit } from "@/actions/deposit";
import { useRouter, useSearchParams } from "next/navigation";

export interface DepositFormProps {
    wallets: Record<string, string>;
}

export default function DepositForm({ wallets }: DepositFormProps) {
    const currencies = Object.keys(wallets);
    const searchParams = useSearchParams();
    const urlPlanId = searchParams.get("planId");
    const urlAmount = searchParams.get("amount");

    const [amount, setAmount] = useState<number | "">(urlAmount ? Number(urlAmount) : "");
    const [currency, setCurrency] = useState("BTC");
    const [step, setStep] = useState<1 | 2>(1);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const MIN_DEPOSIT = 100;

    if (currencies.length === 0) {
        return (
            <div className="animate-fade-in-up max-w-2xl mx-auto">
                <h1 className="text-3xl font-black mb-2">Fund Your Account</h1>
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-12 text-center mt-6">
                    <div className="text-4xl mb-4 opacity-30">💳</div>
                    <p className="text-gray-400 font-bold">Deposit wallets are not configured yet.</p>
                    <p className="text-gray-500 text-sm mt-2">Please contact support for assistance.</p>
                </div>
            </div>
        );
    }

    const handleCreateDeposit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || Number(amount) <= 0) return;
        setStep(2);
    };

    const handleConfirmPayment = () => {
        setError("");
        startTransition(() => {
            createDeposit(Number(amount), currency, urlPlanId || undefined)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                    if (data?.success) {
                        router.push("/dashboard");
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    };

    const currentAddress = wallets[currency] || "";

    return (
        <div className="animate-fade-in-up max-w-2xl mx-auto">
            <h1 className="text-3xl font-black mb-2">Fund Your Account</h1>
            <p className="text-gray-500 mb-8">Securely deposit assets to start your automated trading journey.</p>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8">
                {step === 1 ? (
                    <>
                        {urlPlanId && (
                            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl flex items-start gap-4 mb-6 text-sm">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    ✨
                                </div>
                                <div>
                                    <h4 className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-1">
                                        Auto-Invest Enabled
                                    </h4>
                                    <p className="text-gray-300">
                                        You are depositing to fund an investment. Once this deposit is approved, your investment
                                        will automatically be activated.
                                    </p>
                                </div>
                            </div>
                        )}
                        <form onSubmit={handleCreateDeposit} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Select Asset</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {currencies.map((coin) => (
                                        <button
                                            key={coin}
                                            type="button"
                                            onClick={() => setCurrency(coin)}
                                            className={`py-3 rounded-xl font-bold text-sm border-2 transition ${currency === coin
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'bg-[#020617] border-[#1E293B] text-gray-400 hover:border-gray-600'
                                                }`}
                                        >
                                            {coin}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Deposit Amount (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                                        placeholder="0.00"
                                        className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white pl-8 pr-4 py-4 outline-none focus:border-blue-500 font-bold text-lg"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest transition shadow-lg shadow-blue-600/20">
                                Proceed to Payment
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Amount to Send</p>
                            <h2 className="text-4xl font-black text-white">${amount} <span className="text-sm text-gray-500">USD worth of {currency}</span></h2>
                        </div>

                        <div className="bg-[#020617] p-6 rounded-2xl border border-[#1E293B] flex flex-col items-center">
                            {/* QR Code */}
                            <div className="w-48 h-48 bg-white mb-6 p-2 rounded-xl">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currentAddress}`} alt="QR Code" className="w-full h-full" />
                            </div>

                            <div className="w-full">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">Send to this {currency} Address</label>
                                <div className="flex bg-[#0F172A] border-2 border-[#1E293B] rounded-xl overflow-hidden">
                                    <input
                                        type="text"
                                        value={currentAddress}
                                        readOnly
                                        className="w-full bg-transparent text-gray-400 px-4 py-3 text-xs outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigator.clipboard.writeText(currentAddress);
                                            // Optional: Add toast notification
                                        }}
                                        className="px-4 bg-[#1E293B] hover:bg-gray-700 text-white text-[10px] font-bold tracking-widest transition"
                                    >
                                        COPY
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl flex items-start gap-4">
                            <div className="text-blue-500 mt-1">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-xs text-blue-400 leading-relaxed">
                                After sending the funds, please wait a few minutes for network confirmation. Your balance will be updated automatically once confirmed.
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-1/3 py-4 rounded-xl font-bold uppercase text-xs tracking-widest border-2 border-[#1E293B] text-gray-400 hover:text-white hover:border-gray-600 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleConfirmPayment}
                                disabled={isPending}
                                className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
                            >
                                {isPending ? "Confirming..." : "I Have Paid"}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-xl text-xs font-bold uppercase text-center">
                                {error}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
