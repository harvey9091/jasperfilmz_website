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

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string; key?: React.Key }) => (
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

  const problems = [
    { title: "Low Conversion", desc: "Your content gets views but zero sales calls.", icon: ShieldAlert, color: "red" },
    { title: "Time Sink", desc: "Spending 40+ hours a month editing and scripting.", icon: Clock, color: "orange" },
    { title: "No Strategy", desc: "Posting 'random' videos hoping something sticks.", icon: Target, color: "blue" },
    { title: "Poor Quality", desc: "Your videos look amateur and hurt your brand.", icon: Video, color: "purple" },
  ];

  const benefits = [
    { 
      title: "Inbound Client Machine", 
      desc: "We turn your YouTube into a high-converting funnel that books qualified calls while you sleep.",
      icon: TrendingUp,
      color: "blue"
    },
    { 
      title: "Total Time Freedom", 
      desc: "You spend just 2 hours a month recording. We handle the strategy, editing, and management.",
      icon: Zap,
      color: "orange"
    }
  ];

  const steps = [
    { name: "Onboarding Form", desc: "We learn your brand" },
    { name: "Research + Strategy", desc: "Data-backed plan" },
    { name: "You Record", desc: "The only task for you", highlight: true },
    { name: "Editing", desc: "Cinematic retention" },
    { name: "Thumbnail", desc: "High CTR design" },
    { name: "SEO + Publishing", desc: "Full management" },
  ];

  const testimonials = [
    { name: "Alex Rivers", role: "SaaS Founder", quote: "Jasper Filmz doubled our sales calls in just 45 days. The quality is unmatched.", img: "https://picsum.photos/seed/alex/100/100" },
    { name: "Sarah Chen", role: "Business Coach", quote: "I finally have my time back. 2 hours of recording and they do the rest. Incredible.", img: "https://picsum.photos/seed/sarah/100/100" },
    { name: "Marcus Thorne", role: "Consultant", quote: "The most professional agency I've worked with. They actually understand business.", img: "https://picsum.photos/seed/marcus/100/100" },
  ];

  const faqs = [
    { 
      q: "What exactly do you help with?", 
      a: "We handle the entire YouTube growth strategy for you — from research and scripting to cinematic editing, SEO, attention-grabbing thumbnails, and publishing. You simply show up to record once per week. Everything else is completely done-for-you with a singular focus: turning viewers into qualified inbound leads." 
    },
    { 
      q: "Why YouTube over other channels?", 
      a: "YouTube is where high-ticket buyers go when they're actively searching for solutions. It's high-intent, evergreen, and compounds over time. Unlike short-form content or ads that stop working the second you stop paying, one great video can drive qualified leads for years." 
    },
    { 
      q: "I'm already seeing results elsewhere. Why do I need this?", 
      a: "YouTube isn't just a linear channel; it's a trust-building asset. It works 24/7 to pre-sell prospects before they ever hop on a call with you, warming up leads from your ads, referrals, and outreach. It becomes the authoritative backbone of your brand that amplifies every other marketing effort you're currently running." 
    },
    { 
      q: "How much time will this really take me?", 
      a: "Most of our clients spend just 60–90 minutes per week filming, or they choose to batch record for a few hours once per month. Our team handles the heavy lifting—ideation, scripting, editing, and management—so you can stay focused on your zone of genius: running your business." 
    },
    { 
      q: "How do I know this will actually work for me?", 
      a: "Our system is specifically built for operators, founders, and agency owners—not 'influencers'. If you have a solid offer and are willing to share your expertise on camera once a week, we handle the strategy to ensure it translates into business growth. We start with a strategy call to ensure a perfect fit before we build anything." 
    },
    { 
      q: "Do I need to come up with the content ideas myself?", 
      a: "Not at all. Our team handles all the ideation, researches high-traffic angles, and writes the full scripts for you. You only need to show up and record using a proven, data-backed strategy that is designed to convert." 
    },
    { 
      q: "What kind of results can I expect?", 
      a: "While results vary, most clients start seeing their first inbound sales calls within the first 30-45 days of consistent posting. Because YouTube is a compounding platform, your results only get stronger as your library of pre-selling content grows." 
    },
    { 
      q: "How is this different from hiring a freelancer?", 
      a: "freelancers 'edit videos'; we build 'conversion funnels'. The difference is strategy. We don't just make things look pretty; we handle the positioning, psychology-backed scripting, and SEO that actually drives business outcomes, not just views." 
    },
    { 
      q: "Do I need a big audience for this to work?", 
      a: "No. Many of our best success stories started with fewer than 300 subscribers. Because YouTube is search-based and algorithmic, your content is placed directly in front of buyers actively searching for your solutions, regardless of your follower count." 
    },
    { 
      q: "How quickly can we get started?", 
      a: "After onboarding, we typically deliver your first batch of scripts within 3–5 business days. Recording usually begins in your first week, and you'll have your first professional video live shortly after." 
    },
    { 
      q: "What if I've tried YouTube before and it didn't work?", 
      a: "Most fail because they lack consistency or a backend strategy to turn views into calls. We solve the 'consistency' problem by handling the work, and the 'results' problem by applying a proven business-first strategy to every video we produce." 
    },
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
    <div className="relative min-h-screen bg-bg-base overflow-x-hidden selection:bg-blue-500/30 selection:text-white font-plus">
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
              <button className="bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-all">
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
            <h1 className="flex flex-col gap-4 mb-10">
              <span className="heading-hero">
                In 30 days we turn your <br className="hidden md:block" /> YouTube channel into a
              </span>
              <motion.span 
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.8, 
                  ...premiumTransition,
                  y: { type: "spring", stiffness: 50, damping: 15 } 
                }}
                className="heading-hero-italic bg-linear-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                qualified sales call machine
              </motion.span>
            </h1>

            <p className="text-white/50 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-16">
              We handle everything — strategy, scripting, filming guidance, editing and publishing — so you only spend <span className="text-white font-bold">2 hours per month recording</span> while we turn your content into inbound clients.
            </p>
          </FadeUp>

          {/* VSL Video */}
          <FadeUp delay={0.2} className="w-full max-w-4xl mx-auto mb-16">
            <PremiumCard className="p-2 border-white/20 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
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

          {/* Call to Action */}
          <FadeUp delay={0.3}>
            <div className="flex flex-col items-center gap-8">
              <button className="btn-primary flex items-center gap-3 text-lg group">
                Book A Free Strategy Call
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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

      {/* Problem Section */}
      <section id="about" className="section-spacing relative px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeUp className="text-center mb-24">
            <span className="label-small text-red-400">The Problem</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">YouTube is a goldmine, but<br />you're leaving money on the table.</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((p, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <PremiumCard 
                  className="p-8 h-full flex flex-col problem-card"
                  glowColor="rgba(239, 68, 68, 0.15)"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 ring-1 ring-red-500/20">
                    <p.icon className="text-red-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-white/40 leading-relaxed">{p.desc}</p>
                </PremiumCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-spacing relative px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeUp className="text-center mb-24">
            <span className="label-small text-blue-400">The Solution</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">We build your authority while<br />you focus on your business.</h2>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <PremiumCard 
                  className={`p-10 flex flex-col hover:-translate-y-2 transition-all duration-500 border-${b.color === 'blue' ? 'blue' : 'orange'}-500/10`}
                  glowColor={b.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(251, 191, 36, 0.2)'}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ring-1 ring-${b.color === 'blue' ? 'blue' : 'orange'}-500/20 ${b.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                    <b.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{b.title}</h3>
                  <p className="text-white/40 text-lg leading-relaxed">{b.desc}</p>
                </PremiumCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Done-For-You System Section */}
      <section id="services" className="section-spacing relative px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeUp className="text-center mb-24">
            <span className="label-small text-blue-400">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">The Done-For-You System</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <PremiumCard 
                  className="p-10 h-full flex flex-col hover:-translate-y-2 transition-all duration-500"
                  glowColor={s.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(251, 191, 36, 0.2)'}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ring-1 ring-${s.color === 'blue' ? 'blue' : 'orange'}-500/20 ${s.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                    <s.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{s.title}</h3>
                  <p className="text-white/40 text-lg leading-relaxed">{s.desc}</p>
                </PremiumCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="section-spacing relative px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeUp className="text-center mb-24">
            <span className="label-small text-blue-400">The Workflow</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">From Idea to Inbound Clients</h2>
          </FadeUp>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 z-10">
            {/* Desktop Connectors */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full text-blue-500/40" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none">
                {/* Row 1: 1 -> 2 -> 3 */}
                <path d="M 240 80 H 560 M 640 80 H 960" 
                  className="workflow-path"
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeDasharray="12 12" 
                />
                {/* Transition: 3 down to 4 */}
                <path d="M 1000 120 C 1000 240, 200 240, 200 360" 
                  className="workflow-path"
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeDasharray="12 12" 
                />
                {/* Row 2: 4 -> 5 -> 6 */}
                <path d="M 240 400 H 560 M 640 400 H 960" 
                  className="workflow-path"
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeDasharray="12 12" 
                />
              </svg>
            </div>

            {steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className={`flex flex-col items-center text-center group ${step.highlight ? 'relative' : ''}`}>
                  {step.highlight && (
                    <div className="absolute -inset-8 bg-blue-500/10 blur-3xl rounded-full -z-10 animate-pulse" />
                  )}
                  <div className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-2xl ${step.highlight ? 'bg-blue-600 text-white scale-110 shadow-blue-500/20 ring-4 ring-blue-500/20' : 'bg-white/5 border border-white/10 text-white/40 group-hover:border-blue-500/50 group-hover:text-blue-400'}`}>
                    <span className="text-2xl font-bold tracking-tighter">{i + 1}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${step.highlight ? 'text-white' : 'text-white/80'}`}>{step.name}</h3>
                  <p className="text-white/40 text-sm max-w-[200px]">{step.desc}</p>
                  {step.highlight && (
                    <span className="mt-6 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20">
                      Your Only Task
                    </span>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-spacing relative px-6 bg-white/[0.01]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeUp>
              <PremiumCard 
                className="p-12 border-red-500/10"
                glowColor="rgba(239, 68, 68, 0.05)"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <X className="text-red-400" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold">Cold Leads</h3>
                </div>
                <p className="text-white/40 mb-10 text-xl">Leads that DON'T watch your YouTube content before the call.</p>
                <ul className="space-y-6">
                  {["Skeptical and defensive", "Price-sensitive", "Need 3-4 follow ups", "Low closing rate"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/50">
                      <div className="w-2 h-2 rounded-full bg-red-500/30" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </PremiumCard>
            </FadeUp>

            <FadeUp delay={0.2}>
              <PremiumCard 
                className="p-12 border-blue-500/20"
                glowColor="rgba(59, 130, 246, 0.1)"
              >
                <div className="absolute top-8 right-8">
                  <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-2xl">
                    The Machine
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center ring-2 ring-blue-500/20">
                    <CheckCircle2 className="text-blue-400" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold">Pre-Sold Leads</h3>
                </div>
                <p className="text-white/70 mb-10 text-xl">Leads that DO watch your YouTube content before the call.</p>
                <ul className="space-y-6">
                  {["Trust you implicitly", "Ready to pay premium", "Close on the first call", "80%+ closing rate"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/90">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                      <span className="text-lg font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </PremiumCard>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-spacing relative px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeUp className="text-center mb-24">
            <span className="label-small text-blue-400">Success Stories</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Trusted by Industry Leaders</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <PremiumCard className="p-10 flex flex-col h-full hover:-translate-y-2 transition-all">
                  <div className="flex gap-1.5 mb-8">
                    {[1,2,3,4,5].map(s => <Zap key={s} size={14} className="text-blue-500 fill-blue-500" />)}
                  </div>
                  <p className="text-xl text-white/70 italic mb-10 leading-relaxed font-instrument">"{t.quote}"</p>
                  <div className="mt-auto flex items-center gap-4 pt-6 border-t border-white/5">
                    <img src={t.img} className="w-14 h-14 rounded-full border border-white/10" alt={t.name} />
                    <div>
                      <h4 className="font-bold text-lg">{t.name}</h4>
                      <p className="text-white/30 text-sm uppercase tracking-widest font-bold">{t.role}</p>
                    </div>
                  </div>
                </PremiumCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing relative px-6 bg-white/[0.01]">
        <div className="container mx-auto max-w-4xl">
          <FadeUp className="text-center mb-24">
            <span className="label-small text-blue-400">Common Questions</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Everything you need to know</h2>
          </FadeUp>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <PremiumCard className="overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-10 py-8 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-xl font-bold tracking-tight">{faq.q}</span>
                    <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${activeFaq === i ? 'rotate-180 bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'text-white/40 group-hover:border-white/20'}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={premiumTransition}
                      >
                        <div className="px-10 pb-10 text-white/50 text-lg leading-relaxed max-w-3xl">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </PremiumCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing relative px-6">
        <div className="container mx-auto max-w-5xl">
          <PremiumCard className="p-16 md:p-24 text-center relative overflow-hidden" glowColor="rgba(59, 130, 246, 0.3)">
            <div className="absolute top-0 right-0 p-12 -z-10 opacity-10">
              <Zap className="text-blue-500" size={200} />
            </div>
            
            <FadeUp>
              <h2 className="text-[40px] md:text-[80px] font-bold mb-10 leading-[0.9] tracking-tighter">Ready to turn YouTube into a <br className="hidden md:block"/> <span className="text-white/30">sales machine?</span></h2>
              <p className="text-white/50 text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed">
                Stop guessing and start scaling. We handle the entire process so you can focus on closing the inbound deals we send your way.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="btn-primary flex items-center gap-3 text-xl px-12 py-6">
                  Book A Strategy Call
                  <ArrowRight size={22} />
                </button>
                <div className="flex items-center gap-3 bg-blue-500/5 px-6 py-4 rounded-full border border-blue-500/10">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                   <span className="text-sm font-bold text-blue-400/80 uppercase tracking-widest">3 spots left for March</span>
                </div>
              </div>
            </FadeUp>
          </PremiumCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 relative z-10 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-2xl font-bold tracking-tighter mb-4 text-white">Jasper Filmz</span>
              <p className="text-white/30 text-sm max-w-xs leading-relaxed">
                The high-end YouTube growth agency for coaches, consultants, and world-class creators.
              </p>
            </div>
            
            <div className="flex gap-16">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Connect</span>
                <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">YouTube</a>
                <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Instagram</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Legal</span>
                <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 text-center">
            <p className="text-white/10 text-[10px] uppercase tracking-[0.3em]">© 2026 Jasper Filmz. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

