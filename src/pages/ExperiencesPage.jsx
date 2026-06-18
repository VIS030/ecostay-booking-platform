import { useEffect, useState } from 'react';
import ExperienceCard from '../components/experience/ExperienceCard';
import { experienceServiceLocal } from '../services/experiencesData';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState([]);
  const [popular, setPopular] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      experienceServiceLocal.getAll(),
      experienceServiceLocal.getPopular(),
    ]).then(([all, pop]) => {
      setExperiences(all);
      setPopular(pop);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) return;
    experienceServiceLocal.search(search).then(setExperiences);
  }, [search, loading]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[360px] sm:h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1600&q=85"
          alt="Outdoor experience"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-10">
          <h1 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Unique Travel Experiences
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/90 sm:text-lg">
            Adventure, nature, culture, and unforgettable memories.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="border-b border-[#ebebeb] bg-white py-8">
        <div className="mx-auto max-w-[1120px] px-6 md:px-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex overflow-hidden rounded-full border border-[#dddddd] bg-white shadow-sm transition-shadow focus-within:shadow-md"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search experiences by activity or difficulty..."
              className="flex-1 px-6 py-3.5 text-sm text-[#222222] placeholder:text-[#717171] focus:outline-none"
            />
            <button
              type="submit"
              className="m-1.5 flex items-center gap-2 rounded-full bg-[#ff385c] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e31c5f]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Popular experiences */}
      {!search && popular.length > 0 && (
        <section className="bg-[#f7f7f7] py-12">
          <div className="mx-auto max-w-[1120px] px-6 md:px-10">
            <h2 className="text-2xl font-semibold text-[#222222]">Popular experiences</h2>
            <p className="mt-1 text-[#717171]">Most booked activities by EcoStay travelers</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All experiences grid */}
      <section className="py-12">
        <div className="mx-auto max-w-[1120px] px-6 md:px-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#222222]">
              {search ? 'Search results' : 'All experiences'}
            </h2>
            <p className="mt-1 text-sm text-[#717171]">
              {experiences.length} experience{experiences.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center text-[#717171]">Loading...</div>
          ) : experiences.length === 0 ? (
            <div className="rounded-xl border border-[#dddddd] bg-white py-16 text-center">
              <p className="text-lg font-semibold text-[#222222]">No experiences found</p>
              <p className="mt-2 text-[#717171]">Try a different search term</p>
              <button
                onClick={() => setSearch('')}
                className="mt-4 text-sm font-semibold text-[#ff385c] underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {experiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
