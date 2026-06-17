import { useState } from 'react';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export default function BookingCard({ property, className = '' }) {
  const { showToast } = useToast();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
        )
      : 0;

  const subtotal = nights * property.price;
  const serviceFee = nights ? Math.round(subtotal * 0.12) : 0;
  const total = subtotal + serviceFee;

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      showToast({ message: 'Please select check-in and check-out dates', type: 'warning' });
      return;
    }
    showToast({ message: 'Booking request sent! (Demo mode)', type: 'success' });
  };

  return (
    <aside
      className={`sticky top-24 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-stone-200/80 dark:bg-stone-900 dark:ring-stone-800 ${className}`}
    >
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          ${property.price}
        </span>
        <span className="text-stone-500 dark:text-stone-400">/ night</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700">
        <div className="grid grid-cols-2 border-b border-stone-200 dark:border-stone-700">
          <label className="border-r border-stone-200 p-3 dark:border-stone-700">
            <span className="block text-[10px] font-bold uppercase tracking-wide text-stone-500">
              Check in
            </span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm focus:outline-none dark:[color-scheme:dark]"
            />
          </label>
          <label className="p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wide text-stone-500">
              Check out
            </span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm focus:outline-none dark:[color-scheme:dark]"
            />
          </label>
        </div>
        <label className="block p-3">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-stone-500">
            Guests
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full bg-transparent text-sm focus:outline-none"
          >
            {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} guest{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Button className="mt-4 w-full" size="lg" onClick={handleReserve}>
        Reserve
      </Button>
      <p className="mt-2 text-center text-xs text-stone-500">You won&apos;t be charged yet</p>

      {nights > 0 && (
        <div className="mt-6 space-y-3 border-t border-stone-200 pt-4 text-sm dark:border-stone-700">
          <div className="flex justify-between">
            <span className="text-stone-600 underline dark:text-stone-400">
              ${property.price} × {nights} nights
            </span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-600 dark:text-stone-400">EcoStay service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-3 font-semibold dark:border-stone-700">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-3 rounded-xl bg-brand-50 p-3 dark:bg-brand-950/50">
        <span className="text-lg">🌱</span>
        <p className="text-xs text-brand-800 dark:text-brand-200">
          This booking is 100% carbon-neutral. We offset all emissions from your stay.
        </p>
      </div>
    </aside>
  );
}
