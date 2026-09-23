const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SearchForm = ({ filters, onChange, onSearch, onReset, loading }) => {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-6 border border-outline-variant/20">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Donor Name */}
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label htmlFor="search-name" className="flex items-center gap-1 text-[0.75rem] font-plus-jakarta font-semibold text-on-surface tracking-wide">
              <span className="material-symbols-outlined text-[16px] text-primary">search</span>
              Donor Name
            </label>
            <div className="relative flex items-center">
              <input
                id="search-name"
                type="text"
                placeholder="e.g. Muhammad Hanif..."
                value={filters.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full h-11 pl-9 pr-4 bg-surface-container-low rounded-lg text-on-surface font-inter text-[1rem] placeholder:text-on-surface-variant/60 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all"
              />
              <span className="material-symbols-outlined absolute left-2.5 text-on-surface-variant text-[20px] pointer-events-none">person_search</span>
            </div>
          </div>

          {/* Father Name */}
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label htmlFor="search-father" className="flex items-center gap-1 text-[0.75rem] font-plus-jakarta font-semibold text-on-surface tracking-wide">
              <span className="material-symbols-outlined text-[16px] text-primary">family_restroom</span>
              Father's Name
            </label>
            <div className="relative flex items-center">
              <input
                id="search-father"
                type="text"
                placeholder="e.g. Ghulam Habib..."
                value={filters.fatherName}
                onChange={(e) => handleChange('fatherName', e.target.value)}
                className="w-full h-11 pl-9 pr-4 bg-surface-container-low rounded-lg text-on-surface font-inter text-[1rem] placeholder:text-on-surface-variant/60 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all"
              />
              <span className="material-symbols-outlined absolute left-2.5 text-on-surface-variant text-[20px] pointer-events-none">manage_accounts</span>
            </div>
          </div>

          {/* Blood Group */}
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label htmlFor="filter-blood" className="flex items-center gap-1 text-[0.75rem] font-plus-jakarta font-semibold text-on-surface tracking-wide">
              <span className="material-symbols-outlined text-[16px] text-primary">bloodtype</span>
              Blood Group
            </label>
            <div className="relative flex items-center">
              <select
                id="filter-blood"
                value={filters.bloodGroup}
                onChange={(e) => handleChange('bloodGroup', e.target.value)}
                className="w-full h-11 pl-9 pr-8 appearance-none bg-surface-container-low rounded-lg text-on-surface font-plus-jakarta font-semibold text-[0.875rem] focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all cursor-pointer"
              >
                <option value="">All Blood Groups</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute left-2.5 text-on-surface-variant text-[20px] pointer-events-none">invert_colors</span>
              <span className="material-symbols-outlined absolute right-2.5 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
            </div>
          </div>

          {/* Place */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label htmlFor="filter-place" className="flex items-center gap-1 text-[0.75rem] font-plus-jakarta font-semibold text-on-surface tracking-wide">
              <span className="material-symbols-outlined text-[16px] text-primary">location_city</span>
              City / Place
            </label>
            <div className="relative flex items-center">
              <input
                id="filter-place"
                type="text"
                placeholder="e.g. Lahore..."
                value={filters.place}
                onChange={(e) => handleChange('place', e.target.value)}
                className="w-full h-11 pl-9 pr-4 bg-surface-container-low rounded-lg text-on-surface font-inter text-[1rem] placeholder:text-on-surface-variant/60 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all"
              />
              <span className="material-symbols-outlined absolute left-2.5 text-on-surface-variant text-[20px] pointer-events-none">pin_drop</span>
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-1 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-primary-container text-white font-plus-jakarta font-semibold text-[0.875rem] flex items-center justify-center gap-1.5 shadow-md hover:bg-primary active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px]">search_check</span>
              <span className="hidden lg:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Quick Blood Group Pill Selectors */}
        <div className="mt-4 pt-4 border-t border-surface-container flex flex-wrap items-center gap-2">
          <span className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface-variant mr-1">Quick Select:</span>
          <button
            type="button"
            onClick={() => handleChange('bloodGroup', '')}
            className={`px-3 py-1 rounded-full text-[0.75rem] font-plus-jakarta font-semibold transition-all ${
              filters.bloodGroup === '' ? 'bg-primary text-white shadow-sm' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            All
          </button>
          {BLOOD_GROUPS.map((bg) => (
            <button
              key={bg}
              type="button"
              onClick={() => handleChange('bloodGroup', bg)}
              className={`px-3 py-1 rounded-full text-[0.75rem] font-plus-jakarta font-semibold transition-all ${
                filters.bloodGroup === bg ? 'bg-primary text-white shadow-sm' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              {bg}
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="ml-auto text-[0.75rem] font-plus-jakarta font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
