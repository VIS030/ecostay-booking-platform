import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import PropertyCard from '../components/property/PropertyCard';
import DestinationCard from '../components/destination/DestinationCard';
import ReviewCard from '../components/review/ReviewCard';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import {
  propertyService,
  destinationService,
  contentService,
} from '../services/propertyService';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [whyChooseUs, setWhyChooseUs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      propertyService.getFeatured(4),
      destinationService.getAll(),
      contentService.getCategories(),
      contentService.getTestimonials(),
      contentService.getWhyChooseUs(),
    ]).then(([feat, dest, cats, tests, why]) => {
      setFeatured(feat);
      setDestinations(dest.slice(0, 4));
      setCategories(cats);
      setTestimonials(tests);
      setWhyChooseUs(why);
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

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Mountain landscape"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
              Sustainable Travel, Unforgettable Stays
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Discover eco-friendly homestays around the world
            </h1>
            <p className="mt-6 text-lg text-stone-200">
              Book verified sustainable accommodations — from alpine chalets to rainforest lodges —
              and travel with purpose.
            </p>
          </div>
          <div className="mt-10">
            <SearchBar />
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-stone-300">
            <span>✓ Verified eco-credentials</span>
            <span>✓ Carbon-neutral bookings</span>
            <span>✓ 2,000+ sustainable stays</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
            Explore by category
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Find your perfect eco-retreat, whatever your adventure style
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => {
            const typeMap = {
              mountain: 'Mountain Cabin',
              forest: 'Forest Lodge',
              beach: 'Beach Bungalow',
              farm: 'Farm Stay',
              jungle: 'Jungle Treehouse',
              desert: 'Desert Camp',
            };
            return (
            <Link
              key={cat.id}
              to={`/listings?category=${encodeURIComponent(typeMap[cat.id] || '')}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-square">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-center text-white">
                <span className="text-2xl">{cat.icon}</span>
                <p className="mt-1 text-xs font-semibold sm:text-sm">{cat.name}</p>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Homestays */}
      <section className="bg-white py-20 dark:bg-stone-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
                Featured homestays
              </h2>
              <p className="mt-2 text-stone-600 dark:text-stone-400">
                Hand-picked sustainable stays loved by our community
              </p>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/listings'}>
              View all stays
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
            Popular destinations
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Trending eco-tourism hotspots for your next adventure
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Why Choose EcoStay */}
      <section className="bg-brand-50 py-20 dark:bg-brand-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
              Why choose EcoStay
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-stone-600 dark:text-stone-400">
              We&apos;re building the world&apos;s most trusted platform for conscious travelers
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100 transition-transform duration-300 hover:-translate-y-1 dark:bg-stone-900 dark:ring-brand-900"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-xl dark:bg-brand-900">
                  {item.icon}
                </span>
                <h3 className="mt-4 font-semibold text-stone-900 dark:text-stone-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
            What travelers say
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Real stories from our eco-conscious community
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80"
            alt="Forest path"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-900/80" />
          <div className="relative px-8 py-16 text-center sm:px-16 sm:py-20">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Ready for your next eco-adventure?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-100">
              Join thousands of travelers discovering sustainable stays that don&apos;t compromise on comfort.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/listings">
                <Button size="lg" variant="secondary">
                  Browse stays
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Create account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
