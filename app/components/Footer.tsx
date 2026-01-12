export default function Footer() {
    return (
        <footer className="bg-[#0F172A] border-t border-gray-800 pt-20 pb-10 px-6 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                <div className="col-span-1 md:col-span-2">
                    <div className="text-3xl font-black mb-6">VANTIX<span className="text-emerald-400">.</span></div>
                    <p className="text-gray-400 max-w-xs leading-relaxed">A specialized crypto rebranding project focused on high-performance UI and user joy.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-6">Quick Links</h4>
                    <div className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
                        <a href="#" className="hover:text-emerald-400 transition">Markets</a>
                        <a href="#" className="hover:text-emerald-400 transition">Company</a>
                        <a href="#" className="hover:text-emerald-400 transition">Careers</a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-6">Connect</h4>
                    <div className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
                        <a href="#" className="hover:text-emerald-400 transition">Twitter / X</a>
                        <a href="#" className="hover:text-emerald-400 transition">Telegram</a>
                        <a href="#" className="hover:text-emerald-400 transition">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <p>© 2026 Vantix. All Rights Reserved.</p>
                <p>Designed for Full-Stack Performance</p>
            </div>
        </footer>
    );
}
