import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navLinks = [
  { to: '/listings', label: 'Stays', match: (pathname) => pathname === '/listings' },
  { to: '/destinations', label: 'Destinations', match: (pathname) => pathname === '/destinations' },
  { to: '/experiences', label: 'Experiences', match: (pathname) => pathname === '/experiences' },
  { to: '/about', label: 'About', match: (pathname) => pathname === '/about' },
];

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`h-4 w-4 ${filled ? 'fill-[#ff385c] stroke-[#ff385c]' : 'fill-none stroke-current stroke-2'}`}
    >
      <path d="M16 28c7-4.733 14-10 14-17a6.983 6.983 0 0 0-11-5.708A6.983 6.983 0 0 0 2 11c0 7 7 12.267 14 17z" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0 fill-[#ff385c] transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
      <path d="M16 1c2 0 3.46 1.66 6.84 5.09.86.89 1.74 1.83 2.62 2.81 3.47 3.85 6.54 7.59 6.54 12.1 0 4.51-3.07 8.25-6.54 12.1-.88.98-1.76 1.92-2.62 2.81C19.46 30.34 18 32 16 32s-3.46-1.66-6.84-5.09c-.86-.89-1.74-1.83-2.62-2.81C3.07 21.25 0 17.51 0 13c0-4.51 3.07-8.25 6.54-12.1.88-.98 1.76-1.92 2.62-2.81C12.54 2.66 14 1 16 1z" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isLinkActive = (link) => link.match(location.pathname);

  const desktopLinkClass = (active) =>
    [
      'relative rounded-full px-4 py-2.5 text-[15px] font-medium tracking-tight',
      'transition-all duration-200 ease-out',
      active
        ? 'bg-[#f7f7f7] text-[#222222] shadow-[inset_0_0_0_1px_#ebebeb]'
        : 'text-[#717171] hover:bg-[#f7f7f7] hover:text-[#222222]',
    ].join(' ');

  const mobileLinkClass = (active) =>
    [
      'block rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
      active
        ? 'bg-[#f7f7f7] text-[#222222]'
        : 'text-[#717171] hover:bg-[#f7f7f7] hover:text-[#222222]',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-[#ebebeb] bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
      <nav className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-[72px] items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Logo */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2 transition-opacity duration-200 hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            <LogoIcon />
            <span className="text-xl font-bold tracking-tight text-[#ff385c]">EcoStay</span>
          </Link>

          {/* Desktop navigation — centered */}
          <div className="hidden items-center justify-center gap-1 lg:flex xl:gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={desktopLinkClass(active)}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#ff385c] transition-all duration-300" />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop auth */}
          <div className="hidden items-center justify-end gap-2 lg:flex">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#222222] transition-all duration-200 hover:bg-[#f7f7f7] active:scale-[0.98]"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="rounded-full bg-[#ff385c] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#e31c5f] hover:shadow-md active:scale-[0.98]"
            >
              Sign up
            </button>
          </div>

          {/* Mobile: auth + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-[#222222] transition-colors hover:bg-[#f7f7f7] sm:inline-flex"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] transition-all duration-200 hover:shadow-md active:scale-95"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              <span className="flex h-4 w-4 flex-col items-center justify-center">
                <span
                  className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    mobileOpen ? 'translate-y-[3px] rotate-45' : '-translate-y-[3px]'
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    mobileOpen ? 'opacity-0 scale-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    mobileOpen ? '-translate-y-[3px] -rotate-45' : 'translate-y-[3px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[#ebebeb] bg-white transition-all duration-300 ease-out lg:hidden ${
          mobileOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0 border-t-transparent'
        }`}
      >
        <div className="space-y-1 px-4 py-4 sm:px-6">
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <NavLink
                key={link.label}
                to={link.to}
                className={mobileLinkClass(active)}
                aria-current={active ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            );
          })}

          <div className="mt-4 grid gap-2 border-t border-[#ebebeb] pt-4 sm:hidden">
            <button
              type="button"
              onClick={() => {
                navigate('/login');
                setMobileOpen(false);
              }}
              className="w-full rounded-xl border border-[#dddddd] px-4 py-3 text-sm font-semibold text-[#222222] transition-colors hover:bg-[#f7f7f7]"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/register');
                setMobileOpen(false);
              }}
              className="w-full rounded-xl bg-[#ff385c] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e31c5f]"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 top-[72px] z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}

export { HeartIcon };
