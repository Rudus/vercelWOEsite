import React, { useState, useEffect, ReactNode } from 'react';
import { Shield, Map, Users, Scroll, Sword, Menu, X, Play, ChevronRight, Award } from 'lucide-react';

/**
 * TYPE DEFINITIONS
 */

interface GameLogoProps {
  className?: string;
  glow?: boolean;
}

interface SteamButtonProps {
  className?: string;
  variant?: 'primary' | 'outline';
}

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}

/**
 * REUSABLE COMPONENTS
 */

const GameLogo: React.FC<GameLogoProps> = ({ className = "w-6 h-6", glow = false }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    {glow && (
      <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full scale-150 animate-pulse" />
    )}
    <img 
      src="Icon A.png" 
      alt="Ward Off Evil Logo" 
      className="w-full h-full object-contain relative z-10"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150/991b1b/FFFFFF?text=WOE";
      }}
    />
  </div>
);

const SteamButton: React.FC<SteamButtonProps> = ({ className = '', variant = 'primary' }) => {
  const baseStyles = "inline-flex items-center justify-center gap-3 font-serif font-bold tracking-wider uppercase transition-all duration-300 active:scale-95";
  const variants = {
    primary: "bg-red-900 hover:bg-red-800 text-stone-100 px-8 py-4 rounded-sm border border-red-700 shadow-[0_0_15px_rgba(153,27,27,0.4)] hover:shadow-[0_0_25px_rgba(153,27,27,0.7)] hover:-translate-y-0.5",
    outline: "bg-transparent hover:bg-stone-100/10 text-stone-200 px-8 py-4 rounded-sm border border-stone-700 hover:border-stone-500"
  };

  return (
    <a
      href="https://store.steampowered.com/app/3422000?utm_source=LandingPage"
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <Sword className="w-5 h-5" />
      <span>Wishlist on Steam</span>
    </a>
  );
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, subtitle, align = 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <span className="text-amber-600/80 uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight">
      {children}
    </h2>
    <div className={`h-1 w-24 bg-red-900 mt-4 ${align === 'center' ? 'mx-auto' : ''}`} />
  </div>
);

/**
 * MAIN PAGE COMPONENT
 */

