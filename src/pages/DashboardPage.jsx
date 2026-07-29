import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/property/PropertyCard';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyStateBlock from '../components/ui/EmptyStateBlock';
import UserAvatar from '../components/ui/UserAvatar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import apiClient from '../services/api';

const statusStyles = {
  confirmed: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900',
  upcoming: 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900',
  completed: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
  cancelled: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900',
};

export default function DashboardPage() {
  const { user, loading: authLoading, updateProfile, changePassword, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookingFilter, setBookingFilter] = useState('active');

  const [profileForm, setProfileForm] = useState({ name: '', location: '', bio: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // Sync profile form values when user context loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        location: user.location || 'India',
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

  // Handle Photo Upload from device gallery
  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast({ message: 'Selected image must be under 5MB.', type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64DataUrl = reader.result;
      setAvatarLoading(true);
      try {
        await updateProfile({ ...profileForm, avatar: base64DataUrl });
        showToast({ message: 'Profile photo updated successfully!', type: 'success' });
      } catch (err) {
        showToast({ message: 'Failed to update profile photo.', type: 'error' });
      } finally {
        setAvatarLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    setAvatarLoading(true);
    try {
      await updateProfile({ ...profileForm, avatar: '' });
      showToast({ message: 'Profile photo removed.', type: 'info' });
    } catch (err) {
      showToast({ message: 'Failed to remove profile photo.', type: 'error' });
    } finally {
      setAvatarLoading(false);
    }
  };

  const confirmCancelBooking = async () => {
    if (!cancelModalBooking) return;
    setCancelling(true);
    try {
      await apiClient.post(`/bookings/${cancelModalBooking.id}/cancel`);
      showToast({ message: 'Booking request cancelled successfully.', type: 'success' });
      setCancelModalBooking(null);
      fetchDashboardData();
    } catch (err) {
      showToast({ message: err.message || 'Failed to cancel booking', type: 'error' });
    } finally {
      setCancelling(false);
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
    { id: 'bookings', label: 'My Bookings', icon: '🧳', count: bookings.length },
    { id: 'wishlist', label: 'Wishlist', icon: '💖', count: wishlist.length },
    { id: 'recent', label: 'Recently Viewed', icon: '👁️', count: recentlyViewed.length },
    { id: 'settings', label: 'Account Settings', icon: '⚙️' },
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 md:px-10 dark:text-slate-100 animate-fade-in">
      
      {/* Hidden File Input for Avatar Selection */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Main Profile Header Banner */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
        
        {/* Cover Background */}
        <div className="relative h-36 sm:h-44 bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 px-6 py-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent"></div>
          <div className="relative flex justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              🌱 Verified Eco Traveler
            </span>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="relative px-6 pb-6 pt-0">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-14 mb-4">
            
            {/* Avatar with Camera Overlay Trigger */}
            <div className="relative group w-fit">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer relative rounded-full ring-4 ring-white dark:ring-slate-900 shadow-xl overflow-hidden"
              >
                <UserAvatar 
                  src={user.avatar} 
                  name={user.name} 
                  className="h-28 w-28 text-2xl font-bold" 
                />
                
                {/* Hover overlay with camera icon */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white text-xs font-semibold">
                  <svg className="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{avatarLoading ? 'Uploading...' : 'Upload'}</span>
                </div>
              </div>

              {/* Small floating camera icon button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 rounded-full bg-emerald-600 p-2 text-white shadow-lg border-2 border-white dark:border-slate-900 hover:bg-emerald-700 transition cursor-pointer"
                title="Upload profile photo from gallery"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold border-slate-300 dark:border-slate-700"
              >
                📷 Change Photo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('settings')}
                className="text-xs font-semibold border-slate-300 dark:border-slate-700"
              >
                ✏️ Edit Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-xs font-semibold border-red-200 text-red-600 dark:border-red-950 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                🚪 Logout
              </Button>
            </div>

          </div>

          {/* User Name & Info */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                📍 {user.location || 'India'}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {user.email} · Member since {user.memberSince || '2026'}
            </p>
            {user.bio && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {user.bio}
              </p>
            )}
          </div>

          {/* User Stats Grid */}
          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 p-3 text-center transition hover:bg-slate-100/80 dark:hover:bg-slate-800/80">
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">{user.stats?.trips || bookings.length}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Trips Booked</p>
            </div>
            <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 p-3 text-center transition hover:bg-slate-100/80 dark:hover:bg-slate-800/80">
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">{user.stats?.wishlist || wishlist.length}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Saved Stays</p>
            </div>
            <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 p-3 text-center transition hover:bg-slate-100/80 dark:hover:bg-slate-800/80">
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">{user.stats?.reviews || 0}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Reviews Written</p>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                activeTab === tab.id
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: My Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setBookingFilter('active')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer select-none ${
                bookingFilter === 'active'
                  ? 'bg-emerald-700 text-white border-transparent shadow-sm'
                  : 'bg-transparent text-slate-600 border-slate-300 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Active / Upcoming ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setBookingFilter('cancelled')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer select-none ${
                bookingFilter === 'cancelled'
                  ? 'bg-red-600 text-white border-transparent shadow-sm'
                  : 'bg-transparent text-slate-600 border-slate-300 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Cancelled ({cancelledBookings.length})
            </button>
          </div>

          {activeBookingsList.length > 0 ? (
            activeBookingsList.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:flex-row shadow-sm hover:shadow-md transition"
              >
                <img
                  src={booking.propertyImage}
                  alt={booking.propertyTitle}
                  className="h-32 w-full rounded-xl object-cover sm:w-44"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                        {booking.propertyTitle}
                      </h3>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">📍 {booking.location}</p>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                      📅 {booking.checkIn} → {booking.checkOut} · 👥 {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      ${booking.total} total
                    </span>
                    <div className="flex gap-2">
                      {booking.status !== 'cancelled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCancelModalBooking(booking)}
                          className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-950 hover:bg-red-50 dark:hover:bg-red-950/20"
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
            <EmptyStateBlock
              icon="🧳"
              title="No bookings found"
              description={bookingFilter === 'active' ? "You don't have any active or upcoming trips planned right now." : "You have no cancelled trips."}
              actionLabel={bookingFilter === 'active' ? "Explore Eco-Stays" : undefined}
              actionTo={bookingFilter === 'active' ? "/listings" : undefined}
            />
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.length > 0 ? (
            wishlist.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <EmptyStateBlock
              icon="💖"
              title="Your wishlist is empty"
              description="Save your favourite eco-friendly homestays and retreats here for easy access."
              actionLabel="Discover Homestays"
              actionTo="/listings"
            />
          )}
        </div>
      )}

      {/* Tab 3: Recently Viewed */}
      {activeTab === 'recent' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentlyViewed.length > 0 ? (
            recentlyViewed.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <EmptyStateBlock
              icon="👁️"
              title="No recently viewed stays"
              description="Properties you view will show up here so you can easily revisit them."
              actionLabel="Browse Listings"
              actionTo="/listings"
            />
          )}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={!!cancelModalBooking}
        onClose={() => !cancelling && setCancelModalBooking(null)}
        title="Cancel Booking Request"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to cancel your booking request for{' '}
            <strong className="text-slate-900 dark:text-white">
              {cancelModalBooking?.propertyTitle}
            </strong>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={cancelling}
              onClick={() => setCancelModalBooking(null)}
            >
              Keep Booking
            </Button>
            <Button
              size="sm"
              loading={cancelling}
              onClick={confirmCancelBooking}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirm Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Tab 4: Account Settings */}
      {activeTab === 'settings' && (
        <div className="grid gap-8 md:grid-cols-2 animate-fade-in">
          
          {/* Profile Form */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">Profile Information</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Update your personal account details and custom profile photo.</p>
            
            {/* Photo Uploader Card in Settings */}
            <div className="mb-6 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <UserAvatar src={user.avatar} name={user.name} className="h-12 w-12 text-lg font-bold" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Profile Picture</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">JPG, PNG, or WEBP under 5MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs"
                >
                  {avatarLoading ? 'Uploading...' : 'Upload'}
                </Button>
                {user.avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline p-1 cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-emerald-600 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Location</label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-emerald-600 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Bio</label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-emerald-600 focus:outline-none resize-none"
                  placeholder="Share a bit about your travel interests..."
                />
              </div>
              <Button type="submit" className="w-full font-bold bg-emerald-700 hover:bg-emerald-800 text-white" loading={profileLoading}>
                Save Profile Changes
              </Button>
            </form>
          </div>

          {/* Password Form */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">Security Settings</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Manage your account authentication password.</p>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-emerald-600 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-emerald-600 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2.5 text-sm dark:text-white focus:border-emerald-600 focus:outline-none"
                  required
                />
              </div>
              <Button type="submit" className="w-full font-bold" loading={passwordLoading}>
                Update Password
              </Button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}
