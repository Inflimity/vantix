"use client";

import { useState, useEffect } from "react";

export default function Stats() {
    const [assets, setAssets] = useState(0);
    const [users, setUsers] = useState(0);
    const [payouts, setPayouts] = useState(0);
    const [security, setSecurity] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let changed = false;

            setAssets(prev => {
                if (prev < 152) { changed = true; return prev + 1; }
                return prev;
            });

            setUsers(prev => {
                if (prev < 50) { changed = true; return prev + 0.5; }
                return prev;
            });

            setPayouts(prev => {
                if (prev < 89) { changed = true; return prev + 0.5; }
                return prev;
            });

            setSecurity(prev => {
                if (prev < 100) { changed = true; return prev + 1; }
                return prev;
            });

        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">

                <div className="bg-[#0F172A] p-8 rounded-[40px] border border-gray-800 shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20 hover:-translate-y-2">
                    <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                        $<span >{Math.round(assets)}</span>M+
                    </div>
                    <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em]">Managed Assets</p>
                </div>

                <div className="bg-[#0F172A] p-8 rounded-[40px] border border-gray-800 shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20 hover:-translate-y-2">
                    <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                        <span>{Math.round(users)}</span>K+
                    </div>
                    <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em]">Global Users</p>
                </div>

                <div className="bg-[#0F172A] p-8 rounded-[40px] border border-gray-800 shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20 hover:-translate-y-2">
                    <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                        $<span >{Math.round(payouts)}</span>M+
                    </div>
                    <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em]">Total Payouts</p>
                </div>

                <div className="bg-[#0F172A] p-8 rounded-[40px] border border-gray-800 shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20 hover:-translate-y-2">
                    <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                        <span>{Math.round(security)}</span>%
                    </div>
                    <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em]">Security Record</p>
                </div>

            </div>
        </section>
    );
}
