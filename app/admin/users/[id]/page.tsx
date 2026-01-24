import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import UserEditForm from "./UserEditForm";

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const session = await auth();
    // @ts-expect-error - role on user
    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    const { id } = await params;

    const user = await db.user.findUnique({
        where: { id }
    });

    if (!user) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-red-500">User Not Found</h2>
                <Link href="/admin/users" className="text-blue-500 mt-4 inline-block hover:underline">Back to User list</Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/users" className="bg-[#1E293B] p-3 rounded-xl hover:bg-[#2d3a4f] transition">
                    <span className="text-gray-400">←</span>
                </Link>
                <h1 className="text-3xl font-black uppercase tracking-tighter">Edit Investor Profile</h1>
            </div>

            <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[30px] p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-800">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black">
                        {user.fullName?.[0]}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{user.fullName}</h2>
                        <p className="text-xs text-blue-500 font-bold uppercase tracking-widest">{user.role}</p>
                    </div>
                </div>

                <UserEditForm user={{
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    balance: Number(user.balance)
                }} />
            </div>
        </div>
    );
}
