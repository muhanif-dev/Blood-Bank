import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import donorService from '../services/donorService';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const INITIAL_FORM = {
  name: '',
  fatherName: '',
  bloodGroup: '',
  place: '',
  phone: '',
  email: '',
  age: '',
  gender: '',
  address: '',
  lastDonationDate: '',
};

const INITIAL_ERRORS = {};

const RegisterDonor = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    setServerError('');
    setSuccess('');
  };

  // Frontend validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    else if (form.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.';

    if (!form.fatherName.trim()) newErrors.fatherName = "Father's name is required.";
    else if (form.fatherName.trim().length < 2) newErrors.fatherName = "Father's name must be at least 2 characters.";

    if (!form.bloodGroup) newErrors.bloodGroup = 'Please select a blood group.';

    if (!form.place.trim()) newErrors.place = 'City / Place is required.';

    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim())) newErrors.phone = 'Please enter a valid phone number.';

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (form.age && (isNaN(form.age) || form.age < 16 || form.age > 65)) {
      newErrors.age = 'Age must be between 16 and 65.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setServerError('');
    setSuccess('');
    try {
      const result = await donorService.createDonor(form);
      setSuccess(result.message || 'Donor registered successfully!');
      setForm(INITIAL_FORM);
      setErrors({});
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="relative w-full rounded-2xl bg-white p-6 md:p-8 shadow-sm mb-6 overflow-hidden border border-outline-variant/20">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container font-plus-jakarta text-[0.75rem] font-semibold mb-3">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              volunteer_activism
            </span>
            Join the Lifesaver Network
          </div>
          <h1 className="font-plus-jakarta font-bold text-[2.25rem] text-on-surface tracking-tight leading-tight">
            Donor Registration Form
          </h1>
          <p className="font-inter text-[1.125rem] text-on-surface-variant mt-2 max-w-2xl">
            Register as a voluntary blood donor. Your information will help connect you with patients in urgent need.
            Takes less than 2 minutes.
          </p>
        </div>
      </div>

      {/* ── Success Banner ───────────────────────────────────────────── */}
      {success && (
        <div className="w-full mb-6 p-4 rounded-xl bg-tertiary/10 border border-tertiary/20 flex items-start gap-3">
          <span className="material-symbols-outlined text-tertiary text-[24px] flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <div>
            <p className="font-plus-jakarta font-bold text-[1rem] text-on-surface">{success}</p>
            <p className="font-inter text-[0.875rem] text-on-surface-variant mt-0.5">
              Thank you for joining the Blood Bank Connect network!
            </p>
            <button
              onClick={() => navigate('/search')}
              className="mt-2 inline-flex items-center gap-1 text-primary font-plus-jakarta font-semibold text-[0.875rem] hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">search</span>
              View all donors
            </button>
          </div>
        </div>
      )}

      {/* ── Server Error Banner ──────────────────────────────────────── */}
      {serverError && (
        <div className="w-full mb-6 p-4 rounded-xl bg-error-container border border-error/20 flex items-start gap-3">
          <span className="material-symbols-outlined text-error text-[24px] flex-shrink-0">error_outline</span>
          <p className="font-inter text-[0.875rem] text-on-error-container">{serverError}</p>
        </div>
      )}

      {/* ── Registration Form ────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ─ Required Information ─ */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    person
                  </span>
                </div>
                <h2 className="font-plus-jakarta font-bold text-[1.125rem] text-on-surface">Required Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Muhammad Ali"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full h-11 px-4 bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all ${errors.name ? 'ring-2 ring-error' : ''}`}
                  />
                  {errors.name && <p className="font-inter text-[0.75rem] text-error">{errors.name}</p>}
                </div>

                {/* Father's Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fatherName" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">
                    Father's Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="fatherName"
                    type="text"
                    placeholder="e.g. Abdul Rahman"
                    value={form.fatherName}
                    onChange={(e) => handleChange('fatherName', e.target.value)}
                    className={`w-full h-11 px-4 bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all ${errors.fatherName ? 'ring-2 ring-error' : ''}`}
                  />
                  {errors.fatherName && <p className="font-inter text-[0.75rem] text-error">{errors.fatherName}</p>}
                </div>

                {/* Blood Group */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bloodGroup" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">
                    Blood Group <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="bloodGroup"
                      value={form.bloodGroup}
                      onChange={(e) => handleChange('bloodGroup', e.target.value)}
                      className={`w-full h-11 pl-4 pr-8 appearance-none bg-surface-container-low rounded-lg font-plus-jakarta font-semibold text-[0.875rem] text-on-surface focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all cursor-pointer ${errors.bloodGroup ? 'ring-2 ring-error' : ''}`}
                    >
                      <option value="">Select Blood Group</option>
                      {BLOOD_GROUPS.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
                  </div>
                  {errors.bloodGroup && <p className="font-inter text-[0.75rem] text-error">{errors.bloodGroup}</p>}
                </div>

                {/* City / Place */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="place" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">
                    City / Place <span className="text-primary">*</span>
                  </label>
                  <input
                    id="place"
                    type="text"
                    placeholder="e.g. Lakki Marwat"
                    value={form.place}
                    onChange={(e) => handleChange('place', e.target.value)}
                    className={`w-full h-11 px-4 bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all ${errors.place ? 'ring-2 ring-error' : ''}`}
                  />
                  {errors.place && <p className="font-inter text-[0.75rem] text-error">{errors.place}</p>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="phone" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">
                    Phone Number <span className="text-primary">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 03000000000"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full h-11 px-4 bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all ${errors.phone ? 'ring-2 ring-error' : ''}`}
                  />
                  {errors.phone && <p className="font-inter text-[0.75rem] text-error">{errors.phone}</p>}
                  <p className="font-inter text-[0.75rem] text-on-surface-variant">This will be shared with people searching for your blood type.</p>
                </div>
              </div>
            </div>

            {/* ─ Optional Information ─ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">tune</span>
                </div>
                <div>
                  <h2 className="font-plus-jakarta font-bold text-[1.125rem] text-on-surface">Optional Details</h2>
                  <p className="font-inter text-[0.75rem] text-on-surface-variant">Helps patients find you more easily</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. ali@example.com"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full h-11 px-4 bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all ${errors.email ? 'ring-2 ring-error' : ''}`}
                  />
                  {errors.email && <p className="font-inter text-[0.75rem] text-error">{errors.email}</p>}
                </div>

                {/* Age */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="age" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">Age</label>
                  <input
                    id="age"
                    type="number"
                    placeholder="e.g. 25"
                    min="16"
                    max="65"
                    value={form.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className={`w-full h-11 px-4 bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all ${errors.age ? 'ring-2 ring-error' : ''}`}
                  />
                  {errors.age && <p className="font-inter text-[0.75rem] text-error">{errors.age}</p>}
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="gender" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">Gender</label>
                  <div className="relative">
                    <select
                      id="gender"
                      value={form.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-full h-11 pl-4 pr-8 appearance-none bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all cursor-pointer"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
                  </div>
                </div>

                {/* Last Donation Date */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastDonationDate" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">
                    Last Donation Date
                  </label>
                  <input
                    id="lastDonationDate"
                    type="date"
                    value={form.lastDonationDate}
                    onChange={(e) => handleChange('lastDonationDate', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full h-11 px-4 bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all"
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="address" className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide">Full Address</label>
                  <textarea
                    id="address"
                    placeholder="e.g. Street 4, Block B, Lahore, Punjab"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ─ Sidebar: Summary & Submit ─ */}
          <div className="lg:col-span-1 space-y-4">
            {/* Blood Group Preview */}
            {form.bloodGroup && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/20 text-center">
                <p className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                  Selected Blood Group
                </p>
                <div className="w-20 h-20 rounded-2xl bg-error-container mx-auto flex items-center justify-center">
                  <span className="font-plus-jakarta font-extrabold text-[2rem] text-primary">{form.bloodGroup}</span>
                </div>
                <p className="font-inter text-[0.875rem] text-on-surface-variant mt-3">
                  You will be listed as a <strong>{form.bloodGroup}</strong> donor.
                </p>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/20">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shield
                </span>
                <div>
                  <h3 className="font-plus-jakarta font-bold text-[0.875rem] text-on-surface mb-1">Privacy Notice</h3>
                  <p className="font-inter text-[0.75rem] text-on-surface-variant leading-relaxed">
                    Your phone number will be visible to people searching for blood donors. Other details are shown only on your
                    profile page. You can request removal at any time.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-14 rounded-xl bg-primary text-white font-plus-jakarta font-bold text-[1rem] flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Registering…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    volunteer_activism
                  </span>
                  Register as Donor
                </>
              )}
            </button>
            <p className="font-inter text-[0.75rem] text-on-surface-variant text-center">
              By registering, you agree to be contacted by patients in need.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterDonor;
