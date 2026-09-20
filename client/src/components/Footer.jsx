import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-outline-variant/30 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                water_drop
              </span>
            </div>
            <span className="font-plus-jakarta font-semibold text-primary text-[0.875rem]">
              Blood Bank Connect
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-[0.875rem] font-inter text-on-surface-variant hover:text-on-surface transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-[0.875rem] font-inter text-on-surface-variant hover:text-on-surface transition-colors">
              Find Donor
            </Link>
            <Link to="/register" className="text-[0.875rem] font-inter text-on-surface-variant hover:text-on-surface transition-colors">
              Register
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-[0.75rem] font-inter text-on-surface-variant text-center">
            © {new Date().getFullYear()} Blood Bank Connect. Community Lifesaver Network.
          </p>
        </div>

        {/* Trust badge row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-6 border-t border-outline-variant/20">
          <div className="flex items-center gap-1.5 text-on-surface-variant text-[0.75rem] font-inter">
            <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
            100% Free & Altruistic
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant text-[0.75rem] font-inter">
            <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
            Privacy Protected
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant text-[0.75rem] font-inter">
            <span className="material-symbols-outlined text-[16px] text-primary">volunteer_activism</span>
            Community Powered
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
