import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookingCard from '../components/property/BookingCard';
import ReviewCard from '../components/review/ReviewCard';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { propertyService } from '../services/propertyService';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    propertyService
      .getById(id)
      .then(async (prop) => {
        setProperty(prop);
        setActiveImage(0);
        const revs = await propertyService.getReviews(prop.id);
        setReviews(revs);
      })
      .catch(() => setProperty(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (property) {
      const stored = localStorage.getItem('ecostay-recently-viewed');
      let list = stored ? JSON.parse(stored) : [];
      list = [property.id, ...list.filter((x) => x !== property.id)].slice(0, 10);
      localStorage.setItem('ecostay-recently-viewed', JSON.stringify(list));
    }
  }, [property]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-semibold">Property not found</h1>
        <Link to="/listings" className="mt-4"><Button>Browse listings</Button></Link>
      </div>
    );
  }

  const locationLabel = `${property.location.city}, ${property.location.region}, ${property.location.country}`;
  const images = property.images;

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-6 md:px-10 dark:text-slate-100">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#222222] dark:text-white md:text-[26px]">{property.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#222222] dark:text-slate-200">
            <span className="font-semibold">★ {property.rating}</span>
            <span className="text-[#717171] dark:text-slate-400">·</span>
            <button className="font-semibold underline cursor-pointer">{property.reviewCount} reviews</button>
            <span className="text-[#717171] dark:text-slate-400">·</span>
            <span className="font-semibold underline">{locationLabel}</span>
          </div>
        </div>
        <div className="flex gap-3 text-[#222222] dark:text-slate-200">
          <button className="flex items-center gap-2 text-sm font-semibold underline cursor-pointer">Share</button>
          <button className="flex items-center gap-2 text-sm font-semibold underline cursor-pointer">Save</button>
        </div>
      </div>

      <div className="mb-8 grid h-[300px] gap-2 overflow-hidden rounded-xl sm:grid-cols-4 sm:grid-rows-2 md:h-[480px]">
        <button onClick={() => { setActiveImage(0); setGalleryOpen(true); }} className="relative sm:col-span-2 sm:row-span-2 cursor-pointer">
          <img src={images[0]} alt={property.title} className="h-full w-full object-cover hover:brightness-95" />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button key={i} onClick={() => { setActiveImage(i + 1); setGalleryOpen(true); }} className="relative hidden sm:block cursor-pointer">
            <img src={img} alt="" className="h-full w-full object-cover hover:brightness-95" />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white">
                Show all photos
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="border-b border-[#dddddd] dark:border-slate-800 pb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[22px] font-semibold text-[#222222] dark:text-white">
                  {property.propertyType} hosted by {property.host.name}
                </h2>
                <p className="mt-1 text-[#717171] dark:text-slate-400">
                  {property.maxGuests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.bathrooms} baths
                </p>
              </div>
              <img src={property.host.avatar} alt={property.host.name} className="h-14 w-14 rounded-full object-cover" />
            </div>
            {property.host.superhost && (
              <div className="mt-6 border-t border-[#dddddd] dark:border-slate-800 pt-6">
                <p className="font-semibold text-[#222222] dark:text-white">{property.host.name} is a Superhost</p>
                <p className="mt-1 text-[#717171] dark:text-slate-400">Superhosts are experienced, highly rated hosts.</p>
              </div>
            )}
          </div>

          <div className="border-b border-[#dddddd] dark:border-slate-800 py-8">
            <p className="leading-7 text-[#222222] dark:text-slate-300">{property.description}</p>
          </div>

          <div className="border-b border-[#dddddd] dark:border-slate-800 py-8">
            <h2 className="mb-4 text-[22px] font-semibold text-[#222222] dark:text-white">What this place offers</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {property.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-3 text-[#222222] dark:text-slate-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#222222] dark:bg-slate-300" />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-[#dddddd] dark:border-slate-800 py-8">
            <h2 className="mb-4 text-[22px] font-semibold text-[#222222] dark:text-white">Eco credentials</h2>
            <ul className="space-y-2">
              {property.ecoFeatures.map((f) => (
                <li key={f} className="text-[#717171] dark:text-slate-400">{f}</li>
              ))}
            </ul>
          </div>

          <div className="py-8">
            <h2 className="mb-6 flex items-center gap-2 text-[22px] font-semibold text-[#222222] dark:text-white">
              <span>★ {property.rating}</span>
              <span>· {property.reviewCount} reviews</span>
            </h2>
            {reviews.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-[#717171] dark:text-slate-400">No reviews yet.</p>
            )}
          </div>
        </div>

        <BookingCard property={property} />
      </div>

      <Modal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} size="xl" title="Photos">
        <img src={images[activeImage]} alt="" className="mb-4 w-full rounded-lg object-cover" />
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActiveImage(i)} className={`shrink-0 overflow-hidden rounded-lg ${activeImage === i ? 'ring-2 ring-[#222222]' : ''}`}>
              <img src={img} alt="" className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
