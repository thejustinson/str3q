"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { createClient } from "@/utils/supabase/client";
import { ICON_DICTIONARY, DEFAULT_ICONS, DynamicIcon } from "./DynamicIcon";

export function AddTaskModal({ isOpen, onClose, onAdded }: any) {
  const [taskName, setTaskName] = useState("");
  const [iconName, setIconName] = useState("Flame");
  const [frequency, setFrequency] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [playPop] = useSound("/pop.wav", { volume: 0.5 });
  const [playWhoosh] = useSound("/arrow-whoosh.wav", { volume: 0.5 });

  const getSuggestedIcons = (input: string) => {
    const text = input.toLowerCase();
    if (!text.trim()) return [...DEFAULT_ICONS, "Dumbbell", "BookOpen", "Code", "Coffee", "Heart"].slice(0, 8);
    
    const matched = ICON_DICTIONARY.filter(ic => ic.keywords.some(k => text.includes(k))).map(ic => ic.name);
    const results = Array.from(new Set([...matched, ...DEFAULT_ICONS]));
    return results.slice(0, 8);
  };

  const currentIcons = getSuggestedIcons(taskName);
  
  const submit = async () => {
     setLoading(true);
     playPop();
     try {
       const supabase = createClient();
       const { data: { user } } = await supabase.auth.getUser();
       if (!user) return;
       
       const { data, error } = await supabase.from('activities').insert({
         user_id: user.id,
         name: taskName,
         category: "General",
         emoji: iconName,
         frequency: frequency
       }).select().single();
       
       if (error) throw error;
       onAdded(data);
       setTaskName("");
       onClose();
     } catch (e) {
       console.error("Failed to add component", e);
     } finally {
       setLoading(false);
     }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
           />
           {/* Modal */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
             className="relative z-10 w-full max-w-md bg-[var(--ash-dark)] border border-white/10 shadow-2xl rounded-3xl p-8 text-[var(--ghost-white)] overflow-hidden"
           >
             <h2 className="text-2xl font-display font-bold mb-6">New Action</h2>

             <input 
              type="text" 
              value={taskName} 
              onChange={(e) => setTaskName(e.target.value)} 
              placeholder="e.g. Read 10 pages" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 mb-6 focus:outline-none focus:border-[var(--flame-orange)] text-xl font-medium"
            />
            
            <p className="text-[var(--ghost-muted)] mb-4 text-sm font-medium">Suggested icons</p>
            <div className="grid grid-cols-4 gap-3 pb-4 mb-6">
               {currentIcons.map((ico) => {
                  const ReactIcon = require("lucide-react")[ico];
                  const isSelected = iconName === ico;
                  return (
                    <button 
                      key={ico}
                      onClick={() => { playWhoosh(); setIconName(ico); }}
                      className={`aspect-square w-full rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                        isSelected 
                         ? 'bg-[var(--flame-glow)] border-2 border-[var(--flame-orange)] text-[var(--flame-orange)]' 
                         : 'bg-white/5 border border-white/5 text-[var(--ghost-muted)] hover:bg-white/10'
                      }`}
                    >
                      {ReactIcon ? <ReactIcon size={24} /> : null}
                    </button>
                  )
               })}
            </div>

            <label className="flex items-center gap-4 text-sm font-medium text-[var(--ghost-muted)] cursor-pointer mb-8 group justify-start w-max mx-auto px-4">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${frequency === 'today' ? 'bg-[var(--flame-orange)] border-[var(--flame-orange)] text-white shadow-[0_0_10px_rgba(255,94,26,0.5)]' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                 {frequency === 'today' && <DynamicIcon name="Check" size={14} />}
              </div>
              <span className="group-hover:text-white transition-colors">This is just for today</span>
              <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={frequency === 'today'} 
                  onChange={(e) => { playWhoosh(); setFrequency(e.target.checked ? 'today' : 'daily'); }}
              />
            </label>
            
            <div className="flex gap-4">
              <button onClick={onClose} className="flex-1 py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">Cancel</button>
              <button disabled={!taskName.trim() || loading} onClick={submit} className="flex-1 py-4 rounded-xl font-bold bg-[var(--flame-orange)] hover:brightness-110 disabled:opacity-50 transition-colors cursor-pointer">Add Task</button>
            </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
