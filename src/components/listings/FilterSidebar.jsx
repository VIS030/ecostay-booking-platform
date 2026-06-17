import { amenitiesList, propertyTypes } from '../../services/mockData';

export default function FilterSidebar({ filters, onChange, onClear, className = '' }) {
  const toggleAmenity = (amenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <aside className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Filters</h2>
        <button
          onClick={onClear}
          className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Clear all
        </button>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-stone-700 dark:text-stone-300">
          Property Type
        </h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="radio"
                name="propertyType"
                checked={filters.category === type}
                onChange={() => onChange({ ...filters, category: type })}
                className="h-4 w-4 border-stone-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-stone-600 dark:text-stone-400">{type}</span>
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="radio"
              name="propertyType"
              checked={!filters.category}
              onChange={() => onChange({ ...filters, category: '' })}
              className="h-4 w-4 border-stone-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-stone-600 dark:text-stone-400">All types</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-stone-700 dark:text-stone-300">
          Price Range (per night)
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
          />
          <span className="text-stone-400">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-stone-700 dark:text-stone-300">
          Minimum Rating
        </h3>
        <select
          value={filters.minRating || ''}
          onChange={(e) => onChange({ ...filters, minRating: e.target.value })}
          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
        >
          <option value="">Any rating</option>
          <option value="4.5">4.5+ stars</option>
          <option value="4.8">4.8+ stars</option>
          <option value="4.9">4.9+ stars</option>
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-stone-700 dark:text-stone-300">Guests</h3>
        <select
          value={filters.guests || ''}
          onChange={(e) => onChange({ ...filters, guests: e.target.value })}
          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n}+ guests
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-stone-700 dark:text-stone-300">Amenities</h3>
        <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={(filters.amenities || []).includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="h-4 w-4 rounded border-stone-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-stone-600 dark:text-stone-400">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
