import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

// Images
import prodTokyo from '../assets/images/prod-tokyo.png';
import prodDubai from '../assets/images/prod-dubai.png';
import prodParis from '../assets/images/prod-paris.png';
import prodEthiopia from '../assets/images/product-bag.png';
import locTokyo from '../assets/images/loc-tokyo.png';
import locParis from '../assets/images/loc-paris.png';
import locDubai from '../assets/images/loc-dubai.png';
// import imgPour from '../assets/images/coffee-brewing.png'; // Unused in this version but keeping import avail if needed

// --- SHARED DATA ---
const products = [
    { id: 1, name: "Tokyo Sakura", price: "$28", image: prodTokyo, desc: "Floral & Delicate" },
    { id: 2, name: "Dubai Gold", price: "$45", image: prodDubai, desc: "Bold & Opulent" },
    { id: 3, name: "Paris Noir", price: "$24", image: prodParis, desc: "Smoky & Classic" },
    { id: 4, name: "Ethiopia Yirg", price: "$30", image: prodEthiopia, desc: "Bright Citrus" },
];

const locations = [
    { id: 'tokyo', city: 'TOKYO', img: locTokyo },
    { id: 'paris', city: 'PARIS', img: locParis },
    { id: 'dubai', city: 'DUBAI', img: locDubai }
];

