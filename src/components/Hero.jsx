import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import heroBg from '../assets/images/hero-abstract.png';

// --- 1. The Steam Animation Component ---
const CoffeeSteam = () => {
    const steamVariants = {
        hidden: { opacity: 0, y: 0 },
        visible: (i) => ({
            opacity: [0, 0.4, 0],
            y: -60,
            pathLength: [0, 1, 0],
            transition: {
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
                delay: i * 0.8 // Stagger the steam lines
            }
        })
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 mt-[-20px]">
            <svg width="100" height="200" viewBox="0 0 100 200" className="opacity-60 mix-blend-screen">
                {[0, 1, 2].map((i) => (
                    <motion.path
                        key={i}
                        d="M50 160 Q 30 130 50 100 T 50 40" // Wavy path
                        fill="transparent"
                        stroke="#FAF7F2"
                        strokeWidth="4"
                        custom={i}
                        variants={steamVariants}
                        initial="hidden"
                        animate="visible"
                    />
                ))}
            </svg>
        </div>
    );
};

// --- 2. The Main Hero Component (Mouse Parallax) ---
const Hero = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Different layers move at different speeds (Parallax)
    const layer1X = useTransform(x, [-0.5, 0.5], ["-20px", "20px"]); // Background (Slow)
    const layer1Y = useTransform(y, [-0.5, 0.5], ["-20px", "20px"]);

    const layer2X = useTransform(x, [-0.5, 0.5], ["-40px", "40px"]); // Text (Medium)
    const layer2Y = useTransform(y, [-0.5, 0.5], ["-40px", "40px"]);

    const layer3X = useTransform(x, [-0.5, 0.5], ["-80px", "80px"]); // Foreground Objects (Fast)
    const layer3Y = useTransform(y, [-0.5, 0.5], ["-80px", "80px"]);

    const handleMouseMove = (e) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Normalize mouse position -0.5 to 0.5
        x.set((e.clientX / width) - 0.5);
        y.set((e.clientY / height) - 0.5);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-coffee-dark"
        >

            {/* LAYER 1: Deep Background (Moves slightly) */}
            <motion.div
                style={{ x: layer1X, y: layer1Y, scale: 1.1 }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="w-full h-full bg-cover bg-center opacity-60"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
            </motion.div>

            {/* LAYER 2: The Main Typography (Moves medium speed) */}
            <motion.div
                style={{ x: layer2X, y: layer2Y }}
                className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="block text-coffee-gold text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-sans font-bold mix-blend-screen">
                        Established 2025 • Tokyo • Dubai
                    </span>

                    {/* Massive Title */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl text-coffee-cream font-serif leading-[0.85] tracking-tighter mb-6 mix-blend-overlay opacity-90">
                        COFFEE<br />
                        VERSE
                    </h1>
                </motion.div>

                {/* Buttons Layered in */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12"
                >
                    <button className="px-8 py-4 bg-[#C8A46A] text-[#3A2C27] font-bold tracking-widest hover:bg-[#FAF7F2] transition-colors duration-300 min-w-[180px] text-xs uppercase font-sans">
                        SHOP COFFEE
                    </button>
                    <button className="px-8 py-4 border border-[#FAF7F2]/30 text-[#FAF7F2] tracking-widest hover:bg-[#FAF7F2] hover:text-[#3A2C27] backdrop-blur-sm transition-all duration-300 min-w-[180px] text-xs uppercase font-sans">
                        OUR STORY
                    </button>
                </motion.div>
            </motion.div>

            {/* LAYER 3: Foreground Elements (Moves fast - creates depth) */}
            <motion.div
                style={{ x: layer3X, y: layer3Y }}
                className="absolute inset-0 z-20 pointer-events-none"
            >
                <CoffeeSteam />
            </motion.div>

            {/* DARK GRADIENT OVERLAY (Static) */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-[#3A2C27]/80 pointer-events-none" />

        </div>
    );
};

export default Hero;
