import { Link } from 'react-router-dom';

const footerLinks = {
  explore: [
    { label: 'All Listings', to: '/listings' },
    { label: 'Mountain Retreats', to: '/listings?category=Mountain+Cabin' },
    { label: 'Beach Lodges', to: '/listings?category=Beach+Bungalow' },
    { label: 'Farm Stays', to: '/listings?category=Farm+Stay' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Sustainability', to: '/about#sustainability' },
    { label: 'Careers', to: '/about#careers' },
    { label: 'Press', to: '/about#press' },
  ],
  support: [
    { label: 'Help Center', to: '/about#help' },
    { label: 'Safety', to: '/about#safety' },
    { label: 'Cancellation', to: '/about#cancellation' },
    { label: 'Contact', to: '/about#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300 dark:border-stone-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-lg text-white">
                🌿
              </span>
              <span className="font-display text-xl font-semibold text-white">EcoStay</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              Discover verified eco-friendly homestays and sustainable travel experiences.
              Travel beautifully, tread lightly.
            </p>
            <div className="mt-6 flex gap-4">
              {['𝕏', 'in', 'f', '📷'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-sm transition-colors hover:bg-brand-600 hover:text-white"
                  aria-label="Social link"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-stone-400 transition-colors hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 sm:flex-row">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} EcoStay. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-stone-500">
            <a href="#" className="hover:text-stone-300">Privacy</a>
            <a href="#" className="hover:text-stone-300">Terms</a>
            <a href="#" className="hover:text-stone-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
