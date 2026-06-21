import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[#dddddd] dark:border-slate-800 bg-[#f7f7f7] dark:bg-slate-950">
      <div className="mx-auto max-w-[1760px] px-6 py-12 md:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-slate-200">Support</h3>
            <ul className="space-y-3 text-sm text-[#717171] dark:text-slate-400">
              <li><Link to="/about#help" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">Help Center</Link></li>
              <li><Link to="/about#contact" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">Contact us</Link></li>
              <li><a href="#" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">Cancellation options</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-slate-200">Hosting</h3>
            <ul className="space-y-3 text-sm text-[#717171] dark:text-slate-400">
              <li><a href="#" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">List your property</a></li>
              <li><a href="#" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">Host resources</a></li>
              <li><Link to="/about#sustainability" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">Eco standards</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-slate-200">EcoStay</h3>
            <ul className="space-y-3 text-sm text-[#717171] dark:text-slate-400">
              <li><Link to="/about" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">About</Link></li>
              <li><Link to="/listings" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">All stays</Link></li>
              <li><a href="#" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-slate-200">Legal</h3>
            <ul className="space-y-3 text-sm text-[#717171] dark:text-slate-400">
              <li><a href="#" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">Privacy</a></li>
              <li><a href="#" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">Terms</a></li>
              <li><a href="#" className="hover:underline hover:text-[#2068a2] dark:hover:text-blue-400">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#dddddd] dark:border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-[#717171] dark:text-slate-400">© {new Date().getFullYear()} EcoStay, Inc.</p>
          <div className="flex gap-4 text-sm text-[#717171] dark:text-slate-400">
            <span>English (US)</span>
            <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
