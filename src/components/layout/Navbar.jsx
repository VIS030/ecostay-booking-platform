import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

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
      className={`h-4 w-4 ${filled ? 'fill-[#FF385C] stroke-[#FF385C]' : 'fill-none stroke-current stroke-2'}`}
    >
      <path d="M16 28c7-4.733 14-10 14-17a6.983 6.983 0 0 0-11-5.708A6.983 6.983 0 0 0 2 11c0 7 7 12.267 14 17z" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
      <defs>
        <path id="leaf" d="M 50,50 C 48,42 42,32 38,24 C 35,18 32,15 28,15 C 29,20 31,24 33,28 C 29,32 26,36 24,42 C 26,45 29,46 32,46 C 29,51 28,55 28,60 C 34,58 40,54 50,50 Z" />
      </defs>
      <use href="#leaf" fill="#EF4444" />
      <use href="#leaf" fill="#F59E0B" transform="rotate(90 50 50)" />
      <use href="#leaf" fill="#0EA5E9" transform="rotate(180 50 50)" />
      <use href="#leaf" fill="#8B5CF6" transform="rotate(270 50 50)" />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function SunIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.636l-.707.707M18.364 17.636l-.707-.707M6.364 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] transition-all duration-200 hover:shadow-md hover:bg-[#f7f7f7] dark:border-slate-800 dark:bg-slate-850 dark:text-slate-200 dark:hover:bg-slate-800 active:scale-95 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-amber-500" />
      ) : (
        <MoonIcon className="h-5 w-5 text-slate-700" />
      )}
    </button>
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
        ? 'bg-[#f7f7f7] dark:bg-slate-800 text-[#222222] dark:text-slate-100 shadow-[inset_0_0_0_1px_#ebebeb] dark:shadow-[inset_0_0_0_1px_#334155]'
        : 'text-[#717171] dark:text-slate-400 hover:bg-[#e8f2fa] dark:hover:bg-slate-800 hover:text-[#2068a2] dark:hover:text-blue-400',
    ].join(' ');

  const mobileLinkClass = (active) =>
    [
      'block rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
      active
        ? 'bg-[#f7f7f7] dark:bg-slate-800 text-[#222222] dark:text-slate-100'
        : 'text-[#717171] dark:text-slate-400 hover:bg-[#e8f2fa] dark:hover:bg-slate-800 hover:text-[#2068a2] dark:hover:text-blue-400',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-[#ebebeb] dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-slate-950/90">
      <nav className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-[72px] items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Logo */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2 transition-opacity duration-200 hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            <LogoIcon />
            <span className="text-xl font-bold tracking-tight text-[#222222] dark:text-white">
              <span>Eco</span>
              <span className="-ml-0.5 font-semibold text-[#222222] dark:text-white/95">stay</span>
            </span>
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
                    <span className="absolute bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#2068a2] dark:bg-blue-500 transition-all duration-300" />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop auth */}
          <div className="hidden items-center justify-end gap-2 lg:flex">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#222222] dark:text-slate-200 transition-all duration-200 hover:bg-[#f7f7f7] dark:hover:bg-slate-800 active:scale-[0.98] cursor-pointer"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="rounded-full bg-[#16A34A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#14532D] hover:shadow-md active:scale-[0.98] cursor-pointer"
            >
              Sign up
            </button>
          </div>

          {/* Mobile: auth + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-[#222222] dark:text-slate-200 transition-colors hover:bg-[#f7f7f7] dark:hover:bg-slate-800 sm:inline-flex cursor-pointer"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-850 text-[#222222] dark:text-slate-200 transition-all duration-200 hover:shadow-md active:scale-95 cursor-pointer"
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
        className={`overflow-hidden border-t border-[#ebebeb] dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 ease-out lg:hidden ${
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

          <div className="mt-4 grid gap-2 border-t border-[#ebebeb] dark:border-slate-800 pt-4 sm:hidden">
            <button
              type="button"
              onClick={() => {
                navigate('/login');
                setMobileOpen(false);
              }}
              className="w-full rounded-xl border border-[#dddddd] dark:border-slate-700 px-4 py-3 text-sm font-semibold text-[#222222] dark:text-slate-200 transition-colors hover:bg-[#f7f7f7] dark:hover:bg-slate-800 cursor-pointer"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/register');
                setMobileOpen(false);
              }}
              className="w-full rounded-xl bg-[#16A34A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#14532D] cursor-pointer"
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
