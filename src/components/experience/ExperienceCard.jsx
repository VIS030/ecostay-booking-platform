import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const difficultyStyles = {
  Easy: 'bg-[#DCFCE7] text-[#14532D]',
  Moderate: 'bg-[#FEF3C7] text-[#B45309]',
  Hard: 'bg-[#FEE2E2] text-[#991B1B]',
};

export default function ExperienceCard({ experience, className = '' }) {
  const difficultyClass = difficultyStyles[experience.difficulty] || difficultyStyles.Easy;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-[#dddddd] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={experience.image}
          alt={experience.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold ${difficultyClass}`}>
          {experience.difficulty}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold text-[#222222]">{experience.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#717171]">
          {experience.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-[#717171]">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {experience.duration}
          </span>
        </div>
        <Link to={`/listings?search=${encodeURIComponent(experience.name)}`} className="mt-4">
          <Button variant="outline" size="md" className="w-full">
            Learn More
          </Button>
        </Link>
      </div>
    </article>
  );
}
