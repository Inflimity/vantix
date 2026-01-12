import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPlansPage() {
    const session = await auth();
    // @ts-expect-error - role on user
    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-black mb-10 uppercase tracking-tight">Protocol <span className="text-blue-500">Settings</span></h1>
            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-10 md:p-20 text-center text-gray-500 shadow-2xl">
                <div className="text-4xl mb-6">⚙️</div>
                <h3 className="text-white font-bold mb-2">Protocol Configuration</h3>
                <p className="text-sm max-w-xs mx-auto text-gray-400">Yield strategy parameters and global ROI configurations live in this terminal section.</p>
            </div>
        </div>
    );
}
