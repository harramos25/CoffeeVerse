import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroBg from '../assets/images/hero-abstract.png';

const HomeHero = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // --- SCROLL ANIMATIONS ---
    // The text splits apart as you scroll
    const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // The background zooms in slightly
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    // The center content fades out
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <>
            {/* The Hero Container */}
            <div ref={containerRef} className="relative h-[150vh] bg-[#0a0a0a]">

                {/* STICKY SECTION: This stays pinned while you scroll the first 100vh */}
                <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">

                    {/* A. DYNAMIC BACKGROUND (Video/Image) */}
                    <motion.div
                        style={{ scale }}
                        className="absolute inset-0 z-0"
                    >
                        {/* Ideally, use a <video> tag here with 'loop muted autoplay' for maximum effect */}
                        {/* For now, we use your liquid gold image */}
                        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Dark Overlay */}
                        <img
                            src={heroBg}
                            alt="Liquid Coffee Texture"
                            className="w-full h-full object-cover opacity-80"
                        />
                    </motion.div>

                    {/* B. THE SPLIT TYPOGRAPHY (The "Gate") */}
                    <div className="relative z-20 w-full flex justify-center items-center mix-blend-overlay">

                        {/* "COFFEE" moves Left */}
                        <motion.h1
                            style={{ x: xLeft, marginRight: '-0.05em' }} // Fine-tune kerning if needed
                            className="text-[12vw] md:text-[15vw] leading-none font-serif font-bold text-[#FAF7F2] tracking-tighter text-right"
                        >
                            COFFEE
                        </motion.h1>

                        {/* "VERSE" moves Right */}
                        <motion.h1
                            style={{ x: xRight, marginLeft: '-0.05em' }}
                            className="text-[12vw] md:text-[15vw] leading-none font-serif font-bold text-[#FAF7F2] tracking-tighter text-left"
                        >
                            VERSE
                        </motion.h1>
                    </div>

                    {/* C. FLOATING CENTER CONTENT (Fades out on scroll) */}
                    <motion.div
                        style={{ opacity }}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
                    >
                        {/* A small spinning badge or logo in the center */}
                        <div className="w-[1px] h-[100px] bg-gradient-to-b from-transparent via-[#C8A46A] to-transparent mb-8"></div>

                        <p className="text-[#FAF7F2] font-sans text-xs md:text-sm uppercase tracking-[0.5em] mb-4">
                            Est. 2025 • Tokyo • Dubai
                        </p>

                        {/* Interactive "Shop" Button that enables pointer events */}
                        <div className="pointer-events-auto mt-8">
                            <button className="group relative px-8 py-4 bg-transparent border border-[#FAF7F2]/30 overflow-hidden">
                                <span className="relative z-10 text-[#FAF7F2] text-xs font-bold uppercase tracking-widest group-hover:text-[#3A2C27] transition-colors duration-500">
                                    Enter The Shop
                                </span>
                                <div className="absolute inset-0 bg-[#C8A46A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]"></div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        style={{ opacity }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-10 z-30 text-[#FAF7F2]/50 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                        <ArrowDown size={16} />
                    </motion.div>

                </div>
            </div>

            {/* NOTE: This empty div simulates the content BELOW the hero.
         When you scroll, the text splits, and you "fall" into this section.
         Replace this with your <FeaturedProducts /> or <OurStory /> components.
      */}

        </>
    );
};

export default HomeHero;
