const typeStyles = {
  success: 'bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800/60 text-green-800 dark:text-green-300',
  error: 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/60 text-red-800 dark:text-red-300',
  info: 'bg-white dark:bg-slate-800 border-[#dddddd] dark:border-slate-700 text-[#222222] dark:text-slate-100',
  warning: 'bg-[#FEF3C7] dark:bg-amber-950/40 border-[#F59E0B]/40 dark:border-amber-800/60 text-[#92400E] dark:text-amber-300',
};

export default function Toast({ message, type = 'info', onClose }) {
  return (
    <div className={`pointer-events-auto flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${typeStyles[type]}`} role="alert">
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={onClose} className="shrink-0 text-[#717171] dark:text-slate-400 hover:text-[#222222] dark:hover:text-slate-100 cursor-pointer" aria-label="Dismiss">✕</button>
    </div>
  );
}
