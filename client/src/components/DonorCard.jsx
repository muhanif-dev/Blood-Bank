import { Link } from "react-router-dom";

// Get initials from name
const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const DonorCard = ({ donor }) => {
  const { _id, name, fatherName, program, department, session } = donor;
  const initials = getInitials(name);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/20 group">
      <div>
        {/* Top row: avatar + name + program */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            {/* Initials Avatar */}
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0 text-on-surface font-plus-jakarta font-bold text-[0.875rem] shadow-inner">
              {initials}
            </div>
            <div>
              <h3 className="font-plus-jakarta font-bold text-[1.125rem] text-on-surface leading-tight">
                {name}
              </h3>
              <p className="font-inter text-[0.75rem] font-semibold text-on-surface-variant mt-0.5">
                S/O: {fatherName}
              </p>
            </div>
          </div>
          <div className="px-3 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0 font-plus-jakarta font-extrabold text-[0.875rem]">
            {program}
          </div>
        </div>

        {/* Info strip */}
        <div className="space-y-2 py-3 bg-surface-container-low/50 rounded-xl px-3 mb-4">
          <div className="flex items-center justify-between text-[0.875rem]">
            <span className="flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">
                school
              </span>
              <span className="font-semibold text-on-surface">
                {department}
              </span>
            </span>
            <span className="text-[0.75rem] font-plus-jakarta font-semibold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
              {session}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[0.75rem] font-plus-jakarta text-tertiary font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            Student Profile
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Link
          to={`/donors/${_id}`}
          className="flex-1 h-10 rounded-lg bg-primary text-white font-plus-jakarta font-semibold text-[0.875rem] flex items-center justify-center gap-1.5 hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">
            person_search
          </span>
          View Details
        </Link>
        <Link
          to={`/donors/${_id}`}
          className="h-10 w-10 rounded-lg bg-surface-container-low text-on-surface-variant flex items-center justify-center hover:bg-surface-container transition-colors"
          title="Contact Donor"
        >
          <span className="material-symbols-outlined text-[18px]">call</span>
        </Link>
      </div>
    </div>
  );
};

export default DonorCard;
