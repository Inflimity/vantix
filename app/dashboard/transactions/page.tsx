import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import FormattedDate from "../../components/FormattedDate";

export default async function TransactionsPage() {
    const session = await auth();
    if (!session?.user?.id) return redirect("/login");

    const userId = session.user.id;

    const transactions = await db.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">Activity Ledger</h1>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-[#1E293B]">
                    <h3 className="font-bold">Transaction History</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Live platform activity monitor</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#00000033] text-gray-500 uppercase text-[10px] font-bold tracking-widest">
                            <tr>
                                <th className="p-6">Description</th>
                                <th className="p-6">Amount</th>
                                <th className="p-6">Payload</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-16 text-center text-gray-500">
                                        No platform activity recorded yet.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((tx: any) => (
                                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6">
                                            <div className="font-bold uppercase text-[10px] tracking-widest text-blue-400 mb-1">{tx.type}</div>
                                            <div className="text-xs text-white font-medium">
                                                {tx.gateway === 'PLATFORM_INVESTMENT' ? `Yield Strategy Activation` :
                                                    tx.gateway === 'INVESTMENT_RETURN' ? `Yield Protocol Payout` :
                                                        tx.gateway === 'DEPOSIT' ? 'Direct Wallet Funding' :
                                                            tx.gateway || 'Platform Activity'}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`font-black ${tx.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {tx.type === 'DEPOSIT' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                                {tx.walletAddress || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase border ${tx.status === 'APPROVED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                                tx.status === 'REJECTED' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                    'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-gray-500 text-xs">
                                            <FormattedDate date={tx.createdAt} />
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
