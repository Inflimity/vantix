import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import InvestForm from "./InvestForm";

export default async function InvestPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.id) return redirect("/login");

    const plan = await db.investmentPlan.findUnique({
        where: { id }
    });

    if (!plan) return redirect("/dashboard");

    const user = await db.user.findUnique({
        where: { id: session.user.id }
    });

    return (
        <div className="animate-fade-in-up max-w-2xl mx-auto">
            <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter">Activate Protocol</h1>
            <p className="text-gray-500 text-sm mb-10 uppercase font-bold tracking-widest">Selected Strategy: <span className="text-blue-500">{plan.name}</span></p>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="grid grid-cols-2 gap-4 mb-10 pb-10 border-b border-gray-800">
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">ROI Yield</p>
                            <h3 className="text-2xl font-black text-emerald-400">+{Number(plan.roiPercent)}%</h3>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Cycle Duration</p>
                            <h3 className="text-2xl font-black text-white">{plan.cycleHours} Hours</h3>
                        </div>
                    </div>

                    <InvestForm
                        plan={{
                            ...plan,
                            roiPercent: Number(plan.roiPercent),
                            minDeposit: Number(plan.minDeposit),
                            maxDeposit: Number(plan.maxDeposit)
                        }}
                        userBalance={Number(user?.balance || 0)}
                    />
                </div>
            </div>
        </div>
    );
}
