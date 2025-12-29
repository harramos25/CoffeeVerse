import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

// --- MOCK DATA (With placeholders for your new AI images) ---
const events = [
    {
        id: 1,
        title: "Latte Art Workshop",
        category: "Masterclass",
        date: "OCT 15",
        time: "10:00 AM – 1:00 PM",
        location: "Main Hall, Tokyo",
        description: "Learn the secrets of pouring the perfect rosetta from our world-champion baristas. Milk texture physics and pouring ergonomics.",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1937&auto=format&fit=crop", // Placeholder
        price: "$150"
    },
    {
        id: 2,
        title: "Jazz & Java Night",
        category: "Social",
        date: "OCT 22",
        time: "7:00 PM – 10:00 PM",
        location: "The Lounge, Paris",
        description: "Enjoy a relaxing evening of live smooth jazz accompanied by our signature espresso martinis and late-night affogatos.",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1740&auto=format&fit=crop",
        price: "RSVP"
    },
    {
        id: 3,
        title: "Ethiopian Origins Tasting",
        category: "Cupping",
        date: "NOV 05",
        time: "11:00 AM – 12:30 PM",
        location: "Cupping Room, Dubai",
        description: "Explore the diverse flavor profiles of Ethiopian beans in this guided tasting session. Notes of blueberry, jasmine, and bergamot.",
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
        price: "$45"
    }
];

// --- THE 3D TILT CARD COMPONENT ---
const EventCard = ({ event }) => {
    const ref = useRef(null);

    // Motion Values for 3D effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth return to center
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    // Transform mouse range to rotation degrees (Adjust '20' to control 3D intensity)
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Glare effect movement
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position relative to center of card (-0.5 to 0.5)
        const mouseXPct = (e.clientX - rect.left) / width - 0.5;
        const mouseYPct = (e.clientY - rect.top) / height - 0.5;

        x.set(mouseXPct);
        y.set(mouseYPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000, // Creates the 3D space
            }}
            className="w-full h-[500px] md:h-[400px] relative group cursor-pointer mb-16"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d", // Crucial for 3D
                }}
                className="w-full h-full relative rounded-xl shadow-2xl bg-[#3A2C27] overflow-hidden border border-[#C8A46A]/20"
            >

                {/* --- LAYER 1: Background Image --- */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3A2C27] via-[#3A2C27]/80 to-transparent"></div>
                </div>

                {/* --- LAYER 2: Content (Floats above image in 3D) --- */}
                <motion.div
                    style={{ transform: "translateZ(50px)" }} // Pushes text closer to user
                    className="relative z-20 h-full p-8 md:p-12 flex flex-col justify-between"
                >

                    {/* Top Row */}
                    <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-[#C8A46A] text-[#3A2C27] text-xs font-bold uppercase tracking-widest rounded-sm">
                            {event.category}
                        </span>
                        <div className="flex flex-col items-center bg-[#FAF7F2]/10 backdrop-blur-md border border-[#FAF7F2]/20 p-3 rounded-lg text-[#FAF7F2]">
                            <span className="text-xs uppercase tracking-widest opacity-70">Date</span>
                            <span className="font-serif text-xl font-bold text-[#C8A46A]">{event.date}</span>
                        </div>
                    </div>

                    {/* Middle Content */}
                    <div>
                        <h3 className="text-4xl md:text-5xl font-serif text-[#FAF7F2] mb-4 leading-tight">
                            {event.title}
                        </h3>
                        <p className="text-[#FAF7F2]/70 font-sans font-light max-w-lg mb-6 leading-relaxed">
                            {event.description}
                        </p>

                        {/* Meta Data */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[#FAF7F2]/60 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-[#C8A46A]" />
                                {event.time}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-[#C8A46A]" />
                                {event.location}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="border-t border-[#FAF7F2]/10 pt-6 flex justify-between items-center">
                        <span className="text-2xl font-serif text-[#FAF7F2]">{event.price}</span>
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#C8A46A] text-[#3A2C27] font-bold uppercase tracking-widest text-xs hover:bg-[#FAF7F2] transition-colors">
                            <Ticket size={16} />
                            Book Seat
                        </button>
                    </div>

                </motion.div>

                {/* --- LAYER 3: The "Glare" Effect (Shines when tilted) --- */}
                <motion.div
                    style={{
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 80%)`,
                        opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay"
                />

            </motion.div>
        </motion.div>
    );
};

// --- MAIN PAGE COMPONENT ---
const Events = () => {
    return (
        <div className="bg-[#FAF7F2] min-h-screen">

            {/* 1. HERO HEADER */}
            <div className="relative h-[50vh] bg-[#3A2C27] flex flex-col items-center justify-center overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-30">
                    <img
                        src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1887&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Events BG"
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-4"
                >
                    <span className="text-[#C8A46A] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                        Workshops & Gatherings
                    </span>
                    <h1 className="text-5xl md:text-7xl text-[#FAF7F2] font-serif tracking-tighter">
                        Upcoming Events
                    </h1>
                </motion.div>
            </div>

            {/* 2. EVENT LIST */}
            <div className="max-w-5xl mx-auto px-6 py-32 -mt-20 relative z-20">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>

        </div>
    );
};

export default Events;
