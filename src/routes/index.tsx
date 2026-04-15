import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useEffect, ReactNode } from 'react';
import { Sword, Menu, X, Play, Map, Users, Scroll } from 'lucide-react';

/**
 * REUSABLE COMPONENTS
 */
const GameLogo = ({ className = "w-6 h-6" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <img 
      src="/Icon A.png" 
      alt="Ward Off Evil Logo" 
      className="w-full h-full object-contain"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150/991b1b/FFFFFF?text=WOE";
      }}
    />
  </div>
);

const SteamButton = () => (
  <a
    href="https://store.steampowered.com/app/3422000?utm_source=LandingPage"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-3 font-serif font-bold tracking-wider uppercase bg-red-900 hover:bg-red-800 text-stone-100 px-8 py-4 rounded-sm border border-red-700 transition-all shadow-[0_0_15px_rgba(153,27,27,0.4)]"
  >
    <Sword className="w-5 h-5" />
    <span>Wishlist on Steam</span>
  </a>
);

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300 font-sans selection:bg-red-900/50 overflow-x-hidden">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-stone-950/95 backdrop-blur-md py-3 border-stone-800' : 'bg-transparent py-6 border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GameLogo className="w-8 h-8" />
            <span className="font-serif font-bold text-xl tracking-tighter text-stone-100 uppercase">Ward Off Evil</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <SteamButton />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-6xl md:text-8xl font-serif font-black text-stone-100 mb-8 leading-none">
            WARD OFF EVIL
          </h1>
          <p className="text-xl text-stone-400 mb-12">
            Forge your empire in a brutal, turn-based strategy RPG inspired by savage tales.
          </p>
          <SteamButton />
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: LandingPage,
});
