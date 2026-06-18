export const indiaDestinations = [
  {
    id: 'manali',
    name: 'Manali',
    slug: 'manali',
    description: 'Snow-capped peaks, pine forests, and cozy eco-cabins in the Kullu Valley.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=85',
    stayCount: 142,
    popular: true,
    region: 'Himachal Pradesh',
  },
  {
    id: 'shimla',
    name: 'Shimla',
    slug: 'shimla',
    description: 'Colonial charm meets Himalayan views — perfect for a sustainable hill retreat.',
    image: 'https://images.unsplash.com/photo-1593697829587-8a20694d2d8e?w=800&q=85',
    stayCount: 98,
    popular: true,
    region: 'Himachal Pradesh',
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    slug: 'mussoorie',
    description: 'The Queen of Hills offers misty mornings and heritage homestays above the Doon Valley.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85',
    stayCount: 76,
    popular: true,
    region: 'Uttarakhand',
  },
  {
    id: 'nainital',
    name: 'Nainital',
    slug: 'nainital',
    description: 'Lake-side eco-lodges surrounded by oak forests and tranquil mountain air.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=85',
    stayCount: 64,
    popular: true,
    region: 'Uttarakhand',
  },
  {
    id: 'kasol',
    name: 'Kasol',
    slug: 'kasol',
    description: 'Parvati Valley vibes — riverside camps, wooden cottages, and off-grid living.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=85',
    stayCount: 53,
    popular: false,
    region: 'Himachal Pradesh',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    slug: 'rishikesh',
    description: 'Yoga capital on the Ganges — ashram stays, rafting, and riverside eco-resorts.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=85',
    stayCount: 118,
    popular: false,
    region: 'Uttarakhand',
  },
  {
    id: 'dharamshala',
    name: 'Dharamshala',
    slug: 'dharamshala',
    description: 'Tibetan culture, tea gardens, and mountain homestays below the Dhauladhar range.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=85',
    stayCount: 87,
    popular: false,
    region: 'Himachal Pradesh',
  },
  {
    id: 'leh-ladakh',
    name: 'Leh Ladakh',
    slug: 'leh-ladakh',
    description: 'High-altitude desert landscapes, monasteries, and solar-powered mountain camps.',
    image: 'https://images.unsplash.com/photo-1585135497273-1a1194a8c947?w=800&q=85',
    stayCount: 71,
    popular: false,
    region: 'Ladakh',
  },
];

export const destinationServiceLocal = {
  getAll: () => Promise.resolve(indiaDestinations),
  getPopular: () => Promise.resolve(indiaDestinations.filter((d) => d.popular)),
  search: (query) => {
    const q = query.toLowerCase().trim();
    if (!q) return Promise.resolve(indiaDestinations);
    return Promise.resolve(
      indiaDestinations.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q)
      )
    );
  },
};
