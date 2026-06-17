import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function SearchBar({
  variant = 'hero',
  defaultLocation = '',
  defaultCheckIn = '',
  defaultCheckOut = '',
  defaultGuests = 2,
  onSearch,
  className = '',
}) {
  const navigate = useNavigate();
  const [location, setLocation] = useState(defaultLocation);
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(defaultGuests);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('search', location);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);

    if (onSearch) {
      onSearch({ location, checkIn, checkOut, guests });
    } else {
      navigate(`/listings?${params.toString()}`);
    }
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search destinations..."
          className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
        />
        <Button type="submit" size="md">
          Search
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        mx-auto grid w-full max-w-4xl gap-3 rounded-2xl bg-white p-3 shadow-xl
        ring-1 ring-stone-200/80 dark:bg-stone-900 dark:ring-stone-700
        sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_auto]
        ${className}
      `}
    >
      <div className="rounded-xl px-4 py-2 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50">
        <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where to?"
          className="mt-0.5 w-full bg-transparent text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none dark:text-stone-100"
        />
      </div>
      <div className="rounded-xl px-4 py-2 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50">
        <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Check in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="mt-0.5 w-full bg-transparent text-sm text-stone-800 focus:outline-none dark:text-stone-100 dark:[color-scheme:dark]"
        />
      </div>
      <div className="rounded-xl px-4 py-2 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50">
        <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Check out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="mt-0.5 w-full bg-transparent text-sm text-stone-800 focus:outline-none dark:text-stone-100 dark:[color-scheme:dark]"
        />
      </div>
      <div className="rounded-xl px-4 py-2 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50">
        <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-0.5 w-full bg-transparent text-sm text-stone-800 focus:outline-none dark:text-stone-100"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n} guest{n > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" size="lg" className="sm:col-span-2 lg:col-span-1 lg:self-center">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </Button>
    </form>
  );
}
