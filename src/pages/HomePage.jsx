import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import PropertyCard from '../components/property/PropertyCard';
import Loader from '../components/ui/Loader';
import {
  propertyService,
  destinationService,
  contentService,
} from '../services/propertyService';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85',
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=85',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85',
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [allStays, setAllStays] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      propertyService.getFeatured(8),
      propertyService.getAll(),
      destinationService.getAll(),
      contentService.getCategories(),
    ]).then(([feat, all, dest, cats]) => {
      setFeatured(feat);
      setAllStays(all.slice(0, 8));
      setDestinations(dest);
      setCategories(cats);
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

  const typeMap = {
    mountain: 'Mountain Cabin',
    forest: 'Forest Lodge',
    beach: 'Beach Bungalow',
    farm: 'Farm Stay',
    jungle: 'Jungle Treehouse',
    desert: 'Desert Camp',
  };

  return (
    <>
      {/* Hero + Search — Airbnb style */}
      <section className="border-b border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-950 pb-8 pt-6">
        <div className="mx-auto max-w-[1760px] px-6 md:px-10">
          <SearchBar variant="hero" className="mb-10" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {HERO_IMAGES.map((src, i) => (
              <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 row-span-2 aspect-square sm:aspect-auto sm:min-h-[320px]' : 'aspect-square'}`}>
                <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category scroll — Airbnb icons row */}
      <section className="border-b border-[#dddddd] dark:border-slate-800 py-6 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-[1760px] px-6 md:px-10">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/listings?category=${encodeURIComponent(typeMap[cat.id] || '')}`}
                className="flex shrink-0 flex-col items-center gap-2 opacity-70 transition hover:opacity-100"
              >
                <div className="h-16 w-16 overflow-hidden rounded-full border border-[#dddddd] dark:border-slate-700">
                  <img src={cat.image} alt="" className="h-full w-full object-cover" />
                </div>
                <span className="max-w-[80px] text-center text-xs font-semibold text-[#717171] dark:text-slate-400">{cat.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live anywhere banner */}
      <section className="py-10 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-[1760px] px-6 md:px-10">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=1600&q=85"
              alt="Travel"
              className="aspect-[21/9] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
              <h2 className="max-w-md text-3xl font-bold text-white md:text-4xl">Live anywhere, travel sustainably</h2>
              <p className="mt-2 max-w-sm text-white/90">2,000+ verified eco homestays across 45 countries</p>
              <Link to="/listings" className="mt-6 inline-flex w-fit rounded-lg bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-[#222222] dark:text-white hover:bg-[#f7f7f7] dark:hover:bg-slate-700">
                Explore all stays
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular homes grid — Airbnb */}
      <section className="py-4 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-[1760px] px-6 md:px-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#222222] dark:text-slate-100">Popular eco homestays</h2>
            <Link to="/listings" className="text-sm font-semibold text-[#222222] dark:text-slate-350 underline">Show all</Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} variant="airbnb" />
            ))}
          </div>
        </div>
      </section>

      {/* Destinations — large photo row */}
      <section className="bg-[#f7f7f7] dark:bg-slate-900 border-b border-[#dddddd] dark:border-slate-800 py-12">
        <div className="mx-auto max-w-[1760px] px-6 md:px-10">
          <h2 className="mb-6 text-2xl font-semibold text-[#222222] dark:text-slate-100">Inspiration for your next trip</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(0, 6).map((dest) => (
              <Link
                key={dest.id}
                to={`/listings?search=${encodeURIComponent(dest.name)}`}
                className="group relative overflow-hidden rounded-2xl"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                  <p className="text-sm text-white/80">{dest.propertyCount} properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More stays horizontal feel on mobile, grid desktop */}
      <section className="py-12 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-[1760px] px-6 md:px-10">
          <h2 className="mb-6 text-2xl font-semibold text-[#222222] dark:text-slate-100">Weekend getaways</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {allStays.map((property) => (
              <PropertyCard key={property.id} property={property} variant="airbnb" />
            ))}
          </div>
        </div>
      </section>

      {/* Agoda-style promo strip */}
      <section className="border-t border-[#dddddd] dark:border-slate-800 bg-[#2068a2] py-10">
        <div className="mx-auto flex max-w-[1760px] flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:px-10 md:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/80">Limited offer</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Save up to 25% on eco stays this season</h2>
            <p className="mt-1 text-white/80">Book now · Free cancellation on select properties</p>
          </div>
          <Link to="/listings" className="shrink-0 rounded-lg bg-[#ff6600] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#e55c00]">
            FIND DEALS
          </Link>
        </div>
      </section>
    </>
  );
}
