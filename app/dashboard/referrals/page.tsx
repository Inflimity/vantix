"use client";

export default function ReferralsPage() {
    return (
        <div className="animate-fade-in-up">
            <h1 className="text-3xl font-black mb-2">Referral Program</h1>
            <p className="text-gray-500 mb-8">Earn rewards by inviting friends to Vantix.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Your Referral Link</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            readOnly
                            value="https://vantix.com/ref/u12345"
                            className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-2 text-sm text-gray-400"
                        />
                        <button className="bg-blue-600 px-4 py-2 rounded-xl text-white font-bold text-xs uppercase">Copy</button>
                    </div>
                </div>
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Total Earnings</p>
                    <h3 className="text-3xl font-black text-emerald-400">$0.00</h3>
                </div>
            </div>
        </div>
    );
}
