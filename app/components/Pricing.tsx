"use client";
import Link from "next/link";

export default function Pricing() {
    return (
        <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black mb-4">Investment <span className="serif italic text-emerald-400">Plans</span></h2>
                <p className="text-gray-400 max-w-lg mx-auto">The best investment plan of 2026. You can earn up to 40% hourly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-[#0F172A] p-8 rounded-[40px] border border-gray-800 hover:border-emerald-500 transition group">
                    <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4">Starter Plan</h3>
                    <div className="text-5xl font-black text-white mb-2">6%</div>
                    <p className="text-emerald-400 font-bold text-sm mb-6 uppercase">Hourly For 20 Hours</p>

                    <div className="space-y-4 mb-8 text-sm text-gray-300 border-t border-gray-800 pt-6">
                        <div className="flex justify-between">
                            <span>Min Deposit:</span>
                            <span className="text-white font-bold">$1</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Max Deposit:</span>
                            <span className="text-white font-bold">$10,000</span>
                        </div>
                    </div>
                    <Link href="/dashboard" className="block text-center w-full py-4 rounded-xl border border-white/20 font-bold text-white group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-black transition">Activate</Link>
                </div>

                <div className="bg-[#0F172A] p-8 rounded-[40px] border border-gray-800 hover:border-emerald-500 transition group">
                    <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Premium Plan</h3>
                    <div className="text-5xl font-black text-white mb-2">4%</div>
                    <p className="text-emerald-400 font-bold text-sm mb-6 uppercase">Hourly For 40 Hours</p>

                    <div className="space-y-4 mb-8 text-sm text-gray-300 border-t border-gray-800 pt-6">
                        <div className="flex justify-between">
                            <span>Min Deposit:</span>
                            <span className="text-white font-bold">$5</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Max Deposit:</span>
                            <span className="text-white font-bold">$10,000</span>
                        </div>
                    </div>
                    <Link href="/dashboard" className="block text-center w-full py-4 rounded-xl border border-white/20 font-bold text-white group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-black transition">Activate</Link>
                </div>

                <div className="bg-[#0F172A] p-8 rounded-[40px] border border-gray-800 hover:border-emerald-500 transition group">
                    <h3 className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-4">Advanced Plan</h3>
                    <div className="text-5xl font-black text-white mb-2">20%</div>
                    <p className="text-emerald-400 font-bold text-sm mb-6 uppercase">Hourly For 10 Hours</p>

                    <div className="space-y-4 mb-8 text-sm text-gray-300 border-t border-gray-800 pt-6">
                        <div className="flex justify-between">
                            <span>Min Deposit:</span>
                            <span className="text-white font-bold">$450</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Max Deposit:</span>
                            <span className="text-white font-bold">$10,000</span>
                        </div>
                    </div>
                    <Link href="/dashboard" className="block text-center w-full py-4 rounded-xl border border-white/20 font-bold text-white group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-black transition">Activate</Link>
                </div>

                <div className="bg-blue-900/20 p-8 rounded-[40px] border border-blue-500 relative shadow-2xl shadow-blue-900/30 group">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl rounded-tr-[35px]">Best Value</div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">VIP Plan</h3>
                    <div className="text-5xl font-black text-white mb-2">40%</div>
                    <p className="text-blue-400 font-bold text-sm mb-6 uppercase">Hourly For 5 Hours</p>

                    <div className="space-y-4 mb-8 text-sm text-gray-300 border-t border-blue-500/30 pt-6">
                        <div className="flex justify-between">
                            <span>Min Deposit:</span>
                            <span className="text-white font-bold">$400</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Max Deposit:</span>
                            <span className="text-white font-bold">$10,000</span>
                        </div>
                    </div>
                    <Link href="/dashboard" className="block text-center w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-emerald-500 hover:text-black transition shadow-lg shadow-blue-500/40">Activate</Link>
                </div>

            </div>
        </section>
    );
}


