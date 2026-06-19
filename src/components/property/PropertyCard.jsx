import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HeartIcon } from '../layout/Navbar';

function StarIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-3 w-3 fill-[#222222]">
      <path d="M15.994 3.006a1 1 0 0 1 1.012 0l4.488 2.676 5.012.744a1 1 0 0 1 .554 1.664l-3.627 3.62 1.856 5.395a1 1 0 0 1-1.451 1.054L16 15.006l-4.838 2.153a1 1 0 0 1-1.451-1.054l1.856-5.395-3.627-3.62a1 1 0 0 1 .554-1.664l5.012-.744 4.488-2.676z" />
    </svg>
  );
}

export default function PropertyCard({ property, variant = 'airbnb', className = '' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const locationLabel = `${property.location.city}, ${property.location.country}`;
  const images = property.images || [];
  const agodaScore = (property.rating * 2).toFixed(1);

  if (variant === 'agoda') {
    return (
      <article className={`flex flex-col overflow-hidden rounded-lg border border-[#dddddd] bg-white transition-shadow hover:shadow-lg sm:flex-row ${className}`}>
        <Link to={`/properties/${property.slug || property.id}`} className="relative shrink-0 sm:w-[280px]">
          <img
            src={images[0]}
            alt={property.title}
            className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto sm:min-h-[200px]"
            loading="lazy"
          />
          {property.featured && (
            <span className="absolute left-0 top-3 bg-[#F59E0B] px-2 py-1 text-xs font-bold text-white">
              HOT DEAL
            </span>
          )}
        </Link>
        <div className="flex flex-1 flex-col justify-between p-4 sm:flex-row sm:gap-4">
          <div className="flex-1">
            <Link to={`/properties/${property.slug || property.id}`}>
              <h3 className="text-lg font-bold text-[#222222] hover:text-[#2068a2] hover:underline">{property.title}</h3>
            </Link>
            <p className="mt-1 text-sm text-[#717171]">{locationLabel}</p>
            <p className="mt-1 text-xs text-[#717171]">{property.propertyType}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {property.amenities.slice(0, 4).map((a) => (
                <span key={a} className="rounded bg-[#f0f0f0] px-2 py-0.5 text-xs text-[#717171]">{a}</span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded bg-[#2068a2] px-2 py-1 text-sm font-bold text-white">{agodaScore}</span>
              <span className="text-sm font-semibold text-[#222222]">Excellent</span>
              <span className="text-xs text-[#717171]">({property.reviewCount} reviews)</span>
            </div>
          </div>
          <div className="mt-4 flex shrink-0 flex-col items-end justify-between border-t border-[#eeeeee] pt-4 sm:mt-0 sm:border-0 sm:pt-0 sm:text-right">
            <div>
              <p className="text-xs text-[#717171]">From</p>
              <p className="text-2xl font-bold text-[#F59E0B]">${property.price}</p>
              <p className="text-xs text-[#717171]">per night</p>
            </div>
            <Link
              to={`/properties/${property.slug || property.id}`}
              className="mt-3 rounded bg-[#2068a2] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#174d78]"
            >
              CHOOSE ROOM
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`group cursor-pointer ${className}`}>
      <Link to={`/properties/${property.slug || property.id}`} className="block">
        <div className="relative mb-3 aspect-square overflow-hidden rounded-xl">
          <img
            src={images[imageIndex] || images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setImageIndex((i) => (i - 1 + images.length) % images.length); }}
                className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-opacity group-hover:opacity-100"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setImageIndex((i) => (i + 1) % images.length); }}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-opacity group-hover:opacity-100"
              >
                ›
              </button>
            </>
          )}
          {property.featured && (
            <span className="absolute left-3 top-3 rounded bg-white px-2 py-1 text-xs font-semibold text-[#222222] shadow">
              Guest favorite
            </span>
          )}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
            className="absolute right-3 top-3 text-white drop-shadow-md"
            aria-label="Save to wishlist"
          >
            <HeartIcon filled={isWishlisted} />
          </button>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-semibold text-[#222222]">{property.location.city}, {property.location.country}</h3>
            <span className="flex shrink-0 items-center gap-0.5 text-sm">
              <StarIcon />
              <span>{property.rating}</span>
            </span>
          </div>
          <p className="truncate text-sm text-[#717171]">{property.title}</p>
          <p className="truncate text-sm text-[#717171]">{property.propertyType}</p>
          <p className="mt-0.5 text-sm">
            <span className="font-semibold text-[#222222]">${property.price}</span>
            <span className="text-[#717171]"> night</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
