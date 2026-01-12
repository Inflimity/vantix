import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import WithdrawForm from "./WithdrawForm";

export const dynamic = "force-dynamic";

export default async function WithdrawPage() {
    const session = await auth();
    if (!session?.user?.id) return redirect("/login");

    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { balance: true }
    });

    if (!user) return redirect("/login");

    return (
        <div className="animate-fade-in-up max-w-2xl mx-auto">
            <h1 className="text-3xl font-black mb-2">Withdraw Funds</h1>
            <p className="text-gray-500 mb-8">Request a payout to your external wallet.</p>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8">
                <WithdrawForm balance={Number(user.balance)} />
            </div>
        </div>
    );
}
