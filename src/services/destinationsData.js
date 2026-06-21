import ladhakImg from "../assets/images/ladhak.jpg";
import shimla from "../assets/images/shimla.jpg";
import rishikesh from "../assets/images/rishikesh.jpg";
import kasol from "../assets/images/kasol.jpg";
import dharmshala from "../assets/images/dharmshala.jpg";
import nanital from "../assets/images/nanital.jpg";


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
    image: shimla,
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
    image: nanital,
    stayCount: 64,
    popular: true,
    region: 'Uttarakhand',
  },
  {
    id: 'kasol',
    name: 'Kasol',
    slug: 'kasol',
    description: 'Parvati Valley vibes — riverside camps, wooden cottages, and off-grid living.',
    image: kasol,
    stayCount: 53,
    popular: false,
    region: 'Himachal Pradesh',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    slug: 'rishikesh',
    description: 'Yoga capital on the Ganges — ashram stays, rafting, and riverside eco-resorts.',
    image: rishikesh,
    stayCount: 118,
    popular: false,
    region: 'Uttarakhand',
  },
  {
    id: 'dharamshala',
    name: 'Dharamshala',
    slug: 'dharamshala',
    description: 'Tibetan culture, tea gardens, and mountain homestays below the Dhauladhar range.',
    image: dharmshala,
    stayCount: 87,
    popular: false,
    region: 'Himachal Pradesh',
  },
  {
    id: 'leh-ladakh',
    name: 'Leh Ladakh',
    slug: 'leh-ladakh',
    description: 'High-altitude desert landscapes, monasteries, and solar-powered mountain camps.',
    image: ladhakImg,
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
