import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    icon,
    className = '',
    containerClassName = '',
    id,
    ...props
  },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-stone-700 dark:text-stone-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm
            text-stone-800 placeholder:text-stone-400
            transition-all duration-200
            focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20
            dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500
            dark:focus:border-brand-400 dark:focus:ring-brand-400/20
            disabled:cursor-not-allowed disabled:opacity-50
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-stone-500 dark:text-stone-400">{hint}</p>}
    </div>
  );
});

export default Input;