// --- SECTION 1: EXTRACTION (Fixed: No White Box, Just Text in Void) ---
const ExtractionIntro = () => {
    return (
        // 1. CHANGED BACKGROUND: From white to deep black (#0a0a0a)
        // 2. ADDED SHADOW: To blend the transition if there's any gap
        <div className="relative z-30 bg-[#0a0a0a] pt-40 pb-20 px-6 flex flex-col items-center -mt-20 rounded-t-[3rem] shadow-[0_-50px_100px_rgba(0,0,0,1)]">

            {/* A. The "Drip" Line (Visual connection to the liquid hero) */}
            <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-[1px] bg-gradient-to-b from-transparent via-[#C8A46A] to-transparent mb-10 opacity-60"
            />

            <div className="text-center max-w-4xl mx-auto">
                {/* B. The Label (Gold & Spaced) */}
                <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.1em" }}
                    whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
                    transition={{ duration: 1 }}
                    className="text-[#C8A46A] text-xs font-bold uppercase mb-6"
                >
                    The Extraction Begins
                </motion.p>

                {/* C. The Headline (White Text on Black Background) */}
                <motion.h2
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="text-[#FAF7F2] text-5xl md:text-7xl font-serif font-medium leading-tight"
                >
                    We have opened the gate. <br />
                    <span className="text-[#FAF7F2]/50 text-2xl md:text-3xl font-sans font-light mt-6 block">
                        Scroll down to experience the origins.
                    </span>
                </motion.h2>
            </div>
        </div>
    );
};

// --- SECTION 2: THE FLOATING VOID (Unchanged - it was good) ---
const ProductShowcase = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#0a0a0a]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-20 left-10 z-0 select-none pointer-events-none">
                    <h2 className="text-[#C8A46A] opacity-[0.03] text-[15vw] font-serif leading-none">CURATED</h2>
                </div>
                <motion.div style={{ x }} className="flex gap-16 pl-[15vw] z-10 items-center">
                    {products.map((product) => (
                        <div key={product.id} className="group relative w-[350px] h-[550px] flex-shrink-0 perspective-1000">
                            <div className="w-full h-full bg-[#111] rounded-none p-8 flex flex-col items-center justify-between transition-all duration-500 relative overflow-hidden group-hover:bg-[#161616]">
                                <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-[#C8A46A] opacity-10 blur-[60px] group-hover:opacity-20 transition-opacity duration-700"></div>
                                <div className="relative h-[60%] w-full flex items-center justify-center z-10">
                                    <img src={product.image} alt={product.name} className="w-[85%] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3" />
                                </div>
                                <div className="text-center relative z-10 w-full">
                                    <h3 className="text-[#FAF7F2] text-2xl font-serif mb-1">{product.name}</h3>
                                    <p className="text-[#FAF7F2]/40 text-xs uppercase tracking-widest mb-6">{product.desc}</p>
                                    <button className="w-full py-3 border border-[#C8A46A]/30 text-[#C8A46A] text-[10px] uppercase tracking-[0.2em] hover:bg-[#C8A46A] hover:text-black transition-all">View</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-[300px] flex items-center justify-center flex-shrink-0">
                        <a href="/shop" className="group text-[#FAF7F2] text-4xl font-serif flex items-center gap-4 hover:text-[#C8A46A] transition-colors">
                            Full Menu <ArrowRight className="group-hover:translate-x-4 transition-transform" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- SUB-COMPONENT: ROTATING STAMP ---
const RotatingStamp = () => {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -left-12 md:-left-20 z-40 w-32 h-32 md:w-40 md:h-40 rounded-full border border-[#C8A46A]/20 flex items-center justify-center bg-[#0a0a0a]"
        >
            {/* SVG Text Path for circular text */}
            <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[11px] font-bold uppercase tracking-[0.2em] fill-[#C8A46A]">
                    <textPath href="#curve">
                        • Est. 2025 • Tokyo • Paris • Dubai
                    </textPath>
                </text>
            </svg>
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#C8A46A] rounded-full"></div>
            </div>
        </motion.div>
    );
};

// --- SECTION 3: THE STORY (Cinematic Upgrade) ---
const StoryTimeline = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    // PARALLAX PHYSICS
    const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const yForeground = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

    return (
        <section ref={container} className="relative py-40 bg-[#0a0a0a] overflow-hidden">

            {/* 1. ATMOSPHERE: Noise + Moving Dust Particles */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
            </div>

            {/* Floating Dust Mote 1 */}
            <motion.div
                animate={{ y: [0, -100, 0], x: [0, 50, 0], opacity: [0, 0.5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#C8A46A] rounded-full blur-[1px] z-10"
            />
            {/* Floating Dust Mote 2 */}
            <motion.div
                animate={{ y: [0, 100, 0], x: [0, -30, 0], opacity: [0, 0.3, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#FAF7F2] rounded-full blur-[2px] z-10"
            />

            <div className="max-w-7xl mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* 2. THE VISUALS */}
                <div className="lg:col-span-7 relative h-[600px] md:h-[800px] w-full">

                    {/* BACK LAYER */}
                    <div className="absolute inset-0 overflow-hidden rounded-sm border-l border-t border-[#FAF7F2]/10">
                        <motion.div style={{ y: yBackground }} className="w-full h-[120%] -mt-[10%]">
                            <div className="absolute inset-0 bg-black/40 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
                                alt="Coffee Origins"
                                className="w-full h-full object-cover grayscale opacity-60"
                            />
                        </motion.div>
                    </div>

                    {/* FRONT LAYER + STAMP */}
                    <motion.div
                        style={{ y: yForeground }}
                        className="absolute bottom-10 right-10 md:-right-10 w-[250px] md:w-[350px] aspect-[3/4] z-20 shadow-2xl"
                    >
                        {/* THE ROTATING GOLD SEAL (The "Perfect" Addition) */}
                        <RotatingStamp />

                        <div className="w-full h-full p-2 bg-[#0a0a0a] border border-[#C8A46A]/30 relative overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1887&auto=format&fit=crop"
                                alt="Espresso Detail"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </motion.div>

                </div>

                {/* 3. THE NARRATIVE */}
                <motion.div
                    style={{ y: yText }}
                    className="lg:col-span-5 relative z-30 lg:pl-12"
                >
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[1px] bg-[#C8A46A]"></div>
                            <span className="text-[#C8A46A] text-xs uppercase tracking-[0.3em] font-bold">The Philosophy</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl text-[#FAF7F2] font-serif leading-[0.9] mb-8">
                            Silence is <br /> an <span className="italic text-[#C8A46A] opacity-80">Ingredient.</span>
                        </h2>

                        <p className="text-[#FAF7F2]/60 text-lg leading-relaxed mb-10 font-sans font-light border-l border-[#C8A46A]/20 pl-6">
                            In a world of noise, we designed CoffeeVerse as a sanctuary. We traced the lineage of the bean from the Ethiopian highlands to the minimal concrete kissatens of Tokyo.
                        </p>

                        <button className="group flex items-center gap-4 text-[#FAF7F2] text-xs uppercase tracking-widest hover:text-[#C8A46A] transition-colors">
                            <span className="border-b border-transparent group-hover:border-[#C8A46A] pb-1 transition-all">
                                Read The Full Story
                            </span>
                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

// --- SECTION 4: THE PORTAL (Fixed: Full Color Images) ---
const PortalLocations = () => {
    return (
        <section className="bg-[#0a0a0a] py-40 px-6 relative z-30">
            <div className="max-w-7xl mx-auto text-center mb-20">
                <p className="text-[#C8A46A]/50 text-xs uppercase tracking-[0.4em]">Global Presence</p>
            </div>

            <div className="flex flex-col items-center gap-0 border-t border-[#FAF7F2]/5">
                {locations.map((loc) => (
                    <div key={loc.id} className="relative group w-full cursor-pointer border-b border-[#FAF7F2]/5 py-20 hover:bg-[#111] transition-colors duration-700">

                        {/* 1. MAIN CONTAINER: Changed to 'justify-center' so it affects TOKYO, PARIS, and DUBAI */}
                        <div className="flex justify-center items-center w-full relative z-20">

                            {/* 2. TEXT WRAPPER: Keeps the text centered and holds the arrow relative to it */}
                            <div className="relative flex items-center">

                                {/* CITY NAME */}
                                <h2 className="text-5xl md:text-8xl font-serif text-[#FAF7F2] transition-all duration-500 group-hover:text-transparent"
                                    style={{ WebkitTextStroke: '1px transparent' }}>
                                    {loc.city}
                                    <span className="absolute inset-0 text-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ WebkitTextStroke: '1px #C8A46A' }}>
                                        {loc.city}
                                    </span>
                                </h2>

                                {/* ARROW: Positioned absolutely to the right, so it doesn't push the text off-center */}
                                <div className="absolute left-full ml-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0">
                                    <ArrowRight className="text-[#C8A46A] w-8 h-8 md:w-12 md:h-12" />
                                </div>

                            </div>

                        </div>

                        {/* Background Hover Reveal */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
                            <img src={loc.img} className="w-full h-full object-cover" alt={loc.city} />
                        </div>

                    </div>

                ))}
            </div>
        </section >
    );
};

// --- MAIN WRAPPER ---
const HomeSections = () => {
    return (
        <div className="bg-[#0a0a0a] text-[#FAF7F2]">
            <ExtractionIntro />
            <ProductShowcase />
            <StoryTimeline />
            <PortalLocations />
        </div>
    );
};

export default HomeSections;
