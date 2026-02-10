import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  Edit,
  Eye,
} from "lucide-react";

export const JobCard = ({
  job,
  onView,
  onUpdate,
  toggleStatus,
  onApply,
  showActions = true,
}) => {
  const isApplied = job?.isApplied;

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400";
  };

  return (
    <div className="bg-slate-700/40 backdrop-blur-md rounded-lg border border-slate-600/50 p-6 hover:border-slate-500/70 transition-all">
      
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">
          {job.jobrole}
        </h3>
        <span
          className={`ml-2 px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(
            job.status
          )}`}
        >
          {job.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-sm text-gray-300">
          <Clock className="w-4 h-4 mr-2 text-green-400" />
          <span className="capitalize">
            {job.workTime?.replace("-", " ")}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-300">
          <Users className="w-4 h-4 mr-2 text-cyan-400" />
          <span className="capitalize">
            {job.workMode?.replace("-", " ")}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-300">
          <MapPin className="w-4 h-4 mr-2 text-purple-400" />
          <span>{job.jobLocation}</span>
        </div>

        <div className="flex items-center text-sm text-gray-300">
          <Briefcase className="w-4 h-4 mr-2 text-orange-400" />
          <span>{job.minExperience}+ years</span>
        </div>
      </div>

      {/* ACTIONS */}
      {showActions && (
        <div className="flex gap-2 flex-wrap">

          {/* 👁️ VIEW (always just view, never apply) */}
          {onView && (
            <button
              onClick={() => onView(job._id)}
              className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 transition-all text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
          )}
          {/* ✏️ UPDATE (admin/recruiter only) */}
          {onUpdate && (
            <button
              onClick={() => onUpdate(job._id)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Update
            </button>
          )}

          {/* 🔄 TOGGLE STATUS (Recruiter/Admin only) */}
          {toggleStatus && (
            <button
              onClick={() => toggleStatus(job._id)}
              className={`flex-1 px-4 py-2 rounded-lg transition-all text-sm font-semibold flex items-center justify-center gap-2 ${
                job.status === "Active"
                  ? "bg-slate-800/50 border border-red-500/30 text-red-400 hover:bg-red-500/10"
                  : "bg-slate-800/50 border border-green-500/30 text-green-400 hover:bg-green-500/10"
              }`}
            >
              {job.status === "Active" ? "Close Job" : "Reopen Job"}
            </button>
          )}

          {/* 📝 APPLY / APPLIED */}
          {onApply && (
            <button
              onClick={() =>
                isApplied
                  ? onView(job._id)     // 👉 go to tracking / applied view
                  : onApply(job._id)    // 👉 go to apply page
              }
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                ${
                  isApplied
                    ? "bg-green-500/20 text-green-400"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              {isApplied ? "✅ Applied" : "Apply Now"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};


// ---------------------------------------
// import {
//   MapPin,
//   Clock,
//   Users,
//   Briefcase,
//   Eye,
// } from "lucide-react";

// export const JobCard = ({ job, onView, onApply }) => {
//   const isApplied = job?.isApplied;

//   return (
//     <div className="bg-slate-700/40 rounded-lg p-6 border border-slate-600">
//       <h3 className="text-lg font-semibold text-white mb-2">
//         {job.jobrole}
//       </h3>

//       <div className="text-gray-300 space-y-1 mb-4">
//         <div className="flex items-center">
//           <Clock className="w-4 h-4 mr-2" />
//           {job.workTime}
//         </div>
//         <div className="flex items-center">
//           <Users className="w-4 h-4 mr-2" />
//           {job.workMode}
//         </div>
//         <div className="flex items-center">
//           <MapPin className="w-4 h-4 mr-2" />
//           {job.jobLocation}
//         </div>
//         <div className="flex items-center">
//           <Briefcase className="w-4 h-4 mr-2" />
//           {job.minExperience}+ years
//         </div>
//       </div>

//       <div className="flex gap-2">
//         {/* 👁️ VIEW */}
//         <button
//           onClick={() => onView(job._id)}
//           className="flex-1 bg-slate-800 py-2 rounded-lg flex items-center justify-center gap-2"
//         >
//           <Eye className="w-4 h-4" />
//           View
//         </button>

//         {/* 📝 APPLY / APPLIED */}
//         <button
//           onClick={() =>
//             isApplied
//               ? onView(job._id)
//               : onApply(job._id)
//           }
//           className={`flex-1 py-2 rounded-lg ${
//             isApplied
//               ? "bg-green-500/20 text-green-400"
//               : "bg-blue-600 text-white"
//           }`}
//         >
//           {isApplied ? "✅ Applied" : "Apply Now"}
//         </button>
//       </div>
//     </div>
//   );
// };