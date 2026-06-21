import river from "../assets/images/river.jpg";
import bike from "../assets/images/bike.jpg";

export const experiences = [
  {
    id: 'trekking',
    name: 'Trekking',
    slug: 'trekking',
    description: 'Guided Himalayan treks through alpine meadows, ancient trails, and remote villages.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85',
    difficulty: 'Moderate',
    duration: '2–5 days',
    popular: true,
  },
  {
    id: 'camping',
    name: 'Camping',
    slug: 'camping',
    description: 'Sleep under the stars in eco-camps with minimal footprint and maximum views.',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=85',
    difficulty: 'Easy',
    duration: '1–3 nights',
    popular: true,
  },
  {
    id: 'river-rafting',
    name: 'River Rafting',
    slug: 'river-rafting',
    description: 'White-water adventures on the Ganges and Beas with certified local operators.',
    image: river,
    difficulty: 'Moderate',
    duration: 'Half day',
    popular: true,
  },
  {
    id: 'paragliding',
    name: 'Paragliding',
    slug: 'paragliding',
    description: 'Soar over valleys and lakes with tandem flights from Bir Billing and Manali.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85',
    difficulty: 'Easy',
    duration: '2–3 hours',
    popular: false,
  },
  {
    id: 'nature-walks',
    name: 'Nature Walks',
    slug: 'nature-walks',
    description: 'Slow-paced forest trails with naturalists — birds, flora, and hidden waterfalls.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=85',
    difficulty: 'Easy',
    duration: '2–4 hours',
    popular: true,
  },
  {
    id: 'wildlife-safari',
    name: 'Wildlife Safari',
    slug: 'wildlife-safari',
    description: 'Spot leopards, bears, and rare birds in Jim Corbett and Himalayan sanctuaries.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=85',
    difficulty: 'Easy',
    duration: 'Full day',
    popular: false,
  },
  {
    id: 'mountain-biking',
    name: 'Mountain Biking',
    slug: 'mountain-biking',
    description: 'Downhill and cross-country routes through pine forests and mountain passes.',
    image: bike,
    difficulty: 'Hard',
    duration: '3–6 hours',
    popular: false,
  },
  {
    id: 'rock-climbing',
    name: 'Rock Climbing',
    slug: 'rock-climbing',
    description: 'Climb natural rock faces in Manali and Rishikesh with trained instructors.',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=85',
    difficulty: 'Hard',
    duration: 'Half day',
    popular: false,
  },
];

export const experienceServiceLocal = {
  getAll: () => Promise.resolve(experiences),
  getPopular: () => Promise.resolve(experiences.filter((e) => e.popular)),
  search: (query) => {
    const q = query.toLowerCase().trim();
    if (!q) return Promise.resolve(experiences);
    return Promise.resolve(
      experiences.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.difficulty.toLowerCase().includes(q)
      )
    );
  },
};
