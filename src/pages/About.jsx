import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import cafeImg from '../assets/images/cafe-interior.png'; // Reusing for hero
import coffeeImage from '../assets/images/coffee-brewing.png';

const About = () => {
    return (
        <div className="min-h-screen bg-coffee-cream">
            <PageHero
                title="Our Story"
                subtitle="Passion • Craft • Heritage"
                backgroundImage={cafeImg}
            />

            <div className="container mx-auto px-6 pb-20">
                {/* Content Section 1 */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-3xl font-serif font-bold text-coffee-dark mb-6">Crafted with Passion</h2>
                        <p className="text-coffee-dark/80 font-sans leading-relaxed mb-6">
                            CoffeeVerse began with a simple yet ambitious vision: to transport our guests to a world where time slows down and every sip is a celebration.
                            Inspired by the minimal elegance of Tokyo cafes, the romance of Parisian brasseries, and the opulent hospitality of Dubai, we created a sanctuary for coffee lovers.
                        </p>
                        <p className="text-coffee-dark/80 font-sans leading-relaxed">
                            We source our beans directly from sustainable farms, roasting them in small batches to preserve their unique character. Our baristas are not just servers; they are artists dedicated to the perfect extraction.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:w-1/2"
                    >
                        <img
                            src={coffeeImage}
                            alt="Coffee brewing"
                            className="rounded-lg shadow-xl"
                        />
                    </motion.div>
                </div>

                {/* Values Section */}
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {[
                        { title: "Quality", text: "Never compromised. Only the top 1% of beans make it to your cup." },
                        { title: "Sustainability", text: "We believe in ethical sourcing and supporting our farmers." },
                        { title: "Community", text: "Coffee is better when shared. We are a place for connection." }
                    ].map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="p-8 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border-t-4 border-coffee-gold"
                        >
                            <h3 className="text-xl font-serif font-bold text-coffee-dark mb-4">{value.title}</h3>
                            <p className="text-coffee-dark/80 font-sans">{value.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
