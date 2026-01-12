"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
    const [active, setActive] = useState(0);
    const total = 6;

    // Hero Carousel Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % total);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Typing Effect Logic
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    const fullText1 = "Maximize your Wealth.";
    const fullText2 = "Earn 40% in profit.";

    useEffect(() => {
        let isCancelled = false;

        const typeText = async () => {
            if (isCancelled) return;
            setText1("");
            setText2("");
            setShowCursor(true);

            // Type line 1
            for (let i = 0; i <= fullText1.length; i++) {
                if (isCancelled) return;
                setText1(fullText1.substring(0, i));
                await new Promise((r) => setTimeout(r, 50));
            }

            // Type line 2
            for (let i = 0; i <= fullText2.length; i++) {
                if (isCancelled) return;
                setText2(fullText2.substring(0, i));
                await new Promise((r) => setTimeout(r, 50));
            }

            // Wait and reset
            await new Promise((r) => setTimeout(r, 3000));
            if (!isCancelled) {
                setShowCursor(false);
                // Recursion handled by dependency change or loop logic, 
                // generally simpler to just useEffect with specific trigger or internal loop
                // But here, let's just use strict internal recursion loop
                typeText();
            }
        };

        typeText();

        return () => { isCancelled = true; };
    }, []); // Empty dependency to run once on mount

    const phrases = [
        "Don't just store wealth. Multiply it.",
        "Volatility is noise. 40% is the signal.",
        "Sleep soundly while your assets work.",
        "We turned high yields into a science.",
        "Wealth is not luck. It is logic.",
        "Your capital deserves a promotion."
    ];

    return (
        <header className="relative w-full h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 z-10 bg-black/50"></div>
                {[
                    "/crypt6.jpg",
                    "/crypt1.jpg",
                    "/crypt4.jpg",
                    "/crypt2.jpg",
                    "/crypt3.jpg",
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=100&w=1600&auto=format&fit=crop"
                ].map((src, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${active === index ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={src}
                            className="w-full h-full object-cover object-center"
                            alt="Slide"
                        />
                    </div>
                ))}
            </div>

            <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-10 md:mt-0">
                <div className="inline-flex items-center gap-2 bg-[#0F172A] border border-blue-500/30 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-2 md:px-6 md:py-3 rounded-full mb-6 md:mb-8 shadow-xl">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Trusted by 50k+
                </div>

                <div className="min-h-[120px] md:min-h-[160px] flex items-center justify-center">
                    <h2 className={`text-3xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 md:mb-6 text-white drop-shadow-md transition-opacity duration-1000 ease-in-out`}>
                        <span>{text1}</span><br />
                        <span className="text-emerald-400 font-black italic text-2xl md:text-5xl">{text2}</span>
                        {showCursor && <span className="animate-pulse text-emerald-400 font-light">|</span>}
                    </h2>
                </div>

                <div className="h-[30px] md:h-[40px] mb-6 md:mb-8">
                    {phrases.map((phrase, index) => (
                        <p key={index}
                            className={`text-lg md:text-3xl font-bold text-gray-200 italic transition-all duration-500 absolute left-0 right-0 ${active === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                        >
                            {phrase}
                        </p>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 px-4">
                    <button className="bg-blue-600 text-white px-8 py-3 md:px-12 md:py-5 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-500 transition w-full sm:w-auto shadow-lg shadow-blue-900/40">
                        Start Earning 40%
                    </button>
                    <button className="bg-[#0F172A] border border-gray-600 text-white px-8 py-3 md:px-12 md:py-5 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-gray-800 transition w-full sm:w-auto">
                        View Proof
                    </button>
                </div>
            </div>

            <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center gap-2 md:gap-3 z-20">
                {Array.from({ length: total }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${active === i ? "bg-emerald-400 w-8 md:w-12" : "bg-gray-600 w-2 md:w-3"
                            }`}
                    ></button>
                ))}
            </div>
        </header>
    );
}
