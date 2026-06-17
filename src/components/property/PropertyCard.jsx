import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PropertyCard({ property, className = '' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const locationLabel = `${property.location.city}, ${property.location.country}`;

  return (
    <article
      className={`group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-stone-900 dark:ring-stone-800 ${className}`}
    >
      <Link to={`/properties/${property.slug || property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {property.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              Featured
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur-sm transition-transform hover:scale-110 dark:bg-stone-900/90"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-stone-900 dark:text-stone-100">
                {property.title}
              </h3>
              <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">{locationLabel}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-sm">
              <span className="text-brand-600 dark:text-brand-400">★</span>
              <span className="font-medium text-stone-800 dark:text-stone-200">{property.rating}</span>
              <span className="text-stone-400">({property.reviewCount})</span>
            </div>
          </div>

          <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">{property.propertyType}</p>

          <p className="mt-3 text-stone-800 dark:text-stone-200">
            <span className="font-semibold">${property.price}</span>
            <span className="text-sm text-stone-500 dark:text-stone-400"> / night</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
