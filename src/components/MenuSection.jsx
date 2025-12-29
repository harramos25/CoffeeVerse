import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Local Assets
import catEspresso from '../assets/images/menu-cat-espresso.png';
import catSignature from '../assets/images/menu-cat-signature.png';
import catManual from '../assets/images/menu-cat-manual.png';

import itemSakura from '../assets/images/menu-item-sakura.png';
import itemGold from '../assets/images/menu-item-gold.png';
import itemV60 from '../assets/images/menu-item-v60.png';

// Fallback logic: 
// Specific items use their specific images. 
// Generic items use the Category image as a "Mood".

const menuData = [
    {
        id: 'espresso',
        label: 'Espresso Bar',
        image: catEspresso,
        items: [
            { name: "Doppio", price: "$3.50", desc: "Double shot of our signature Tokyo blend.", img: catEspresso },
            { name: "Macchiato", price: "$4.00", desc: "Espresso marked with a dollop of velvet foam.", img: catEspresso },
            { name: "Cortado", price: "$4.50", desc: "Equal parts espresso and steamed milk. The perfect balance.", img: catEspresso },
            { name: "Flat White", price: "$5.00", desc: "Microfoam poured over ristretto. Silky smooth.", img: catEspresso },
        ]
    },
    {
        id: 'signature',
        label: 'Signatures',
        image: catSignature,
        items: [
            { name: "Sakura Latte", price: "$6.50", desc: "Cherry blossom syrup, rose petals, oat milk.", img: itemSakura },
            { name: "Gold Leaf Mocha", price: "$8.00", desc: "Dark chocolate, 24k gold dust, Dubai spice blend.", img: itemGold },
            { name: "Rosemary Cold Brew", price: "$6.00", desc: "Infused with fresh rosemary sprigs for 12 hours.", img: catSignature },
            { name: "Smoked Maple", price: "$7.00", desc: "Hickory smoke, organic maple syrup, cinnamon stick.", img: catSignature },
        ]
    },
    {
        id: 'manual',
        label: 'Pour Over',
        image: catManual,
        items: [
            { name: "V60 Hand Drip", price: "$6.00", desc: "Clean, delicate, highlights floral notes.", img: itemV60 },
            { name: "Chemex", price: "$7.00", desc: "Rich body, perfect for sharing (2 cups).", img: catManual },
            { name: "Aeropress", price: "$5.50", desc: "Full immersion, low acidity, heavy body.", img: catManual },
        ]
    }
];

// Variants for the Cube Rotation
const cubeVariants = {
    enter: (direction) => ({
        rotateY: direction > 0 ? 90 : -90,
        opacity: 0,
        scale: 0.8
    }),
    center: {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "circOut"
        }
    },
    exit: (direction) => ({
        rotateY: direction < 0 ? 90 : -90,
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.6,
            ease: "circIn"
        }
    })
};

const MenuSection = () => {
    const [activeCategory, setActiveCategory] = useState(menuData[0].id);
    const [hoveredItem, setHoveredItem] = useState(null);

    // Helper to get current category data
    const currentCategory = menuData.find(c => c.id === activeCategory);

    // Determine which image to show (Hovered item OR Category default)
    const activeImage = hoveredItem ? hoveredItem.img : currentCategory.image;

    return (
        <section className="relative bg-[#FAF7F2] py-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] font-bold text-xs md:text-sm mb-4 font-sans">
                        Crafted for the Senses
                    </h4>
                    <h2 className="text-5xl md:text-6xl text-[#3A2C27] font-serif tracking-tighter">
                        The Menu.
                    </h2>
                </div>

                {/* --- TABS --- */}
                <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-[#3A2C27]/10 pb-4">
                    {menuData.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`text-lg md:text-xl font-serif transition-all duration-300 pb-2 relative font-serif ${activeCategory === cat.id
                                ? 'text-[#3A2C27]'
                                : 'text-[#3A2C27]/40 hover:text-[#3A2C27]/70'
                                }`}
                        >
                            {cat.label}
                            {activeCategory === cat.id && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C8A46A]"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* --- SPLIT LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* LEFT: THE MENU LIST */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            key={activeCategory} // Triggers animation on tab switch
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-10"
                        >
                            {currentCategory.items.map((item, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setHoveredItem(item)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className="group cursor-pointer"
                                >
                                    <div className="flex justify-between items-baseline mb-2 relative">
                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl text-[#3A2C27] font-serif group-hover:text-[#C8A46A] transition-colors duration-300">
                                            {item.name}
                                        </h3>

                                        {/* Dotted Leader Line (The "Bistro" touch) */}
                                        <div className="flex-grow mx-4 border-b border-dotted border-[#3A2C27]/30 group-hover:border-[#C8A46A]/50 relative top-[-6px]"></div>

                                        {/* Price */}
                                        <span className="text-xl font-light text-[#3A2C27] font-sans">
                                            {item.price}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[#3A2C27]/60 font-sans font-light text-sm md:text-base max-w-md group-hover:text-[#3A2C27]/80 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT: THE VISUAL STAGE (Sticky + 3D Cube) */}
                    <div className="hidden lg:block lg:col-span-5 relative h-[600px] perspective-1000">
                        <div className="sticky top-24 w-full h-[500px] relative" style={{ transformStyle: "preserve-3d" }}>

                            <AnimatePresence mode="popLayout" custom={1}>
                                <motion.div
                                    key={activeImage} // Triggers animation on change
                                    custom={1}
                                    variants={cubeVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-0 w-full h-full rounded-sm shadow-2xl overflow-hidden origin-left bg-[#3A2C27]"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <img
                                        src={activeImage}
                                        alt="Menu Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-[#3A2C27]/10 mix-blend-multiply"></div>

                                    {/* Glass Label Floating on top */}
                                    <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3">
                                        <p className="text-[#FAF7F2] font-serif italic text-lg opacity-90">
                                            {hoveredItem ? hoveredItem.name : currentCategory.label}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MenuSection;
