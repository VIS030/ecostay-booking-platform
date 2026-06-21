import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/property/PropertyCard';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { dashboardService } from '../services/propertyService';

const statusStyles = {
  confirmed: 'bg-[#DCFCE7] dark:bg-green-950/40 text-[#14532D] dark:text-green-300',
  upcoming: 'bg-[#FEF3C7] dark:bg-amber-950/40 text-[#B45309] dark:text-amber-300',
  completed: 'bg-[#f7f7f7] dark:bg-slate-800 text-[#717171] dark:text-slate-300',
};

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    Promise.all([
      dashboardService.getUser(),
      dashboardService.getBookings(),
      dashboardService.getWishlist(),
      dashboardService.getRecentActivity(),
    ]).then(([u, b, w, a]) => {
      setUser(u);
      setBookings(b);
      setWishlist(w);
      setActivity(a);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const tabs = [
    { id: 'bookings', label: 'My Bookings', count: bookings.length },
    { id: 'wishlist', label: 'Wishlist', count: wishlist.length },
    { id: 'activity', label: 'Recent Activity', count: activity.length },
  ];

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-8 md:px-10 dark:text-slate-100">
      <div className="mb-10 overflow-hidden rounded-xl border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="h-28 bg-[#222222] dark:bg-slate-850" />
        <div className="relative px-6 pb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="-mt-12 h-24 w-24 rounded-full border-4 border-white dark:border-slate-900 object-cover shadow-lg"
          />
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#222222] dark:text-white">{user.name}</h1>
              <p className="text-[#717171] dark:text-slate-400">{user.email}</p>
              <p className="mt-1 text-sm text-[#717171] dark:text-slate-400">
                {user.location} · Member since {new Date(user.memberSince).getFullYear()}
              </p>
            </div>
            <Button variant="outline" size="sm">Edit profile</Button>
          </div>
          <p className="mt-4 text-sm text-[#717171] dark:text-slate-350">{user.bio}</p>
          <div className="mt-6 flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2068a2] dark:text-blue-400">{user.stats.trips}</p>
              <p className="text-xs text-[#717171] dark:text-slate-400">Trips</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2068a2] dark:text-blue-400">{user.stats.reviews}</p>
              <p className="text-xs text-[#717171] dark:text-slate-400">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2068a2] dark:text-blue-400">{user.stats.wishlist}</p>
              <p className="text-xs text-[#717171] dark:text-slate-400">Saved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-[#dddddd] dark:border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#222222] dark:border-white text-[#222222] dark:text-white'
                : 'border-transparent text-[#717171] dark:text-slate-400 hover:text-[#222222] dark:hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* My Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col gap-4 rounded-xl border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:flex-row"
            >
              <img
                src={booking.propertyImage}
                alt={booking.propertyTitle}
                className="h-32 w-full rounded-xl object-cover sm:w-40"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[#222222] dark:text-white">
                      {booking.propertyTitle}
                    </h3>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#717171] dark:text-slate-400">{booking.location}</p>
                  <p className="mt-2 text-sm text-[#717171] dark:text-slate-400">
                    {booking.checkIn} → {booking.checkOut} · {booking.guests} guests
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-[#222222] dark:text-slate-200">
                    ${booking.total} total
                  </span>
                  <Link to={`/properties/${booking.propertyId}`}>
                    <Button variant="outline" size="sm">View property</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.length > 0 ? (
            wishlist.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className="col-span-full text-center text-[#717171] dark:text-slate-400">Your wishlist is empty</p>
          )}
        </div>
      )}

      {/* Recent Activity */}
      {activeTab === 'activity' && (
        <div className="space-y-3">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f7f7] dark:bg-slate-800 text-xs font-bold uppercase text-[#2068a2] dark:text-blue-400">
                {item.type.slice(0, 2)}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#222222] dark:text-slate-200">{item.message}</p>
                <p className="text-xs text-[#717171] dark:text-slate-400">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
