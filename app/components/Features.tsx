export default function Features() {
    return (
        <>
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4">
                        Start Earning in <span className="text-blue-500">Minutes</span>
                    </h2>
                    <p className="text-gray-400">
                        No complex setups. Just pure performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-800 -z-10"></div>

                    <div className="bg-[#0F172A] p-8 rounded-[30px] border border-gray-800 relative">
                        <div className="w-24 h-24 bg-[#020617] border border-blue-600 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6 shadow-lg shadow-blue-900/50 relative z-10">
                            1
                        </div>
                        <h3 className="text-xl font-bold mb-3">Connect Wallet</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Link your existing wallet (MetaMask, Trust, Phantom) or create a
                            new account instantly.
                        </p>
                    </div>

                    <div className="bg-[#0F172A] p-8 rounded-[30px] border border-blue-500/50 shadow-lg shadow-blue-900/20 relative transform md:-translate-y-4">
                        <div className="w-24 h-24 bg-blue-600 border border-blue-400 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6 shadow-xl relative z-10">
                            2
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Deposit Assets</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Choose your investment amount. We accept BTC, ETH, USDT, and 20+
                            other assets.
                        </p>
                    </div>

                    <div className="bg-[#0F172A] p-8 rounded-[30px] border border-gray-800 relative">
                        <div className="w-24 h-24 bg-[#020617] border border-emerald-500 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6 shadow-lg shadow-emerald-900/50 relative z-10">
                            3
                        </div>
                        <h3 className="text-xl font-bold mb-3">Auto-Compound</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Sit back. Our AI rebalances your portfolio daily to hit that 40%
                            ROI target.
                        </p>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4">The Vantix <span className="text-blue-500">Advantage</span></h2>
                    <p className="text-gray-400 max-w-lg mx-auto">We don't just trade. We engineer profit through superior infrastructure.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-[#0F172A] p-8 rounded-[30px] border border-gray-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition group">
                        <div className="w-12 h-12 bg-blue-900/20 border border-blue-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">🧠</div>
                        <h3 className="text-xl font-bold text-white mb-3">Algorithmic Mastery</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">We moved beyond manual trading. Our proprietary high-frequency algorithms execute trades in milliseconds, capturing micro-profits that humans simply miss.</p>
                    </div>

                    <div className="bg-[#0F172A] p-8 rounded-[30px] border border-gray-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition group">
                        <div className="w-12 h-12 bg-blue-900/20 border border-blue-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">🛡️</div>
                        <h3 className="text-xl font-bold text-white mb-3">Fortress Infrastructure</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Your access is guaranteed. We utilize enterprise-grade DDoS mitigation to ensure our platform remains online and trade-ready 24/7/365, regardless of external threats.</p>
                    </div>

                    <div className="bg-[#0F172A] p-8 rounded-[30px] border border-gray-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition group">
                        <div className="w-12 h-12 bg-blue-900/20 border border-blue-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">🔐</div>
                        <h3 className="text-xl font-bold text-white mb-3">Military-Grade Encryption</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Data integrity is our currency. All traffic is secured via 256-bit EV SSL encryption. We treat your digital footprint with the same rigor as your capital.</p>
                    </div>

                    <div className="bg-[#0F172A] p-8 rounded-[30px] border border-gray-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition group">
                        <div className="w-12 h-12 bg-blue-900/20 border border-blue-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">🏛️</div>
                        <h3 className="text-xl font-bold text-white mb-3">Fully Regulated Entity</h3>
                        <p className="text-gray-400 text-sm">We don&apos;t keep your private keys - you do. Your funds are always under your control.</p>
                    </div>

                    <div className="bg-[#0F172A] p-8 rounded-[30px] border border-gray-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition group">
                        <div className="w-12 h-12 bg-blue-900/20 border border-blue-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">⚡</div>
                        <h3 className="text-xl font-bold text-white mb-3">Zero-Latency Payouts</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Liquidity on demand. Our automated payment gateway processes withdrawals instantly. No manual reviews, no waiting periods. Your profit is yours, immediately.</p>
                    </div>

                    <div className="bg-[#0F172A] p-8 rounded-[30px] border border-gray-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition group">
                        <div className="w-12 h-12 bg-blue-900/20 border border-blue-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">🤝</div>
                        <h3 className="text-xl font-bold text-white mb-3">Concierge Support</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Forget automated bots. Our dedicated financial specialists are on standby around the clock to resolve technical queries in minutes, not days.</p>
                    </div>

                </div>
            </section>
        </>
    );
}
