import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* 1. BACKDROP (Click to close) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* 2. THE DRAWER */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }} // Luxury "Spring" feel
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#FAF7F2] shadow-2xl z-50 flex flex-col border-l border-[#3A2C27]/10"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-center p-8 border-b border-[#3A2C27]/10">
                            <h2 className="text-2xl font-serif text-[#3A2C27]">Your Selection</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-[#3A2C27]/5 rounded-full transition-colors"
                            >
                                <X className="text-[#3A2C27]" size={24} />
                            </button>
                        </div>

                        {/* Cart Items (Scrollable) */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {cart.length === 0 ? (
                                <div className="text-center mt-20 opacity-50">
                                    <p className="font-serif text-xl mb-4">Your bag is empty.</p>
                                    <p className="text-sm uppercase tracking-widest">Time to explore.</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-4"
                                    >
                                        {/* Item Image */}
                                        <div className="w-20 h-24 bg-[#E8D9C4] flex-shrink-0">
                                            <img src={item.image1} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-serif text-[#3A2C27] text-lg leading-tight">{item.name}</h3>
                                                    <p className="font-sans font-medium text-[#3A2C27]">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="text-xs uppercase tracking-widest text-[#3A2C27]/50 mt-1">{item.category}</p>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center border border-[#3A2C27]/20">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-[#3A2C27]/5">
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-[#3A2C27]/5">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-[#3A2C27]/40 hover:text-red-500 transition-colors text-xs underline decoration-dotted"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {cart.length > 0 && (
                            <div className="p-8 border-t border-[#3A2C27]/10 bg-white/50 backdrop-blur-md">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-xs uppercase tracking-widest text-[#3A2C27]/60">Subtotal</span>
                                    <span className="text-3xl font-serif text-[#3A2C27]">${cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-[#3A2C27]/40 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
                                <button className="w-full py-4 bg-[#3A2C27] text-[#C8A46A] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4 hover:bg-[#C8A46A] hover:text-[#3A2C27] transition-all duration-300">
                                    Checkout <ArrowRight size={18} />
                                </button>
                            </div>
                        )}

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
