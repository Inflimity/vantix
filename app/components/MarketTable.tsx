export default function MarketTable() {
    return (
        <section id="market" className="py-20 px-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black mb-2">Market <span className="text-emerald-400">Pulse</span></h2>
                    <p className="text-gray-400 text-sm">Real-time asset performance.</p>
                </div>
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Live Feed</span>
                </div>
            </div>

            <div className="bg-[#0F172A] border border-gray-800 rounded-[30px] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/20 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <tr>
                                <th className="p-6">Asset Name</th>
                                <th className="p-6">Price</th>
                                <th className="p-6 text-right">24h Change</th>
                                <th className="p-6 text-right hidden md:table-cell">Market Cap</th>
                                <th className="p-6 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-sm font-medium">
                            <tr className="hover:bg-white/5 transition">
                                <td className="p-6 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">₿</div>
                                    <div>
                                        <div className="text-white font-bold">Bitcoin</div>
                                        <div className="text-gray-500 text-xs">BTC</div>
                                    </div>
                                </td>
                                <td className="p-6 text-white">$98,420.50</td>
                                <td className="p-6 text-right text-emerald-400">+2.4%</td>
                                <td className="p-6 text-right text-gray-400 hidden md:table-cell">$1.9T</td>
                                <td className="p-6 text-center"><button className="text-blue-400 hover:text-white text-xs font-bold border border-blue-400 hover:bg-blue-600 px-3 py-1 rounded transition">Trade</button></td>
                            </tr>
                            <tr className="hover:bg-white/5 transition">
                                <td className="p-6 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">Ξ</div>
                                    <div>
                                        <div className="text-white font-bold">Ethereum</div>
                                        <div className="text-gray-500 text-xs">ETH</div>
                                    </div>
                                </td>
                                <td className="p-6 text-white">$3,850.10</td>
                                <td className="p-6 text-right text-emerald-400">+4.1%</td>
                                <td className="p-6 text-right text-gray-400 hidden md:table-cell">$420B</td>
                                <td className="p-6 text-center"><button className="text-blue-400 hover:text-white text-xs font-bold border border-blue-400 hover:bg-blue-600 px-3 py-1 rounded transition">Trade</button></td>
                            </tr>
                            <tr className="hover:bg-white/5 transition">
                                <td className="p-6 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xs">S</div>
                                    <div>
                                        <div className="text-white font-bold">Solana</div>
                                        <div className="text-gray-500 text-xs">SOL</div>
                                    </div>
                                </td>
                                <td className="p-6 text-white">$145.20</td>
                                <td className="p-6 text-right text-emerald-400">+8.5%</td>
                                <td className="p-6 text-right text-gray-400 hidden md:table-cell">$65B</td>
                                <td className="p-6 text-center"><button className="text-blue-400 hover:text-white text-xs font-bold border border-blue-400 hover:bg-blue-600 px-3 py-1 rounded transition">Trade</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
