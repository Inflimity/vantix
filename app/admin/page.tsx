import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { updateTransactionStatus } from "@/actions/admin";

export default async function AdminDashboard() {
    const session = await auth();
    // @ts-expect-error - role is on user
    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    // Fetch platform stats
    const totalDeposits = await db.transaction.aggregate({
        where: { type: "DEPOSIT", status: "APPROVED" },
        _sum: { amount: true }
    });

    const pendingWithdrawals = await db.transaction.aggregate({
        where: { type: "WITHDRAWAL", status: "PENDING" },
        _sum: { amount: true }
    });

    const activeUsersCount = await db.user.count();

    const totalUserBalances = await db.user.aggregate({
        _sum: { balance: true }
    });

    const totalLockedCapital = await db.investment.aggregate({
        where: { status: "ACTIVE" },
        _sum: { amount: true }
    });

    const pendingRequests = await db.transaction.findMany({
        where: { status: "PENDING" },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 uppercase tracking-tight">System <span className="text-blue-500">Terminal</span></h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[24px] p-6 group hover:border-blue-500/30 transition">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Liquid Balance</p>
                    <h3 className="text-2xl font-black text-blue-500">{formatCurrency(Number(totalUserBalances._sum.balance) || 0)}</h3>
                </div>
                <div className="bg-[#0F172A] border-2 border-emerald-500/30 rounded-[24px] p-6 group hover:border-emerald-500/50 transition">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Locked Capital</p>
                    <h3 className="text-2xl font-black text-emerald-500">{formatCurrency(Number(totalLockedCapital._sum.amount) || 0)}</h3>
                </div>
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[24px] p-6 group hover:border-blue-500/30 transition">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Investors</p>
                    <h3 className="text-2xl font-black">{activeUsersCount}</h3>
                </div>
                <div className="bg-[#0F172A] border-2 border-orange-500/30 rounded-[24px] p-6 group hover:border-orange-500/50 transition">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Pending Payouts</p>
                    <h3 className="text-2xl font-black text-orange-500">{formatCurrency(Number(pendingWithdrawals._sum.amount) || 0)}</h3>
                </div>
            </div>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-800 bg-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest">Incoming Requests</h3>
                        <p className="text-[10px] text-gray-500 uppercase mt-1">Pending verification</p>
                    </div>
                    {pendingRequests.length > 0 && (
                        <span className="bg-orange-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-tighter">ACTION REQUIRED</span>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                        <thead className="bg-[#00000066] text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            <tr>
                                <th className="p-6">Investor Profile</th>
                                <th className="p-6">Type</th>
                                <th className="p-6">Amount</th>
                                <th className="p-6 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {pendingRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-16 text-center text-gray-500 italic text-sm">No pending requests at this time.</td>
                                </tr>
                            ) : (
                                pendingRequests.map((req: any) => (
                                    <tr key={req.id} className="hover:bg-white/[0.02] transition">
                                        <td className="p-6">
                                            <div className="font-bold text-blue-400 text-base">{req.user.fullName}</div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{req.user.email}</div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${req.type === 'DEPOSIT' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' : 'bg-orange-500/10 border-orange-500/30 text-orange-500'}`}>
                                                {req.type}
                                            </span>
                                        </td>
                                        <td className="p-6 font-black text-white text-lg">{formatCurrency(req.amount)}</td>
                                        <td className="p-6 text-right whitespace-nowrap">
                                            <form action={async () => {
                                                "use server";
                                                await updateTransactionStatus(req.id, "APPROVED");
                                            }} className="inline-block">
                                                <button className="bg-emerald-600 hover:bg-emerald-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase mr-2 transition shadow-lg shadow-emerald-600/20">Approve</button>
                                            </form>
                                            <form action={async () => {
                                                "use server";
                                                await updateTransactionStatus(req.id, "REJECTED");
                                            }} className="inline-block">
                                                <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition shadow-lg shadow-red-600/20">Reject</button>
                                            </form>
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
