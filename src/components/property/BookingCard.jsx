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
      ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
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
      className={`sticky top-28 rounded-xl border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] ${className}`}
    >
      <div className="flex items-baseline gap-1">
        <span className="text-[22px] font-semibold text-[#222222] dark:text-slate-100">${property.price}</span>
        <span className="text-[#717171] dark:text-slate-400"> night</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-[#b0b0b0] dark:border-slate-700">
        <div className="grid grid-cols-2 border-b border-[#b0b0b0] dark:border-slate-700">
          <label className="border-r border-[#b0b0b0] dark:border-slate-700 p-3">
            <span className="block text-[10px] font-bold uppercase text-[#222222] dark:text-slate-350">Check-in</span>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-1 w-full bg-transparent text-sm text-[#222222] dark:text-white focus:outline-none" />
          </label>
          <label className="p-3">
            <span className="block text-[10px] font-bold uppercase text-[#222222] dark:text-slate-350">Checkout</span>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 w-full bg-transparent text-sm text-[#222222] dark:text-white focus:outline-none" />
          </label>
        </div>
        <label className="block p-3">
          <span className="block text-[10px] font-bold uppercase text-[#222222] dark:text-slate-350">Guests</span>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="mt-1 w-full bg-transparent text-sm text-[#222222] dark:text-white focus:outline-none">
            {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n} className="dark:bg-slate-800 dark:text-white">{n} guest{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </label>
      </div>

      <Button className="mt-4 w-full rounded-lg" size="lg" onClick={handleReserve}>
        Reserve
      </Button>
      <p className="mt-3 text-center text-sm text-[#717171] dark:text-slate-400">You won&apos;t be charged yet</p>

      {nights > 0 && (
        <div className="mt-6 space-y-3 border-t border-[#dddddd] dark:border-slate-800 pt-4 text-sm dark:text-slate-300">
          <div className="flex justify-between">
            <span className="underline text-[#717171] dark:text-slate-400">${property.price} x {nights} nights</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-[#717171] dark:text-slate-400">
            <span>EcoStay service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className="flex justify-between border-t border-[#dddddd] dark:border-slate-800 pt-3 font-semibold">
            <span>Total before taxes</span>
            <span>${total}</span>
          </div>
        </div>
      )}
    </aside>
  );
}
