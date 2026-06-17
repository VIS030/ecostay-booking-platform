import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import PropertyCard from '../components/property/PropertyCard';
import FilterSidebar from '../components/listings/FilterSidebar';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { propertyService } from '../services/propertyService';

const ITEMS_PER_PAGE = 6;

export default function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
      const data = await propertyService.getAll(filters);
      setProperties(data);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  }, [filters]);

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
    const cleared = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      guests: '',
      amenities: [],
    };
    setFilters(cleared);
    setSearchParams({});
  };

  const handleSearch = ({ location }) => {
    handleFilterChange({ ...filters, search: location });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
          Explore eco stays
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-400">
          {properties.length} sustainable accommodations found
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          variant="compact"
          defaultLocation={filters.search}
          onSearch={handleSearch}
          className="flex-1 max-w-xl"
        />
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          {mobileFiltersOpen ? 'Hide filters' : 'Show filters'}
        </Button>
      </div>

      <div className="flex gap-8">
        <div
          className={`w-full shrink-0 lg:block lg:w-72 ${
            mobileFiltersOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80 dark:bg-stone-900 dark:ring-stone-800">
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <Loader size="lg" />
            </div>
          ) : paginatedProperties.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
              <span className="text-5xl">🏕️</span>
              <h2 className="mt-4 text-xl font-semibold text-stone-900 dark:text-stone-100">
                No stays found
              </h2>
              <p className="mt-2 text-stone-500">Try adjusting your filters or search terms</p>
              <Button className="mt-4" variant="outline" onClick={handleClearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-brand-600 text-white'
                          : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
