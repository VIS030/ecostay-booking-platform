import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import apiClient from '../services/api';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';

export default function BookingConfirmationPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('id');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingId) {
      setError('Missing booking reservation ID');
      setLoading(false);
      return;
    }
    setLoading(true);
    apiClient.get(`/bookings/${bookingId}`)
      .then(setBooking)
      .catch((err) => {
        setError(err.message || 'Failed to load booking details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="mx-auto max-w-[500px] px-6 py-16 text-center dark:text-slate-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 mx-auto mb-4">
          ⚠
        </div>
        <h1 className="text-2xl font-bold">Booking Not Found</h1>
        <p className="mt-2 text-[#717171] dark:text-slate-400">
          {error || 'The requested booking reservation could not be located.'}
        </p>
        <Link to="/listings" className="mt-6 inline-block">
          <Button variant="primary">Explore stays</Button>
        </Link>
      </div>
    );
  }

  const inrTotal = Math.round(booking.total * 83);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#f7f7f7] dark:bg-slate-950 px-6 py-12 transition-colors duration-200">
      <div className="mx-auto max-w-[640px] rounded-2xl border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
        <div className="text-center pb-6 border-b border-[#dddddd] dark:border-slate-800">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 mb-4 text-2xl font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-[#222222] dark:text-white">Payment Successful</h1>
          <p className="text-sm font-semibold text-[#16A34A] mt-1 uppercase tracking-wide">Booking Confirmed</p>
          <p className="mt-2 text-xs text-[#717171] dark:text-slate-400">
            Booking ID: <code className="bg-[#f7f7f7] dark:bg-slate-850 px-1.5 py-0.5 rounded font-mono text-[#ff6600] font-semibold">{booking.id}</code>
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 py-4 border-b border-[#dddddd] dark:border-slate-800">
          <img 
            src={booking.propertyImage} 
            alt={booking.propertyTitle} 
            className="h-28 w-full sm:w-36 rounded-xl object-cover" 
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-[#222222] dark:text-white">{booking.propertyTitle}</h3>
            <p className="text-sm text-[#717171] dark:text-slate-400 mt-0.5">{booking.location}</p>
            <p className="text-xs font-semibold bg-[#2068a2]/15 text-[#2068a2] dark:text-blue-450 dark:bg-blue-950/30 w-max px-2.5 py-1 rounded-md mt-3 uppercase">
              Confirmed Stay
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-y-4 text-sm py-2">
          <div>
            <p className="text-[#717171] dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Check-in</p>
            <p className="mt-1 font-semibold text-[#222222] dark:text-slate-200">{booking.checkIn}</p>
          </div>
          <div>
            <p className="text-[#717171] dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Check-out</p>
            <p className="mt-1 font-semibold text-[#222222] dark:text-slate-200">{booking.checkOut}</p>
          </div>
          <div>
            <p className="text-[#717171] dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Guests</p>
            <p className="mt-1 font-semibold text-[#222222] dark:text-slate-200">{booking.guests} Guests</p>
          </div>
          <div>
            <p className="text-[#717171] dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Payment Paid</p>
            <p className="mt-1 font-bold text-[#16a34a] dark:text-emerald-450 text-base">
              ${booking.total} <span className="text-xs font-normal text-[#717171] dark:text-slate-400"> (₹{inrTotal.toLocaleString()})</span>
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/20 p-4 text-sm text-[#14532D] dark:text-emerald-300">
          <h4 className="font-semibold text-emerald-800 dark:text-emerald-250">Check-in Instructions</h4>
          <p className="mt-1.5 leading-relaxed text-xs">
            Your host will reach out to organize keys and local recommendations before arrival. You can access all receipt details and check-in updates inside your dashboard at any time.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2.5">
          <Link to="/dashboard" className="w-full">
            <Button variant="primary" className="w-full font-bold">Go to Dashboard</Button>
          </Link>
          <Link to="/listings" className="w-full">
            <Button variant="outline" className="w-full font-bold">Find another deal</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
