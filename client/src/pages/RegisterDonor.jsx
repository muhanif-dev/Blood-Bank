import { useState } from "react";
import { useNavigate } from "react-router-dom";
import donorService from "../services/donorService";

const PROGRAMS = ["BS", "MS", "PhD"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const DEPARTMENTS = [
  "Computer Science",
  "English",
  "Physics",
  "Chemistry",
  "Zoology",
  "Botany",
  "Mathematics",
  "Political Science",
  "Islamiyat",
  "Sports Science",
  "Health and Physical Education",
  "BBA",
  "Veterinary",
];
const SESSIONS = ["2024-2028", "2025-2029", "2026-2030"];
const INITIAL_FORM = {
  name: "",
  fatherName: "",
  phone: "",
  alternatePhone: "",
  bloodGroup: "",
  address: "",
  program: "",
  department: "",
  session: "",
};

const RegisterDonor = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const handleChange = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: "" }));
    setServerError("");
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    else if (form.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters.";
    if (!form.fatherName.trim())
      newErrors.fatherName = "Father's name is required.";
    else if (form.fatherName.trim().length < 2)
      newErrors.fatherName = "Father's name must be at least 2 characters.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim()))
      newErrors.phone = "Please enter a valid phone number.";
    if (
      form.alternatePhone &&
      !/^[0-9+\-\s()]{7,15}$/.test(form.alternatePhone.trim())
    )
      newErrors.alternatePhone = "Please enter a valid phone number.";
    if (!form.bloodGroup) newErrors.bloodGroup = "Please select a blood group.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.program) newErrors.program = "Please select a program.";
    if (!form.department) newErrors.department = "Please select a department.";
    if (!form.session) newErrors.session = "Please select a session.";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setServerError("");
    setSuccess("");
    try {
      const result = await donorService.createDonor(form);
      setSuccess(result.message || "Registration completed successfully!");
      setForm(INITIAL_FORM);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full h-11 px-4 bg-surface-container-low rounded-lg font-inter text-[1rem] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.25)] transition-all ${errors[field] ? "ring-2 ring-error" : ""}`;

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full rounded-2xl bg-white p-6 md:p-8 shadow-sm mb-6 overflow-hidden border border-outline-variant/20">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container font-plus-jakarta text-[0.75rem] font-semibold mb-3">
            <span className="material-symbols-outlined text-[16px]">
              volunteer_activism
            </span>
            Join the Lifesaver Network
          </div>
          <h1 className="font-plus-jakarta font-bold text-[2.25rem] text-on-surface tracking-tight leading-tight">
            Donor Registration Form
          </h1>
          <p className="font-inter text-[1.125rem] text-on-surface-variant mt-2 max-w-2xl">
            Register your information to join the Blood Bank Connect network.
          </p>
        </div>
      </div>

      {success && (
        <div className="w-full mb-6 p-4 rounded-xl bg-tertiary/10 border border-tertiary/20 flex items-start gap-3">
          <span className="material-symbols-outlined text-tertiary text-[24px]">
            check_circle
          </span>
          <div>
            <p className="font-plus-jakarta font-bold text-[1rem] text-on-surface">
              {success}
            </p>
            <button
              onClick={() => navigate("/search")}
              className="mt-2 inline-flex items-center gap-1 text-primary font-plus-jakarta font-semibold text-[0.875rem] hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">
                search
              </span>
              View all donors
            </button>
          </div>
        </div>
      )}
      {serverError && (
        <div className="w-full mb-6 p-4 rounded-xl bg-error-container border border-error/20 flex items-start gap-3">
          <span className="material-symbols-outlined text-error text-[24px]">
            error_outline
          </span>
          <p className="font-inter text-[0.875rem] text-on-error-container">
            {serverError}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20"
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">
              person
            </span>
          </div>
          <h2 className="font-plus-jakarta font-bold text-[1.125rem] text-on-surface">
            Student Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            ["name", "Name", "e.g. Muhammad Ali", "text", true],
            ["fatherName", "Father's Name", "e.g. Abdul Rahman", "text", true],
            ["phone", "Phone Number", "e.g. 03000000000", "tel", true],
            [
              "alternatePhone",
              "Alternate Phone Number (Optional)",
              "e.g. 03111111111",
              "tel",
              false,
            ],
          ].map(([field, label, placeholder, type, required]) => (
            <div key={field} className="flex flex-col gap-1.5">
              <label
                htmlFor={field}
                className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide"
              >
                {label} {required && <span className="text-primary">*</span>}
              </label>
              <input
                id={field}
                type={type}
                placeholder={placeholder}
                value={form[field]}
                onChange={(event) => handleChange(field, event.target.value)}
                className={inputClass(field)}
              />
              {errors[field] && (
                <p className="font-inter text-[0.75rem] text-error">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
          {[
            ["program", "Program", PROGRAMS],
            ["department", "Department", DEPARTMENTS],
            ["session", "Session", SESSIONS],
            ["bloodGroup", "Blood Group", BLOOD_GROUPS],
          ].map(([field, label, options]) => (
            <div key={field} className="flex flex-col gap-1.5">
              <label
                htmlFor={field}
                className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide"
              >
                {label} <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <select
                  id={field}
                  value={form[field]}
                  onChange={(event) => handleChange(field, event.target.value)}
                  className={`${inputClass(field)} appearance-none pr-8 cursor-pointer`}
                >
                  <option value="">Select {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
              {errors[field] && (
                <p className="font-inter text-[0.75rem] text-error">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label
              htmlFor="address"
              className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface tracking-wide"
            >
              Address <span className="text-primary">*</span>
            </label>
            <textarea
              id="address"
              rows="3"
              placeholder="e.g. Street 4, Lakki Marwat"
              value={form.address}
              onChange={(event) => handleChange("address", event.target.value)}
              className={`${inputClass("address")} h-auto py-3 resize-none`}
            />
            {errors.address && (
              <p className="font-inter text-[0.75rem] text-error">
                {errors.address}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 bg-surface-container-low rounded-2xl p-5 border border-outline-variant/20">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px]">
              shield
            </span>
            <p className="font-inter text-[0.75rem] text-on-surface-variant leading-relaxed">
              Your information will be used to connect members of the community.
              By registering, you agree to be contacted when help is needed.
            </p>
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-5 h-14 rounded-xl bg-primary text-white font-plus-jakarta font-bold text-[1rem] flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[22px]">
                volunteer_activism
              </span>
              Register
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterDonor;
