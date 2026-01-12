"use client";

import { useState, useTransition } from "react";
import { createDeposit } from "@/actions/deposit";
import { useRouter } from "next/navigation";

const WALLETS = {
    BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ETH: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    USDT: "TJ9rT8h7s6d5f4g3h2j1k0l9m8n7b6v5c4x3z2"
};

export default function DepositForm() {
    const [amount, setAmount] = useState("");
    const [gateway, setGateway] = useState<"BTC" | "ETH" | "USDT">("BTC");
    const [step, setStep] = useState<1 | 2>(1);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const router = useRouter();

    const handleCreateDeposit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || Number(amount) <= 0) return;
        setStep(2);
    };

    const handleConfirmPayment = () => {
        setError("");
        startTransition(() => {
            createDeposit(Number(amount), gateway)
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

    return (
        <div className="animate-fade-in-up max-w-2xl mx-auto">
            <h1 className="text-3xl font-black mb-2">Fund Your Account</h1>
            <p className="text-gray-500 mb-8">Securely deposit assets to start your automated trading journey.</p>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8">
                {step === 1 ? (
                    <form onSubmit={handleCreateDeposit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Select Asset</label>
                            <div className="grid grid-cols-3 gap-3">
                                {(['BTC', 'ETH', 'USDT'] as const).map((coin) => (
                                    <button
                                        key={coin}
                                        type="button"
                                        onClick={() => setGateway(coin)}
                                        className={`py-3 rounded-xl font-bold text-sm border-2 transition ${gateway === coin
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
                                    onChange={(e) => setAmount(e.target.value)}
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
                ) : (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Amount to Send</p>
                            <h2 className="text-4xl font-black text-white">${amount} <span className="text-sm text-gray-500">USD worth of {gateway}</span></h2>
                        </div>

                        <div className="bg-[#020617] p-6 rounded-2xl border border-[#1E293B] flex flex-col items-center">
                            {/* Placeholder QR Code - In production use a library */}
                            <div className="w-48 h-48 bg-white mb-6 p-2 rounded-xl">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${WALLETS[gateway]}`} alt="QR Code" className="w-full h-full" />
                            </div>

                            <div className="w-full">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">Send to this {gateway} Address</label>
                                <div className="flex bg-[#1E293B] rounded-xl overflow-hidden p-1">
                                    <input
                                        readOnly
                                        value={WALLETS[gateway]}
                                        className="bg-transparent flex-1 px-3 text-xs text-gray-300 font-mono outline-none"
                                    />
                                    <button
                                        onClick={() => navigator.clipboard.writeText(WALLETS[gateway])}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition"
                                    >
                                        COPY
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl">
                            <p className="text-xs text-blue-400 leading-relaxed text-center">
                                Only send <strong>{gateway}</strong> to this address. Sending other assets will result in permanent loss.
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/15 p-3 rounded-md text-center text-sm text-red-500">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 bg-transparent border-2 border-[#1E293B] text-gray-400 font-bold py-4 rounded-xl uppercase text-xs tracking-widest hover:text-white transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleConfirmPayment}
                                disabled={isPending}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest transition shadow-lg shadow-emerald-600/20"
                            >
                                {isPending ? "Confirming..." : "I Have Paid"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
