import { amenitiesList, propertyTypes } from '../../services/mockData';

export default function FilterSidebar({ filters, onChange, onClear, className = '' }) {
  const toggleAmenity = (amenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity) ? current.filter((a) => a !== amenity) : [...current, amenity];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <aside className={`space-y-5 ${className}`}>
      <div className="flex items-center justify-between border-b border-[#dddddd] pb-3">
        <h2 className="font-bold text-[#222222]">Filter by:</h2>
        <button onClick={onClear} className="text-sm font-semibold text-[#2068a2] hover:underline">Clear</button>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-[#222222]">Property type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="propertyType" checked={filters.category === type} onChange={() => onChange({ ...filters, category: type })} className="accent-[#2068a2]" />
              <span className="text-sm text-[#717171]">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-[#222222]">Your budget (per night)</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={(e) => onChange({ ...filters, minPrice: e.target.value })} className="w-full rounded border border-[#dddddd] px-3 py-2 text-sm" />
          <span className="text-[#717171]">-</span>
          <input type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })} className="w-full rounded border border-[#dddddd] px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-[#222222]">Guest rating</h3>
        <select value={filters.minRating || ''} onChange={(e) => onChange({ ...filters, minRating: e.target.value })} className="w-full rounded border border-[#dddddd] px-3 py-2 text-sm">
          <option value="">Any</option>
          <option value="4.5">4.5+</option>
          <option value="4.8">4.8+</option>
          <option value="4.9">4.9+</option>
        </select>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-[#222222]">Amenities</h3>
        <div className="max-h-40 space-y-2 overflow-y-auto">
          {amenitiesList.slice(0, 10).map((amenity) => (
            <label key={amenity} className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" checked={(filters.amenities || []).includes(amenity)} onChange={() => toggleAmenity(amenity)} className="accent-[#2068a2]" />
              <span className="text-sm text-[#717171]">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
