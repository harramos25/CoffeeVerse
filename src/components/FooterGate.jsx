import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, Instagram, Twitter, Facebook } from 'lucide-react';

const FooterGate = () => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });

    // --- GATE LOGIC (Refined) ---
    // Starts wide apart, slams shut at the bottom
    const xLeft = useTransform(scrollYProgress, [0.5, 1], ["-50%", "0%"]);
    const xRight = useTransform(scrollYProgress, [0.5, 1], ["50%", "0%"]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer ref={container} className="relative bg-[#0a0a0a] pt-32 pb-0 overflow-hidden border-t border-[#C8A46A]/20">

            <div className="max-w-7xl mx-auto px-6 relative z-20 pb-40">

                {/* --- CONTENT ROW --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">

                    {/* 1. NEWSLETTER (Left) */}
                    <div className="w-full lg:w-1/2">
                        <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold mb-6">
                            The Final Pour
                        </h4>
                        <h3 className="text-3xl md:text-5xl font-serif text-[#FAF7F2] mb-10 leading-tight">
                            Don't let the experience end here. <br /> Join the inner circle.
                        </h3>
                        <form className="relative group w-full max-w-md border-b border-[#FAF7F2]/20 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none py-4 text-lg font-serif"
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#C8A46A] uppercase text-xs font-bold tracking-widest hover:text-[#FAF7F2] transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* 2. LINKS (Right) */}
                    <div className="w-full lg:w-auto flex flex-wrap gap-16 lg:pr-20">
                        <div>
                            <h4 className="text-[#FAF7F2]/40 uppercase tracking-[0.2em] text-[10px] font-bold mb-6">Menu</h4>
                            <div className="flex flex-col gap-4 text-[#FAF7F2] text-sm font-sans">
                                <a href="#" className="hover:text-[#C8A46A] transition-colors">Shop</a>
                                <a href="#" className="hover:text-[#C8A46A] transition-colors">Locations</a>
                                <a href="#" className="hover:text-[#C8A46A] transition-colors">Events</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[#FAF7F2]/40 uppercase tracking-[0.2em] text-[10px] font-bold mb-6">Social</h4>
                            <div className="flex gap-4 text-[#FAF7F2]">
                                <a href="#" className="hover:text-[#C8A46A] transition-colors"><Instagram size={20} /></a>
                                <a href="#" className="hover:text-[#C8A46A] transition-colors"><Twitter size={20} /></a>
                                <a href="#" className="hover:text-[#C8A46A] transition-colors"><Facebook size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="flex justify-between items-center border-t border-[#FAF7F2]/10 pt-8">
                    <p className="text-[#FAF7F2]/30 text-[10px] uppercase tracking-widest">© 2025 CoffeeVerse.</p>
                    <button onClick={scrollToTop} className="flex items-center gap-2 text-[#C8A46A] hover:text-[#FAF7F2] transition-colors">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll to Top</span>
                        <ArrowUp size={16} />
                    </button>
                </div>

            </div>

            {/* --- THE CLOSING GATE (Fixed Gradient & Height) --- */}
            <div className="relative w-full overflow-hidden pointer-events-none select-none leading-[0.8]">
                <div className="flex justify-center w-full">

                    {/* LEFT GATE */}
                    <motion.h1
                        style={{ x: xLeft }}
                        className="text-[13.5vw] font-serif font-bold tracking-tighter text-right w-[50%] pr-1"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E8D9C4] via-[#C8A46A] to-[#5C4D3C]">
                            COFFEE
                        </span>
                    </motion.h1>

                    {/* RIGHT GATE */}
                    <motion.h1
                        style={{ x: xRight }}
                        className="text-[13.5vw] font-serif font-bold tracking-tighter text-left w-[50%] pl-1"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E8D9C4] via-[#C8A46A] to-[#5C4D3C]">
                            VERSE
                        </span>
                    </motion.h1>

                </div>
            </div>

        </footer>
    );
};

export default FooterGate;
