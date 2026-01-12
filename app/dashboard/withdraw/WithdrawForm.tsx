"use client";

import { useState } from "react";
import { requestWithdrawal } from "@/actions/withdraw";
import { formatCurrency } from "@/lib/utils";

interface WithdrawFormProps {
    balance: number;
}

export default function WithdrawForm({ balance }: WithdrawFormProps) {
    const [amount, setAmount] = useState<string>("");
    const [walletType, setWalletType] = useState<string>("USDT (ERC20)");
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setMessage({ type: 'error', text: "Please enter a valid amount" });
            setLoading(false);
            return;
        }

        if (numAmount > balance) {
            setMessage({ type: 'error', text: "Insufficient balance" });
            setLoading(false);
            return;
        }

        const res = await requestWithdrawal(numAmount, walletAddress, walletType);

        if (res.error) {
            setMessage({ type: 'error', text: res.error });
        } else if (res.success) {
            setMessage({ type: 'success', text: res.success });
            setAmount("");
            setWalletAddress("");
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="mb-6 bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl flex justify-between items-center">
                <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Available Balance</span>
                <span className="text-xl font-black text-white">{formatCurrency(balance)}</span>
            </div>

            {message && (
                <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Withdrawal Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            required
                            className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white pl-8 pr-4 py-4 outline-none focus:border-blue-500 font-bold text-lg"
                        />
                    </div>
                    <p className="text-[9px] text-gray-600 font-bold uppercase mt-2">Maximum allowed: {formatCurrency(balance)}</p>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Select Network</label>
                    <select
                        value={walletType}
                        onChange={(e) => setWalletType(e.target.value)}
                        className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-4 py-4 outline-none focus:border-blue-500 font-bold text-sm h-[60px]"
                    >
                        <option value="USDT (TRC20)">USDT (TRC20)</option>
                        <option value="USDT (ERC20)">USDT (ERC20)</option>
                        <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
                        <option value="Ethereum (ETH)">Ethereum (ETH)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Destination Wallet Address</label>
                    <input
                        type="text"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="Paste your address here"
                        required
                        className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-4 py-4 outline-none focus:border-blue-500 text-sm font-mono"
                    />
                </div>

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
                >
                    {loading ? "Processing Transmission..." : "Request Payout"}
                </button>
            </form>
        </div>
    );
}
