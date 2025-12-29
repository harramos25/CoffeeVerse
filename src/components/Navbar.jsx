import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = (props) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine text color based on route and scroll state
    const getTextColor = () => {
        if (isScrolled) return 'text-coffee-cream'; // Always light on scrolled dark header

        switch (location.pathname) {
            case '/about': // Our Story (Light BG)
                return 'text-coffee-dark';
            case '/contact': // Contact (Split BG: Dark on Mobile/Left, Light on Desktop/Right)
                return 'text-coffee-cream md:text-coffee-dark';
            default: // Home, Menu, Shop (Dark Hero BG)
                return 'text-coffee-cream';
        }
    };

    const textColorClass = getTextColor();
    // For Contact page, Logo needs to be special (Gold/Light always) vs Links
    // But generic helper works for Links/Icons mostly. 
    // Logo is explicitly coffee-gold, which works on Dark (Contact Left). 
    // On Light pages, Gold is also visible enough.

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Shop', path: '/shop' },
        { name: 'Events', path: '/events' },
        { name: 'Our Story', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-coffee-dark/95 backdrop-blur-md py-4 border-b border-coffee-cream/10'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="font-serif text-2xl font-bold text-coffee-gold tracking-widest">
                    COFFEEVERSE
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => `
                                        text-sm uppercase tracking-widest font-sans font-medium hover:text-coffee-gold transition-colors
                                        ${isActive ? 'text-coffee-gold' : textColorClass}
                                    `}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-6">
                    <button className={`${textColorClass} hover:text-coffee-gold transition-colors`}>
                        <Search size={20} />
                    </button>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className={`relative ${textColorClass} hover:text-coffee-gold transition-colors`}
                    >
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 bg-coffee-gold text-coffee-dark text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-coffee-cream hover:text-coffee-gold transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-coffee-dark border-t border-coffee-cream/10 overflow-hidden"
                    >
                        <ul className="flex flex-col items-center gap-6 py-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-coffee-cream text-lg uppercase tracking-widest font-sans hover:text-coffee-gold transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
