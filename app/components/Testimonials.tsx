"use client";
import { useState, useEffect } from "react";

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const total = 10;

    const testimonials = [
        { name: "Michael S.", quote: "I moved my entire portfolio here after the rebrand. The interface is just so calming to use daily." },
        { name: "Sarah J.", quote: "Finally, a crypto app that doesnt look like a video game. It feels like a private bank." },
        { name: "David K.", quote: "The multi-sig feature gives me peace of mind. Crypto Fortress is literally unshakeable." },
        { name: "Elena R.", quote: "Customer support is incredible. I had a login issue at 3 AM and a human helped me in minutes." },
        { name: "Marcus T.", quote: "Smooth transitions and zero lag. This is how financial software should be built." },
        { name: "Jessica W.", quote: "I love the new look. It makes checking my investments a joyful experience instead of a stressful one." },
        { name: "Brian L.", quote: "Institutional grade security but with a very friendly UI. Best decision I made this year." },
        { name: "Amina P.", quote: "The transparency here is unmatched. I can see exactly where my yields are coming from." },
        { name: "Chris H.", quote: "Perfect for long-term holders. Set it, forget it, and know its safe in the Fortress." },
        { name: "Linda M.", quote: "I started with $100 and the onboarding was so smooth. Highly recommend to everyone." }
    ];

    const next = () => {
        // Check window width for responsive step
        const step = window.innerWidth >= 768 ? 2 : 1;
        if (current < total - step) {
            setCurrent(current + 1);
        } else {
            setCurrent(0);
        }
    };

    const prev = () => {
        const step = window.innerWidth >= 768 ? 2 : 1;
        if (current > 0) {
            setCurrent(current - 1);
        } else {
            setCurrent(total - step);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 4000);
        return () => clearInterval(interval);
    }, [current, total]);

    return (
        <section id="testimonials" className="py-20 overflow-hidden relative group">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Community Voices</h2>
                <p className="text-gray-400 font-medium italic serif">"Real people, real growth, real security."</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 overflow-hidden relative">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${current * 50}%)` }} // approximated based on md screen logic, might need adjustment for mobile
                >
                    {testimonials.map((t, i) => (
                        <div key={i} className="w-full md:w-1/2 flex-shrink-0 px-3">
                            <div className="bg-[#0F172A] border border-gray-800 p-8 rounded-[30px] h-full shadow-lg transition">
                                <div className="text-emerald-400 mb-4 text-sm tracking-widest">⭐⭐⭐⭐⭐</div>
                                <p className="text-gray-300 text-sm italic mb-4">&quot;Best investment platform I have ever used. The daily returns are consistent and withdrawals are instant.&quot;</p>
                                <div className="font-bold text-white">{t.name}</div>
                                <div className="text-xs text-blue-500 font-bold uppercase tracking-wider mt-1">Verified Investor</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-12">
                <button onClick={prev} className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition">←</button>
                <button onClick={next} className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition">→</button>
            </div>
        </section>
    );
}
