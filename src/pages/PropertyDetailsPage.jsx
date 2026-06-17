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
        <Link to="/listings" className="mt-4">
          <Button>Browse listings</Button>
        </Link>
      </div>
    );
  }

  const locationLabel = `${property.location.city}, ${property.location.region}, ${property.location.country}`;
  const images = property.images;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl dark:text-stone-100">
          {property.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center gap-1 font-medium text-brand-600 dark:text-brand-400">
            ★ {property.rating}
          </span>
          <span className="text-stone-500">·</span>
          <span className="text-stone-600 underline dark:text-stone-400">
            {property.reviewCount} reviews
          </span>
          <span className="text-stone-500">·</span>
          <span className="text-stone-600 dark:text-stone-400">{locationLabel}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8 grid gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2">
        <button
          onClick={() => { setActiveImage(0); setGalleryOpen(true); }}
          className="relative sm:col-span-2 sm:row-span-2"
        >
          <img
            src={images[0]}
            alt={property.title}
            className="aspect-[4/3] h-full w-full object-cover transition-transform hover:scale-[1.02] sm:aspect-auto"
          />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button
            key={i}
            onClick={() => { setActiveImage(i + 1); setGalleryOpen(true); }}
            className="relative hidden sm:block"
          >
            <img src={img} alt="" className="h-full w-full object-cover transition-transform hover:scale-[1.02]" />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 flex items-center justify-center bg-stone-900/50 text-sm font-semibold text-white">
                +{images.length - 5} photos
              </span>
            )}
          </button>
        ))}
        <button
          onClick={() => setGalleryOpen(true)}
          className="mt-2 rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium sm:hidden dark:border-stone-700"
        >
          Show all {images.length} photos
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {/* Host & basics */}
          <div className="border-b border-stone-200 pb-8 dark:border-stone-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                  {property.propertyType} hosted by {property.host.name}
                </h2>
                <p className="mt-1 text-stone-600 dark:text-stone-400">
                  {property.maxGuests} guests · {property.bedrooms} bedrooms · {property.beds} beds ·{' '}
                  {property.bathrooms} baths
                </p>
              </div>
              <img
                src={property.host.avatar}
                alt={property.host.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-100 dark:ring-brand-900"
              />
            </div>
            {property.host.superhost && (
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-brand-50 p-4 dark:bg-brand-950/50">
                <span className="text-2xl">🏅</span>
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {property.host.name} is a Superhost
                  </p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Superhosts are experienced, highly rated hosts committed to great stays.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="border-b border-stone-200 py-8 dark:border-stone-800">
            <p className="leading-relaxed text-stone-700 dark:text-stone-300">{property.description}</p>
          </div>

          {/* Eco Features */}
          <div className="border-b border-stone-200 py-8 dark:border-stone-800">
            <h2 className="mb-4 text-xl font-semibold text-stone-900 dark:text-stone-100">
              Eco credentials
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {property.ecoFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                  <span className="text-brand-600">🌿</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div className="border-b border-stone-200 py-8 dark:border-stone-800">
            <h2 className="mb-4 text-xl font-semibold text-stone-900 dark:text-stone-100">
              What this place offers
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {property.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                  <span className="text-brand-600">✓</span> {amenity}
                </li>
              ))}
            </ul>
          </div>

          {/* Reviews */}
          <div className="py-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">★</span>
              <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                {property.rating} · {property.reviewCount} reviews
              </h2>
            </div>
            {reviews.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-stone-500">No reviews yet. Be the first to review this stay!</p>
            )}
          </div>
        </div>

        <BookingCard property={property} />
      </div>

      <Modal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} size="xl" title="Photo gallery">
        <div className="space-y-4">
          <img
            src={images[activeImage]}
            alt=""
            className="w-full rounded-xl object-cover"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`shrink-0 overflow-hidden rounded-lg ring-2 ${
                  activeImage === i ? 'ring-brand-600' : 'ring-transparent'
                }`}
              >
                <img src={img} alt="" className="h-16 w-24 object-cover" />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
