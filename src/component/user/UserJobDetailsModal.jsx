import { X, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SingleJobDetailsComponent from "./SingleJobDetailsComponent";

const UserJobDetailsModal = ({ job, onClose }) => {
  const navigate = useNavigate();
  const isApplied = job?.isApplied;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-slate-900 rounded-xl w-full max-w-4xl p-6 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        {/* APPLIED BANNER */}
        {isApplied && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="text-green-400" />
            <p className="text-green-300 font-medium">
              You have already applied for this job
            </p>
          </div>
        )}

        {/* JOB DETAILS */}
        <SingleJobDetailsComponent job={job} />

        {/* ACTIONS */}
        <div className="mt-6 flex gap-4 justify-end">
          {job?.status === "Inactive" ? (
             <div className="flex-1 flex items-center justify-between bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 font-medium text-sm">
                  This position is no longer accepting applications
                </p>
                <button
                  disabled
                  className="px-6 py-2 bg-slate-700 text-gray-400 rounded-lg font-semibold cursor-not-allowed"
                >
                  Apply Now
                </button>
             </div>
          ) : !isApplied ? (
            <button
              onClick={() => navigate(`/user/job-apply/${job._id}`)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
            >
              Apply Now
            </button>
          ) : (
            <button
              onClick={() =>
                navigate(`/user/application-tracking/${job._id}`)
              }
              className="px-6 py-2 bg-green-500/20 text-green-400 rounded-lg font-semibold"
            >
              View Application Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserJobDetailsModal;
