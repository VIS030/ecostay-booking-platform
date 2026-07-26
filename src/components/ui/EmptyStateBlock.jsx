import { Link } from 'react-router-dom';

/**
 * A polished, reusable empty-state component with icon, title, subtitle, and optional CTA.
 *
 * @param {string}  icon        — emoji or icon character
 * @param {string}  title       — heading text
 * @param {string}  description — supporting description
 * @param {string}  [actionLabel] — button text (optional)
 * @param {string}  [actionTo]    — link target (optional)
 * @param {Function} [onAction]   — click handler if no link (optional)
 */
export default function EmptyStateBlock({
  icon = '📭',
  title = 'Nothing here yet',
  description = '',
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-4xl shadow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#222222] dark:text-white mb-1">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm text-[#717171] dark:text-slate-400 mb-5">
          {description}
        </p>
      )}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="rounded-lg bg-[#2068a2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#174d78] transition-colors"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button
          onClick={onAction}
          className="rounded-lg bg-[#2068a2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#174d78] transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
