"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CoreContextMenu } from "./CoreContextMenu";
import useSound from "use-sound";
import { createClient } from "@/utils/supabase/client";
import { DynamicIcon } from "./DynamicIcon";
import { AddTaskModal } from "./AddTaskModal";
import { StreakModal } from "./StreakModal";
import { Logo } from "@/components/Logo";
import { Plus, Users, Lock } from "lucide-react";

export function DashboardClient({ user, profile, initialActivities, initialCompletions = [] }: any) {
  const [tasks, setTasks] = useState(initialActivities || []);
  const [completedIds, setCompletedIds] = useState<string[]>(initialCompletions);
  const [globalStreak, setGlobalStreak] = useState(profile.global_streak || 0);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewingTask, setViewingTask] = useState<any>(null);
  
  const [playPop] = useSound("/pop.wav", { volume: 0.5 });
  const [playSuccess] = useSound("/game-success.wav", { volume: 0.5 });
  const [playWhoosh] = useSound("/arrow-whoosh.wav", { volume: 0.5 });
  const supabase = createClient();

  const handleComplete = async (taskId: string, taskName: string) => {
     if (completedIds.includes(taskId)) return; // Already completed today!

     playSuccess();
     setCompletedIds([...completedIds, taskId]);
     
     // Optimistically push to DB
     const { error } = await supabase.from('completions').insert({
         activity_id: taskId,
         user_id: user.id
     });
     if (error) console.error("Failed completion", error);
     
     // First completion of the day triggers the Global Streak bump!
     if (completedIds.length === 0) {
        setGlobalStreak((prev: number) => prev + 1);
        await supabase.from('profiles').update({ 
           global_streak: globalStreak + 1,
           last_active_date: new Date().toISOString().split('T')[0]
        }).eq('id', user.id);
     }
  };

  const executeDelete = async (taskId: string, taskName: string) => {
     playPop();
     setTasks(tasks.filter((t: any) => t.id !== taskId));
     const { error } = await supabase.from('activities').delete().eq('id', taskId);
     if (error) alert("Could not delete task completely.");
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[var(--ash-dark)] text-[var(--ghost-white)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        <section>
          {/* Main Dashboard */}
          <header className="flex justify-between items-center mb-12 pb-8 border-b border-white/5">
             <div>
                <h1 className="text-4xl font-display font-bold">What's up, @{profile.username}</h1>
                <p className="text-[var(--ghost-muted)] mt-2 font-mono flex items-center gap-2">
                   <Logo size={16} className={completedIds.length > 0 ? "text-[var(--flame-orange)]" : "text-[var(--ghost-muted)]"} /> 
                   {globalStreak} Day General Streak
                </p>
             </div>
             <div className="w-16 h-16 bg-[var(--smoke-mid)] rounded-full border-2 border-[var(--flame-orange)] overflow-hidden shadow-[0_0_20px_rgba(255,94,26,0.2)]">
                 <img src={profile.avatar_url || "/mascot.png"} alt="Avatar" className="w-full h-full object-cover" />
             </div>
          </header>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-medium">Your Routine</h2>
            <button onClick={() => { playWhoosh(); setIsAddOpen(true); }} className="px-4 py-2 bg-[var(--flame-orange)] text-white font-bold rounded-xl flex items-center gap-2 hover:brightness-110 shadow-[0_4px_20px_rgba(255,94,26,0.3)] transition-all cursor-pointer">
               <Plus size={18} /> Add Role
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
             <AnimatePresence>
               {tasks.length === 0 ? (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="bg-[var(--smoke-mid)] border border-white/5 rounded-2xl p-8 text-center text-[var(--ghost-muted)] border-dashed border-2 cursor-pointer hover:bg-white/5" onClick={() => setIsAddOpen(true)}>
                     You don't have any routines set. Click here to trace your first habit!
                  </motion.div>
               ) : (
                  tasks.map((task: any, i: number) => {
                    const isDone = completedIds.includes(task.id);
                    return (
                    <CoreContextMenu 
                      key={task.id} 
                      onComplete={isDone ? undefined : () => handleComplete(task.id, task.name)} 
                      onDelete={() => executeDelete(task.id, task.name)}
                    >
                       <motion.div 
                          layout
                          onClick={() => { playWhoosh(); setViewingTask(task); }}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                          className={`bg-[var(--smoke-mid)] border rounded-2xl p-6 flex items-center justify-between transition-all shadow-sm cursor-pointer group ${isDone ? 'opacity-40 border-transparent grayscale' : 'border-white/5 hover:border-white/10'}`}
                        >
                          <div className="flex items-center gap-5">
                             <div className={`p-3 rounded-xl border text-opacity-80 ${isDone ? 'bg-black/20 border-white/5 text-[var(--ghost-muted)]' : 'text-[var(--flame-orange)] bg-[var(--flame-glow)] border-[var(--flame-orange)]'}`}>
                                <DynamicIcon name={task.emoji || 'Flame'} size={28} />
                             </div>
                             <div>
                                <h3 className={`font-semibold text-xl transition-colors ${isDone ? 'line-through text-[var(--ghost-muted)]' : 'group-hover:text-[var(--flame-orange)]'}`}>
                                   {task.name}
                                </h3>
                                <p className="text-[var(--ghost-muted)] text-sm uppercase tracking-wide flex items-center gap-2">
                                  {task.category} <span className="opacity-50">•</span> {task.frequency || 'Daily'}
                                </p>
                             </div>
                          </div>
                          
                          {isDone ? (
                            <div className="h-12 w-12 rounded-full flex items-center justify-center text-[var(--ghost-muted)]">
                               <Lock size={20} />
                            </div>
                          ) : (
                            <button 
                               onClick={(e) => { e.stopPropagation(); handleComplete(task.id, task.name); }} 
                               className="h-12 w-12 rounded-full border border-[var(--flame-orange)] bg-[var(--flame-glow)] flex items-center justify-center hover:scale-110 hover:bg-[var(--flame-orange)] hover:text-white text-[var(--flame-orange)] transition-all cursor-pointer shadow-[0_0_15px_rgba(255,94,26,0.3)]"
                            >
                               <DynamicIcon name="Check" size={20} />
                            </button>
                          )}
                       </motion.div>
                    </CoreContextMenu>
                  )})
               )}
             </AnimatePresence>
          </div>
        </section>

        {/* Social Feed Sidebar */}
        <aside className="lg:border-l border-white/5 lg:pl-12 py-4">
           <div className="flex items-center gap-3 mb-8 text-[var(--ghost-muted)]">
              <Users size={20} />
              <h3 className="font-semibold tracking-wide uppercase text-sm">Friends</h3>
           </div>
           
           <div className="bg-[var(--smoke-mid)] border border-white/5 rounded-2xl p-6 mb-6 text-center text-sm text-[var(--ghost-muted)]">
              It's quiet in here. Search a friend's handle to start an accountability link.
           </div>
           
           <button onClick={() => playPop()} className="w-full py-3 bg-white/5 text-[var(--ghost-white)] rounded-xl font-semibold border border-white/10 hover:bg-white/10 transition-colors text-sm cursor-pointer">
              Find Friends
           </button>
        </aside>
      </div>

      <AddTaskModal isOpen={isAddOpen} onClose={() => { playWhoosh(); setIsAddOpen(false); }} onAdded={(newTask: any) => setTasks([...tasks, newTask])} />
      <StreakModal isOpen={!!viewingTask} onClose={() => { playWhoosh(); setViewingTask(null); }} task={viewingTask} />

    </div>
  );
}
