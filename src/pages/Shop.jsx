import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ShoppingBag, Star, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Local Assets (Luxury)
import prodTokyo from '../assets/images/prod-tokyo.png';
import prodParis from '../assets/images/prod-paris.png';
import prodDubai from '../assets/images/prod-dubai.png';
import prodV60 from '../assets/images/prod-equipment-v60.png';

// Fallback Unsplash for items I couldn't generate due to quota
const imgScale = "https://images.unsplash.com/photo-1521302080334-4be083238561?q=80&w=1887&auto=format&fit=crop";
const imgCups = "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=2074&auto=format&fit=crop";
const imgYirg = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop";
const imgCol = "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?q=80&w=1887&auto=format&fit=crop";

// --- MOCK DATA: EXPANDED PRODUCT LIST ---
const allProducts = [
    // BLENDS
    {
        id: 1,
        name: "Tokyo 'Sakura' Blend",
        category: "Signature Blends",
        price: 28.00,
        image1: prodTokyo, // Bag Shot
        image2: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1887&auto=format&fit=crop", // Lifestyle
        tag: "Best Seller"
    },
    {
        id: 2,
        name: "Parisian Roast",
        category: "Signature Blends",
        price: 24.50,
        image1: prodParis,
        image2: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop",
        tag: "New"
    },
    {
        id: 3,
        name: "Dubai Gold Reserve",
        category: "Signature Blends",
        price: 45.00,
        image1: prodDubai,
        image2: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1887&auto=format&fit=crop",
        tag: "Limited Edition"
    },
    // SINGLE ORIGINS
    {
        id: 4,
        name: "Ethiopia Yirgacheffe",
        category: "Single Origin",
        price: 32.00,
        image1: imgYirg,
        image2: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
        tag: null
    },
    {
        id: 5,
        name: "Colombia Supremo",
        category: "Single Origin",
        price: 26.00,
        image1: imgCol,
        image2: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
        tag: null
    },
    // EQUIPMENT
    {
        id: 6,
        name: "Minimalist V60 Set",
        category: "Equipment",
        price: 85.00,
        image1: prodV60, // GENERATED ASSET
        image2: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
        tag: "Essential"
    },
    {
        id: 7,
        name: "Precision Gold Scale",
        category: "Equipment",
        price: 120.00,
        image1: imgScale,
        image2: "https://images.unsplash.com/photo-1461023058943-48db09b9ac19?q=80&w=2070&auto=format&fit=crop",
        tag: null
    },
    {
        id: 8,
        name: "Ceramic Tasting Cups",
        category: "Equipment",
        price: 40.00,
        image1: imgCups,
        image2: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=2074&auto=format&fit=crop",
        tag: "Set of 2"
    }
];

const categories = ["All", "Signature Blends", "Single Origin", "Equipment"];

// --- SHOP CARD COMPONENT (3D LEVITATION) ---
const ShopCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative w-full h-[450px] cursor-pointer" // Slightly shorter than 500px to fit grid better
            style={{ perspective: 1000 }}
        >
            <div
                className="w-full h-full relative bg-transparent"
                style={{ transformStyle: "preserve-3d" }}
            >

                {/* 1. The Shadow (Stays on ground) */}
                <motion.div
                    variants={{
                        rest: { opacity: 0.2, scale: 0.8, filter: "blur(10px)" },
                        hover: { opacity: 0.1, scale: 0.6, filter: "blur(20px)" }
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-10 bg-[#3A2C27] rounded-full z-0"
                />

                {/* 2. The Product Image (Levitates Z-Axis) */}
                <motion.div
                    variants={{
                        rest: { y: 0, rotateZ: 0, z: 0 },
                        hover: { y: -30, rotateZ: 2, z: 50 } // Moves UP and TOWARDS user
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="absolute inset-0 top-[-40px] z-20 flex items-center justify-center pointer-events-none"
                >
                    <img
                        src={product.image1}
                        alt={product.name}
                        className="w-3/4 h-auto object-contain drop-shadow-2xl"
                    />
                </motion.div>

                {/* 3. The "Backdrop" Card */}
                <motion.div
                    variants={{
                        rest: { scale: 1, opacity: 0 },
                        hover: { scale: 0.95, opacity: 1 }
                    }}
                    className="absolute inset-0 bg-[#E8D9C4]/20 rounded-xl z-10 border border-[#C8A46A]/20 backdrop-blur-sm"
                />

                {/* 4. Text Info (Floating) */}
                <motion.div
                    variants={{
                        rest: { opacity: 0, y: 20 },
                        hover: { opacity: 1, y: 0 }
                    }}
                    className="absolute bottom-6 left-0 w-full text-center z-30"
                    style={{ transform: "translateZ(60px)" }}
                >
                    <h3 className="text-[#3A2C27] font-serif text-xl mb-1">{product.name}</h3>
                    <p className="text-[#C8A46A] font-bold mb-3">${product.price.toFixed(2)}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="text-xs uppercase tracking-widest border-b border-[#3A2C27] pb-1 text-[#3A2C27] hover:text-[#C8A46A] hover:border-[#C8A46A] transition-colors"
                    >
                        Add to Cart
                    </button>
                </motion.div>

                {/* Default View (When not hovering, show simple label) */}
                <motion.div
                    variants={{
                        rest: { opacity: 1 },
                        hover: { opacity: 0 }
                    }}
                    className="absolute bottom-10 left-0 w-full text-center z-20 pointer-events-none"
                    transition={{ duration: 0.2 }}
                >
                    <p className="text-[#3A2C27]/60 text-sm font-serif">{product.name}</p>
                </motion.div>

            </div>
        </motion.div>
    );
};

// --- MAIN SHOP PAGE COMPONENT ---
const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = selectedCategory === "All"
        ? allProducts
        : allProducts.filter(p => p.category === selectedCategory);

    return (
        <div className="bg-[#FAF7F2] min-h-screen">

            {/* 1. MOODY HEADER (Short & Sleek) */}
            <div className="relative h-[40vh] bg-[#3A2C27] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    {/* Use your Abstract Smoke/Liquid AI Image here */}
                    <img
                        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Header BG"
                    />
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl text-[#FAF7F2] font-serif tracking-tighter mb-4">The Collection</h1>
                    <p className="text-[#C8A46A] uppercase tracking-[0.3em] text-xs">Small Batch • Hand Roasted • Ethical</p>
                </div>
            </div>

            {/* 2. FILTER BAR (Sticky) */}
            <div className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#3A2C27]/5 py-6 mb-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Categories */}
                    <div className="flex gap-8 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-sm uppercase tracking-widest whitespace-nowrap transition-colors duration-300 font-sans ${selectedCategory === cat
                                    ? 'text-[#3A2C27] font-bold border-b-2 border-[#C8A46A] pb-1'
                                    : 'text-[#3A2C27]/40 hover:text-[#3A2C27]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search/Sort (Visual only for now) */}
                    <div className="flex items-center gap-4 text-[#3A2C27]/40">
                        <Search size={20} className="hover:text-[#3A2C27] cursor-pointer" />
                        <Filter size={20} className="hover:text-[#3A2C27] cursor-pointer" />
                    </div>

                </div>
            </div>

            {/* 3. PRODUCT GRID */}
            <div className="max-w-7xl mx-auto px-6 pb-32">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
                >
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ShopCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State Check */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-[#3A2C27]/50">
                        <p>No products found in this category.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Shop;
