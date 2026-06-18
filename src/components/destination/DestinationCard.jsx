import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function DestinationCard({ destination, className = '' }) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-[#dddddd] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {destination.popular && (
          <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-[#222222] shadow-sm">
            Popular
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-[#717171]">
          {destination.region}
        </p>
        <h3 className="mt-1 text-xl font-semibold text-[#222222]">{destination.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#717171]">
          {destination.description}
        </p>
        <p className="mt-3 text-sm font-medium text-[#222222]">
          {destination.stayCount} eco stays available
        </p>
        <Link to={`/listings?search=${encodeURIComponent(destination.name)}`} className="mt-4">
          <Button variant="primary" size="md" className="w-full">
            Explore
          </Button>
        </Link>
      </div>
    </article>
  );
}
