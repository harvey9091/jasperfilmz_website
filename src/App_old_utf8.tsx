/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowUpRight, 
  Play, 
  Menu, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Users, 
  TrendingUp, 
  Video, 
  PenTool, 
  Search, 
  BarChart3, 
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Target,
  Clock,
  Layout,
  Globe,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const premiumEasing = [0.22, 1, 0.36, 1];

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  key?: React.Key;
}

const FadeUp = ({ children, delay = 0, className = "" }: FadeUpProps) => (
  <motion.div
    initial={{ y: 24, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay, ease: premiumEasing }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef(null);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const problems = [
    { title: "Low Conversion", desc: "Your content gets views but zero sales calls.", icon: ShieldAlert },
    { title: "Time Sink", desc: "Spending 40+ hours a month editing and scripting.", icon: Clock },
    { title: "No Strategy", desc: "Posting 'random' videos hoping something sticks.", icon: Target },
    { title: "Poor Quality", desc: "Your videos look amateur and hurt your brand.", icon: Video },
  ];

  const benefits = [
    { 
      title: "Inbound Client Machine", 
      desc: "We turn your YouTube into a high-converting funnel that books qualified calls while you sleep.",
      icon: TrendingUp 
    },
    { 
      title: "Total Time Freedom", 
      desc: "You spend just 2 hours a month recording. We handle the strategy, editing, and management.",
      icon: Zap 
    }
  ];

  const services = [
    { title: "Content Strategy", desc: "Data-driven topics designed to attract high-ticket buyers.", icon: Search },
    { title: "Premium Editing", desc: "Cinematic, high-retention editing that keeps viewers hooked.", icon: PenTool },
    { title: "Scripting Support", desc: "We write your scripts to ensure they sell without being 'salesy'.", icon: MessageSquare },
    { title: "Channel Management", desc: "Full SEO, thumbnails, and publishing handled by our team.", icon: Layout },
    { title: "Lead Generation", desc: "Direct CTA optimization to drive traffic to your sales calls.", icon: Target },
    { title: "Analytics Review", desc: "Monthly deep-dives to scale what's working and cut what isn't.", icon: BarChart3 },
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
    { q: "How much time do I really need to spend?", a: "Exactly 2 hours per month. We batch your recording sessions so you can focus on your business while we handle the rest." },
    { q: "Do you work with new channels?", a: "Yes. We specialize in building high-authority channels from scratch for coaches and consultants." },
    { q: "What kind of results can I expect?", a: "Our goal is qualified sales calls. Most clients see a significant increase in inbound leads within the first 30-60 days." },
    { q: "Do you handle thumbnails and SEO?", a: "Full service. We handle everything from the initial idea to the final upload and optimization." },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-bg-base overflow-x-hidden">
      <div className="atmosphere" />

      {/* Navigation */}
      <nav className="fixed top-8 left-0 right-0 z-50 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-nav px-8 h-[72px] flex items-center justify-between"
          >
            <div className="flex items-center">
              <span className="text-white font-bold text-xl tracking-tight font-barlow">
                Jasper Filmz
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors text-[14px] font-medium font-barlow tracking-tight"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <button className="btn-primary flex items-center gap-2 text-[14px]">
                Book A Free Strategy Call
                <ArrowUpRight size={16} />
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-24 left-6 right-6 glass-panel p-8 md:hidden z-50"
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
                  Book A Free Strategy Call
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <FadeUp className="max-w-[1100px] mx-auto">
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] hero-glow blur-[120px] pointer-events-none opacity-40" />
                <h1 className="flex flex-col gap-[14px] relative z-10">
                  <span className="heading-hero">
                    In 30 days we turn your YouTube channel into a
                  </span>
                  <span className="heading-hero-italic text-white relative inline-block">
                    qualified sales call machine
                    <div className="absolute inset-0 hero-glow blur-[40px] opacity-30 -z-10" />
                  </span>
                </h1>
              </div>

              <p className="text-sub max-w-[720px] mx-auto">
                We handle everything ΓÇö strategy, scripting, filming guidance, editing and publishing ΓÇö so you only spend <span className="text-white font-bold">2 hours per month recording</span> while we turn your content into inbound clients.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
                <button className="btn-primary text-[16px]">
                  Book A Free Strategy Call
                </button>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-bg-base" alt="" />
                    ))}
                  </div>
                  <p className="text-[13px] text-white/40 font-medium ml-2">
                    Trusted by 50+ creators
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* VSL Video - Centered below CTA */}
          <FadeUp delay={0.2} className="w-full max-w-[720px] mt-14">
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-500/5 blur-2xl rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="glass-panel p-2 w-full relative z-10 shadow-[0px_40px_120px_rgba(0,0,0,0.6)] group-hover:border-white/15 transition-all duration-200">
                <div className="aspect-video rounded-lg overflow-hidden bg-black/40">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="VSL Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Problem Section */}
      <section id="about" className="section-spacing relative">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-20">
              <span className="label-small text-red-400">The Problem</span>
              <h2 className="heading-section mt-4">YouTube is a goldmine, but you're <br className="hidden md:block" /> leaving money on the table.</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((p, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="glass-panel p-8 h-full group hover:-translate-y-[6px] hover:scale-[1.015] hover:border-red-500/30 hover:shadow-[0px_0px_30px_rgba(255,80,80,0.18)]">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors duration-200">
                    <p.icon className="text-red-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-20">
              <span className="label-small">The Solution</span>
              <h2 className="heading-section mt-4">We build your authority while <br /> you focus on your business.</h2>
            </div>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="glass-panel p-10 relative overflow-hidden group hover:-translate-y-[6px] hover:scale-[1.015] hover:border-blue-500/30 hover:shadow-[0px_0px_35px_rgba(0,150,255,0.25)]">
                  <div className="flex flex-col gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                      <b.icon className="text-[#4F8CFF]" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{b.title}</h3>
                      <p className="text-white/60 text-lg leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-spacing">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-20">
              <span className="label-small">Our Services</span>
              <h2 className="heading-section mt-4">The Complete Done-For-You System</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="glass-panel p-10 group hover:-translate-y-[6px] hover:scale-[1.015] hover:border-blue-500/30 hover:shadow-[0px_10px_40px_rgba(59,130,246,0.2)]">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-blue-500/10 transition-colors duration-200">
                    <s.icon className="text-blue-400 group-hover:rotate-6 transition-transform duration-200" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-spacing relative overflow-hidden">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-24">
              <span className="label-small">The Workflow</span>
              <h2 className="heading-section mt-4">From Idea to Inbound Clients</h2>
            </div>
          </FadeUp>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {steps.map((step, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className={`flex flex-col items-center text-center group ${step.highlight ? 'scale-110' : ''}`}>
                    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-200 ${step.highlight ? 'bg-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.6)]' : 'bg-glass-bg border border-glass-border group-hover:border-blue-500/50'}`}>
                      {step.highlight && <div className="pulse-ring" />}
                      <span className={`text-xl font-bold ${step.highlight ? 'text-white' : 'text-white/40'}`}>{i + 1}</span>
                    </div>
                    <h3 className={`font-bold mb-2 ${step.highlight ? 'text-blue-400' : 'text-white'}`}>{step.name}</h3>
                    <p className="text-white/40 text-sm px-4">{step.desc}</p>
                    {step.highlight && (
                      <div className="mt-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                        Your Only Task
                      </div>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeUp>
              <div className="glass-panel p-12 border-red-500/10 bg-red-500/[0.02]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="text-red-400" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold">Cold Leads</h3>
                </div>
                <p className="text-white/40 mb-10 text-lg">Leads that DON'T watch your YouTube content before the call.</p>
                <ul className="space-y-6">
                  {["Skeptical and defensive", "Price-sensitive", "Need 3-4 follow ups", "Low closing rate"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="glass-panel p-12 border-blue-500/30 bg-blue-500/[0.05] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                  <div className="px-4 py-1.5 rounded-full bg-blue-500 text-white text-[12px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    The Machine
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <CheckCircle2 className="text-blue-400" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold">Pre-Sold Leads</h3>
                </div>
                <p className="text-white/70 mb-10 text-lg">Leads that DO watch your YouTube content before the call.</p>
                <ul className="space-y-6">
                  {["Trust you implicitly", "Ready to pay premium", "Close on the first call", "80%+ closing rate"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-spacing bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-20">
              <span className="label-small">Success Stories</span>
              <h2 className="heading-section mt-4">Trusted by Industry Leaders</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="glass-panel p-10 flex flex-col h-full group hover:-translate-y-[6px] hover:scale-[1.015]">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(s => <Zap key={s} size={16} className="text-blue-400 fill-blue-400" />)}
                  </div>
                  <p className="text-xl text-white/80 italic mb-10 leading-relaxed">"{t.quote}"</p>
                  <div className="mt-auto flex items-center gap-4">
                    <img src={t.img} className="w-12 h-12 rounded-full grayscale hover:grayscale-0 transition-all" alt={t.name} />
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-white/40 text-sm">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeUp>
            <div className="text-center mb-20">
              <span className="label-small">Common Questions</span>
              <h2 className="heading-section mt-4">Everything you need to know</h2>
            </div>
          </FadeUp>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="glass-panel overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg font-bold">{faq.q}</span>
                    <ChevronDown className={`text-white/40 transition-transform duration-200 ${activeFaq === i ? 'rotate-180' : ''}`} size={20} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: premiumEasing }}
                      >
                        <div className="px-8 pb-8 text-white/60 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing relative">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="glass-panel p-16 md:p-24 text-center max-w-5xl mx-auto relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] -z-10" />
              <h2 className="heading-section mb-8">Ready to turn your YouTube <br /> into a sales machine?</h2>
              <p className="text-sub mb-12 max-w-2xl mx-auto">
                Stop guessing and start scaling. We handle the entire process so you can focus on closing the inbound deals we send your way.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="btn-primary text-lg px-12 py-5">
                  Book A Free Strategy Call
                </button>
                <button className="btn-glass text-lg px-12 py-5">
                  View Our Portfolio
                </button>
              </div>
              <p className="mt-10 text-white/40 text-sm flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-blue-400" />
                Limited to 3 new clients per month to ensure quality.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-bold tracking-tight mb-4">Jasper Filmz</span>
              <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
                The high-end YouTube growth agency for coaches, consultants, and creators.
              </p>
            </div>
            
            <div className="flex gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/30">Company</span>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">About</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Work</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Services</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/30">Social</span>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">YouTube</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs">┬⌐ 2026 Jasper Filmz. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
