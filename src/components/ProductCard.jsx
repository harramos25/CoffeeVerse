import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            className="product-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="relative overflow-hidden h-64">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    {/* Overlay actions could go here */}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-display">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-espresso text-white p-2 rounded-full hover:bg-gold transition-colors duration-300"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
