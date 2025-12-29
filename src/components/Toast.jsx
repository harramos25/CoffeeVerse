import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Toast = () => {
    const { notification } = useCart();

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    className="fixed bottom-10 left-1/2 z-50 bg-espresso text-milk px-6 py-3 rounded-full shadow-lg flex items-center gap-3"
                    style={{ transform: 'translateX(-50%)', minWidth: '300px' }}
                >
                    <CheckCircle size={20} color="var(--color-gold)" />
                    <span className="font-medium text-sm">{notification}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
