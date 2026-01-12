export default function Portfolio() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 bg-blue-900 rounded-[50px] p-12 text-white overflow-hidden relative group border border-blue-700">
                    <h3 className="text-4xl font-bold mb-4">Smart Portfolio <br />Balancing.</h3>
                    <p className="opacity-80 max-w-md mb-8">Let our algorithms do the heavy lifting. We rebalance your assets 24/7.</p>
                    <button className="bg-[#0F172A] text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition border border-blue-500">Learn More</button>
                </div>

                <div className="md:col-span-5 bg-[#0F172A] rounded-[50px] p-12 text-white border border-gray-800">
                    <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 text-2xl border border-gray-700">🔒</div>
                    <h3 className="text-3xl font-bold mb-4">Multi-Sig Vaults</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Institutional-grade security with multi-signature verification.</p>
                </div>

                <div className="md:col-span-5 bg-[#0F172A] border border-gray-800 rounded-[50px] p-12">
                    <h3 className="text-3xl font-bold mb-4 text-white">Mobile Ready</h3>
                    <p className="text-gray-400 text-sm mb-6">Trade from anywhere with our industry-leading mobile application.</p>
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-lg"></div>
                        <div className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-lg"></div>
                    </div>
                </div>

                <div className="md:col-span-7 bg-[#022c22] border border-emerald-900 rounded-[50px] p-12 relative overflow-hidden">
                    <h3 className="text-4xl font-bold mb-4 text-emerald-100">24/7 Live <br />Human Support</h3>
                    <p className="text-emerald-200/60 max-w-xs">No bots. Just real humans helping you manage your wealth.</p>
                </div>
            </div>
        </section>
    );
}
