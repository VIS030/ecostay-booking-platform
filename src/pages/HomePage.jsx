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

import shimla from '../assets/images/shimla.jpg';
import rishikesh from '../assets/images/rishikesh.jpg';
import dharmshala from '../assets/images/dharmshala.jpg';
import kasol from '../assets/images/kasol.jpg';

const HERO_SHOWCASE = [
  {
    id: 'shimla',
    title: 'Heritage Alpine Chalet',
    location: 'Shimla, Himachal Pradesh',
    price: '$245 / night',
    tag: '☀️ 100% Solar Powered',
    badge: '🌿 Top Pick',
    image: shimla,
    search: 'Shimla',
  },
  {
    id: 'rishikesh',
    title: 'Ganges Eco River Lodge',
    location: 'Rishikesh, Uttarakhand',
    price: '$120 / night',
    tag: '🌊 Riverside Sanctuary',
    badge: '⭐ 4.9 Rating',
    image: rishikesh,
    search: 'Rishikesh',
  },
  {
    id: 'dharmshala',
    title: 'Dhauladhar Peace Sanctuary',
    location: 'Dharamshala, Himachal',
    price: '$95 / night',
    tag: '🧘 Organic Kitchen',
    badge: '🏔️ Mountain View',
    image: dharmshala,
    search: 'Dharamshala',
  },
  {
    id: 'kasol',
    title: 'Parvati Valley Pine Cabin',
    location: 'Kasol, Himachal Pradesh',
    price: '$110 / night',
    tag: '🌲 Zero Plastic',
    badge: '🔥 Cozy Fireplace',
    image: kasol,
    search: 'Kasol',
  },
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
      {/* Hero + Search Section */}
      <section className="border-b border-[#dddddd] dark:border-slate-800 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 pb-12 pt-8 transition-colors duration-200">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          
          {/* Header Title Block */}
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-900/50 bg-emerald-100/60 dark:bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              🌿 AI-Powered Sustainable Homestays
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.15]">
              Find Your <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">Eco Sanctuary</span> in Nature
            </h1>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 sm:text-lg max-w-2xl mx-auto">
              Discover verified solar-powered cottages, mountain retreats, and riverfront lodges across India.
            </p>
          </div>

          {/* SearchBar */}
          <SearchBar variant="hero" className="mb-10 shadow-lg" />

          {/* Hero Showcase Image Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {HERO_SHOWCASE.map((item, i) => (
              <Link
                key={item.id}
                to={`/listings?search=${encodeURIComponent(item.search)}`}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  i === 0 ? 'sm:col-span-2 sm:row-span-2 min-h-[340px] sm:min-h-[420px]' : 'h-[200px] sm:h-[202px]'
                }`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:from-slate-950/90" />

                {/* Top Badge */}
                <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                  <span className="rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-900 dark:text-slate-100 shadow-sm border border-white/20">
                    {item.badge}
                  </span>
                </div>

                {/* Bottom Content Card Info */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-md bg-emerald-500/90 backdrop-blur-sm px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className={`font-bold tracking-tight text-white drop-shadow-sm ${i === 0 ? 'text-xl sm:text-2xl' : 'text-base'}`}>
                    {item.title}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-xs sm:text-sm text-slate-200">
                    <span>📍 {item.location}</span>
                    <span className="font-semibold text-emerald-300">{item.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mini Stats Ribbon */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">🏡</span> 150+ Verified Eco Homestays
            </div>
            <div className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">🌱</span> 100% Carbon Neutral Bookings
            </div>
            <div className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="text-amber-400">⭐</span> 4.97 Average Guest Rating
            </div>
            <div className="hidden md:block h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sky-500">🤖</span> Groq AI Travel Assistant
            </div>
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
              <p className="mt-2 max-w-sm text-white/90">100+ verified eco homestays across India</p>
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
                  <p className="text-sm text-white/80">{dest.stayCount} properties</p>
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
