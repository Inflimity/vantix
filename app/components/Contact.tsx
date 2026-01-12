export default function Contact() {
    return (
        <section id="support" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                <div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">Get in <span className="text-blue-500">Touch.</span></h2>
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md">
                        Have questions about your Vantix portfolio? Our institutional support team is available 24/7 to assist with technical or financial queries.
                    </p>

                    <div className="space-y-6">
                        <a href="mailto:support@vantix.com" className="flex items-center gap-6 p-6 bg-[#0F172A] border border-gray-800 rounded-[30px] hover:border-blue-500/50 transition group">
                            <div className="w-14 h-14 bg-blue-900/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition">✉️</div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Email Support</div>
                                <div className="text-white font-bold">support@vantix.com</div>
                            </div>
                        </a>

                        <a href="#" className="flex items-center gap-6 p-6 bg-[#0F172A] border border-gray-800 rounded-[30px] hover:border-blue-500/50 transition group">
                            <div className="w-14 h-14 bg-blue-900/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition">✈️</div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Official Telegram</div>
                                <div className="text-white font-bold">@Vantix_Official</div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="bg-[#0F172A] p-8 md:p-10 rounded-[50px] border border-gray-800 shadow-2xl">
                    <form action="#" method="POST" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                            <select className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition appearance-none">
                                <option>General Inquiry</option>
                                <option>Deposit/Withdrawal Issue</option>
                                <option>Technical Support</option>
                                <option>Partnership</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                            <textarea rows={4} placeholder="How can we help you?" className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition shadow-lg shadow-blue-600/20">
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}
