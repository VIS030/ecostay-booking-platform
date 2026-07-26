import apiClient from './api';
import { indiaDestinations } from './destinationsData';

/**
 * Static UI content — these define display labels and categories,
 * not backend-managed resources. Moved here from mockData.js.
 */
const categories = [
  { id: 'mountain', name: 'Mountain Retreats', icon: '⛰️', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { id: 'forest', name: 'Forest Cabins', icon: '🌲', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80' },
  { id: 'beach', name: 'Coastal Eco-Lodges', icon: '🏖️', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
  { id: 'farm', name: 'Farm Stays', icon: '🌾', image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80' },
  { id: 'jungle', name: 'Jungle Hideaways', icon: '🦜', image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80' },
  { id: 'desert', name: 'Desert Camps', icon: '🏜️', image: 'https://images.unsplash.com/photo-1509316781280-0255d2b4d8a8?w=600&q=80' },
];

const testimonials = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    text: 'EcoStay made it effortless to find genuinely sustainable accommodations. Our forest cabin in Costa Rica was magical — solar-powered, zero-waste, and the hosts were incredible.',
    property: 'Canopy Rainforest Lodge',
  },
  {
    id: '2',
    name: 'James Chen',
    location: 'Singapore',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 5,
    text: 'The booking experience felt as polished as any major platform, but with a soul. Every property we stayed at had verified eco-credentials. Highly recommend for conscious travelers.',
    property: 'Alpine Meadow Chalet',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    location: 'Barcelona, Spain',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    rating: 5,
    text: 'From search to checkout, everything was seamless. The detailed amenity filters helped us find a perfect farm stay for our family. Kids loved it, and so did the planet.',
    property: 'Green Valley Farmhouse',
  },
];

const whyChooseUs = [
  {
    id: 'verified',
    title: 'Verified Eco-Credentials',
    description: 'Every listing is vetted for sustainability practices — renewable energy, waste reduction, and local community support.',
    icon: '✓',
  },
  {
    id: 'local',
    title: 'Authentic Local Experiences',
    description: 'Stay with hosts who share their culture, cuisine, and knowledge of hidden natural gems off the tourist trail.',
    icon: '🌍',
  },
  {
    id: 'carbon',
    title: 'Carbon-Neutral Bookings',
    description: 'We offset 100% of booking emissions and partner with reforestation projects in the regions you visit.',
    icon: '🌱',
  },
  {
    id: 'support',
    title: '24/7 Travel Support',
    description: 'Our dedicated eco-travel specialists are available around the clock to help plan your perfect sustainable getaway.',
    icon: '💬',
  },
];

/**
 * Property service — all data fetched from the FastAPI backend.
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
      throw new Error('Property not found');
    }
  },

  async getFeatured(limit = 4) {
    const featured = await apiClient.get('/properties?featured=true');
    return featured.slice(0, limit);
  },

  async getReviews(propertyId) {
    // TODO: Replace with backend endpoint when reviews API is implemented
    return [];
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
    return indiaDestinations;
  },
};

export const contentService = {
  async getCategories() {
    return categories;
  },

  async getTestimonials() {
    return testimonials;
  },

  async getWhyChooseUs() {
    return whyChooseUs;
  },
};
