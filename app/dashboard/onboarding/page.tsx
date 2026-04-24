"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { ICON_DICTIONARY, DEFAULT_ICONS, DynamicIcon } from "@/components/DynamicIcon";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [taskName, setTaskName] = useState("");
  const [iconName, setIconName] = useState("Flame");
  const [frequency, setFrequency] = useState("daily"); // 'daily' | 'today'
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  
  const [playPop] = useSound("/pop.wav", { volume: 0.5 }); 
  const [playWhoosh] = useSound("/arrow-whoosh.wav", { volume: 0.5 });
  const [playSuccess] = useSound("/game-success.wav", { volume: 0.5 });

  const getSuggestedIcons = (input: string) => {
    const text = input.toLowerCase();
    if (!text.trim()) return [...DEFAULT_ICONS, "Dumbbell", "BookOpen", "Code", "Coffee", "Heart"].slice(0, 8);
    
    const matched = ICON_DICTIONARY.filter(ic => ic.keywords.some(k => text.includes(k))).map(ic => ic.name);
    const results = Array.from(new Set([...matched, ...DEFAULT_ICONS]));
    return results.slice(0, 8);
  };

  const currentIcons = getSuggestedIcons(taskName);

  const nextStep = () => {
    playWhoosh();
    setStep((s) => s + 1);
  };

  const submit = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw new Error(`Auth Error: ${userError.message}`);
      if (!user) throw new Error("No active user session found. Try refreshing the page.");
      
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        username: username.toLowerCase().replace(/\s+/g, ""), // simple slugify
        display_name: username,
        avatar_url: "/mascot.png"
      });

      if (profileError) throw new Error(`Database rejected profile: ${profileError.message}`);

      if (taskName.trim()) {
        const { error: activityError } = await supabase.from('activities').insert({
          user_id: user.id,
          name: taskName,
          category: "General",
          emoji: iconName,
          frequency: frequency
        });
        if (activityError) throw new Error(`Database rejected activity: ${activityError.message}`);
      }
      
      try { playSuccess(); } catch (e) { console.warn("Audio failed:", e); }
      
      // Hard redirect to bypass App Router caching loops completely on first auth
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Submission failed:", error);
      alert(`Submission failed: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ash-dark)] text-white p-6 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-md w-full bg-[var(--smoke-mid)] rounded-3xl p-8 border border-white/5 text-center">
            <h1 className="text-3xl font-display font-bold mb-4">Choose your handle</h1>
            <p className="text-[var(--ghost-muted)] mb-8">What should your friends call you?</p>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="@username" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 mb-6 text-center focus:outline-none focus:border-[var(--flame-orange)] text-xl font-mono"
            />
            <button 
              disabled={!username.trim()} 
              onClick={() => { playPop(); nextStep(); }} 
              className="w-full bg-[var(--flame-orange)] py-4 rounded-xl font-bold cursor-pointer disabled:opacity-50 hover:brightness-110"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-md w-full bg-[var(--smoke-mid)] rounded-3xl p-8 border border-white/5 text-center">
            <h1 className="text-3xl font-display font-bold mb-4">Set your avatar</h1>
            <p className="text-[var(--ghost-muted)] mb-8">You're rolling with the mascot for now.</p>
            <div className="w-32 h-32 bg-[var(--ash-dark)] rounded-full mx-auto mb-8 border-4 border-[var(--flame-orange)] overflow-hidden shadow-[0_0_30px_rgba(255,94,26,0.3)] p-2">
                <img src="/mascot.png" alt="Mascot Avatar" className="w-full h-full object-cover rounded-full" />
            </div>
            <button 
              onClick={() => { playPop(); nextStep(); }} 
              className="w-full bg-[var(--flame-orange)] py-4 rounded-xl font-bold cursor-pointer hover:brightness-110"
            >
              Looking good
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-md w-full bg-[var(--smoke-mid)] rounded-3xl p-8 border border-white/5 text-center">
            <h1 className="text-3xl font-display font-bold mb-4">Your first task</h1>
            <p className="text-[var(--ghost-muted)] mb-8">What's one thing you want to do?</p>
            
            <input 
              type="text" 
              value={taskName} 
              onChange={(e) => setTaskName(e.target.value)} 
              placeholder="e.g. Read 10 pages" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 mb-6 text-center focus:outline-none focus:border-[var(--flame-orange)] text-xl"
            />
            
            <p className="text-[var(--ghost-muted)] mb-4 text-sm font-medium text-left">Suggested icons</p>
            <div className="grid grid-cols-4 gap-3 pb-4 mb-6">
               {currentIcons.map((ico) => {
                  /* Dynamically load the icon component for the preview */
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
                      {ReactIcon ? <ReactIcon size={28} /> : null}
                    </button>
                  )
               })}
            </div>

            <label className="flex items-center justify-center gap-4 text-sm font-medium text-[var(--ghost-muted)] cursor-pointer mb-8 group w-max mx-auto px-4">
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

            <button 
              disabled={loading || !taskName.trim()} 
              onClick={() => { playPop(); submit(); }} 
              className="w-full bg-[var(--flame-orange)] py-4 rounded-xl font-bold cursor-pointer disabled:opacity-50 hover:brightness-110 flex justify-center items-center gap-2"
            >
              {loading ? "Starting streak..." : "Let's Go 🔥"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
