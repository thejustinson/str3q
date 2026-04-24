"use client";
import * as ContextMenu from '@radix-ui/react-context-menu';

export function CoreContextMenu({ children, onComplete, onDelete, onSendNudge, extraItems }: any) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="min-w-[200px] bg-[rgba(30,30,30,0.8)] backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden text-[var(--ghost-white)] font-medium z-50">
          
          {onComplete && (
            <ContextMenu.Item onSelect={onComplete} className="px-4 py-3 outline-none hover:bg-[var(--flame-glow)] text-white font-bold rounded-xl cursor-pointer transition-colors">
              Mark Complete 🔥
            </ContextMenu.Item>
          )}

          {onSendNudge && (
            <ContextMenu.Item onSelect={onSendNudge} className="px-4 py-3 outline-none hover:bg-[var(--flame-glow)] text-[var(--flame-orange)] rounded-xl cursor-pointer transition-colors">
              Send Nudge
            </ContextMenu.Item>
          )}
          
          {onDelete && (
             <ContextMenu.Item onSelect={onDelete} className="px-4 py-3 outline-none hover:bg-red-500/20 text-red-400 rounded-xl cursor-pointer transition-colors mt-1 border-t border-white/5">
                Delete
             </ContextMenu.Item>
          )}
          
          {extraItems && extraItems.map((item: any, i: number) => (
             <ContextMenu.Item key={i} onSelect={item.action} className="px-4 py-3 outline-none hover:bg-white/10 rounded-xl cursor-pointer transition-colors">
               {item.label}
             </ContextMenu.Item>
          ))}

        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
