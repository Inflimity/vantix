import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DepositForm from "./DepositForm";

export const dynamic = "force-dynamic";

export default async function DepositPage() {
    const session = await auth();

    if (!session?.user?.id) {
        return redirect("/login");
    }

    return <DepositForm />;
}
