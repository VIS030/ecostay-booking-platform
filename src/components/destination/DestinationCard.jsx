import { Link } from 'react-router-dom';

export default function DestinationCard({ destination, className = '' }) {
  return (
    <Link
      to={`/listings?search=${encodeURIComponent(destination.name)}`}
      className={`group relative block overflow-hidden rounded-2xl ${className}`}
    >
      <div className="aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="font-display text-xl font-semibold">{destination.name}</h3>
        <p className="mt-1 text-sm text-stone-200">{destination.description}</p>
        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-brand-300">
          {destination.propertyCount} stays
        </p>
      </div>
    </Link>
  );
}
