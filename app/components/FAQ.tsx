"use client";
import { useState } from "react";

export default function FAQ() {
    const [selected, setSelected] = useState<number | null>(null);

    const toggle = (i: number) => {
        setSelected(selected === i ? null : i);
    };

    const faqs = [
        {
            question: "What exactly is Vantix INC LTD?",
            answer: "Vantix INC LTD is a legally registered UK investment company. We utilize professional traders and high-frequency algorithms in Forex, Crypto Exchange, and Mining to generate consistent hourly profits for our members."
        },
        {
            question: "How do I open an account?",
            answer: "It is simple. Click the \"Get Started\" button, fill in your details, and you will be registered instantly. The process takes less than 2 minutes."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We operate strictly with cryptocurrencies for speed and security. We accept Bitcoin, Litecoin, Ethereum, Bitcoin Cash, Dash, and Dogecoin."
        },
        {
            question: "How long does it take for my deposit to show up?",
            answer: "Your deposit is added automatically as soon as it receives the necessary confirmations on the blockchain (usually 3 confirmations). This typically takes 10-30 minutes depending on network traffic."
        },
        {
            question: "What are the minimum and maximum deposit limits?",
            answer: "We believe in accessibility. You can start with as little as $1. The maximum deposit for a single transaction is $10,000, but you can make multiple deposits."
        },
        {
            question: "How fast are withdrawals processed?",
            answer: "Instant. Our system is automated. As soon as you request a withdrawal from your dashboard, the funds are sent to your wallet immediately."
        },
        {
            question: "Do you charge any fees for withdrawals?",
            answer: "No. We do not charge any fees for withdrawals. The amount you request is the exact amount you receive in your wallet."
        },
        {
            question: "Can I have multiple deposits running at the same time?",
            answer: "Yes. You can have as many active deposits as you like. Each deposit will have its own time cycle and interest calculation."
        },
        {
            question: "Do you have an affiliate program?",
            answer: "Yes. We offer a lucrative referral program. You can earn commissions by inviting friends and family, even if you do not have an active deposit yourself."
        },
        {
            question: "What if I forgot my password?",
            answer: "Click \"Forgot Password\" on the login page, enter your email, and follow the instructions. For security reasons, if you need to change your email address, you must contact our Support Team."
        }
    ];

    return (
        <section id="faq" className="py-20 max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Frequently Asked <span className="serif italic text-blue-500">Questions</span></h2>
                <p className="text-gray-400">Everything you need to know about investing with Vantix INC LTD.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-[#0F172A] border border-gray-800 rounded-3xl overflow-hidden transition hover:border-blue-500/50 h-fit">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full p-6 text-left font-bold flex justify-between items-center text-white hover:text-blue-400 transition select-none"
                        >
                            <span>{faq.question}</span>
                            <span className="text-2xl text-blue-500">{selected === index ? '−' : '+'}</span>
                        </button>
                        {selected === index && (
                            <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-gray-800/50 pt-4">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
