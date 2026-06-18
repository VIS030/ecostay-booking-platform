import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[#dddddd] bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1760px] px-6 py-12 md:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#222222]">Support</h3>
            <ul className="space-y-3 text-sm text-[#717171]">
              <li><Link to="/about#help" className="hover:underline">Help Center</Link></li>
              <li><Link to="/about#contact" className="hover:underline">Contact us</Link></li>
              <li><a href="#" className="hover:underline">Cancellation options</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#222222]">Hosting</h3>
            <ul className="space-y-3 text-sm text-[#717171]">
              <li><a href="#" className="hover:underline">List your property</a></li>
              <li><a href="#" className="hover:underline">Host resources</a></li>
              <li><Link to="/about#sustainability" className="hover:underline">Eco standards</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#222222]">EcoStay</h3>
            <ul className="space-y-3 text-sm text-[#717171]">
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/listings" className="hover:underline">All stays</Link></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#222222]">Legal</h3>
            <ul className="space-y-3 text-sm text-[#717171]">
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#dddddd] pt-8 sm:flex-row">
          <p className="text-sm text-[#717171]">© {new Date().getFullYear()} EcoStay, Inc.</p>
          <div className="flex gap-4 text-sm text-[#717171]">
            <span>English (US)</span>
            <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
