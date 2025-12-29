import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PageHero = ({ title, subtitle, backgroundImage }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={ref} className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center bg-coffee-dark mb-16">

            {/* Background Layer */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="w-full h-[120%] bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-coffee-cream/90" />
            {/* Note: The 'to' color matches the page background (coffee-cream) to blend seamlessly */}

            {/* Content Layer */}
            <motion.div
                style={{ y: yText }}
                className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-serif text-coffee-cream mb-4"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-coffee-gold text-lg md:text-xl font-sans tracking-widest uppercase"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default PageHero;
