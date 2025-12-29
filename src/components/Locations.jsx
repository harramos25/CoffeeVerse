import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import locTokyo from '../assets/images/loc-tokyo.png';
import locParis from '../assets/images/loc-paris.png';
import locDubai from '../assets/images/loc-dubai.png';

const locations = [
    {
        id: 'tokyo',
        city: 'Tokyo',
        subtitle: 'The Minimalist Atelier',
        description: 'Located in the quiet backstreets of Nakameguro, our Tokyo flagship is a sanctuary of concrete and light wood. Here, silence is an ingredient.',
        address: '1-23-4 Nakameguro, Meguro City, Tokyo',
        hours: 'Daily: 8:00 AM – 6:00 PM',
        image: locTokyo
    },
    {
        id: 'paris',
        city: 'Paris',
        subtitle: 'The Historic Roastery',
        description: 'A converted 19th-century textile factory in Le Marais. Velvet seating, brass detailing, and the aroma of roasting beans filling the cobblestone streets.',
        address: '12 Rue de Bretagne, 75003 Paris',
        hours: 'Mon-Sat: 7:30 AM – 8:00 PM',
        image: locParis
    },
    {
        id: 'dubai',
        city: 'Dubai',
        subtitle: 'The Sky Lounge',
        description: 'Elevated luxury in Downtown Dubai. Featuring gold-leaf infusions and floor-to-ceiling views of the Burj Khalifa. Coffee meets opulence.',
        address: 'Sheikh Mohammed bin Rashid Blvd, Dubai',
        hours: 'Daily: 10:00 AM – 11:00 PM',
        image: locDubai
    }
];

const Locations = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="relative h-[800px] w-full overflow-hidden bg-[#3A2C27] flex items-center justify-center">

            <AnimatePresence mode="wait">
                <motion.div
                    key={locations[activeTab].id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={locations[activeTab].image}
                        alt={locations[activeTab].city}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3A2C27] via-[#3A2C27]/60 to-transparent"></div>
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] font-bold text-sm mb-4 font-sans">Visit Us</h4>

                        <div className="flex flex-col gap-4">
                            {locations.map((loc, index) => (
                                <button
                                    key={loc.id}
                                    onClick={() => setActiveTab(index)}
                                    className={`text-left text-5xl md:text-7xl font-serif transition-all duration-300 ${activeTab === index
                                        ? 'text-[#FAF7F2] translate-x-4'
                                        : 'text-[#FAF7F2]/30 hover:text-[#FAF7F2]/60'
                                        }`}
                                >
                                    {loc.city}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={locations[activeTab].id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="glass-panel p-10 md:p-14 text-[#FAF7F2]"
                        >
                            <h3 className="text-2xl text-[#C8A46A] font-serif mb-4 italic">
                                {locations[activeTab].subtitle}
                            </h3>

                            <p className="text-lg font-light leading-relaxed mb-8 text-[#FAF7F2]/90 font-sans">
                                {locations[activeTab].description}
                            </p>

                            <div className="space-y-6 border-t border-[#FAF7F2]/20 pt-8 font-sans">

                                <div className="flex items-start gap-4">
                                    <MapPin className="text-[#C8A46A] mt-1" size={24} />
                                    <div>
                                        <span className="block text-xs uppercase tracking-widest text-[#C8A46A] mb-1">Address</span>
                                        <p className="text-lg">{locations[activeTab].address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="text-[#C8A46A] mt-1" size={24} />
                                    <div>
                                        <span className="block text-xs uppercase tracking-widest text-[#C8A46A] mb-1">Opening Hours</span>
                                        <p className="text-lg">{locations[activeTab].hours}</p>
                                    </div>
                                </div>

                            </div>

                            <button className="mt-10 w-full py-4 bg-[#C8A46A] text-[#3A2C27] font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-[#FAF7F2] transition-colors font-sans uppercase">
                                GET DIRECTIONS
                                <ArrowUpRight size={18} />
                            </button>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default Locations;
