import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../services/api';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function BookingCard({ property, className = '' }) {
  const { showToast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showSandbox, setShowSandbox] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
      : 0;

  const subtotal = nights * property.price;
  const serviceFee = nights ? Math.round(subtotal * 0.12) : 0;
  const total = subtotal + serviceFee;

  const handleReserve = async () => {
    if (!user) {
      showToast({ message: 'Please log in to make a booking reservation', type: 'warning' });
      navigate('/login');
      return;
    }
    if (!checkIn || !checkOut) {
      showToast({ message: 'Please select check-in and check-out dates', type: 'warning' });
      return;
    }
    
    setPaymentLoading(true);
    try {
      const orderPayload = await apiClient.post('/bookings', {
        propertyId: property.id,
        checkIn,
        checkOut,
        guests
      });
      
      const isDummy = orderPayload.razorpayOrderId.startsWith('order_dummy_') || orderPayload.razorpayKey === 'rzp_test_EcoStayKey123';
      
      if (isDummy) {
        setPendingOrder(orderPayload);
        setShowSandbox(true);
        setPaymentLoading(false);
      } else {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          showToast({ message: 'Failed to load Razorpay Checkout. Please check your connection.', type: 'error' });
          setPaymentLoading(false);
          return;
        }
        
        const options = {
          key: orderPayload.razorpayKey,
          amount: orderPayload.amount,
          currency: orderPayload.currency,
          name: "EcoStay India",
          description: `Eco Stay Reservation at ${property.title}`,
          order_id: orderPayload.razorpayOrderId,
          handler: async function (response) {
            try {
              const verifyRes = await apiClient.post('/bookings/verify-payment', {
                bookingId: orderPayload.booking.id,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              });
              showToast({ message: 'Booking confirmed and payment successful!', type: 'success' });
              navigate(`/booking-confirmation?id=${verifyRes.id}`);
            } catch (err) {
              showToast({ message: 'Signature verification failed.', type: 'error' });
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
          },
          theme: {
            color: "#16A34A"
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        setPaymentLoading(false);
      }
    } catch (err) {
      showToast({ message: err.message || 'Failed to create booking order', type: 'error' });
      setPaymentLoading(false);
    }
  };

  const handleSandboxSuccess = async () => {
    setPaymentLoading(true);
    try {
      const verifyRes = await apiClient.post('/bookings/verify-payment', {
        bookingId: pendingOrder.booking.id,
        razorpayOrderId: pendingOrder.razorpayOrderId,
        razorpayPaymentId: `pay_dummy_${Math.random().toString(36).substr(2, 9)}`,
        razorpaySignature: `sig_dummy_${Math.random().toString(36).substr(2, 9)}`
      });
      showToast({ message: 'Payment simulated successfully! Booking confirmed.', type: 'success' });
      setShowSandbox(false);
      navigate(`/booking-confirmation?id=${verifyRes.id}`);
    } catch (err) {
      showToast({ message: err.message || 'Payment simulation failed', type: 'error' });
    } finally {
      setPaymentLoading(false);
    }
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

      <Button className="mt-4 w-full rounded-lg font-bold" size="lg" onClick={handleReserve} loading={paymentLoading && !showSandbox}>
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

      {showSandbox && pendingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-[420px] rounded-2xl bg-white dark:bg-slate-900 border border-[#dddddd] dark:border-slate-800 p-6 shadow-2xl animate-fade-in text-[#222222] dark:text-slate-100">
            <div className="flex items-center gap-2 border-b border-[#dddddd] dark:border-slate-800 pb-3 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-xs">✓</span>
              <h3 className="font-bold text-lg">Razorpay Payment Sandbox</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-[#717171] dark:text-slate-400">Merchant: <strong className="text-[#222222] dark:text-white">EcoStay India</strong></p>
              <p className="font-medium text-[#717171] dark:text-slate-400">Order ID: <code className="bg-[#f7f7f7] dark:bg-slate-850 px-1.5 py-0.5 rounded font-mono text-xs text-[#ff6600]">{pendingOrder.razorpayOrderId}</code></p>
              <div className="bg-[#f7f7f7] dark:bg-slate-850 rounded-xl p-3.5 mt-3 border border-[#ebebeb] dark:border-slate-800">
                <p className="text-xs text-[#717171] dark:text-slate-400">Amount Payable</p>
                <p className="text-2xl font-extrabold text-[#222222] dark:text-white mt-0.5">₹{(pendingOrder.amount / 100).toLocaleString()}</p>
                <p className="text-xs text-[#717171] dark:text-slate-400 mt-1">INR (converted from USD ${total})</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-2.5">
              <Button
                className="w-full font-bold bg-[#16A34A] hover:bg-[#14532D] text-white shadow-md hover:shadow-lg transition active:scale-[0.98]"
                onClick={handleSandboxSuccess}
                loading={paymentLoading}
              >
                Simulate Successful Payment
              </Button>
              <button
                type="button"
                className="w-full text-center py-2.5 text-sm font-semibold text-[#717171] dark:text-slate-400 hover:bg-[#f7f7f7] dark:hover:bg-slate-800 rounded-lg cursor-pointer transition"
                onClick={() => setShowSandbox(false)}
                disabled={paymentLoading}
              >
                Cancel payment
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
