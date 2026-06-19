import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, hint, className = '', containerClassName = '', id, ...props }, ref) {
  const inputId = id || props.name;
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && <label htmlFor={inputId} className="text-sm font-semibold text-[#222222]">{label}</label>}
      <input
        ref={ref}
        id={inputId}
        className={`w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-sm text-[#222222] focus:border-[#2068a2] focus:outline-none focus:ring-1 focus:ring-[#2068a2] ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-[#717171]">{hint}</p>}
    </div>
  );
});

export default Input;
