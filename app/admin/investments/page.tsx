import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import AdminActionButton from "@/app/components/Admin/AdminActionButton";
import FormattedDate from "../../components/FormattedDate";

export const dynamic = "force-dynamic";

export default async function AdminInvestmentsPage() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    const pendingInvestments = await db.transaction.findMany({
        where: { type: "INVESTMENT" as any, status: "PENDING" },
        include: { user: { select: { id: true, fullName: true, email: true } } },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-black mb-10 uppercase tracking-tight">Investment <span className="text-blue-500">Terminal</span></h1>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-800 bg-white/5 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest">Activation Queue</h3>
                        <p className="text-[10px] text-gray-500 uppercase mt-1">Pending allocation requests</p>
                    </div>
                    <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black px-4 py-1.5 rounded-full border border-blue-500/30">
                        {pendingInvestments.length} TOTAL IN QUEUE
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[800px]">
                        <thead className="bg-[#00000066] text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            <tr>
                                <th className="p-6">Investor</th>
                                <th className="p-6">Plan Requested</th>
                                <th className="p-6">Capital Amount</th>
                                <th className="p-6">Date Requested</th>
                                <th className="p-6 text-right">Fulfillment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {pendingInvestments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center text-gray-500 italic">
                                        <div className="text-4xl mb-4 opacity-20">💎</div>
                                        The activation queue is currently empty.
                                    </td>
                                </tr>
                            ) : (
                                pendingInvestments.map((req: any) => (
                                    <tr key={req.id} className="hover:bg-white/[0.02] transition group">
                                        <td className="p-6">
                                            <div className="font-bold text-white text-base">{req.user.fullName}</div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{req.user.email}</div>
                                        </td>
                                        <td className="p-6">
                                            <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                                                {req.walletAddress || 'PRO PLAN'}
                                            </span>
                                        </td>
                                        <td className="p-6 font-black text-emerald-400 text-lg">
                                            {formatCurrency(req.amount)}
                                        </td>
                                        <td className="p-6 text-gray-500 text-xs">
                                            <FormattedDate date={req.createdAt} />
                                        </td>
                                        <td className="p-6 text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-2">
                                                <AdminActionButton
                                                    transactionId={req.id}
                                                    status="APPROVED"
                                                    label="Activate Plan"
                                                    className="bg-emerald-600 hover:bg-emerald-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase transition shadow-lg shadow-emerald-600/20"
                                                />
                                                <AdminActionButton
                                                    transactionId={req.id}
                                                    status="REJECTED"
                                                    label="Reject"
                                                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition shadow-lg shadow-red-600/20"
                                                />
                                            </div>
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
