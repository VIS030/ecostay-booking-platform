import {
  properties,
  destinations,
  categories,
  testimonials,
  whyChooseUs,
  reviews,
  dashboardUser,
  bookings,
  wishlist,
  recentActivity,
} from './mockData';

import apiClient from './api';
import { indiaDestinations } from './destinationsData';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Property service – swap implementations to use apiClient when backend is ready.
 */
export const propertyService = {
  async getAll(filters = {}) {
    let result;
    if (filters.search) {
      result = await apiClient.get(`/properties/search?q=${encodeURIComponent(filters.search)}`);
    } else {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.minRating) params.append('minRating', filters.minRating);
      if (filters.guests) params.append('guests', filters.guests);
      if (filters.featured !== undefined) params.append('featured', filters.featured);
      if (filters.amenities?.length) {
        params.append('amenities', filters.amenities.join(','));
      }

      const queryString = params.toString();
      const url = queryString ? `/properties?${queryString}` : '/properties';
      result = await apiClient.get(url);
    }

    // Apply client-side filters if combining search with additional filters
    if (filters.search) {
      if (filters.category) {
        result = result.filter((p) => p.propertyType === filters.category || p.category === filters.category);
      }
      if (filters.minPrice) {
        result = result.filter((p) => p.price >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        result = result.filter((p) => p.price <= Number(filters.maxPrice));
      }
      if (filters.minRating) {
        result = result.filter((p) => p.rating >= Number(filters.minRating));
      }
      if (filters.guests) {
        result = result.filter((p) => p.maxGuests >= Number(filters.guests));
      }
      if (filters.amenities?.length) {
        result = result.filter((p) =>
          filters.amenities.every((a) => p.amenities.includes(a))
        );
      }
      if (filters.featured) {
        result = result.filter((p) => p.featured);
      }
    }

    return result;
  },

  async getById(id) {
    try {
      return await apiClient.get(`/properties/${id}`);
    } catch (err) {
      // Fallback/Error handle matches original expectations
      throw new Error('Property not found');
    }
  },

  async getFeatured(limit = 4) {
    const featured = await apiClient.get('/properties?featured=true');
    return featured.slice(0, limit);
  },

  async getReviews(propertyId) {
    await delay();
    return reviews.filter((r) => r.propertyId === propertyId);
  },

  async create(propertyData) {
    return await apiClient.post('/properties', propertyData);
  },

  async update(id, propertyData) {
    return await apiClient.put(`/properties/${id}`, propertyData);
  },

  async delete(id) {
    return await apiClient.delete(`/properties/${id}`);
  },
};

export const destinationService = {
  async getAll() {
    await delay();
    return indiaDestinations;
  },
};

export const contentService = {
  async getCategories() {
    await delay();
    return categories;
  },

  async getTestimonials() {
    await delay();
    return testimonials;
  },

  async getWhyChooseUs() {
    await delay();
    return whyChooseUs;
  },
};

export const dashboardService = {
  async getUser() {
    await delay();
    return dashboardUser;
  },

  async getBookings() {
    await delay();
    return bookings;
  },

  async getWishlist() {
    await delay();
    const ids = wishlist.map((w) => w.propertyId);
    return properties.filter((p) => ids.includes(p.id));
  },

  async getRecentActivity() {
    await delay();
    return recentActivity;
  },
};
