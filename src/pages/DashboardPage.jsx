import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/property/PropertyCard';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { dashboardService } from '../services/propertyService';

const statusStyles = {
  confirmed: 'bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200',
  upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  completed: 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300',
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Section */}
      <div className="mb-10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/80 dark:bg-stone-900 dark:ring-stone-800">
        <div className="h-32 bg-gradient-to-r from-brand-600 to-brand-800" />
        <div className="relative px-6 pb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="-mt-12 h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg dark:border-stone-900"
          />
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">{user.name}</h1>
              <p className="text-stone-500 dark:text-stone-400">{user.email}</p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                {user.location} · Member since {new Date(user.memberSince).getFullYear()}
              </p>
            </div>
            <Button variant="outline" size="sm">Edit profile</Button>
          </div>
          <p className="mt-4 text-sm text-stone-600 dark:text-stone-400">{user.bio}</p>
          <div className="mt-6 flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{user.stats.trips}</p>
              <p className="text-xs text-stone-500">Trips</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{user.stats.reviews}</p>
              <p className="text-xs text-stone-500">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{user.stats.wishlist}</p>
              <p className="text-xs text-stone-500">Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-stone-200 dark:border-stone-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200'
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
              className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200/80 sm:flex-row dark:bg-stone-900 dark:ring-stone-800"
            >
              <img
                src={booking.propertyImage}
                alt={booking.propertyTitle}
                className="h-32 w-full rounded-xl object-cover sm:w-40"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                      {booking.propertyTitle}
                    </h3>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-stone-500">{booking.location}</p>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                    {booking.checkIn} → {booking.checkOut} · {booking.guests} guests
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
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
            <p className="col-span-full text-center text-stone-500">Your wishlist is empty</p>
          )}
        </div>
      )}

      {/* Recent Activity */}
      {activeTab === 'activity' && (
        <div className="space-y-3">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-200/80 dark:bg-stone-900 dark:ring-stone-800"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-lg dark:bg-brand-950">
                {item.icon}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">{item.message}</p>
                <p className="text-xs text-stone-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
