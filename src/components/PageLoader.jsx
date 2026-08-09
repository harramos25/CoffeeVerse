import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setLoading(true), 0);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); // Fake load time
        return () => {
            clearTimeout(startTimer);
            clearTimeout(timer);
        };
    }, [location]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-gold text-6xl"
                    >
                        ☕
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoader;
