import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import storyBg from '../assets/images/loc-tokyo.png';
import detailImg from '../assets/images/loc-paris.png';

const OurStory = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section ref={sectionRef} className="relative py-32 bg-[#FAF7F2] overflow-hidden">

            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E8D9C4] opacity-20 -skew-x-12 translate-x-1/4 z-0"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

                <div className="flex flex-col md:grid md:grid-cols-12 items-center">

                    <div className="md:col-span-7 relative mb-20 md:mb-0 w-full">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true, margin: "-200px" }}
                            className="w-full md:w-5/6 h-[500px] md:h-[700px] relative overflow-hidden"
                        >
                            <img
                                src={storyBg}
                                alt="Coffee farm origin"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-[#3A2C27] opacity-20"></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 100, x: 50 }}
                            whileInView={{ opacity: 1, y: 0, x: 0 }}
                            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="absolute bottom-[-80px] right-4 md:right-[-40px] w-2/3 md:w-1/2 h-[300px] md:h-[400px] z-20 overflow-hidden shadow-2xl"
                        >
                            <div className="w-full h-full border-8 border-[#FAF7F2]">
                                <img
                                    src={detailImg}
                                    alt="Barista pouring"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="md:col-span-5 relative z-30 md:-ml-20 lg:-ml-32 mt-12 md:mt-0"
                    >
                        <div className="bg-[#FAF7F2]/80 backdrop-blur-lg p-8 md:p-12 shadow-lg border border-white/40">

                            <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] mb-6 font-bold text-sm font-sans">Our Philosophy</h4>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#3A2C27] font-serif leading-tight mb-8">
                                Bridging cultures through the <span className="italic text-[#C8A46A]">perfect pour.</span>
                            </h2>

                            <p className="text-[#3A2C27]/80 text-lg leading-relaxed mb-6 font-light font-sans">
                                CoffeeVerse began as a journey across three cities. We sought the meticulous precision of Tokyo, the historic café culture of Paris, and the opulent modernity of Dubai.
                            </p>

                            <p className="text-[#3A2C27]/80 text-lg leading-relaxed mb-10 font-light font-sans">
                                We don't just source beans; we curate experiences. Every blend tells the story of its origin and the craftsmanship behind its brew.
                            </p>

                            <button className="group flex items-center gap-4 text-[#3A2C27] font-bold tracking-widest uppercase text-sm hover:text-[#C8A46A] transition-colors font-sans">
                                Explore The Journey
                                <span className="p-2 bg-[#3A2C27] text-[#C8A46A] rounded-full group-hover:bg-[#C8A46A] group-hover:text-[#3A2C27] transition-all">
                                    <ArrowRight size={16} />
                                </span>
                            </button>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default OurStory;
