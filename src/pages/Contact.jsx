import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight, Send } from 'lucide-react';

// --- MAGNETIC BUTTON COMPONENT ---
// This button physically pulls towards the mouse cursor
const MagneticButton = ({ children, onClick }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for the "snap back" effect
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Move the button slightly towards the mouse (divide by 2 for resistance)
        x.set(distanceX / 2);
        y.set(distanceY / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative group w-full py-5 bg-[#3A2C27] text-[#C8A46A] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4 overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>

            {/* Hover Fill Effect */}
            <motion.div
                className="absolute inset-0 bg-[#C8A46A] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            />

            {/* Change text color on hover */}
            <span className="absolute z-10 inset-0 flex items-center justify-center gap-2 text-[#3A2C27] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {children}
            </span>
        </motion.button>
    );
};

// --- MAIN CONTACT PAGE ---
const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [focusedField, setFocusedField] = useState(null);

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex flex-col lg:flex-row">

            {/* 1. LEFT SIDE: THE VISUAL & INFO (Fixed on Desktop) */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative overflow-hidden bg-[#3A2C27]">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-60">
                    {/* AI Prompt: "Dark moody office desk, vintage telephone, espresso cup, letter, cinematic lighting" */}
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Concierge Desk"
                    />
                </div>

                {/* Glass Info Card */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs font-bold mb-6">Concierge</h4>
                        <h1 className="text-5xl md:text-6xl text-[#FAF7F2] font-serif mb-8">Get in Touch</h1>

                        <div className="space-y-6 text-[#FAF7F2]/80 font-sans font-light">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-[#C8A46A] mt-1" size={20} />
                                <div>
                                    <p className="block text-white">Global HQ</p>
                                    <p className="text-sm opacity-60">1-23-4 Nakameguro, Tokyo, JP</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="text-[#C8A46A] mt-1" size={20} />
                                <div>
                                    <p className="block text-white">Inquiries</p>
                                    <p className="text-sm opacity-60">concierge@coffeeverse.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="text-[#C8A46A] mt-1" size={20} />
                                <div>
                                    <p className="block text-white">Direct Line</p>
                                    <p className="text-sm opacity-60">+81 3-1234-5678</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 2. RIGHT SIDE: THE INTERACTIVE FORM */}
            <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-screen flex items-center justify-center p-8 md:p-16 lg:p-24 bg-[#FAF7F2]">
                <div className="w-full max-w-lg">

                    <h3 className="text-3xl text-[#3A2C27] font-serif mb-2">Send a Message</h3>
                    <p className="text-[#3A2C27]/50 mb-12 text-sm">We typically respond within 24 hours.</p>

                    <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>

                        {/* NAME INPUT */}
                        <div className="relative group">
                            <input
                                type="text"
                                className="w-full bg-transparent border-b border-[#3A2C27]/20 py-4 text-[#3A2C27] focus:outline-none focus:border-[#C8A46A] transition-colors peer placeholder-transparent"
                                placeholder="Name"
                                id="name"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-0 top-4 text-[#3A2C27]/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C8A46A] pointer-events-none"
                            >
                                Your Name
                            </label>
                        </div>

                        {/* EMAIL INPUT */}
                        <div className="relative group">
                            <input
                                type="email"
                                className="w-full bg-transparent border-b border-[#3A2C27]/20 py-4 text-[#3A2C27] focus:outline-none focus:border-[#C8A46A] transition-colors peer placeholder-transparent"
                                placeholder="Email"
                                id="email"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-0 top-4 text-[#3A2C27]/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C8A46A] pointer-events-none"
                            >
                                Email Address
                            </label>
                        </div>

                        {/* MESSAGE INPUT */}
                        <div className="relative group">
                            <textarea
                                rows="4"
                                className="w-full bg-transparent border-b border-[#3A2C27]/20 py-4 text-[#3A2C27] focus:outline-none focus:border-[#C8A46A] transition-colors peer placeholder-transparent resize-none"
                                placeholder="Message"
                                id="message"
                            />
                            <label
                                htmlFor="message"
                                className="absolute left-0 top-4 text-[#3A2C27]/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C8A46A] pointer-events-none"
                            >
                                How can we help?
                            </label>
                        </div>

                        {/* THE MAGNETIC BUTTON */}
                        <div className="pt-8">
                            <MagneticButton onClick={() => alert("Message Sent!")}>
                                SEND MESSAGE <Send size={16} />
                            </MagneticButton>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default Contact;
