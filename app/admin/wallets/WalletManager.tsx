"use client";

import { useState, useTransition } from "react";
import { upsertWalletAddress, deleteWalletAddress } from "@/actions/wallet";
import { useRouter } from "next/navigation";

interface WalletAddress {
    id: string;
    currency: string;
    address: string;
    label: string | null;
    updatedAt: Date;
}

export default function WalletManager({ wallets }: { wallets: WalletAddress[] }) {
    const [currency, setCurrency] = useState("");
    const [address, setAddress] = useState("");
    const [label, setLabel] = useState("");
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [editMode, setEditMode] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        startTransition(() => {
            upsertWalletAddress({ currency, address, label: label || undefined })
                .then((data) => {
                    if (data.error) setMessage({ type: "error", text: data.error });
                    if (data.success) {
                        setMessage({ type: "success", text: data.success });
                        setCurrency("");
                        setAddress("");
                        setLabel("");
                        setEditMode(null);
                        router.refresh();
                    }
                })
                .catch(() => setMessage({ type: "error", text: "Something went wrong" }));
        });
    };

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this wallet address?")) return;

        startTransition(() => {
            deleteWalletAddress(id)
                .then((data) => {
                    if (data.error) setMessage({ type: "error", text: data.error });
                    if (data.success) {
                        setMessage({ type: "success", text: data.success });
                        router.refresh();
                    }
                })
                .catch(() => setMessage({ type: "error", text: "Something went wrong" }));
        });
    };

    const handleEdit = (wallet: WalletAddress) => {
        setEditMode(wallet.id);
        setCurrency(wallet.currency);
        setAddress(wallet.address);
        setLabel(wallet.label || "");
    };

    const handleCancel = () => {
        setEditMode(null);
        setCurrency("");
        setAddress("");
        setLabel("");
    };

    return (
        <div className="space-y-8">
            {/* Add / Edit Form */}
            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8 shadow-2xl">
                <h3 className="text-lg font-black uppercase tracking-widest mb-6">
                    {editMode ? "✏️ Edit Wallet" : "➕ Add New Wallet"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Currency Code</label>
                            <input
                                type="text"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                                placeholder="e.g. BTC, ETH, USDT"
                                required
                                disabled={isPending || !!editMode}
                                className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-4 py-3 outline-none focus:border-blue-500 text-sm font-bold disabled:opacity-50"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Wallet Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter wallet address"
                                required
                                disabled={isPending}
                                className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-4 py-3 outline-none focus:border-blue-500 text-sm font-mono disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Label (Optional)</label>
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="e.g. Main BTC Wallet, Cold Storage"
                            disabled={isPending}
                            className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-4 py-3 outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                        />
                    </div>

                    {message && (
                        <div className={`p-3 rounded-xl text-xs font-bold uppercase text-center ${message.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl uppercase text-xs tracking-widest transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
                        >
                            {isPending ? "Saving..." : editMode ? "Update Wallet" : "Add Wallet"}
                        </button>
                        {editMode && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isPending}
                                className="px-6 bg-[#1E293B] hover:bg-[#28354c] text-gray-400 font-bold py-3 rounded-xl text-xs transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Wallet List */}
            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-800 bg-white/5 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest">Configured Wallets</h3>
                        <p className="text-[10px] text-gray-500 uppercase mt-1">Users will see these on the deposit page</p>
                    </div>
                    <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black px-4 py-1.5 rounded-full border border-blue-500/30">
                        {wallets.length} ACTIVE
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                        <thead className="bg-[#00000066] text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            <tr>
                                <th className="p-6">Currency</th>
                                <th className="p-6">Address</th>
                                <th className="p-6">Label</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]">
                            {wallets.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-16 text-center text-gray-500">
                                        <div className="text-4xl mb-4 opacity-20">💳</div>
                                        No wallet addresses configured yet. Add one above.
                                    </td>
                                </tr>
                            ) : (
                                wallets.map((wallet) => (
                                    <tr key={wallet.id} className="hover:bg-white/[0.02] transition">
                                        <td className="p-6">
                                            <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                                                {wallet.currency}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <code className="bg-black/40 px-3 py-1.5 rounded-lg text-xs text-orange-400 font-mono border border-[#1E293B]">
                                                {wallet.address.length > 30 ? `${wallet.address.slice(0, 15)}...${wallet.address.slice(-15)}` : wallet.address}
                                            </code>
                                        </td>
                                        <td className="p-6 text-gray-400 text-sm">
                                            {wallet.label || "—"}
                                        </td>
                                        <td className="p-6 text-right whitespace-nowrap">
                                            <button
                                                onClick={() => handleEdit(wallet)}
                                                disabled={isPending}
                                                className="bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-lg text-[10px] font-bold uppercase transition mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(wallet.id)}
                                                disabled={isPending}
                                                className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-2 rounded-lg text-[10px] font-bold uppercase transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
