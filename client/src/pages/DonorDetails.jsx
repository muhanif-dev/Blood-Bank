import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import donorService from "../services/donorService";
import Loading from "../components/Loading";

const DonorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    donorService
      .getDonor(id)
      .then((res) => {
        if (active) setDonor(res.data);
      })
      .catch((err) => {
        if (active) setError(err.message || "Unable to load donor details.");
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
          <span className="material-symbols-outlined text-error text-[28px]">
            error_outline
          </span>
        </div>
        <h3 className="font-plus-jakarta font-bold text-[1.125rem] text-on-surface">
          {error || "Donor not found."}
        </h3>
        <button
          onClick={() => navigate("/search")}
          className="px-4 py-2 rounded-lg bg-primary text-white font-plus-jakarta font-semibold text-[0.875rem] hover:bg-primary/90 transition-colors"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const rows = [
    {
      label: "Father's Name",
      value: donor.fatherName,
      icon: "family_restroom",
    },
    { label: "Blood Group", value: donor.bloodGroup, icon: "bloodtype" },
    { label: "Address", value: donor.address, icon: "location_on" },
    { label: "Program", value: donor.program, icon: "school" },
    { label: "Department", value: donor.department, icon: "menu_book" },
    { label: "Session", value: donor.session, icon: "calendar_month" },
    { label: "Alternate Phone", value: donor.alternatePhone, icon: "phone" },
  ].filter((r) => r.value);

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      <Link
        to="/search"
        className="inline-flex items-center gap-1 text-primary font-plus-jakarta font-semibold text-[0.875rem] mb-4 hover:underline"
      >
        <span className="material-symbols-outlined text-[18px]">
          arrow_back
        </span>
        Back to Search
      </Link>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-plus-jakarta font-bold text-[1.75rem] text-on-surface">
              {donor.name}
            </h1>
            <p className="font-inter text-[0.875rem] text-on-surface-variant mt-1">
              {donor.program} Student
            </p>
          </div>
          <div className="px-4 h-16 rounded-2xl flex items-center justify-center font-plus-jakarta font-extrabold text-[1.125rem] flex-shrink-0 bg-error-container text-on-error-container">
            {donor.session}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-start gap-3 bg-surface-container-low rounded-xl p-3.5"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">
                {r.icon}
              </span>
              <div>
                <p className="font-plus-jakarta text-[0.75rem] font-semibold text-on-surface-variant uppercase tracking-wide">
                  {r.label}
                </p>
                <p className="font-inter text-[0.9375rem] text-on-surface mt-0.5">
                  {r.value}
                </p>
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
