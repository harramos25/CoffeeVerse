import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- DATA: The Chapters ---
// --- DATA: The Chapters ---
import imgTokyo from '../assets/images/loc-tokyo.png';
import imgParis from '../assets/images/loc-paris.png';
import imgDubai from '../assets/images/loc-dubai.png';

const chapters = [
    {
        id: 1,
        title: "The Vision",
        subtitle: "Tokyo • 2023",
        text: "It began in a quiet kissaten in Nakameguro. We realized that coffee wasn't just fuel; it was a ritual of silence and precision. We wanted to bring that reverence to the world.",
        image: imgTokyo,
        color: "#E8D9C4", // Latte Beige
        textColor: "#3A2C27"
    },
    {
        id: 2,
        title: "The Roast",
        subtitle: "Paris • 2024",
        text: "We traveled to Le Marais to study the old ways. Roasting in small batches, listening to the crack of the bean, ensuring that every note of fruit and smoke is preserved.",
        image: imgParis,
        color: "#3A2C27", // Espresso Brown
        textColor: "#FAF7F2"
    },
    {
        id: 3,
        title: "The Future",
        subtitle: "Dubai • 2025",
        text: "Finally, we looked forward. In the heart of Dubai, we fused tradition with opulence. Gold-leaf infusions, rare microlots, and a hospitality experience that rivals 7-star hotels.",
        image: imgDubai,
        color: "#C8A46A", // Gold
        textColor: "#3A2C27"
    }
];

// --- INDIVIDUAL 3D CARD COMPONENT ---
const StoryCard = ({ data, index, progress, range, targetScale }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    // 3D Transformations based on scroll position
    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, range, [1, 0.4]); // Dim previous cards
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]); // Slight parallax

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${index * 25}px)` }} // Stacking offset
                className="relative flex flex-col md:flex-row w-[90vw] md:w-[1000px] h-[70vh] rounded-3xl overflow-hidden shadow-2xl origin-top"
            >

                {/* LEFT SIDE: IMAGE */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                    <motion.div style={{ scale: 1.2, opacity }} className="w-full h-full">
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    {/* Grain Overlay */}
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay noise-overlay"></div>
                </div>

                {/* RIGHT SIDE: CONTENT */}
                <div
                    className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-center relative"
                    style={{ backgroundColor: data.color }}
                >
                    {/* Decorative Number */}
                    <span
                        className="absolute top-8 right-8 text-[10rem] font-serif opacity-10 leading-none select-none"
                        style={{ color: data.textColor }}
                    >
                        0{index + 1}
                    </span>

                    <motion.div style={{ y }} className="relative z-10">
                        <span
                            className="uppercase tracking-[0.3em] text-xs font-bold mb-4 block opacity-60"
                            style={{ color: data.textColor }}
                        >
                            {data.subtitle}
                        </span>
                        <h2
                            className="text-4xl md:text-6xl font-serif mb-8 leading-tight"
                            style={{ color: data.textColor }}
                        >
                            {data.title}
                        </h2>
                        <p
                            className="text-lg md:text-xl font-sans font-light leading-relaxed opacity-80"
                            style={{ color: data.textColor }}
                        >
                            {data.text}
                        </p>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
};

// --- MAIN STORY PAGE ---
const OurStory = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={container} className="bg-[#FAF7F2] relative">

            {/* 1. HERO SECTION (Intro) */}
            <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl md:text-9xl text-[#3A2C27] font-serif tracking-tighter mb-6"
                >
                    Our Journey
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-[#C8A46A] uppercase tracking-[0.3em] text-sm md:text-base"
                >
                    From the cherry to the cup
                </motion.p>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 text-[#3A2C27]/30 text-xs uppercase tracking-widest"
                >
                    Scroll to explore
                </motion.div>
            </div>

            {/* 2. THE STACKING CARDS */}
            <div className="mt-[-10vh] pb-[20vh]">
                {chapters.map((chapter, i) => {
                    // Calculate scale for 3D depth effect
                    // The further down the card, the smaller it gets initially
                    const targetScale = 1 - ((chapters.length - i) * 0.05);

                    return (
                        <StoryCard
                            key={chapter.id}
                            data={chapter}
                            index={i}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>

            {/* 3. FOOTER QUOTE */}
            <div className="h-[50vh] bg-[#3A2C27] flex items-center justify-center px-6 text-center relative z-20">
                <div className="max-w-4xl">
                    <p className="text-[#FAF7F2] font-serif text-3xl md:text-5xl italic leading-tight">
                        "We don't just source beans; we curate moments of silence, conversation, and luxury."
                    </p>
                    <div className="mt-16 opacity-60 transform -rotate-3 select-none">
                        <span className="font-cursive text-6xl md:text-8xl text-[#FAF7F2]">
                            The Founders
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OurStory;
