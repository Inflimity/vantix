import { getDashboardData } from "@/actions/getDashboardData";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import FormattedDate from "../components/FormattedDate";

export const dynamic = "force-dynamic";

interface Transaction {
    id: string;
    amount: import("@prisma/client/runtime/library").Decimal;
    status: string;
    type: string;
    gateway: string | null;
    walletAddress: string | null;
    createdAt: Date;
}

interface Investment {
    status: string;
    amount: import("@prisma/client/runtime/library").Decimal;
}

interface UserData {
    fullName: string;
    balance: import("@prisma/client/runtime/library").Decimal;
    totalEarned: import("@prisma/client/runtime/library").Decimal;
    investments: Investment[];
    transactions: Transaction[];
}


export default async function DashboardPage() {
    const data = await getDashboardData();

    if (data.error || !data.user) {
        return redirect("/login");
    }

    const { user } = data;

    // Calculate active deposits
    const activeDeposits = user.investments
        .filter((inv: Investment) => inv.status === 'ACTIVE')
        .reduce((acc: number, inv: Investment) => acc + Number(inv.amount), 0);

    return (
        <div className="animate-fade-in-up">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-2xl font-black">Welcome back, {user.fullName}</h1>
                    <p className="text-gray-500 text-sm">Vantix Protocol is currently monitoring <span className="text-emerald-500">24 active markets</span>.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/deposit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-600/20">Quick Deposit</Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[24px] p-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Balance</p>
                    <h3 className="text-3xl font-black">${Number(user.balance).toFixed(2)}</h3>
                    <p className="text-[10px] text-emerald-500 mt-2">▲ 0.0% from yesterday</p>
                </div>
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[24px] p-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Active Deposits</p>
                    <h3 className="text-3xl font-black">${activeDeposits.toFixed(2)}</h3>
                    <p className="text-[10px] text-blue-400 mt-2">Monitoring {user.investments.filter((i: Investment) => i.status === 'ACTIVE').length} plans</p>
                </div>
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[24px] p-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Earned</p>
                    <h3 className="text-3xl font-black text-emerald-400">${Number(user.totalEarned).toFixed(2)}</h3>
                    <p className="text-[10px] text-gray-500 mt-2">Total withdrawal value</p>
                </div>
            </div>

            {/* Investment Protocols */}
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Available Investment Protocols</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {data.plans?.map((plan: any) => (
                    <Link
                        key={plan.id}
                        href={`/dashboard/invest/${plan.id}`}
                        className={`bg-[#020617] border p-5 rounded-2xl relative overflow-hidden group hover:border-blue-500 transition cursor-pointer flex flex-col justify-between ${plan.name === 'VIP ALPHA' ? 'border-blue-500/50' : 'border-[#1E293B]'}`}
                    >
                        {plan.name === 'VIP ALPHA' && (
                            <div className="absolute -top-2 -right-2 bg-blue-600 text-[8px] font-bold px-4 py-2 rotate-12">HOT</div>
                        )}
                        <div>
                            <h4 className={`text-xs font-bold uppercase mb-2 ${plan.name === 'STARTER' ? 'text-blue-500' :
                                plan.name === 'VIP ALPHA' ? 'text-emerald-400' :
                                    plan.name === 'PREMIUM' ? 'text-purple-400' :
                                        'text-blue-300'
                                }`}>{plan.name}</h4>
                            <div className="text-2xl font-black mb-1">
                                {(Number(plan.roiPercent) / plan.cycleHours).toFixed(0)}% <span className="text-xs text-gray-500">/hr</span>
                            </div>
                            <p className="text-[10px] text-gray-500">{plan.cycleHours} Hour Cycle</p>
                        </div>
                        <div className={`mt-4 w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition text-center ${plan.name === 'VIP ALPHA' ? 'bg-blue-600 text-white' : 'bg-[#1E293B] group-hover:bg-blue-600 text-white'}`}>
                            Activate
                        </div>
                    </Link>
                ))}
            </div>

            {/* Protocol History */}
            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] overflow-hidden">
                <div className="p-6 border-b border-[#1E293B] flex justify-between items-center">
                    <h3 className="font-bold">Protocol History</h3>
                    <Link href="/dashboard/transactions" className="text-xs text-blue-500 font-bold uppercase hover:text-white transition">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#00000033] text-gray-500 uppercase text-[10px] font-bold tracking-widest">
                            <tr>
                                <th className="p-6">Type</th>
                                <th className="p-6">Amount</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]">
                            {user.transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500">No active transaction history found. Start by making a deposit.</td>
                                </tr>
                            ) : (
                                user.transactions.map((tx: Transaction) => (
                                    <tr key={tx.id} className="hover:bg-white/5">
                                        <td className="p-6">
                                            <div className="font-bold uppercase text-[10px] tracking-widest text-blue-400 mb-1">{tx.type}</div>
                                            <div className="text-xs text-white font-medium">
                                                {tx.gateway === 'PLATFORM_INVESTMENT' ? `Investment in ${tx.walletAddress}` :
                                                    tx.gateway === 'INVESTMENT_RETURN' ? `Return from ${tx.walletAddress}` :
                                                        tx.gateway === 'DEPOSIT' ? 'Wallet Funding' :
                                                            tx.gateway || 'Platform Transaction'}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`font-black ${tx.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {tx.type === 'DEPOSIT' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${tx.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-500' :
                                                tx.status === 'REJECTED' ? 'bg-red-500/20 text-red-500' :
                                                    'bg-yellow-500/20 text-yellow-500'
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
