import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Using local images now
import prodTokyo from '../assets/images/prod-tokyo.png';
import prodParis from '../assets/images/prod-paris.png';
import prodDubai from '../assets/images/prod-dubai.png';
import prodEspresso from '../assets/images/prod-espresso.png';

const products = [
    {
        id: 1,
        name: "Tokyo 'Sakura' Blend",
        origin: "Ethiopia Yirgacheffe",
        price: "$28.00",
        image: prodTokyo,
        gridClass: "md:col-span-2",
    },
    {
        id: 2,
        name: "Parisian Roast",
        origin: "Guatemala Antigua",
        price: "$24.50",
        image: prodParis,
        gridClass: "md:row-span-2 h-full",
    },
    {
        id: 3,
        name: "Dubai Gold Reserve",
        origin: "Yemen Mocha",
        price: "$45.00",
        image: prodDubai,
        gridClass: "",
    },
    {
        id: 5,
        name: "Espresso Signature",
        origin: "Brazil Cerrado",
        price: "$22.00",
        image: prodEspresso,
        gridClass: "md:col-span-1",
    },
];

// --- THE LUXURY CARD COMPONENT ---
const ProductCard = ({ product }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse follower logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - 50); // -50 to center the 100px circle
        y.set(e.clientY - rect.top - 50);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            onMouseMove={handleMouseMove}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative group overflow-hidden rounded-none ${product.gridClass} h-[500px] cursor-none`}
        >
            {/* 1. The Image (Slow cinematic zoom) */}
            <motion.img
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }} // Cinematic ease curve
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
            />

            {/* 2. The "Curtain" Overlay (Darkens on hover for text readability) */}
            <motion.div
                animate={{ opacity: isHovered ? 0.6 : 0.3 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-t from-[#3A2C27] via-[#3A2C27]/40 to-transparent"
            ></motion.div>

            {/* 3. The Typography (Sitting ON TOP of the image) */}
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div>
                        <p className="text-[#C8A46A] text-xs tracking-[0.2em] uppercase mb-2 font-sans font-bold">
                            {product.origin}
                        </p>
                        <h3 className="text-3xl text-[#FAF7F2] font-serif leading-none mb-2">
                            {product.name}
                        </h3>
                    </div>
                    <p className="text-xl text-[#FAF7F2] font-sans font-light">{product.price}</p>
                </div>
                {/* Subtle line that appears */}
                <motion.div
                    animate={{ scaleX: isHovered ? 1 : 0, originX: 0 }}
                    transition={{ duration: 0.5 }}
                    className="h-[1px] w-full bg-[#C8A46A]/50 mt-4"
                />
            </div>

            {/* 4. The Mouse Follower "VIEW" Button */}
            <motion.div
                style={{ x: springX, y: springY }}
                animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                className="absolute top-0 left-0 z-30 pointer-events-none"
            >
                <div className="w-[100px] h-[100px] bg-[#C8A46A] rounded-full flex items-center justify-center text-[#3A2C27] font-bold tracking-widest text-sm">
                    VIEW <ArrowUpRight size={16} className="ml-1" />
                </div>
            </motion.div>

        </motion.div>
    );
};

// --- MAIN SECTION COMPONENT ---
const FeaturedProducts = () => {
    return (
        <section className="bg-[#FAF7F2] py-32 px-4 md:px-12 lg:px-24">

            {/* Header Section (Kept similar for consistency) */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 pb-8 border-b border-[#3A2C27]/10">
                <div>
                    <h4 className="text-[#C8A46A] uppercase tracking-[0.3em] mb-4 font-bold text-sm">Curated Selection</h4>
                    <h2 className="text-5xl md:text-7xl text-[#3A2C27] font-serif tracking-tighter">Featured Roasts.</h2>
                </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 auto-rows-fr">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </section>
    );
};

export default FeaturedProducts;
