import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [activeField, setActiveField] = useState(null);

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

  if (variant === 'agoda') {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col gap-3 sm:flex-row ${className}`}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, property, or destination"
          className="flex-1 rounded-lg border-0 bg-white px-4 py-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="rounded-lg border-0 bg-white px-4 py-3 text-sm shadow-sm" />
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="rounded-lg border-0 bg-white px-4 py-3 text-sm shadow-sm" />
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="rounded-lg border-0 bg-white px-4 py-3 text-sm shadow-sm">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-[#ff6600] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#e55c00]">
          SEARCH
        </button>
      </form>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`flex overflow-hidden rounded-full border border-[#dddddd] bg-white shadow-sm ${className}`}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search destinations"
          className="flex-1 px-5 py-3 text-sm focus:outline-none"
        />
        <button type="submit" className="m-1.5 flex items-center gap-2 rounded-full bg-[#ff385c] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e31c5f]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </form>
    );
  }

  const fieldClass = (field) =>
    `flex-1 cursor-pointer rounded-full px-6 py-3 transition-shadow ${
      activeField === field ? 'bg-white shadow-[0_0_0_2px_#222222]' : 'hover:bg-[#ebebeb] hover:shadow-sm'
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto flex w-full max-w-[850px] items-center rounded-full border border-[#dddddd] bg-[#f7f7f7] p-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.12)] ${className}`}
    >
      <div className={fieldClass('where')} onClick={() => setActiveField('where')}>
        <label className="block text-xs font-bold text-[#222222]">Where</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setActiveField('where')}
          placeholder="Search destinations"
          className="w-full bg-transparent text-sm text-[#717171] placeholder:text-[#717171] focus:outline-none"
        />
      </div>
      <div className="hidden h-8 w-px bg-[#dddddd] sm:block" />
      <div className={`hidden sm:block ${fieldClass('in')}`} onClick={() => setActiveField('in')}>
        <label className="block text-xs font-bold text-[#222222]">Check in</label>
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} onFocus={() => setActiveField('in')} className="w-full bg-transparent text-sm text-[#717171] focus:outline-none" />
      </div>
      <div className="hidden h-8 w-px bg-[#dddddd] md:block" />
      <div className={`hidden md:block ${fieldClass('out')}`} onClick={() => setActiveField('out')}>
        <label className="block text-xs font-bold text-[#222222]">Check out</label>
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} onFocus={() => setActiveField('out')} className="w-full bg-transparent text-sm text-[#717171] focus:outline-none" />
      </div>
      <div className="hidden h-8 w-px bg-[#dddddd] lg:block" />
      <div className={`hidden lg:block ${fieldClass('who')}`} onClick={() => setActiveField('who')}>
        <label className="block text-xs font-bold text-[#222222]">Who</label>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} onFocus={() => setActiveField('who')} className="w-full bg-transparent text-sm text-[#717171] focus:outline-none">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="ml-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff385c] text-white hover:bg-[#e31c5f]"
        aria-label="Search"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}
