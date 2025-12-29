import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });

    // Parallax effect for the massive logo (moves slower than scroll)
    const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer ref={container} className="relative bg-[#3A2C27] text-[#FAF7F2] pt-32 pb-10 overflow-hidden">

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none noise-overlay"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* TOP SECTION: CTA & Links */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-32">

                    {/* 1. Newsletter (The Editorial Style) */}
                    <div className="w-full lg:w-1/3">
                        <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold mb-8">
                            Join the Inner Circle
                        </h4>
                        <h3 className="text-3xl font-serif mb-8 leading-tight">
                            Unlock exclusive roasts, early access events, and brewing guides.
                        </h3>

                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent border-b border-[#FAF7F2]/20 py-4 text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C8A46A] transition-colors"
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-4 text-[#C8A46A] uppercase text-xs font-bold tracking-widest opacity-0 group-focus-within:opacity-100 -translate-x-4 group-focus-within:translate-x-0 transition-all duration-500"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* 2. Navigation Columns */}
                    <div className="flex gap-16 md:gap-32">

                        {/* Shop Column */}
                        <div className="space-y-6">
                            <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold">Shop</h4>
                            <ul className="space-y-4 font-sans font-light text-sm text-[#FAF7F2]/70">
                                {['Signature Blends', 'Single Origin', 'Equipment', 'Subscriptions', 'Gift Cards'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-[#FAF7F2] transition-colors hover:translate-x-1 inline-block duration-300">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Brand Column */}
                        <div className="space-y-6">
                            <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold">Brand</h4>
                            <ul className="space-y-4 font-sans font-light text-sm text-[#FAF7F2]/70">
                                {['Our Story', 'Locations', 'Careers', 'Sustainability', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-[#FAF7F2] transition-colors hover:translate-x-1 inline-block duration-300">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Column */}
                        <div className="space-y-6">
                            <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold">Social</h4>
                            <div className="flex gap-6 text-[#FAF7F2]/70">
                                <a href="#" className="hover:text-[#C8A46A] transition-colors"><Instagram size={20} /></a>
                                <a href="#" className="hover:text-[#C8A46A] transition-colors"><Twitter size={20} /></a>
                                <a href="#" className="hover:text-[#C8A46A] transition-colors"><Facebook size={20} /></a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* MIDDLE SECTION: Back to Top */}
                <div className="flex justify-between items-end border-t border-[#FAF7F2]/10 pt-10 mb-10">
                    <div className="text-[#FAF7F2]/40 text-xs uppercase tracking-widest">
                        © 2025 CoffeeVerse. All rights reserved.
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex flex-col items-center gap-2 text-[#C8A46A] hover:text-[#FAF7F2] transition-colors"
                    >
                        <div className="p-3 border border-[#C8A46A]/30 rounded-full group-hover:bg-[#C8A46A] group-hover:text-[#3A2C27] group-hover:border-[#C8A46A] transition-all duration-500">
                            <ArrowUp size={20} />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to Top</span>
                    </button>
                </div>

            </div>

            {/* BOTTOM SECTION: The Massive Parallax Logo */}
            {/* This text is HUGE and moves slightly for that heavy, 3D feel */}
            <div className="w-full overflow-hidden flex justify-center items-end opacity-20 pointer-events-none select-none">
                <motion.h1
                    style={{ y }}
                    className="text-[15vw] leading-[0.8] font-serif font-bold text-[#FAF7F2] tracking-tighter text-center whitespace-nowrap"
                >
                    COFFEEVERSE
                </motion.h1>
            </div>

        </footer>
    );
};

export default Footer;
