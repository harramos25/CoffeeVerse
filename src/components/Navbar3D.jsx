import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// --- COMPONENT 1: 3D FLIP LINK (Router Aware & Animated) ---
// This rotates the text like a slot machine on hover
const FlipLink = ({ children, to }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            to={to}
            className="relative block overflow-hidden whitespace-nowrap text-sm font-bold uppercase tracking-widest h-5" // h-5 matches font size line-height
            style={{ lineHeight: 1.2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                initial="initial"
                animate={isHovered ? "hovered" : "initial"} // Controlled by state
                variants={{
                    initial: { y: 0 },
                    hovered: { y: "-100%" },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
            <motion.div
                className="absolute inset-0 text-[#C8A46A]" // Gold text reveals
                initial="initial"
                animate={isHovered ? "hovered" : "initial"} // Controlled by state
                variants={{
                    initial: { y: "100%" },
                    hovered: { y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </Link>
    );
};

// --- COMPONENT 2: MAGNETIC ICON ---
const MagneticIcon = ({ children, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.5); // Pull strength
        y.set((clientY - centerY) * 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="p-3 rounded-full hover:bg-[#FAF7F2]/10 transition-colors"
        >
            {children}
        </motion.button>
    );
};

// --- MAIN NAVBAR ---
const Navbar3D = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setIsCartOpen, cartCount } = useCart();

    // Route Mapping
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Shop', path: '/shop' },
        { name: 'Events', path: '/events' },
        { name: 'Our Story', path: '/about' },
    ];

    // Detect scroll to trigger the "Capsule" mode
    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    return (
        <>
            {/* --- DESKTOP NAV --- */}
            <motion.header
                // Animates from Full Width (Top) to Capsule (Scrolled)
                animate={{
                    width: isScrolled ? "90%" : "100%",
                    top: isScrolled ? 20 : 0,
                    backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.6)" : "transparent",
                    backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
                    border: isScrolled ? "1px solid rgba(200, 164, 106, 0.1)" : "1px solid transparent",
                    borderRadius: isScrolled ? "50px" : "0px",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-6 text-[#FAF7F2] max-w-[1400px]"
            >
                {/* 1. LOGO */}
                <div className="flex-1">
                    <Link to="/" className="text-xl font-serif font-bold tracking-tighter hover:text-[#C8A46A] transition-colors">
                        COFFEEVERSE
                    </Link>
                </div>

                {/* 2. LINKS (Hidden on Mobile) - Using 3D Flip */}
                <nav className="hidden md:flex gap-12 flex-1 justify-center">
                    {navItems.map((item) => (
                        <FlipLink key={item.name} to={item.path}>
                            {item.name}
                        </FlipLink>
                    ))}
                </nav>

                {/* 3. ICONS (Magnetic) */}
                <div className="flex-1 flex justify-end gap-2 items-center">
                    <MagneticIcon>
                        <Search size={20} />
                    </MagneticIcon>

                    <MagneticIcon onClick={() => setIsCartOpen(true)}>
                        <div className="relative">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C8A46A] rounded-full text-[8px] text-black flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </MagneticIcon>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden ml-4">
                        <MagneticIcon onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu size={24} />
                        </MagneticIcon>
                    </div>
                </div>
            </motion.header>

            {/* --- MOBILE MENU OVERLAY (3D Curtain) --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[60] bg-[#0a0a0a] flex flex-col justify-center items-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-8 text-[#FAF7F2] p-4 hover:rotate-90 transition-transform duration-500"
                        >
                            <X size={32} />
                        </button>

                        {/* Links */}
                        <nav className="flex flex-col gap-8 text-center">
                            {navItems.map((item, i) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                        className="text-5xl font-serif text-[#FAF7F2] hover:text-[#C8A46A] hover:italic transition-all"
                                    >
                                        {item.name}
                                    </motion.div>
                                </Link>
                            ))}
                        </nav>

                        <div className="absolute bottom-10 text-[#C8A46A] text-xs uppercase tracking-[0.4em]">
                            Tokyo • Paris • Dubai
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar3D;
