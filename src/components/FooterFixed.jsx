import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Twitter, Facebook } from 'lucide-react';

const FooterFixed = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#0a0a0a] pt-32 pb-6 overflow-hidden border-t border-[#C8A46A]/20">

            {/* 1. BACKGROUND AMBIENT GLOW */}
            {/* This adds a subtle golden light source from the bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] bg-[#C8A46A] opacity-[0.03] blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- TOP ROW: Newsletter & Links --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">

                    {/* A. NEWSLETTER (Left Side) */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold mb-6">
                                Inner Circle
                            </h4>
                            <h3 className="text-3xl md:text-4xl font-serif text-[#FAF7F2] mb-8 leading-tight">
                                Unlock exclusive roasts, early access events, and brewing guides.
                            </h3>
                        </div>

                        <form className="relative group w-full border-b border-[#FAF7F2]/20 pb-2">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full bg-transparent text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none py-4 text-lg font-serif"
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#C8A46A] uppercase text-xs font-bold tracking-widest hover:text-[#FAF7F2] transition-colors"
                            >
                                Join
                            </button>
                        </form>
                    </div>

                    {/* B. LINKS (Right Side - Structured with Lines) */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 border-l border-[#FAF7F2]/10 pl-0 lg:pl-12">

                        {/* Column 1 */}
                        <div className="space-y-6">
                            <h4 className="text-[#FAF7F2]/40 uppercase tracking-[0.2em] text-[10px] font-bold">Menu</h4>
                            <ul className="space-y-3">
                                {['Shop Coffee', 'Wholesale', 'Subscriptions', 'Equipment'].map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-[#FAF7F2] hover:text-[#C8A46A] font-sans text-sm transition-colors duration-300 block">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                            <h4 className="text-[#FAF7F2]/40 uppercase tracking-[0.2em] text-[10px] font-bold">Company</h4>
                            <ul className="space-y-3">
                                {['Our Story', 'Locations', 'Careers', 'Contact'].map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-[#FAF7F2] hover:text-[#C8A46A] font-sans text-sm transition-colors duration-300 block">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3 (Social) */}
                        <div className="space-y-6">
                            <h4 className="text-[#FAF7F2]/40 uppercase tracking-[0.2em] text-[10px] font-bold">Follow</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2] hover:border-[#C8A46A] hover:text-[#C8A46A] transition-all">
                                    <Instagram size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2] hover:border-[#C8A46A] hover:text-[#C8A46A] transition-all">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2] hover:border-[#C8A46A] hover:text-[#C8A46A] transition-all">
                                    <Facebook size={18} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- MIDDLE ROW: Copyright & Back to Top --- */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#FAF7F2]/10 pt-8 mb-20">
                    <p className="text-[#FAF7F2]/30 text-[10px] uppercase tracking-widest mb-4 md:mb-0">
                        © 2025 CoffeeVerse Inc. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-[#C8A46A] hover:text-[#FAF7F2] transition-colors group cursor-pointer"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to Top</span>
                        <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                </div>

            </div>

            {/* --- BOTTOM ROW: THE MASSIVE GOLD SIGNATURE --- */}
            {/* This replaces the video mask with a reliable Gold Gradient Text */}
            <div className="w-full overflow-hidden flex justify-center items-end opacity-90 select-none pointer-events-none leading-none">
                <h1 className="text-[16vw] font-serif font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#C8A46A] to-[#0a0a0a] pb-4">
                    COFFEEVERSE
                </h1>
            </div>

        </footer>
    );
};

export default FooterFixed;
