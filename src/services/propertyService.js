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

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Property service – swap implementations to use apiClient when backend is ready.
 */
export const propertyService = {
  async getAll(filters = {}) {
    await delay();
    let result = [...properties];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.location.country.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.propertyType === filters.category);
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

    return result;
  },

  async getById(id) {
    await delay();
    const property = properties.find((p) => p.id === id || p.slug === id);
    if (!property) throw new Error('Property not found');
    return property;
  },

  async getFeatured(limit = 4) {
    await delay();
    return properties.filter((p) => p.featured).slice(0, limit);
  },

  async getReviews(propertyId) {
    await delay();
    return reviews.filter((r) => r.propertyId === propertyId);
  },
};

export const destinationService = {
  async getAll() {
    await delay();
    return destinations;
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
