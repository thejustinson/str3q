"use client";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicIcon } from "./DynamicIcon";
import { Flame } from "lucide-react";

export function StreakModal({ isOpen, onClose, task }: any) {
  if (!task) return null;

  // Generate 35 dummy days representing the last 5 weeks
  const mockDays = Array.from({ length: 35 }).map((_, i) => ({
      date: new Date(Date.now() - (34 - i) * 86400000),
      completed: Math.random() > 0.3 // MOCK: Real MVP DB mapping comes later
  }));

  return (
    <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" />
         <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative z-10 w-full max-w-lg bg-[var(--smoke-mid)] border border-white/5 shadow-[0_0_80px_rgba(255,94,26,0.15)] rounded-3xl p-8 text-[var(--ghost-white)]">
           <header className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[var(--flame-glow)] flex items-center justify-center text-[var(--flame-orange)] border border-[var(--flame-orange)]">
                 <DynamicIcon name={task.emoji || "Flame"} size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold">{task.name}</h2>
                <p className="text-[var(--flame-orange)] font-mono flex items-center gap-2 mt-1 font-bold"><Flame size={14} className="text-[var(--flame-orange)]"/> 12 Day Streak</p>
              </div>
           </header>
           
           <h3 className="text-[var(--ghost-muted)] text-sm mb-4 tracking-wide uppercase">Past Completions</h3>
           <div className="grid grid-cols-7 gap-2 mb-8">
              {mockDays.map((d, i) => (
                 <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold transition-all cursor-crosshair ${d.completed ? 'bg-[var(--flame-orange)] text-white shadow-[0_0_15px_rgba(255,94,26,0.4)]' : 'bg-black/20 text-[var(--ghost-muted)]'}`}>
                    {d.date.getDate()}
                 </div>
              ))}
           </div>
           
           <button onClick={onClose} className="w-full py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">Back to Dashboard</button>
         </motion.div>
      </div>
    )}
    </AnimatePresence>
  );
}
