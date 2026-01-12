import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { processMaturedInvestments } from "@/actions/maturedInvestments";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InvestmentsPage() {
    const session = await auth();
    if (!session?.user?.id) return redirect("/login");

    const userId = session.user.id;

    // Process matured investments before fetching
    await processMaturedInvestments(userId);

    const investments = await db.investment.findMany({
        where: { userId },
        include: { plan: true },
        orderBy: { createdAt: "desc" }
    });

    const activeStakesCount = investments.filter((i: any) => i.status === 'ACTIVE').length;

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">My Portfolio</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-3xl p-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Active Stakes</p>
                    <h3 className="text-2xl font-black text-blue-500">{activeStakesCount}</h3>
                </div>
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-3xl p-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Cycles</p>
                    <h3 className="text-2xl font-black text-white">{investments.length}</h3>
                </div>
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-3xl p-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Portfolio Status</p>
                    <h3 className="text-2xl font-black text-emerald-500 uppercase text-sm">Diversified</h3>
                </div>
            </div>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#00000033] text-gray-500 uppercase text-[10px] font-bold tracking-widest">
                        <tr>
                            <th className="p-6">Strategy</th>
                            <th className="p-6">Principal</th>
                            <th className="p-6">Yield</th>
                            <th className="p-6">Timeline</th>
                            <th className="p-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                        {investments.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-16 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="w-20 h-20 bg-[#1E293B] rounded-full flex items-center justify-center text-3xl">📊</div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-white text-lg">No assets deployed yet.</p>
                                            <p className="text-xs">Select a protocol strategy to begin generating yield.</p>
                                        </div>
                                        <Link href="/dashboard" className="bg-blue-600 px-8 py-3 rounded-xl text-white font-black uppercase text-[10px] tracking-widest hover:bg-blue-50 hover:text-blue-600 transition shadow-lg shadow-blue-600/20">
                                            Explore Strategies
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            investments.map((inv: any) => (
                                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="p-6">
                                        <div className="font-bold text-white text-base">{inv.plan.name}</div>
                                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">ROI: {Number(inv.plan.roiPercent)}%</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="font-black text-white">{formatCurrency(inv.amount)}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="font-black text-emerald-400">
                                            +{formatCurrency(Number(inv.amount) * Number(inv.plan.roiPercent) / 100)}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-xs text-gray-400 font-bold mb-1">
                                            {inv.status === 'ACTIVE' ? 'Processing...' : 'Cycle Finished'}
                                        </div>
                                        <div className="text-[10px] text-gray-600">
                                            End: {inv.endDate.toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${inv.status === 'ACTIVE'
                                            ? 'bg-blue-600/10 border-blue-500/30 text-blue-500'
                                            : 'bg-emerald-600/10 border-emerald-500/30 text-emerald-500'
                                            }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
