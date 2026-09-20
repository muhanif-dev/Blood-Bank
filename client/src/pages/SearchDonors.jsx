import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import DonorCard from '../components/DonorCard';
import Loading from '../components/Loading';
import donorService from '../services/donorService';

const DEFAULT_FILTERS = { name: '', fatherName: '', bloodGroup: '', place: '' };

const SearchDonors = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    name: searchParams.get('name') || '',
    fatherName: searchParams.get('fatherName') || '',
    bloodGroup: searchParams.get('bloodGroup') || '',
    place: searchParams.get('place') || '',
  });

  const [donors, setDonors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const fetchDonors = useCallback(async (currentFilters, page = 1) => {
    setLoading(true);
    setError('');
    try {
      const result = await donorService.getDonors({ ...currentFilters, page, limit: 9 });
      setDonors(result.data);
      setPagination(result.pagination);
      setSearched(true);
    } catch (err) {
      setError(err.message);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-search on mount if query params present
  useEffect(() => {
    const hasParams = searchParams.get('bloodGroup') || searchParams.get('place') || searchParams.get('name');
    if (hasParams) {
      fetchDonors(filters);
    } else {
      fetchDonors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    // Update URL params
    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.fatherName) params.fatherName = filters.fatherName;
    if (filters.bloodGroup) params.bloodGroup = filters.bloodGroup;
    if (filters.place) params.place = filters.place;
    setSearchParams(params);
    fetchDonors(filters, 1);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchParams({});
    fetchDonors({}, 1);
  };

  const handlePageChange = (newPage) => {
    fetchDonors(filters, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="relative w-full rounded-2xl bg-white p-6 md:p-8 shadow-sm mb-6 overflow-hidden border border-outline-variant/20">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed/30 text-on-surface font-plus-jakarta text-[0.75rem] font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-tertiary" />
              Verified Network • Zero Middlemen
            </div>
            <h1 className="font-plus-jakarta font-bold text-[2.25rem] text-on-surface tracking-tight leading-tight">
              Find a Blood Donor Nearby
            </h1>
            <p className="font-inter text-[1.125rem] text-on-surface-variant mt-2">
              Search verified voluntary donors by blood group, city, or name. Direct call, instant response.
            </p>
          </div>
          {/* Response Rate Gauge */}
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                <circle className="text-surface-container-highest" cx="24" cy="24" fill="none" r="20" stroke="currentColor" strokeWidth="4" />
                <circle className="text-tertiary" cx="24" cy="24" fill="none" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="22" strokeLinecap="round" strokeWidth="4" />
              </svg>
              <span className="absolute font-plus-jakarta text-[0.75rem] font-bold text-on-surface">92%</span>
            </div>
            <div>
              <span className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface-variant uppercase tracking-wider block">Response Rate</span>
              <span className="font-plus-jakarta font-bold text-[1.125rem] text-on-surface">Fast & Direct</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Form ──────────────────────────────────────────────── */}
      <SearchForm
        filters={filters}
        onChange={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
        loading={loading}
      />

      {/* ── Results Header ───────────────────────────────────────────── */}
      {searched && !loading && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-ping" />
            <span className="font-plus-jakarta font-semibold text-[1.125rem] text-on-surface">
              Showing{' '}
              <span className="font-bold text-primary">{pagination.total}</span>{' '}
              {pagination.total === 1 ? 'donor' : 'donors'} found
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-surface-container-low rounded-full">
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary" />
            <span className="font-plus-jakarta text-[0.75rem] font-semibold text-tertiary">Available for Emergency Response</span>
          </div>
        </div>
      )}

      {/* ── States ───────────────────────────────────────────────────── */}
      {loading && <Loading />}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="w-14 h-14 rounded-full bg-error-container flex items-center justify-center">
            <span className="material-symbols-outlined text-error text-[28px]">error_outline</span>
          </div>
          <p className="font-plus-jakarta font-semibold text-[1rem] text-on-surface">{error}</p>
          <button
            onClick={() => fetchDonors(filters)}
            className="px-4 py-2 rounded-lg bg-primary text-white font-plus-jakarta font-semibold text-[0.875rem] hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && searched && donors.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant text-[32px]">search_off</span>
          </div>
          <h3 className="font-plus-jakarta font-bold text-[1.125rem] text-on-surface">No matching donors found.</h3>
          <p className="font-inter text-[0.875rem] text-on-surface-variant max-w-sm">
            Try different search criteria or remove some filters to see more results.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface font-plus-jakarta font-semibold text-[0.875rem] hover:bg-surface-container transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* ── Donor Cards Grid ─────────────────────────────────────────── */}
      {!loading && !error && donors.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {donors.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>

          {/* ── Pagination ───────────────────────────────────────────── */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-outline-variant/30 text-on-surface font-plus-jakarta font-semibold text-[0.875rem] hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                Previous
              </button>

              <span className="font-plus-jakarta text-[0.875rem] font-semibold text-on-surface-variant px-4 py-2 bg-surface-container-low rounded-lg">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white font-plus-jakarta font-semibold text-[0.875rem] hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Next
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchDonors;
