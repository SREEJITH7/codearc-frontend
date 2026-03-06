// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import UserLayout from "../../../layouts/UserLayout";
// import { jobService } from "../../../services/Job/jobService";
// import SingleJobDetailsComponent from "../../../component/user/SingleJobDetailsComponent";
// import { CheckCircle } from "lucide-react";

// const UserApplicationPage = () => {
//   const { jobId } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const response = await jobService.getSingleJob(jobId);
//         setJob(response?.data?.data || response?.data);
//       } catch (error) {
//         console.error("Error fetching job:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJob();
//   }, [jobId]);

//   if (loading) return <UserLayout><div>Loading...</div></UserLayout>;
//   if (!job) return <UserLayout><div>Job not found</div></UserLayout>;

//   return (
//     <UserLayout>
//       <div className="min-h-screen bg-slate-900 text-white p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8 flex items-center gap-4">
//             <div className="p-3 bg-green-500/20 rounded-full">
//               <CheckCircle className="text-green-400 w-8 h-8" />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-white">Application Submitted</h2>
//               <p className="text-gray-400">You have already applied for this position.</p>
//             </div>
//           </div>
          
//           <SingleJobDetailsComponent job={job} />
          
//           <div className="mt-8 flex justify-center">
//             <button 
//               onClick={() => navigate("/user/jobdetails")}
//               className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-all border border-slate-700"
//             >
//               Back to All Jobs
//             </button>
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// };

// export default UserApplicationPage;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import { jobService } from "../../../services/Job/jobService";
import SingleJobDetailsComponent from "../../../component/user/SingleJobDetailsComponent";
import { CheckCircle } from "lucide-react";

const UserApplicationPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobService.getSingleJob(jobId);
        const jobData = response?.data?.data || response?.data;

        // 🔴 IMPORTANT GUARD
        // If user has NOT applied, they should not see this page
        if (!jobData?.isApplied) {
          navigate(`/user/job-apply/${jobId}`, { replace: true });
          return;
        }

        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, navigate]);

  if (loading) {
    return (
      <UserLayout>
        <div className="p-6 text-white">Loading...</div>
      </UserLayout>
    );
  }

  if (!job) {
    return (
      <UserLayout>
        <div className="p-6 text-white">Job not found</div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto">

          {/* ✅ SHOW ONLY WHEN ACTUALLY APPLIED */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8 flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-full">
              <CheckCircle className="text-green-400 w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Application Submitted
              </h2>
              <p className="text-gray-400">
                You have successfully applied for this position.
              </p>
            </div>
          </div>

          <SingleJobDetailsComponent job={job} />

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/user/jobdetails")}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-all border border-slate-700"
            >
              Back to All Jobs
            </button>
            {job.status === "SHORTLISTED" && (
                <button
                    onClick={() => navigate("/user/chat")}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                    <MessageSquare size={18} />
                    Message Recruiter
                </button>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserApplicationPage;
