import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default async function AdminUsersPage() {
    const session = await auth();
    // @ts-expect-error - role is on user
    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    const users = await db.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">User Database</h1>
                <div className="bg-blue-900/20 border border-blue-500/30 px-4 py-2 rounded-xl">
                    <span className="text-[10px] font-bold text-blue-400 capitalize">{users.length} Total Partners</span>
                </div>
            </div>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[700px]">
                        <thead className="bg-[#00000066] text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            <tr>
                                <th className="p-6">Investor Information</th>
                                <th className="p-6">Role</th>
                                <th className="p-6">Balance</th>
                                <th className="p-6">Joined Date</th>
                                <th className="p-6 text-right">Activity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]">
                            {users.map((user: any) => (
                                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="p-6">
                                        <div className="font-bold text-white text-base">{user.fullName}</div>
                                        <div className="text-xs text-gray-500 font-mono italic">{user.email}</div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${user.role === 'ADMIN' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="font-black text-emerald-400 text-lg">{formatCurrency(user.balance)}</div>
                                    </td>
                                    <td className="p-6 text-gray-400 text-xs font-bold">
                                        {user.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>
                                    <td className="p-6 text-right">
                                        <Link
                                            href={`/admin/users/${user.id}`}
                                            className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition"
                                        >
                                            Manage Access →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