export default function App() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gameTitle = "Ward Off Evil";

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300 font-sans selection:bg-red-900/50 overflow-x-hidden">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-stone-950/95 backdrop-blur-md py-3 border-stone-800' : 'bg-transparent py-6 border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GameLogo className="w-8 h-8" />
            <span className="font-serif font-bold text-xl tracking-tighter text-stone-100 uppercase">{gameTitle}</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['World', 'Features', 'Community'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-serif uppercase tracking-widest text-stone-400 hover:text-red-500 transition-colors">
                {item}
              </a>
            ))}
            <SteamButton className="py-2.5 px-6 text-sm" />
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-stone-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-950 border-b border-stone-800 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            {['World', 'Features', 'Community'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif uppercase tracking-widest text-stone-300"
              >
                {item}
              </a>
            ))}
            <SteamButton />
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-red-950/30 z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 z-0 mix-blend-overlay" />
        
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-900/10 rounded-full blur-[120px]" />

        <div className="relative z-20 container mx-auto px-6 text-center max-w-5xl flex flex-col items-center pt-20">
          <div className="inline-flex items-center justify-center gap-4 mb-6 bg-stone-900/50 backdrop-blur-sm border border-stone-800 px-5 py-2 rounded-full">
            <GameLogo className="w-5 h-5" />
            <span className="uppercase tracking-[0.4em] text-amber-600/70 text-[10px] font-bold">The Cycle is Ending</span>
            <GameLogo className="w-5 h-5" />
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-stone-50 via-stone-300 to-stone-600 tracking-tighter mb-8 leading-none">
            {gameTitle}
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-400 font-serif max-w-3xl mx-auto leading-relaxed mb-12">
            Forge your empire in a brutal, turn-based strategy RPG inspired by the savage tales of Conan. Conquer a dark, unforgiving open world where steel is the only law.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <SteamButton className="text-lg px-10 py-5" />
            <button className="flex items-center gap-2 group text-stone-400 hover:text-stone-100 transition-colors font-serif uppercase tracking-widest text-sm px-8 py-4">
              <div className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-red-700 group-hover:bg-red-900/10 transition-all">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              Watch Cinematic
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Descend</span>
            <div className="w-px h-12 bg-gradient-to-b from-stone-400 to-transparent" />
          </div>
        </div>
      </section>

      {/* World Section */}
      <section id="world" className="relative py-32 px-6 border-y border-stone-800/50 bg-stone-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <SectionHeading subtitle="The World" align="left">
                Survive the <br/>Hyborian Wastes
              </SectionHeading>
              <p className="text-lg text-stone-400 leading-relaxed">
                Step into a world where steel and sorcery clash, where weak kings crumble and warlords rise. <strong className="text-amber-500/90">{gameTitle}</strong> is a dark, gritty turn-based strategy RPG set in a ruthless open world.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-red-900 pl-4 py-2">
                  <h4 className="text-stone-100 font-serif font-bold uppercase tracking-widest text-sm mb-1">Open World</h4>
                  <p className="text-xs text-stone-500">100+ unique locations to pillage and conquer.</p>
                </div>
                <div className="border-l-2 border-red-900 pl-4 py-2">
                  <h4 className="text-stone-100 font-serif font-bold uppercase tracking-widest text-sm mb-1">Permadeath</h4>
                  <p className="text-xs text-stone-500">Every decision carries the weight of mortality.</p>
                </div>
              </div>
            </div>

            <div className="relative group">
               <div className="relative aspect-[4/3] bg-stone-900 rounded-sm border border-stone-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-950/40 to-transparent mix-blend-overlay" />
                  
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-900/50" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-900/50" />
                  
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-6 text-stone-500">
                    <div className="w-20 h-20 rounded-full border border-stone-700 flex items-center justify-center bg-stone-950/50 backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-stone-300 ml-1" />
                    </div>
                    <span className="font-serif tracking-[0.3em] text-xs uppercase text-stone-400">View Gameplay Reveal</span>
                  </div>
               </div>
               <div className="absolute -bottom-6 -left-6 bg-stone-900 border border-stone-800 p-4 shadow-xl flex items-center gap-4 hidden md:flex">
                  <Award className="w-10 h-10 text-amber-600" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-stone-500">Indie Award</div>
                    <div className="text-sm font-serif font-bold text-stone-200">Best Strategy 2026</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading subtitle="Gameplay Systems">
            Master the Art of War
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sword,
                title: "Tactical Combat",
                desc: "Deep, grid-based battles where positioning, terrain, and brutal flanking maneuvers decide the fate of your clan."
              },
              {
                icon: Map,
                title: "Savage World",
                desc: "Explore a vast map inspired by Howard's dark vision. Discover ancient ruins and hostile tribes."
              },
              {
                icon: Users,
                title: "Warband Logic",
                desc: "Recruit mercenaries or enslave foes. Manage morale, rations, and gold to keep your horde marching."
              },
              {
                icon: Scroll,
                title: "Deep RPG Stats",
                desc: "Complex character sheets. Customize your warlord with specialized skill trees and legendary gear."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-stone-900/20 backdrop-blur-sm border border-stone-800/50 p-8 rounded-sm hover:border-red-900/50 transition-all group relative overflow-hidden hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 to-amber-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="w-12 h-12 rounded-lg bg-stone-900 flex items-center justify-center mb-6 group-hover:bg-red-950/40 transition-colors">
                  <feature.icon className="w-6 h-6 text-amber-600/80 group-hover:text-red-500 transition-colors" />
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-200 mb-3">{feature.title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm group-hover:text-stone-400 transition-colors">
                  {feature.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-600 group-hover:text-amber-600 transition-colors">
                  Learn More <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="community" className="py-40 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-red-950/10 to-stone-950 z-0" />
        <div className="relative z-10 container mx-auto max-w-4xl text-center flex flex-col items-center gap-10">
          <GameLogo className="w-32 h-32" glow={true} />
          <h2 className="text-5xl md:text-7xl font-serif font-black text-stone-100 tracking-tight">
            Ready to claim <br/>your throne?
          </h2>
          <p className="text-xl text-stone-400 font-serif max-w-2xl">
            Wishlist <strong className="text-amber-500/90">{gameTitle}</strong> today and join the vanguard of the coming age.
          </p>
          <div className="mt-4">
            <SteamButton className="text-xl px-16 py-6" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800/50 bg-stone-950 py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <GameLogo className="w-8 h-8" />
                <span className="font-serif font-bold text-xl tracking-tighter text-stone-100 uppercase">{gameTitle}</span>
              </div>
              <p className="text-stone-600 text-xs max-w-xs text-center md:text-left">
                A dark strategy RPG experience built for the hardened tactician.
              </p>
            </div>

            <div className="flex gap-16">
              <div className="flex flex-col gap-4">
                <h5 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-500">Navigation</h5>
                <a href="#" className="text-sm text-stone-400 hover:text-red-500 transition-colors uppercase tracking-widest font-serif">Steam Store</a>
                <a href="#" className="text-sm text-stone-400 hover:text-red-500 transition-colors uppercase tracking-widest font-serif">Press Kit</a>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-500">Social</h5>
                <a href="#" className="text-sm text-stone-400 hover:text-red-500 transition-colors uppercase tracking-widest font-serif">Discord</a>
                <a href="#" className="text-sm text-stone-400 hover:text-red-500 transition-colors uppercase tracking-widest font-serif">Twitter</a>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-700 text-[10px] uppercase tracking-widest font-bold">
            <div>&copy; {new Date().getFullYear()} Savage Domains Studio.</div>
            <div className="flex gap-6">
               <a href="#" className="hover:text-stone-500 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-stone-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}