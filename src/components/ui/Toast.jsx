const typeStyles = {
  success: 'bg-brand-50 border-brand-200 text-brand-800 dark:bg-brand-950 dark:border-brand-800 dark:text-brand-200',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
  info: 'bg-stone-50 border-stone-200 text-stone-800 dark:bg-stone-900 dark:border-stone-700 dark:text-stone-200',
  warning: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200',
};

const icons = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
};

export default function Toast({ message, type = 'info', onClose }) {
  return (
    <div
      className={`
        pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg
        backdrop-blur-sm transition-all duration-300
        ${typeStyles[type]}
      `}
      role="alert"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/50 text-sm font-bold dark:bg-black/20">
        {icons[type]}
      </span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 rounded p-1 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
