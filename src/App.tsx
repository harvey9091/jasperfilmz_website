import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Play, 
  Menu, 
  X, 
  CheckCircle2, 
  Zap, 
  Users, 
  TrendingUp, 
  Video, 
  PenTool, 
  Search, 
  BarChart3, 
  ChevronDown,
  MessageSquare,
  Target,
  Clock,
  Layout,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const premiumTransition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1]
};

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ ...premiumTransition, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const PremiumCard = ({ children, className = "", glowColor = "rgba(59, 130, 246, 0.1)" }: { children: React.ReactNode; className?: string; glowColor?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`premium-card group ${className}`}
      style={{ '--glow-color': glowColor } as React.CSSProperties}
    >
      <div className="inner-glow" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

const Background = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <>
      <div className="grain" />
      <div className="mesh-gradient">
        <div className="mesh-ball top-[10%] left-[20%] bg-blue-600/20" />
        <div className="mesh-ball top-[40%] right-[10%] bg-orange-600/10" style={{ animationDelay: '-5s' }} />
        <div className="mesh-ball bottom-[10%] left-[30%] bg-purple-600/10" style={{ animationDelay: '-10s' }} />
      </div>
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              opacity: 0.3
            }}
          />
        ))}
      </div>
    </>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const services = [
    { title: "Content Strategy", desc: "Data-driven topics designed to attract high-ticket buyers.", icon: Search, color: "blue" },
    { title: "Premium Editing", desc: "Cinematic, high-retention editing that keeps viewers hooked.", icon: PenTool, color: "orange" },
    { title: "Scripting Support", desc: "We write your scripts to ensure they sell without being 'salesy'.", icon: MessageSquare, color: "blue" },
    { title: "Channel Management", desc: "Full SEO, thumbnails, and publishing handled by our team.", icon: Layout, color: "orange" },
    { title: "Lead Generation", desc: "Direct CTA optimization to drive traffic to your sales calls.", icon: Target, color: "blue" },
    { title: "Analytics Review", desc: "Monthly deep-dives to scale what's working and cut what isn't.", icon: BarChart3, color: "orange" },
  ];

  return (
    <div className="relative min-h-screen bg-bg-base overflow-x-hidden selection:bg-white/20 selection:text-white">
      <Background />

      {/* Navigation */}
      <nav className="fixed top-8 left-0 right-0 z-[100] px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={premiumTransition}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-8 h-[64px] flex items-center justify-between shadow-2xl"
          >
            <div className="flex items-center">
              <span className="text-white font-bold text-xl tracking-tighter">
                Jasper Filmz
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/50 hover:text-white transition-colors text-sm font-medium tracking-tight"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform active:scale-95">
                Book A Call
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-24 left-6 right-6 bg-black/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl md:hidden z-50"
            >
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white/80 text-lg font-medium py-2 border-b border-white/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <button className="btn-primary w-full py-5">
                  Book A Call
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-48 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <FadeUp>
            <h1 className="flex flex-col gap-6 mb-10">
              <span className="heading-hero">
                In 30 days we turn your <br className="hidden md:block" /> YouTube channel into a
              </span>
              <span className="heading-hero-italic underline decoration-blue-500/20 underline-offset-8">
                qualified sales call machine
              </span>
            </h1>

            <p className="text-white/50 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-16">
              We handle everything — strategy, scripting, filming guidance, editing and publishing — so you only spend <span className="text-white font-bold">2 hours per month recording</span> while we turn your content into inbound clients.
            </p>
          </FadeUp>

          {/* VSL Video - Now placed right after the description */}
          <FadeUp delay={0.2} className="w-full max-w-4xl mx-auto mb-16">
            <PremiumCard className="p-2 border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black/60 relative">
                <iframe 
                  className="w-full h-full relative z-10"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="VSL Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </PremiumCard>
          </FadeUp>

          {/* Call to Action and Trust Indicators */}
          <FadeUp delay={0.3}>
            <div className="flex flex-col items-center gap-8">
              <button className="btn-primary flex items-center gap-3 text-lg">
                Book A Free Strategy Call
                <ArrowRight size={20} />
              </button>
              
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/user${i}/60/60`} className="w-8 h-8 rounded-full border-2 border-black" alt="" />
                  ))}
                </div>
                <p className="text-sm font-bold text-white/60">
                  Trusted by 50+ creators
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Strategy Section (replaces solution/problem with premium look) */}
      <section id="services" className="section-spacing relative px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeUp className="text-center mb-24">
            <span className="label-small">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">The Done-For-You System</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <PremiumCard 
                  className="p-10 h-full flex flex-col hover:-translate-y-2"
                  glowColor={s.color === 'blue' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(249, 115, 22, 0.15)'}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${s.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                    <s.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{s.title}</h3>
                  <p className="text-white/40 text-lg leading-relaxed">{s.desc}</p>
                  
                  {/* Subtle graph decorative element as seen in inspiration */}
                  <div className="mt-auto pt-10 opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="h-10 flex items-end gap-1">
                      {Array.from({ length: 12 }).map((_, j) => (
                        <div 
                          key={j} 
                          className={`flex-1 rounded-t-sm transition-all duration-700 ${s.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'}`}
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </PremiumCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study / Result Card Inspiration applied to Stats */}
      <section className="section-spacing relative px-6 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <PremiumCard className="p-12 md:p-20 text-center relative overflow-hidden" glowColor="rgba(59, 130, 246, 0.2)">
            <div className="absolute top-0 right-0 p-8">
              <Zap className="text-blue-500 opacity-20" size={100} />
            </div>
            
            <FadeUp>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Scale to $50k+/mo?</h2>
              <p className="text-white/50 text-xl mb-12 max-w-2xl mx-auto">
                Stop guessing and start scaling. We handle the entire process so you can focus on closing the inbound deals we send your way.
              </p>
              <button className="btn-primary px-16 py-6 text-xl">
                Get Started Now
              </button>
            </FadeUp>
          </PremiumCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 relative z-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-2xl font-bold tracking-tighter mb-4">Jasper Filmz</span>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                The high-end YouTube growth agency for coaches, consultants, and world-class creators.
              </p>
            </div>
            
            <div className="flex gap-16">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Connect</span>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">YouTube</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Legal</span>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-[10px] font-medium tracking-widest uppercase">© 2026 Jasper Filmz. Crafted for excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

