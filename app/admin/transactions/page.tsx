import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminTransactionsPage() {
    const session = await auth();
    // @ts-expect-error - role is on user
    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    const transactions = await db.transaction.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Global Ledger</h1>
                <div className="bg-blue-900/20 border border-blue-500/30 px-4 py-2 rounded-xl">
                    <span className="text-[10px] font-bold text-blue-400 capitalize">{transactions.length} Total Operations</span>
                </div>
            </div>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-800 bg-white/5">
                    <h3 className="font-bold text-sm uppercase tracking-widest">Master Transaction History</h3>
                    <p className="text-[10px] text-gray-500 uppercase mt-1">Real-time platform activity monitor</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[900px]">
                        <thead className="bg-[#00000066] text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            <tr>
                                <th className="p-6">Investor</th>
                                <th className="p-6">Type</th>
                                <th className="p-6">Amount</th>
                                <th className="p-6">Flow / Gateway</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-16 text-center text-gray-500 italic text-sm">No transactions recorded on the platform yet.</td>
                                </tr>
                            ) : (
                                transactions.map((tx: any) => (
                                    <tr key={tx.id} className="hover:bg-white/[0.02] transition">
                                        <td className="p-6">
                                            <div className="font-bold text-white text-base">{tx.user.fullName}</div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{tx.user.email}</div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${tx.gateway === 'PLATFORM_INVESTMENT' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' :
                                                tx.gateway === 'INVESTMENT_RETURN' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                                                    tx.type === 'DEPOSIT' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                                        'bg-rose-500/10 border-rose-500/20 text-rose-500'
                                                }`}>
                                                {tx.gateway === 'PLATFORM_INVESTMENT' ? 'INVESTMENT' :
                                                    tx.gateway === 'INVESTMENT_RETURN' ? 'YIELD_PAYOUT' :
                                                        tx.type}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className={`font-black text-lg ${tx.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {tx.type === 'DEPOSIT' ? '+' : '-'}{formatCurrency(tx.amount)}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="text-xs text-white font-medium">
                                                {tx.gateway === 'PLATFORM_INVESTMENT' ? `Yield Activation (${tx.walletAddress})` :
                                                    tx.gateway === 'INVESTMENT_RETURN' ? `Yield Payout (${tx.walletAddress})` :
                                                        tx.gateway || 'Manual Entry'}
                                            </div>
                                            <div className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter mt-1">
                                                ID: {tx.id.slice(0, 8)}...
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase border ${tx.status === 'APPROVED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                                tx.status === 'REJECTED' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                    'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right text-gray-500 text-xs font-mono">
                                            {new Date(tx.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
