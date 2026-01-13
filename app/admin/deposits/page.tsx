import { db } from "@/lib/db";
import { updateTransactionStatus } from "@/actions/admin";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import FormattedDate from "../../components/FormattedDate";

export default async function AdminDepositsPage() {
    const session = await auth();
    if ((session?.user as any)?.role !== "ADMIN") return redirect("/");

    const pendingDeposits = await db.transaction.findMany({
        where: { type: "DEPOSIT", status: "PENDING" },
        include: { user: true },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-black mb-8">Pending Deposits</h1>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                        <thead className="bg-[#00000033] text-gray-500 uppercase text-[10px] font-bold tracking-widest">
                            <tr>
                                <th className="p-6">User</th>
                                <th className="p-6">Amount</th>
                                <th className="p-6">Date</th>
                                <th className="p-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]">
                            {pendingDeposits.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-gray-500">No pending deposits found.</td>
                                </tr>
                            ) : (
                                pendingDeposits.map((tx: any) => (
                                    <tr key={tx.id} className="hover:bg-white/5">
                                        <td className="p-6">
                                            <div className="font-bold text-white">{tx.user.fullName}</div>
                                            <div className="text-xs text-gray-500">{tx.user.email}</div>
                                        </td>
                                        <td className="p-6 font-bold text-emerald-400">
                                            ${Number(tx.amount).toFixed(2)}
                                        </td>
                                        <td className="p-6 text-gray-500 text-xs">
                                            <FormattedDate date={tx.createdAt} showTime={false} />
                                        </td>
                                        <td className="p-6">
                                            <div className="flex gap-2">
                                                <form action={async () => {
                                                    "use server";
                                                    await updateTransactionStatus(tx.id, "APPROVED");
                                                }}>
                                                    <button className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white px-3 py-2 rounded-lg text-[10px] font-bold uppercase transition">
                                                        Approve
                                                    </button>
                                                </form>
                                                <form action={async () => {
                                                    "use server";
                                                    await updateTransactionStatus(tx.id, "REJECTED");
                                                }}>
                                                    <button className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 rounded-lg text-[10px] font-bold uppercase transition">
                                                        Reject
                                                    </button>
                                                </form>
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
