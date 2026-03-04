import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getWalletAddresses } from "@/actions/wallet";
import DepositForm from "./DepositForm";

export const dynamic = "force-dynamic";

export default async function DepositPage() {
    const session = await auth();

    if (!session?.user?.id) {
        return redirect("/login");
    }

    const wallets = await getWalletAddresses();

    // Convert to the format DepositForm expects
    const walletMap: Record<string, string> = {};
    wallets.forEach((w: { currency: string; address: string }) => {
        walletMap[w.currency] = w.address;
    });

    return <DepositForm wallets={walletMap} />;
}
