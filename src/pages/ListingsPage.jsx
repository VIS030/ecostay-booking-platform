import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/property/PropertyCard';
import FilterSidebar from '../components/listings/FilterSidebar';
import SearchBar from '../components/search/SearchBar';
import Loader from '../components/ui/Loader';
import { propertyService } from '../services/propertyService';

const ITEMS_PER_PAGE = 5;

export default function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('recommended');

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
    guests: searchParams.get('guests') || '',
    amenities: [],
  });

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      let data = await propertyService.getAll(filters);
      if (sortBy === 'price-low') data = [...data].sort((a, b) => a.price - b.price);
      if (sortBy === 'price-high') data = [...data].sort((a, b) => b.price - a.price);
      if (sortBy === 'rating') data = [...data].sort((a, b) => b.rating - a.rating);
      setProperties(data);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && key !== 'amenities') params.set(key, value);
    });
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setFilters({ search: '', category: '', minPrice: '', maxPrice: '', minRating: '', guests: '', amenities: [] });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-slate-950 transition-colors duration-200">
      {/* Agoda-style search header */}
      <div className="bg-[#2068a2] px-4 py-6 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-1 text-sm text-white/80">EcoStay / Search results</p>
          <h1 className="mb-4 text-2xl font-bold text-white">
            {filters.search || filters.category || 'All eco-friendly stays'}
          </h1>
          <SearchBar variant="agoda" />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#717171] dark:text-slate-400">
            <span className="font-bold text-[#222222] dark:text-white">{properties.length}</span> properties found
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="rounded border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-[#222222] dark:text-slate-200 hover:bg-[#f7f7f7] dark:hover:bg-slate-800 cursor-pointer lg:hidden"
            >
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm text-[#222222] dark:text-slate-200 focus:outline-none"
            >
              <option value="recommended" className="dark:bg-slate-900 dark:text-white">Sort: Recommended</option>
              <option value="price-low" className="dark:bg-slate-900 dark:text-white">Price: Low to high</option>
              <option value="price-high" className="dark:bg-slate-900 dark:text-white">Price: High to low</option>
              <option value="rating" className="dark:bg-slate-900 dark:text-white">Guest rating</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <aside className={`w-full shrink-0 lg:block lg:w-[260px] ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
            <div className="sticky top-24 rounded-lg border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <FilterSidebar filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="flex min-h-[40vh] items-center justify-center">
                <Loader size="lg" />
              </div>
            ) : paginatedProperties.length === 0 ? (
              <div className="rounded-lg border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
                <h2 className="text-xl font-bold text-[#222222] dark:text-white">No properties match your search</h2>
                <p className="mt-2 text-[#717171] dark:text-slate-400">Try different dates or filters</p>
                <button onClick={handleClearFilters} className="mt-4 text-sm font-semibold text-[#2068a2] dark:text-blue-400 underline cursor-pointer">
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {paginatedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} variant="agoda" />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="rounded border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-[#222222] dark:text-slate-200 hover:bg-[#f7f7f7] dark:hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded text-sm font-bold cursor-pointer ${
                          currentPage === page
                            ? 'bg-[#2068a2] text-white'
                            : 'border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 text-[#222222] dark:text-slate-200 hover:bg-[#f7f7f7] dark:hover:bg-slate-800'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="rounded border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-[#222222] dark:text-slate-200 hover:bg-[#f7f7f7] dark:hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
