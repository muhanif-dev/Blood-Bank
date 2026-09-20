import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30">
      <div className="h-20 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              water_drop
            </span>
          </div>
          <div className="flex flex-col truncate">
            <span className="font-plus-jakarta font-semibold text-[1.125rem] text-primary tracking-tight leading-none">
              Blood Bank Connect
            </span>
            <span className="font-inter text-[0.75rem] font-semibold text-on-surface-variant leading-none mt-1 tracking-wide">
              Community Lifesaver Network
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center p-1 bg-surface-container-low rounded-xl gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 text-[0.875rem] font-plus-jakarta font-semibold rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `px-4 py-2 text-[0.875rem] font-plus-jakarta font-semibold rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            Find a Donor
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-2 text-[0.875rem] font-plus-jakarta font-semibold rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            Register as Donor
          </NavLink>
        </nav>

        {/* Right side: Emergency badge + avatar */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-error-container text-on-error-container text-[0.75rem] font-plus-jakarta font-semibold border border-error/20 hover:bg-error hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] animate-pulse text-error">emergency</span>
            <span>Become a Donor</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </div>
        </div>

        {/* Mobile Nav Toggle — simple links */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/search" className="p-2 text-primary">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </Link>
          <Link to="/register" className="p-2 text-primary">
            <span className="material-symbols-outlined text-[22px]">person_add</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
