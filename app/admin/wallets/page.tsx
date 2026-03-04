import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getWalletAddresses } from "@/actions/wallet";
import WalletManager from "./WalletManager";

export const dynamic = "force-dynamic";

export default async function AdminWalletsPage() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    const wallets = await getWalletAddresses();

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-black mb-10 uppercase tracking-tight">Deposit <span className="text-blue-500">Wallets</span></h1>
            <WalletManager wallets={wallets} />
        </div>
    );
}
