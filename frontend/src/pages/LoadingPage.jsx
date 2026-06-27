export const LoadingPage = () => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="glass-panel flex min-w-[280px] flex-col items-center gap-4 px-8 py-7 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700/80 border-t-cyan-400 animate-spin" />
          <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
        </div>

        <div>
          <p className="text-xl font-extrabold text-slate-100">Loading</p>
          <p className="mt-1 max-w-xs text-sm text-slate-400">
            Please wait while we sync your learning data.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Processing
        </div>
      </div>
    </div>
  );
};
