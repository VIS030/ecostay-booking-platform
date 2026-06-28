import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem('ecostay-token') || sessionStorage.getItem('ecostay-token');
      if (token) {
        try {
          const profile = await apiClient.get('/auth/me');
          setUser(profile);
          const wishlistData = await apiClient.get('/wishlist');
          setWishlistIds(wishlistData.map(p => p.id));
        } catch (err) {
          console.error("Token verification failed:", err);
          localStorage.removeItem('ecostay-token');
          sessionStorage.removeItem('ecostay-token');
          setUser(null);
          setWishlistIds([]);
        }
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const data = await apiClient.post('/auth/login', { email, password });
      if (rememberMe) {
        localStorage.setItem('ecostay-token', data.access_token);
        sessionStorage.removeItem('ecostay-token');
      } else {
        sessionStorage.setItem('ecostay-token', data.access_token);
        localStorage.removeItem('ecostay-token');
      }
      setUser(data.user);
      const wishlistData = await apiClient.get('/wishlist');
      setWishlistIds(wishlistData.map(p => p.id));
      showToast({ message: `Welcome back, ${data.user.name}!`, type: 'success' });
      return data.user;
    } catch (err) {
      showToast({ message: err.message || 'Login failed. Please check your credentials.', type: 'error' });
      throw err;
    }
  };

  const register = async (name, email, password, rememberMe = false) => {
    try {
      const data = await apiClient.post('/auth/register', { name, email, password });
      if (rememberMe) {
        localStorage.setItem('ecostay-token', data.access_token);
        sessionStorage.removeItem('ecostay-token');
      } else {
        sessionStorage.setItem('ecostay-token', data.access_token);
        localStorage.removeItem('ecostay-token');
      }
      setUser(data.user);
      setWishlistIds([]);
      showToast({ message: 'Welcome to EcoStay! Account created successfully.', type: 'success' });
      return data.user;
    } catch (err) {
      showToast({ message: err.message || 'Registration failed. Try a different email.', type: 'error' });
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (err) {
      console.warn("Logout request on server returned error, clearing session locally:", err);
    } finally {
      localStorage.removeItem('ecostay-token');
      sessionStorage.removeItem('ecostay-token');
      setUser(null);
      setWishlistIds([]);
      showToast({ message: 'Logged out successfully.', type: 'success' });
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = await apiClient.put('/auth/me', updatedData);
      setUser(updatedUser);
      showToast({ message: 'Profile updated successfully!', type: 'success' });
      return updatedUser;
    } catch (err) {
      showToast({ message: 'Failed to update profile.', type: 'error' });
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await apiClient.post('/auth/forgot-password', { email });
      showToast({ message: 'Reset code generated. Check backend terminal logs!', type: 'info' });
      return res;
    } catch (err) {
      showToast({ message: err.message || 'Failed to request password reset.', type: 'error' });
      throw err;
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    try {
      await apiClient.post('/auth/reset-password', { email, code, newPassword });
      showToast({ message: 'Password updated successfully!', type: 'success' });
    } catch (err) {
      showToast({ message: err.message || 'Password reset failed. Check code.', type: 'error' });
      throw err;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await apiClient.post('/auth/change-password', { currentPassword, newPassword });
      showToast({ message: 'Password updated successfully!', type: 'success' });
    } catch (err) {
      showToast({ message: err.message || 'Change password failed.', type: 'error' });
      throw err;
    }
  };

  const toggleWishlist = async (propertyId) => {
    if (!user) {
      showToast({ message: 'Please log in to save stays to your wishlist', type: 'warning' });
      return false;
    }
    try {
      const updatedWishlist = await apiClient.post(`/wishlist/${propertyId}`);
      setWishlistIds(updatedWishlist.map(p => p.id));
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          stats: {
            ...prev.stats,
            wishlist: updatedWishlist.length
          }
        };
      });
      const isAdded = updatedWishlist.some(p => p.id === propertyId);
      showToast({
        message: isAdded ? 'Saved to wishlist!' : 'Removed from wishlist',
        type: 'success'
      });
      return true;
    } catch (err) {
      showToast({ message: 'Failed to update wishlist.', type: 'error' });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, wishlistIds, loading, login, register, logout, updateProfile, forgotPassword, resetPassword, changePassword, toggleWishlist }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
