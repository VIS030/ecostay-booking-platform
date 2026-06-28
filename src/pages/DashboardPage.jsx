import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/property/PropertyCard';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import apiClient from '../services/api';

const statusStyles = {
  confirmed: 'bg-[#DCFCE7] dark:bg-green-950/40 text-[#14532D] dark:text-green-300',
  upcoming: 'bg-[#FEF3C7] dark:bg-amber-950/40 text-[#B45309] dark:text-amber-300',
  completed: 'bg-[#f7f7f7] dark:bg-slate-800 text-[#717171] dark:text-slate-300',
  cancelled: 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300',
};

export default function DashboardPage() {
  const { user, loading: authLoading, updateProfile, changePassword } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookingFilter, setBookingFilter] = useState('active'); // 'active' or 'cancelled'

  const [profileForm, setProfileForm] = useState({ name: '', location: '', bio: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Sync profile form values when user context loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        location: user.location || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  // Guard routing
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;
    try {
      const [bookingsData, wishlistData, allProperties] = await Promise.all([
        apiClient.get('/bookings/my-bookings'),
        apiClient.get('/wishlist'),
        apiClient.get('/properties')
      ]);
      setBookings(bookingsData);
      setWishlist(wishlistData);

      // Fetch and sort recently viewed from local storage
      const stored = localStorage.getItem('ecostay-recently-viewed');
      const recentIds = stored ? JSON.parse(stored) : [];
      const matchingStays = allProperties.filter((p) => recentIds.includes(p.id));
      const sortedStays = recentIds
        .map((id) => matchingStays.find((p) => p.id === id))
        .filter(Boolean);
      setRecentlyViewed(sortedStays);
    } catch (err) {
      console.error("Failed to load dashboard details", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await apiClient.post(`/bookings/${bookingId}/cancel`);
      showToast({ message: 'Booking request cancelled successfully.', type: 'success' });
      fetchDashboardData();
    } catch (err) {
      showToast({ message: err.message || 'Failed to cancel booking', type: 'error' });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      await updateProfile(profileForm);
    } catch (err) {
      // Handled in Context
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 8) {
      showToast({ message: 'New password must be at least 8 characters long.', type: 'error' });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast({ message: 'Passwords do not match.', type: 'error' });
      return;
    }
    setPasswordLoading(true);
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      // Handled in Context
    } finally {
      setPasswordLoading(false);
    }
  };

  if (authLoading || (loading && user)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const upcomingBookings = bookings.filter((b) => b.status !== 'cancelled');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');
  const activeBookingsList = bookingFilter === 'active' ? upcomingBookings : cancelledBookings;

  const tabs = [
    { id: 'bookings', label: 'My Bookings', count: bookings.length },
    { id: 'wishlist', label: 'Wishlist', count: wishlist.length },
    { id: 'recent', label: 'Recently Viewed', count: recentlyViewed.length },
    { id: 'settings', label: 'Account Settings' },
  ];

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-8 md:px-10 dark:text-slate-100 animate-fade-in">
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
                {user.location} · Member since {user.memberSince}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('settings')}>Edit profile</Button>
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
            {tab.label} {tab.count !== undefined ? `(${tab.count})` : ''}
          </button>
        ))}
      </div>

      {/* My Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setBookingFilter('active')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer select-none ${
                bookingFilter === 'active'
                  ? 'bg-[#222222] dark:bg-white text-white dark:text-[#222222] border-transparent'
                  : 'bg-transparent text-[#717171] border-[#dddddd] dark:border-slate-800 hover:bg-[#f7f7f7] dark:hover:bg-slate-800'
              }`}
            >
              Active / Upcoming ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setBookingFilter('cancelled')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer select-none ${
                bookingFilter === 'cancelled'
                  ? 'bg-red-500 text-white border-transparent'
                  : 'bg-transparent text-[#717171] border-[#dddddd] dark:border-slate-800 hover:bg-[#f7f7f7] dark:hover:bg-slate-800'
              }`}
            >
              Cancelled ({cancelledBookings.length})
            </button>
          </div>

          {activeBookingsList.length > 0 ? (
            activeBookingsList.map((booking) => (
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
                    <div className="flex gap-2">
                      {booking.status !== 'cancelled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-500 dark:text-red-400 border-red-200 dark:border-red-950 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          Cancel trip
                        </Button>
                      )}
                      <Link to={`/properties/${booking.propertyId}`}>
                        <Button variant="outline" size="sm">View property</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-[#717171] dark:text-slate-400 py-8">
              No bookings found in this category.
            </p>
          )}
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
            <p className="col-span-full text-center text-[#717171] dark:text-slate-400 py-6">Your wishlist is empty.</p>
          )}
        </div>
      )}

      {/* Recently Viewed */}
      {activeTab === 'recent' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentlyViewed.length > 0 ? (
            recentlyViewed.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className="col-span-full text-center text-[#717171] dark:text-slate-400 py-6">No recently viewed stays.</p>
          )}
        </div>
      )}

      {/* Account Settings */}
      {activeTab === 'settings' && (
        <div className="grid gap-8 md:grid-cols-2 animate-fade-in">
          {/* Profile form */}
          <div className="rounded-xl border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-[#222222] dark:text-white">Profile Information</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#717171] uppercase mb-1">Legal Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full rounded-lg border border-[#dddddd] dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-[#2068a2] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#717171] uppercase mb-1">Location</label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full rounded-lg border border-[#dddddd] dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-[#2068a2] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#717171] uppercase mb-1">Bio</label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-[#dddddd] dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-[#2068a2] focus:outline-none resize-none"
                />
              </div>
              <Button type="submit" className="w-full font-bold" loading={profileLoading}>Save Profile</Button>
            </form>
          </div>

          {/* Password form */}
          <div className="rounded-xl border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-[#222222] dark:text-white">Security Settings</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#717171] uppercase mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full rounded-lg border border-[#dddddd] dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-[#2068a2] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#717171] uppercase mb-1">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full rounded-lg border border-[#dddddd] dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-[#2068a2] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#717171] uppercase mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full rounded-lg border border-[#dddddd] dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-[#2068a2] focus:outline-none"
                  required
                />
              </div>
              <Button type="submit" className="w-full font-bold" loading={passwordLoading}>Update Password</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
