import { amenitiesList, propertyTypes } from '../../services/mockData';

export default function FilterSidebar({ filters, onChange, onClear, className = '' }) {
  const toggleAmenity = (amenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity) ? current.filter((a) => a !== amenity) : [...current, amenity];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <aside className={`space-y-5 ${className}`}>
      <div className="flex items-center justify-between border-b border-[#dddddd] dark:border-slate-800 pb-3">
        <h2 className="font-bold text-[#222222] dark:text-slate-100">Filter by:</h2>
        <button onClick={onClear} className="text-sm font-semibold text-[#2068a2] dark:text-blue-400 hover:underline cursor-pointer">Clear</button>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-[#222222] dark:text-slate-200">Property type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="propertyType" checked={filters.category === type} onChange={() => onChange({ ...filters, category: type })} className="accent-[#2068a2]" />
              <span className="text-sm text-[#717171] dark:text-slate-400">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-[#222222] dark:text-slate-200">Your budget (per night)</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={(e) => onChange({ ...filters, minPrice: e.target.value })} className="w-full rounded border border-[#dddddd] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-[#222222] dark:text-white placeholder:text-[#717171] dark:placeholder:text-slate-500" />
          <span className="text-[#717171] dark:text-slate-400">-</span>
          <input type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })} className="w-full rounded border border-[#dddddd] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-[#222222] dark:text-white placeholder:text-[#717171] dark:placeholder:text-slate-500" />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-[#222222] dark:text-slate-200">Guest rating</h3>
        <select value={filters.minRating || ''} onChange={(e) => onChange({ ...filters, minRating: e.target.value })} className="w-full rounded border border-[#dddddd] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-[#222222] dark:text-white focus:outline-none">
          <option value="" className="dark:bg-slate-900 dark:text-white">Any</option>
          <option value="4.5" className="dark:bg-slate-900 dark:text-white">4.5+</option>
          <option value="4.8" className="dark:bg-slate-900 dark:text-white">4.8+</option>
          <option value="4.9" className="dark:bg-slate-900 dark:text-white">4.9+</option>
        </select>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-[#222222] dark:text-slate-200">Amenities</h3>
        <div className="max-h-40 space-y-2 overflow-y-auto">
          {amenitiesList.slice(0, 10).map((amenity) => (
            <label key={amenity} className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" checked={(filters.amenities || []).includes(amenity)} onChange={() => toggleAmenity(amenity)} className="accent-[#2068a2]" />
              <span className="text-sm text-[#717171] dark:text-slate-400">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
