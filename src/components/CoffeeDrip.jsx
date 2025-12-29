import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CoffeeDrip = () => {
    const { scrollYProgress } = useScroll();
    const height = useTransform(scrollYProgress, [0, 0.2], [0, 100]); // Drips down as you scroll

    return (
        <div className="fixed top-0 right-10 z-40 pointer-events-none hidden md:block">
            <motion.div
                style={{ height }}
                className="w-2 bg-espresso rounded-b-full shadow-lg opacity-80"
            />
            <motion.div
                style={{ top: height }}
                className="absolute w-4 h-4 bg-espresso rounded-full -left-1 opacity-80"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            />
        </div>
    );
};

export default CoffeeDrip;
