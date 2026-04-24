"use client";

export function GlobalInteraction({ children }: { children: React.ReactNode }) {
  return (
    <main 
      className="flex-1 flex flex-col min-h-screen"
      onContextMenu={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
        e.preventDefault();
      }}
    >
      {children}
    </main>
  );
}
