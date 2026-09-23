import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import donorService from "../services/donorService";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Home = () => {
  const navigate = useNavigate();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [totalDonors, setTotalDonors] = useState(null);

  // Fetch real total donor count for stats card
  useEffect(() => {
    donorService
      .getDonors({ limit: 1 })
      .then((res) => setTotalDonors(res.pagination?.total ?? 0))
      .catch(() => setTotalDonors(0));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBloodGroup) params.set("bloodGroup", selectedBloodGroup);
    if (cityInput.trim()) params.set("place", cityInput.trim());
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ── Urgent Alert Banner ─────────────────────────────────────── */}
      <aside className="w-full bg-error-container text-on-error-container py-2 px-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="text-[0.75rem] font-plus-jakarta font-bold uppercase tracking-wider bg-error text-white px-2 py-0.5 rounded-full">
              Urgent
            </span>
            <p className="font-inter text-[0.875rem] font-semibold">
              Critical Shortage Alert:{' '}
              <span className="text-primary font-bold">O− &amp; B−</span> donors needed urgently.{' '}
              <span className="font-normal">Register now to save a life.</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/register')}
          className="inline-flex items-center gap-1.5 px-4 py-1 bg-primary text-white rounded-full text-[0.75rem] font-plus-jakarta font-semibold hover:bg-primary/90 transition-colors shadow-sm flex-shrink-0"
        >
          <span>Become a Donor</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </aside>

      {/* ── Hero Section + Integrated Search Widget ─────────────────── */}
      <section className="w-full relative rounded-xl bg-white p-4 md:p-8 shadow-sm mb-8 overflow-hidden border border-outline-variant/20">
        {/* Ambient glows */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-primary text-[0.75rem] font-plus-jakarta font-semibold mb-4">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              volunteer_activism
            </span>
            Zero-Brokerage Altruistic Lifesaver Network
          </div>

          {/* Headline */}
          <h1 className="font-plus-jakarta font-bold text-[1.75rem] md:text-[3rem] text-on-surface tracking-tight max-w-3xl mb-4 leading-tight">
            Every Drop Counts. Connect Directly with{" "}
            <span className="text-primary decoration-error-container decoration-2">
              Voluntary Blood Donors
            </span>
            .
          </h1>

          <p className="font-inter text-[1.125rem] text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
            A 100% free, community-powered registry linking patients during
            critical emergencies directly with verified nearby donors in
            minutes.
          </p>

          {/* ─ Search Widget ─ */}
          <div
            className="w-full bg-surface-container-low rounded-xl p-4 md:p-6 shadow-sm text-left"
            id="search-widget"
          >
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* City Input */}
                <div className="md:col-span-4 flex flex-col gap-1.5">
                  <label
                    htmlFor="city-input"
                    className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      location_on
                    </span>
                    City / Region
                  </label>
                  <input
                    id="city-input"
                    type="text"
                    placeholder="e.g. Lakki Marwat, Lahore, Karachi…"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white text-on-surface font-inter text-[1rem] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Blood Group Pills */}
                <div className="md:col-span-8 flex flex-col gap-1.5">
                  <label className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        water_drop
                      </span>
                      Required Blood Group
                    </span>
                    <span className="font-inter text-[0.75rem] font-normal text-on-surface-variant">
                      {selectedBloodGroup || "None selected"}
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {BLOOD_GROUPS.map((bg) => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() =>
                          setSelectedBloodGroup(
                            bg === selectedBloodGroup ? "" : bg,
                          )
                        }
                        className={`h-11 px-3 rounded-lg font-plus-jakarta font-bold text-[0.875rem] transition-all ${
                          selectedBloodGroup === bg
                            ? "bg-primary text-white shadow-sm"
                            : "bg-white text-on-surface hover:bg-surface-container shadow-sm"
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-on-surface-variant text-[0.75rem] font-inter">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    check_circle
                  </span>
                  All donor data is community-sourced and free
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-11 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg font-plus-jakarta font-semibold text-[0.875rem] transition-transform active:scale-95 shadow-md"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      search
                    </span>
                    Find Donors Instantly
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 h-11 px-4 bg-white hover:bg-surface-container text-on-surface font-plus-jakarta font-semibold text-[0.875rem] rounded-lg shadow-sm transition-colors border border-outline-variant/30"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">person_add</span>
                    Join Registry
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Trust Bar */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-4">
            {[
              { icon: "verified_user", text: "100% Free & Altruistic" },
              { icon: "id_card", text: "Verified Active Donors" },
              { icon: "bolt", text: "Fast & Direct Connection" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center justify-center gap-2 text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">
                  {icon}
                </span>
                <span className="font-plus-jakarta text-[0.875rem] font-semibold">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Stats Cards ─────────────────────────────────────────── */}
      <section className="w-full mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Registered Donors",
              value:
                totalDonors !== null ? `${totalDonors.toLocaleString()}` : "—",
              sub: "In our network",
              icon: "groups",
              iconBg: "bg-surface-container-low",
              valClass: "text-on-surface",
            },
            {
              label: "Blood Groups",
              value: "8",
              sub: "All types covered",
              icon: "bloodtype",
              iconBg: "bg-error-container",
              valClass: "text-primary",
            },
            {
              label: "Cities Covered",
              value: "50+",
              sub: "Across Pakistan",
              icon: "domain",
              iconBg: "bg-surface-container-low",
              valClass: "text-on-surface",
            },
            {
              label: "Avg Match Time",
              value: "< 5 Mins",
              sub: "With direct search",
              icon: "schedule",
              iconBg: "bg-tertiary/10",
              valClass: "text-on-surface",
            },
          ].map(({ label, value, sub, icon, iconBg, valClass }) => (
            <div
              key={label}
              className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface-variant uppercase tracking-wider">
                  {label}
                </span>
                <span
                  className={`p-2 rounded-lg ${iconBg} text-primary material-symbols-outlined text-[20px]`}
                >
                  {icon}
                </span>
              </div>
              <div>
                <div
                  className={`font-plus-jakarta font-extrabold text-[1.75rem] tracking-tight ${valClass}`}
                >
                  {value}
                </div>
                <p className="font-inter text-[0.875rem] text-on-surface-variant mt-1">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="w-full mb-8">
        <div className="max-w-3xl mb-6">
          <span className="font-plus-jakarta text-[0.75rem] font-bold uppercase tracking-wider text-primary">
            Simple, Frictionless Protocol
          </span>
          <h2 className="font-plus-jakarta font-bold text-[2rem] text-on-surface tracking-tight mt-1">
            How Blood Bank Connect Works
          </h2>
          <p className="font-inter text-[1rem] text-on-surface-variant mt-1">
            No registration required to search. Zero delays when every second
            decides a clinical outcome.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: "manage_search",
              title: "Search Donors",
              desc: "Enter blood group, city, or donor name. Our system instantly queries verified registered donors matching your criteria.",
            },
            {
              step: "02",
              icon: "contact_phone",
              title: "View Contact Details",
              desc: "Find a matching donor, open their profile card, and view their phone number to contact them directly — no middlemen.",
            },
            {
              step: "03",
              icon: "volunteer_activism",
              title: "Save a Life",
              desc: "Coordinate directly with the donor. Every connection made through this network is a life potentially saved.",
            },
          ].map(({ step, icon, title, desc }) => (
            <div
              key={step}
              className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-shadow border border-outline-variant/20"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-plus-jakarta font-bold text-[3rem] text-surface-container-highest leading-none">
                    {step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {icon}
                    </span>
                  </div>
                </div>
                <h3 className="font-plus-jakarta font-bold text-[1.125rem] text-on-surface mb-2">
                  {title}
                </h3>
                <p className="font-inter text-[0.875rem] text-on-surface-variant leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Register CTA Section ─────────────────────────────────────── */}
      <section className="w-full mb-8">
        <div className="bg-primary rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-center gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="relative z-10 text-white max-w-2xl">
            <h2 className="font-plus-jakarta font-bold text-[1.5rem] md:text-[2rem] leading-tight">
              Your Blood Could Save a Life Today
            </h2>
            <p className="font-inter text-[1rem] text-white/80 mt-2">
              Join our community registry as a voluntary blood donor.
              Registration takes less than 2 minutes.
            </p>
          </div>
          <button
            onClick={() => navigate('/register')}
            className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-plus-jakarta font-bold text-[0.875rem] hover:bg-surface-container-low transition-colors shadow-lg active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Register as a Donor
          </button>
        </div>
      </section>

      {/* ── CodeMind Team ───────────────────────────────────────────── */}
      <section className="w-full mb-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
          <div className="text-center mb-6">
            <span className="font-plus-jakarta text-[0.75rem] font-bold uppercase tracking-wider text-primary">
              Built With Purpose
            </span>
            <h2 className="font-plus-jakarta font-bold text-[2rem] text-on-surface tracking-tight mt-1">
              CodeMind Team
            </h2>
            <p className="font-inter text-[1rem] text-on-surface-variant mt-1">
              The people behind Blood Bank Connect
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: "Dr. Bilal Qureshi", role: "Director", featured: true },
              { name: "Mr. Abdullah Khan", role: "Mentor", featured: true },
              { name: "Muhammad Hanif", role: "Team Member", qualification: "BSCS, 5th Semester" },
              { name: "Muhammad Bilal", role: "Team Member", qualification: "BSCS, 5th Semester" },
              { name: "Muhammad Rehan", role: "Team Member", qualification: "BSCS, 5th Semester" },
              { name: "Muhammad Fawad", role: "Team Member", qualification: "BSCS, 5th Semester" },
              { name: "Muhammad Tauheed", role: "Team Member", qualification: "BSCS, 5th Semester" },
              { name: "Mujtaba", role: "Team Member", qualification: "BSCS, 5th Semester" },
            ].map(({ name, role, featured, qualification }) => (
              <div
                key={name}
                className={`rounded-xl p-4 border ${
                  featured
                    ? "bg-error-container/60 border-primary/15"
                    : "bg-surface-container-low border-outline-variant/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      person
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-plus-jakarta font-bold text-[0.875rem] text-on-surface truncate">
                      {name}
                    </h3>
                     {qualification && (
                      <p className="font-inter text-[0.75rem] text-on-surface-variant">
                        {qualification}
                      </p>
                    )}
                    <p
                      className={`font-inter text-[0.75rem] mt-0.5 ${featured ? "text-primary font-semibold" : "text-on-surface-variant"}`}
                    >
                      {role}
                    </p>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
