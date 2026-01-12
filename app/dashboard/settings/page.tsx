
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="animate-fade-in-up max-w-2xl">
            <h1 className="text-3xl font-black mb-8">Account Settings</h1>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8 space-y-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                            <input
                                type="text"
                                disabled
                                defaultValue={user.fullName || ""}
                                className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 text-gray-400 text-sm cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                            <input
                                type="email"
                                disabled
                                defaultValue={user.email || ""}
                                className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 text-gray-400 text-sm cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#1E293B]">
                    <h3 className="text-xl font-bold mb-4">Security</h3>
                    <button className="bg-[#1E293B] hover:bg-[#28354c] text-white px-6 py-3 rounded-xl font-bold text-sm transition">Change Password</button>
                </div>
            </div>
        </div>
    );
}
