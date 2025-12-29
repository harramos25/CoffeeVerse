import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Simulate the loading count (0 to 100)
        const duration = 2000; // 2 seconds total load time
        const steps = 100;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, intervalTime);

        // Trigger the "Exit" callback after animation finishes
        const completeTimer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2500); // Slight delay after hitting 100%

        return () => {
            clearInterval(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none" }} // Fades out interactions
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-[#FAF7F2] overflow-hidden"
        >

            {/* 1. THE SPLIT CURTAIN (Reveals the site) */}
            {/* Top Half */}
            <motion.div
                initial={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="absolute top-0 left-0 w-full h-[50%] bg-[#0a0a0a] z-20 border-b border-[#C8A46A]/20"
            />
            {/* Bottom Half */}
            <motion.div
                initial={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="absolute bottom-0 left-0 w-full h-[50%] bg-[#0a0a0a] z-20 border-t border-[#C8A46A]/20"
            />

            {/* 2. THE CONTENT (Sits on top of the curtains) */}
            <div className="relative z-30 flex flex-col items-center">

                {/* The Brand Name (Subtle Pulse) */}
                <motion.h1
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-serif text-[#C8A46A] text-xl md:text-3xl tracking-[0.2em] uppercase mb-4"
                >
                    CoffeeVerse
                </motion.h1>

                {/* The "Digital Extraction" Counter */}
                <div className="relative">
                    <h2 className="text-6xl md:text-9xl font-sans font-light tracking-tighter tabular-nums text-[#FAF7F2]">
                        {count}%
                    </h2>

                    {/* The "Liquid Fill" Effect Overlay */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full overflow-hidden text-[#C8A46A]"
                        initial={{ height: "0%" }}
                        animate={{ height: `${count}%` }}
                    >
                        <h2 className="text-6xl md:text-9xl font-sans font-light tracking-tighter tabular-nums">
                            {count}%
                        </h2>
                    </motion.div>
                </div>

                {/* Progress Bar Line */}
                <div className="w-[200px] h-[1px] bg-[#FAF7F2]/10 mt-8 relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-[#C8A46A]"
                        initial={{ width: 0 }}
                        animate={{ width: `${count}%` }}
                    />
                </div>

                <p className="text-[#FAF7F2]/40 text-xs uppercase tracking-[0.3em] mt-4">
                    Extracting Essence
                </p>

            </div>

        </motion.div>
    );
};

export default Preloader;
