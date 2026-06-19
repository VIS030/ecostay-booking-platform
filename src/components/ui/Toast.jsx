const typeStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-white border-[#dddddd] text-[#222222]',
  warning: 'bg-[#FEF3C7] border-[#F59E0B]/40 text-[#92400E]',
};

export default function Toast({ message, type = 'info', onClose }) {
  return (
    <div className={`pointer-events-auto flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${typeStyles[type]}`} role="alert">
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={onClose} className="shrink-0 text-[#717171] hover:text-[#222222]" aria-label="Dismiss">✕</button>
    </div>
  );
}
