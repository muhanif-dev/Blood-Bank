import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import donorService from '../services/donorService';
import Loading from '../components/Loading';

const bloodGroupStyle = {
  'A+': 'bg-red-50 text-red-700 border border-red-200',
  'A-': 'bg-red-50 text-red-800 border border-red-200',
  'B+': 'bg-orange-50 text-orange-700 border border-orange-200',
  'B-': 'bg-orange-50 text-orange-800 border border-orange-200',
  'AB+': 'bg-purple-50 text-purple-700 border border-purple-200',
  'AB-': 'bg-purple-50 text-purple-800 border border-purple-200',
  'O+': 'bg-error-container text-on-error-container border border-error/20',
  'O-': 'bg-error-container text-on-error-container border border-error/30',
};

const DonorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    donorService
      .getDonor(id)
      .then((res) => {
        if (active) setDonor(res.data);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Unable to load donor details.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <Loading message="Loading donor details..." />;

  if (error || !donor) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <div className="w-14 h-14 rounded-full bg-error-container flex items-center justify-center">
          <span className="material-symbols-outlined text-error text-[28px]">error_outline</span>
        </div>
        <h3 className="font-plus-jakarta font-bold text-[1.125rem] text-on-surface">
          {error || 'Donor not found.'}
        </h3>
        <button
          onClick={() => navigate('/search')}
          className="px-4 py-2 rounded-lg bg-primary text-white font-plus-jakarta font-semibold text-[0.875rem] hover:bg-primary/90 transition-colors"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const badgeClass =
    bloodGroupStyle[donor.bloodGroup] ||
    'bg-surface-container text-on-surface border border-outline-variant';

  const lastDonation = donor.lastDonationDate
    ? new Date(donor.lastDonationDate).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const rows = [
    { label: "Father's Name", value: donor.fatherName, icon: 'family_restroom' },
    { label: 'City / Place', value: donor.place, icon: 'location_on' },
    { label: 'Email', value: donor.email, icon: 'mail' },
    { label: 'Age', value: donor.age ? `${donor.age} years` : null, icon: 'cake' },
    { label: 'Gender', value: donor.gender, icon: 'wc' },
    { label: 'Address', value: donor.address, icon: 'home' },
    { label: 'Last Donation', value: lastDonation, icon: 'event' },
  ].filter((r) => r.value);

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      <Link
        to="/search"
        className="inline-flex items-center gap-1 text-primary font-plus-jakarta font-semibold text-[0.875rem] mb-4 hover:underline"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to Search
      </Link>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-plus-jakarta font-bold text-[1.75rem] text-on-surface">{donor.name}</h1>
            <p className="font-inter text-[0.875rem] text-on-surface-variant mt-1">Voluntary Blood Donor</p>
          </div>
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center font-plus-jakarta font-extrabold text-[1.5rem] flex-shrink-0 ${badgeClass}`}
          >
            {donor.bloodGroup}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start gap-3 bg-surface-container-low rounded-xl p-3.5">
              <span className="material-symbols-outlined text-primary text-[20px]">{r.icon}</span>
              <div>
                <p className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                  {r.label}
                </p>
                <p className="font-inter text-[0.9375rem] text-on-surface mt-0.5">{r.value}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href={`tel:${donor.phone}`}
          className="w-full h-14 rounded-xl bg-primary text-white font-plus-jakarta font-bold text-[1rem] flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md"
        >
          <span className="material-symbols-outlined text-[22px]">call</span>
          Call {donor.phone}
        </a>
      </div>
    </div>
  );
};

export default DonorDetails;