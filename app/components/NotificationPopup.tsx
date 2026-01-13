"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";

const firstNames = [
    "Alexander", "Olivia", "James", "Sophia", "Benjamin", "Isabella", "William", "Mia", "Ethan", "Charlotte",
    "Michael", "Amelia", "Daniel", "Evelyn", "Matthew", "Abigail", "Joseph", "Harper", "Samuel", "Emily",
    "David", "Elizabeth", "Anthony", "Avery", "John", "Sofia", "Chris", "Emma", "Ryan", "Ella"
];

const lastInitials = ["A.", "B.", "C.", "D.", "E.", "F.", "G.", "H.", "I.", "J.", "K.", "L.", "M.", "N.", "P.", "R.", "S.", "T.", "W."];

export default function NotificationPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState({ name: "", amount: 0, type: "deposit" });

    useEffect(() => {
        const generateRandomData = () => {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            // Increase amount range to include "huge sums"
            const amount = Math.floor(Math.random() * 95000) + 500;
            const type = Math.random() > 0.5 ? "deposit" : "withdrawal";

            // Anonymize: first 3 letters + ***
            const anonymizedName = firstName.substring(0, 3) + "***";

            setData({ name: anonymizedName, amount, type });
            setIsVisible(true);

            // Hide after 3 seconds for a better feel with 7s interval
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        };

        // Start immediately
        generateRandomData();

        // Interval set to 7s as requested
        const interval = setInterval(generateRandomData, 7000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`fixed bottom-8 left-8 z-50 transition-all duration-500 transform ${isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"
                }`}
        >
            <div className="bg-[#0F172A]/90 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs ring-1 ring-blue-500/20">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${data.type === 'deposit' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                    {data.type === 'deposit' ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    )}
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-0.5">
                        New {data.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                    </p>
                    <div className="text-sm font-bold text-white">
                        {data.name} <span className="text-gray-400 font-medium">just {data.type === 'deposit' ? 'invested' : 'received'}</span>
                    </div>
                    <div className={`text-lg font-black mt-1 ${data.type === 'deposit' ? 'text-emerald-400' : 'text-blue-400'}`}>
                        ${data.amount.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
