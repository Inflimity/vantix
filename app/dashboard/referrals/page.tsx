import { getDashboardData } from "@/actions/getDashboardData";
import { redirect } from "next/navigation";
import ReferralsClient from "./ReferralsClient";

export default async function ReferralsPage() {
    const data = await getDashboardData();

    if (data.error || !data.user) {
        return redirect("/login");
    }

    const { user } = data;

    // Serialize user object to handle Prisma Decimals for the Client Component
    const serializedUser = JSON.parse(JSON.stringify(user));

    return <ReferralsClient user={serializedUser} />;
}
