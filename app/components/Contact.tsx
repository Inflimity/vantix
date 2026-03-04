"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/actions/contact";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
    });
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);

        startTransition(() => {
            submitContactForm(formData)
                .then((data) => {
                    if (data.error) {
                        setResult({ type: "error", text: data.error });
                    }
                    if (data.success) {
                        setResult({ type: "success", text: data.success });
                        setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
                    }
                })
                .catch(() => setResult({ type: "error", text: "Something went wrong" }));
        });
    };

    return (
        <section id="support" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                <div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">Get in <span className="text-blue-500">Touch.</span></h2>
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md">
                        Have questions about your Bitfoniz portfolio? Our institutional support team is available 24/7 to assist with technical or financial queries.
                    </p>

                    <div className="space-y-6">
                        <a href="mailto:support@bitfoniz.com" className="flex items-center gap-6 p-6 bg-[#0F172A] border border-gray-800 rounded-[30px] hover:border-blue-500/50 transition group">
                            <div className="w-14 h-14 bg-blue-900/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition">✉️</div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Email Support</div>
                                <div className="text-white font-bold">support@bitfoniz.com</div>
                            </div>
                        </a>

                        <a href="#" className="flex items-center gap-6 p-6 bg-[#0F172A] border border-gray-800 rounded-[30px] hover:border-blue-500/50 transition group">
                            <div className="w-14 h-14 bg-blue-900/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition">✈️</div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Official Telegram</div>
                                <div className="text-white font-bold">@Bitfoniz_Official</div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="bg-[#0F172A] p-8 md:p-10 rounded-[50px] border border-gray-800 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={isPending}
                                    className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition disabled:opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isPending}
                                    className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                disabled={isPending}
                                className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition appearance-none disabled:opacity-50"
                            >
                                <option>General Inquiry</option>
                                <option>Deposit/Withdrawal Issue</option>
                                <option>Technical Support</option>
                                <option>Partnership</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                            <textarea
                                rows={4}
                                name="message"
                                placeholder="How can we help you?"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={isPending}
                                className="w-full bg-[#020617] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition resize-none disabled:opacity-50"
                            ></textarea>
                        </div>

                        {result && (
                            <div className={`p-4 rounded-xl text-sm font-bold text-center ${result.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                                {result.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
                        >
                            {isPending ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}
