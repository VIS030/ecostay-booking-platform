import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/property/PropertyCard';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { dashboardService } from '../services/propertyService';

const statusStyles = {
  confirmed: 'bg-[#DCFCE7] text-[#14532D]',
  upcoming: 'bg-[#FEF3C7] text-[#B45309]',
  completed: 'bg-[#f7f7f7] text-[#717171]',
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
    <div className="mx-auto max-w-[1120px] px-6 py-8 md:px-10">
      <div className="mb-10 overflow-hidden rounded-xl border border-[#dddddd] bg-white">
        <div className="h-28 bg-[#222222]" />
        <div className="relative px-6 pb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="-mt-12 h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
          />
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#222222]">{user.name}</h1>
              <p className="text-[#717171]">{user.email}</p>
              <p className="mt-1 text-sm text-[#717171]">
                {user.location} · Member since {new Date(user.memberSince).getFullYear()}
              </p>
            </div>
            <Button variant="outline" size="sm">Edit profile</Button>
          </div>
          <p className="mt-4 text-sm text-[#717171]">{user.bio}</p>
          <div className="mt-6 flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2068a2]">{user.stats.trips}</p>
              <p className="text-xs text-[#717171]">Trips</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2068a2]">{user.stats.reviews}</p>
              <p className="text-xs text-[#717171]">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2068a2]">{user.stats.wishlist}</p>
              <p className="text-xs text-[#717171]">Saved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-[#dddddd]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'border-[#222222] text-[#222222]'
                : 'border-transparent text-[#717171] hover:text-[#222222]'
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
              className="flex flex-col gap-4 rounded-xl border border-[#dddddd] bg-white p-4 sm:flex-row"
            >
              <img
                src={booking.propertyImage}
                alt={booking.propertyTitle}
                className="h-32 w-full rounded-xl object-cover sm:w-40"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[#222222]">
                      {booking.propertyTitle}
                    </h3>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#717171]">{booking.location}</p>
                  <p className="mt-2 text-sm text-[#717171]">
                    {booking.checkIn} → {booking.checkOut} · {booking.guests} guests
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-[#222222]">
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
            <p className="col-span-full text-center text-[#717171]">Your wishlist is empty</p>
          )}
        </div>
      )}

      {/* Recent Activity */}
      {activeTab === 'activity' && (
        <div className="space-y-3">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-[#dddddd] bg-white p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f7f7] text-xs font-bold uppercase text-[#2068a2]">
                {item.type.slice(0, 2)}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#222222]">{item.message}</p>
                <p className="text-xs text-[#717171]">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
