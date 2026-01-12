"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        startTransition(() => {
            register({
                email: formData.email,
                password: formData.password,
                fullName: `${formData.fname} ${formData.lname}`,
            })
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }
                    if (data.success) {
                        setSuccess(data.success);
                        setTimeout(() => {
                            router.push("/login"); // Redirect to login after success
                        }, 2000);
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 py-10 bg-[#020617] text-white font-jakarta">
            <div className="w-full max-w-[420px]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black tracking-tighter uppercase">
                        VANTIX<span className="text-blue-600">.</span>
                    </h1>
                    <div className="inline-block px-3 py-1 bg-blue-900/20 border border-blue-500/30 rounded-full mt-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">
                            New Investor Onboarding
                        </span>
                    </div>
                </div>

                <div className="bg-[#0F172A] border-2 border-[#1E293B] p-6 md:p-10 rounded-[30px] shadow-2xl">
                    <h2 className="text-xl font-bold mb-6 text-white">Create Portfolio</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="fname"
                                    placeholder="Musibau"
                                    className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-[14px] py-[10px] outline-none transition-all duration-200 focus:border-blue-500 focus:bg-[#0F172A] text-sm"
                                    required
                                    disabled={isPending}
                                    value={formData.fname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lname"
                                    placeholder="Samson"
                                    className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-[14px] py-[10px] outline-none transition-all duration-200 focus:border-blue-500 focus:bg-[#0F172A] text-sm"
                                    required
                                    disabled={isPending}
                                    value={formData.lname}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                                Email Identity
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="samson@vantix.com"
                                className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-[14px] py-[10px] outline-none transition-all duration-200 focus:border-blue-500 focus:bg-[#0F172A] text-sm"
                                required
                                disabled={isPending}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                                Security Key
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create Password"
                                className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-[14px] py-[10px] outline-none transition-all duration-200 focus:border-blue-500 focus:bg-[#0F172A] text-sm"
                                required
                                disabled={isPending}
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                                Verify Key
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full bg-[#020617] border-2 border-[#1E293B] rounded-xl text-white px-[14px] py-[10px] outline-none transition-all duration-200 focus:border-blue-500 focus:bg-[#0F172A] text-sm"
                                required
                                disabled={isPending}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-start gap-3 py-2">
                            <input
                                type="checkbox"
                                required
                                className="mt-1 w-4 h-4 accent-blue-600 bg-black border-gray-700"
                            />
                            <label className="text-[10px] text-gray-500 leading-tight">
                                I agree to the{" "}
                                <span className="text-white font-bold">
                                    Vantix Protocol Terms
                                </span>{" "}
                                and conditions.
                            </label>
                        </div>

                        {error && (
                            <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500">
                                <p>{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                                <p>{success}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl uppercase text-xs tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 disabled:opacity-50"
                        >
                            {isPending ? "Creating Portfolio..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                        <a href="/login" className="text-xs text-gray-500">Already a Partner? <span className="text-blue-500 font-bold hover:text-white transition">Login</span></a>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/"
                        className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-gray-400 transition"
                    >
                        ← Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
