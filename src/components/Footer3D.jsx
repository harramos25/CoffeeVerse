import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUp, Instagram, Twitter, Facebook } from 'lucide-react';

// --- MAGNETIC BUTTON COMPONENT (Re-using for footer links) ---
const MagneticLink = ({ children, href }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3); // Pull factor
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={href}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="block w-fit text-[#FAF7F2]/60 hover:text-[#C8A46A] transition-colors duration-300 py-1"
        >
            {children}
        </motion.a>
    );
};

// --- THE MAIN FOOTER ---
const Footer3D = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });

    // Parallax for the video text (It moves slightly opposite to scroll)
    const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        // 'clip-path' ensures the footer doesn't overlap content above it visually
        <footer ref={container} className="relative bg-[#0a0a0a] pt-32 pb-10 overflow-hidden">

            {/* 1. BACKGROUND GLOW (Subtle gold ambient light) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[#C8A46A] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-20">

                {/* --- TOP CONTENT ROW --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">

                    {/* NEWSLETTER (Left - Spans 5 cols) */}
                    <div className="lg:col-span-5">
                        <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold mb-8">
                            Join the Inner Circle
                        </h4>
                        <h3 className="text-3xl md:text-4xl font-serif text-[#FAF7F2] mb-8 leading-tight">
                            Unlock exclusive roasts, early access events, and brewing guides.
                        </h3>

                        <form className="relative group max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent border-b border-[#FAF7F2]/20 py-4 text-[#FAF7F2] placeholder-[#FAF7F2]/20 focus:outline-none focus:border-[#C8A46A] transition-colors font-sans font-light"
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-4 text-[#C8A46A] uppercase text-xs font-bold tracking-widest opacity-0 group-focus-within:opacity-100 -translate-x-4 group-focus-within:translate-x-0 transition-all duration-500"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-2"></div>

                    {/* LINKS (Right - Spans 5 cols) */}
                    <div className="lg:col-span-5 flex justify-between gap-8">

                        {/* Column 1 */}
                        <div className="space-y-6">
                            <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold">Shop</h4>
                            <div className="space-y-2 font-sans text-sm">
                                <MagneticLink href="#">Signature Blends</MagneticLink>
                                <MagneticLink href="#">Single Origin</MagneticLink>
                                <MagneticLink href="#">Equipment</MagneticLink>
                                <MagneticLink href="#">Subscriptions</MagneticLink>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                            <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold">Brand</h4>
                            <div className="space-y-2 font-sans text-sm">
                                <MagneticLink href="#">Our Story</MagneticLink>
                                <MagneticLink href="#">Locations</MagneticLink>
                                <MagneticLink href="#">Careers</MagneticLink>
                                <MagneticLink href="#">Contact</MagneticLink>
                            </div>
                        </div>

                        {/* Column 3 (Socials) */}
                        <div className="space-y-6">
                            <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold">Social</h4>
                            <div className="flex gap-4 text-[#FAF7F2]/60">
                                <a href="#" className="hover:text-[#C8A46A] transition-colors"><Instagram size={20} /></a>
                                <a href="#" className="hover:text-[#C8A46A] transition-colors"><Twitter size={20} /></a>
                                <a href="#" className="hover:text-[#C8A46A] transition-colors"><Facebook size={20} /></a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- BOTTOM ROW (Back to top) --- */}
                <div className="flex justify-between items-end border-t border-[#FAF7F2]/10 pt-10 mb-20">
                    <div className="text-[#FAF7F2]/40 text-xs uppercase tracking-widest flex flex-col sm:flex-row sm:items-center gap-2">
                        <span>© 2025 CoffeeVerse. All rights reserved.</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="text-[#C8A46A] font-bold">Designed & Developed by RAHRA DEV TECH</span>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex flex-col items-center gap-2 text-[#C8A46A] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                    >
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-3 border border-[#C8A46A]/30 rounded-full group-hover:bg-[#C8A46A] group-hover:text-[#0a0a0a] group-hover:border-[#C8A46A] transition-all duration-500"
                        >
                            <ArrowUp size={20} />
                        </motion.div>
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Back to Top</span>
                    </button>
                </div>

            </div>

            {/* 2. THE CINEMATIC VIDEO TEXT MASK (CLOSE GATE ANIMATION) */}
            <div className="relative w-full overflow-hidden flex justify-center items-end select-none pointer-events-none pb-0 leading-[0.75]">

                {/* 
                    Logic: 
                    1. Video Layer (Bottom) 
                    2. Mask Layer (Top - mix-blend-multiply)
                       - Background: Black (Turns video black)
                       - Text: White (Reveals video)
                 */}

                {/* VIDEO LAYER - Pinned to bottom center */}
                <div className="absolute inset-0 z-0 flex items-end justify-center">
                    <video
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover opacity-80"
                    >
                        <source src="https://cdn.coverr.co/videos/coverr-coffee-beans-falling-into-espresso-5267/1080p.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* MASK LAYER - This controls the "Cutout" */}
                <div className="relative z-10 w-full h-full flex justify-center items-end bg-[#0a0a0a] mix-blend-multiply">
                    {/* "COFFEE" - Moves from Left to Center (Closing) */}
                    <motion.h1
                        style={{ x: useTransform(scrollYProgress, [0.5, 1], ["-20%", "0%"]), y }}
                        className="text-[18vw] font-serif font-bold text-white tracking-tighter"
                    >
                        COFFEE
                    </motion.h1>

                    {/* "VERSE" - Moves from Right to Center (Closing) */}
                    <motion.h1
                        style={{ x: useTransform(scrollYProgress, [0.5, 1], ["20%", "0%"]), y }}
                        className="text-[18vw] font-serif font-bold text-white tracking-tighter"
                    >
                        VERSE
                    </motion.h1>
                </div>

                {/* OPTIONAL: OUTLINES (Overlay on top to keep legibility) */}
                <div className="absolute inset-0 z-20 w-full h-full flex justify-center items-end mix-blend-overlay opacity-30">
                    <motion.h1
                        style={{ x: useTransform(scrollYProgress, [0.5, 1], ["-20%", "0%"]), y }}
                        className="text-[18vw] font-serif font-bold text-transparent tracking-tighter"
                    >
                        <span style={{ WebkitTextStroke: '2px #C8A46A' }}>COFFEE</span>
                    </motion.h1>
                    <motion.h1
                        style={{ x: useTransform(scrollYProgress, [0.5, 1], ["20%", "0%"]), y }}
                        className="text-[18vw] font-serif font-bold text-transparent tracking-tighter"
                    >
                        <span style={{ WebkitTextStroke: '2px #C8A46A' }}>VERSE</span>
                    </motion.h1>
                </div>

            </div>

            {/* Simpler Alternative Implementation for the "Liquid Gold Text" if the above video mask is tricky:
          Just use the text with a background-image gif of gold liquid. 
      */}
            <style>{`
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>

        </footer>
    );
};

export default Footer3D;
