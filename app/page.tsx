"use client";

import { useEffect, useState } from "react";
import { PlusSquare, CheckCircle2, Flame, Users, Link as LinkIcon, Gem, Monitor, Smartphone, LayoutTemplate, Mail, Gamepad2, Dumbbell, Code, BookOpen, Sparkles, Snowflake } from "lucide-react";
import { motion, Variants } from "framer-motion";

function HeroCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentFrame = 0;
    const target = 365;
    const duration = 2500; // ms
    const fps = 60;
    const frames = (duration / 1000) * fps;

    const easeOutExpo = (x: number) => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const animateCounter = () => {
      currentFrame++;
      const progress = currentFrame / frames;
      const easedProgress = easeOutExpo(progress);
      
      setCount(Math.round(easedProgress * target));

      if (currentFrame < frames) {
        requestAnimationFrame(animateCounter);
      } else {
        setCount(target);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animateCounter);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="streak-display mt-20">
      <span className="streak-flame flex items-center justify-center"><Flame size={90} fill="currentColor" strokeWidth={1} /></span>
      <span className="counter-num">{count}</span>
    </div>
  );
}

export default function Home() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed w-full top-0 py-6 px-6 z-50 bg-[rgba(26,26,26,0.8)] backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center w-full">
          <a href="#" className="font-display font-bold text-2xl flex items-center gap-2 tracking-tight">
            <Flame className="text-[var(--flame-orange)]" fill="currentColor" size={28} />
            str3q
          </a>
          <div className="hidden md:flex gap-8 font-medium text-[15px]">
            <a href="#how" className="smooth-hover hover:text-[var(--flame-orange)]">How it works</a>
            <a href="#features" className="smooth-hover hover:text-[var(--flame-orange)]">Features</a>
            <a href="#proof" className="smooth-hover hover:text-[var(--flame-orange)]">Friends</a>
            <a href="#platforms" className="smooth-hover hover:text-[var(--flame-orange)]">Platforms</a>
          </div>
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-[var(--flame-orange)] text-white shadow-[0_4px_20px_var(--color-flame-glow),inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_var(--color-flame-glow),inset_0_2px_0_rgba(255,255,255,0.2)] hover:brightness-110 transition-all duration-[0.4s]"
          >
            Get started
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="w-full pt-[180px] pb-[100px] px-6 text-center bg-[radial-gradient(circle_at_50%_30%,rgba(255,94,26,0.1)_0%,transparent_60%)]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-[80px] leading-[1.1] tracking-[-2px] mb-6"
          >
            Stay consistent.<br/>Build streaks.<br/>Bring your people.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[20px] text-[var(--ghost-muted)] max-w-2xl mb-12"
          >
            The accountability app that feels like a game. Show up daily, keep the flame alive, and build habits that stick.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <button
              className="flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-[var(--flame-orange)] transition-all duration-[0.4s] text-lg"
            >
              Start your streak — it's free
            </button>
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-[var(--smoke-mid)] text-[var(--ghost-white)] border border-white/10 hover:bg-[var(--smoke-light)] transition-all duration-[0.4s] text-lg gap-2"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
              Sign in with Google
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroCounter />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="w-full py-[100px] px-6 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,184,0,0.03)_0%,transparent_60%)] pointer-events-none"></div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-5xl mb-4">How it works</h2>
            <p className="text-[var(--ghost-muted)] text-lg">Frictionless entry. Deep mastery. Zero excuses.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <motion.div 
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              className="bg-[var(--smoke-mid)] border border-white/5 rounded-3xl p-8 hover:border-white/10 hover:bg-[var(--smoke-light)] transition-colors duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--flame-orange)] mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:bg-[var(--flame-glow)] group-hover:text-white">
                <PlusSquare size={32} />
              </div>
              <h3 className="font-display text-2xl mb-3">1. Add your activities</h3>
              <p className="text-[var(--ghost-muted)]">Pick what matters. Coding, running, reading, or meditating. Set it for daily or specific days of the week.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              className="bg-[var(--smoke-mid)] border border-white/5 rounded-3xl p-8 hover:border-white/10 hover:bg-[var(--smoke-light)] transition-colors duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--flame-orange)] mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:bg-[var(--flame-glow)] group-hover:text-white">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-display text-2xl mb-3">2. Check them off</h3>
              <p className="text-[var(--ghost-muted)]">Tap to complete. Experience satisfying sounds and beautiful animations that make the habit loop stick.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              className="bg-[var(--smoke-mid)] border border-white/5 rounded-3xl p-8 hover:border-white/10 hover:bg-[var(--smoke-light)] transition-colors duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--flame-orange)] mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:bg-[var(--flame-glow)] group-hover:text-white">
                <Flame size={32} />
              </div>
              <h3 className="font-display text-2xl mb-3">3. Build your streak</h3>
              <p className="text-[var(--ghost-muted)]">Watch the flame grow. Hit milestones at 7, 30, and 100 days. Don't let it freeze. Don't let it die.</p>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section id="proof" className="w-full py-[100px] border-y border-white/5 overflow-hidden bg-[rgba(255,255,255,0.01)] relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto px-6"
        >
          <motion.div variants={fadeUp} className="text-center mb-16 relative z-10">
            <h2 className="font-display text-3xl sm:text-5xl mb-4">Accountability works better together</h2>
            <p className="text-[var(--ghost-muted)] text-lg">Nudge your friends. Defend shared streaks. Rise up the daily leaderboard.</p>
          </motion.div>
          
          <div className="w-full relative z-10 flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {[
              { name: "Temi", stats: "47", activity: "Chess", icon: <Gamepad2 size={20} className="text-purple-400" /> },
              { name: "Dayo", stats: "112", activity: "Morning run", icon: <Dumbbell size={20} className="text-orange-400" /> },
              { name: "Sarah", stats: "14", activity: "Ship code", icon: <Code size={20} className="text-blue-400" /> },
              { name: "Kobe", stats: "365", activity: "Read 10 pages", icon: <BookOpen size={20} className="text-emerald-400" /> },
              { name: "Zainab", stats: "30", activity: "Meditation", icon: <Sparkles size={20} className="text-[var(--frost-blue)]" />, isFrozen: true },
            ].map((user, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className={`bg-[var(--smoke-mid)] border border-white/5 rounded-full px-6 py-4 flex items-center gap-4 cursor-default transition-colors duration-300 ${user.isFrozen ? "hover:border-[var(--frost-blue)] hover:bg-[rgba(91,196,255,0.05)]" : "hover:border-[var(--flame-glow)] hover:bg-[rgba(255,94,26,0.05)]"}`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--smoke-light)] to-[var(--ash-dark)] flex justify-center items-center text-white/80 shadow-inner border border-white/5">
                  {user.icon}
                </div>
                <div className="flex flex-col pr-2">
                  <span className="font-semibold text-[16px]">{user.name}</span>
                  <span className="text-[var(--ghost-muted)] text-[14px] mono mt-0.5 flex items-center gap-1">
                    <span className={`flex items-center font-bold ${user.isFrozen ? "text-[var(--frost-blue)]" : "text-[var(--flame-orange)]"}`}>
                      {user.isFrozen ? <Snowflake size={14} fill="currentColor" className="mr-1" /> : <Flame size={14} fill="currentColor" className="mr-1" />} {user.stats}
                    </span> 
                    days · {user.activity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="w-full py-[100px] px-6 relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(91,196,255,0.1)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,59,59,0.05)_0%,transparent_60%)] pointer-events-none"></div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          
          <motion.div variants={fadeUp} whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }} className="bg-[var(--smoke-mid)] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors duration-300">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[rgba(91,196,255,0.1)] text-[var(--frost-blue)]">
              <PlusSquare size={32} />
            </div>
            <h3 className="font-display text-2xl mb-3">Premium Feel</h3>
            <p className="text-[var(--ghost-muted)]">Boring habits need a beautiful interface. Every tap, check, and milestone triggers satisfying micro-animations and sound design crafted for delight.</p>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }} className="bg-[var(--smoke-mid)] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors duration-300">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/5 text-[var(--flame-orange)]">
              <Users size={32} />
            </div>
            <h3 className="font-display text-2xl mb-3">Friend Nudges</h3>
            <p className="text-[var(--ghost-muted)]">Send immediate push notifications to friends at risk of losing their streak. A single tap to say "Oi, log your workout." Social pressure as a service.</p>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }} className="bg-[var(--smoke-mid)] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors duration-300">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[rgba(255,59,59,0.1)] text-[var(--broken-red)]">
              <LinkIcon size={32} />
            </div>
            <h3 className="font-display text-2xl mb-3">Shared Streaks</h3>
            <p className="text-[var(--ghost-muted)]">Link your streak with a friend. Both of you must check in, or you both lose. Inspired by Snap streaks, applied to your daily growth.</p>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(255,184,0,0.1)", borderColor: "rgba(255,184,0,0.5)" }} className="feature-teaser rounded-3xl p-8 transition-colors duration-300">
            <span className="inline-block px-3 py-1 bg-[rgba(255,184,0,0.1)] text-[var(--ember-yellow)] rounded-full text-[12px] font-bold uppercase tracking-widest mb-4">Coming Soon</span>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-transparent text-[var(--ember-yellow)]">
              <Gem size={32} />
            </div>
            <h3 className="font-display text-2xl mb-3">On-Chain Rewards</h3>
            <p className="text-[var(--ghost-muted)]">The discipline creates the value. Unlock soulbound NFT badges at major milestones and earn Str3q Points for keeping the flame alive.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="w-full py-[50px] px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-6xl mx-auto bg-[var(--smoke-mid)] rounded-[32px] p-12 md:p-[64px] text-center flex flex-col items-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl mb-2">Everywhere you build</h2>
          <p className="text-[var(--ghost-muted)] text-lg mb-12">Available exactly where you need to see it.</p>
          
          <motion.div variants={staggerContainer} className="flex gap-12 md:gap-24 flex-wrap justify-center">
            <motion.div variants={fadeUp} whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center gap-4 text-[var(--ghost-muted)] transition-colors duration-300 hover:text-indigo-400 cursor-pointer">
              <Monitor size={48} className="text-indigo-500 mb-2" />
              <span className="mono">Web App</span>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center gap-4 text-[var(--ghost-muted)] transition-colors duration-300 hover:text-pink-400 cursor-pointer">
              <Smartphone size={48} className="text-pink-500 mb-2" />
              <span className="mono">PWA</span>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center gap-4 text-[var(--ghost-muted)] transition-colors duration-300 hover:text-teal-400 cursor-pointer">
              <LayoutTemplate size={48} className="text-teal-500 mb-2" />
              <span className="mono">Extension</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-[50px] px-6 mb-[50px]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-6xl mx-auto py-20 px-10 rounded-[32px] bg-gradient-to-b from-[var(--smoke-mid)] to-[var(--ash-dark)] border border-white/5 text-center relative overflow-hidden shadow-[inset_0_0_100px_rgba(255,94,26,0.05)] border-[rgba(255,94,26,0.2)]"
        >
          <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-flame-glow)_0%,transparent_70%)] pointer-events-none"></div>
          
          <h2 className="font-display text-4xl sm:text-[64px] leading-tight mb-8 relative z-10">Your streak starts today.</h2>
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative z-10 flex mx-auto items-center justify-center px-8 py-4 rounded-xl font-semibold bg-[var(--flame-orange)] text-white shadow-[0_4px_20px_var(--color-flame-glow),inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_var(--color-flame-glow),inset_0_2px_0_rgba(255,255,255,0.2)] hover:brightness-110 transition-all duration-[0.4s] text-xl gap-3"
          >
             <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#ffffff" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#ffffff" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#ffffff" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#ffffff" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
            Sign in with Google
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-[var(--ghost-muted)] text-sm">
          <div className="font-display font-medium text-xl text-[var(--ghost-white)] flex items-center gap-2">
            <Flame className="text-[var(--flame-orange)]" fill="currentColor" strokeWidth={1.5} size={24} />
            str3q
            <span className="font-body font-normal text-sm text-[var(--ghost-muted)] ml-3 tracking-normal">Show up. Every day.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="smooth-hover hover:text-[var(--ghost-white)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="smooth-hover hover:text-[var(--ghost-white)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            <a href="#" className="smooth-hover hover:text-[var(--ghost-white)]"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
