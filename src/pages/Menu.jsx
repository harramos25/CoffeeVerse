import React from 'react';
import PageHero from '../components/PageHero';
import MenuSection from '../components/MenuSection';
import heroBg from '../assets/images/hero-abstract.png';

const Menu = () => {
    return (
        <div className="bg-coffee-cream min-h-screen">
            <PageHero
                title="Cafe Menu"
                subtitle="Espresso • Hand Drip • Seasonal"
                backgroundImage={heroBg}
            />
            <MenuSection />
        </div>
    );
};

export default Menu;
