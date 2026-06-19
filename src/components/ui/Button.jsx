const variants = {
  primary:
    'bg-[#2068a2] text-white hover:bg-[#174d78] shadow-sm',
  agoda:
    'bg-[#F59E0B] text-white hover:bg-[#D97706] shadow-sm',
  secondary:
    'bg-[#2068a2] text-white hover:bg-[#174d78]',
  outline:
    'border border-[#2068a2] text-[#2068a2] bg-white hover:bg-[#e8f2fa]',
  ghost:
    'text-[#222222] hover:text-[#2068a2] hover:bg-[#e8f2fa]',
  danger:
    'bg-red-600 text-white hover:bg-red-700',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg font-semibold',
  md: 'px-5 py-2.5 text-sm rounded-lg font-semibold',
  lg: 'px-6 py-3 text-base rounded-lg font-semibold',
  pill: 'px-6 py-3 text-sm rounded-full font-semibold',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-150 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2068a2] focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
