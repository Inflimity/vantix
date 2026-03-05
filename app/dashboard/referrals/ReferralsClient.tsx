"use client";

import { useState } from "react";

interface User {
    id: string;
    referralCode: string | null;
}

export default function ReferralsClient({ user }: { user: any }) {
    const [copied, setCopied] = useState(false);

    // Get protocol and host for the link
    // Use production URL from env or fallback to current origin
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://bitfoniz.icu');
    const referralLink = `${baseUrl}/signup?ref=${user.referralCode || user.id}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-3xl font-black mb-2">Referral Program</h1>
            <p className="text-gray-500 mb-8">Earn rewards by inviting friends to Bitfoniz.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Your Referral Link</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            readOnly
                            value={referralLink}
                            className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-2 text-sm text-gray-400"
                        />
                        <button
                            onClick={handleCopy}
                            className={`${copied ? 'bg-emerald-600' : 'bg-blue-600'} px-6 py-2 rounded-xl text-white font-bold text-xs uppercase transition-colors min-w-[100px]`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Total Earnings</p>
                    <h3 className="text-3xl font-black text-emerald-400">$0.00</h3>
                </div>
            </div>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8">
                <h4 className="font-bold mb-4 text-white">How it works</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="space-y-2">
                        <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-500 font-bold">1</div>
                        <p className="font-bold">Share Link</p>
                        <p className="text-gray-500 text-xs text-pretty">Send your unique referral link to friends, family, or your community.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-500 font-bold">2</div>
                        <p className="font-bold">They Invest</p>
                        <p className="text-gray-500 text-xs text-pretty">When they register and activate an investment protocol, you earn a commission.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-500 font-bold">3</div>
                        <p className="font-bold">Get Paid</p>
                        <p className="text-gray-500 text-xs text-pretty">Commissions are added instantly to your balance and can be withdrawn anytime.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
