export default function ReviewCard({ review, className = '' }) {
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <article
      className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80 dark:bg-stone-900 dark:ring-stone-800 ${className}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={review.avatar || review.authorAvatar}
          alt={review.author || review.name}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-100 dark:ring-brand-900"
        />
        <div>
          <h4 className="font-semibold text-stone-900 dark:text-stone-100">
            {review.author || review.name}
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {review.location || formattedDate}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-0.5 text-brand-600 dark:text-brand-400">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
      {review.property && (
        <p className="mt-3 text-xs font-medium text-brand-600 dark:text-brand-400">
          Stayed at {review.property}
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
        &ldquo;{review.text}&rdquo;
      </p>
    </article>
  );
}
