

// import React, { useState, useEffect } from "react";
// import { Briefcase, Plus, SlidersHorizontal, X } from "lucide-react";
// import { toast } from "react-toastify";

// import { JobsLoadingSkeleton } from "../../../utils/shimmer/JobCardSkeleton";
// import RecruiterLayout from "../../../layouts/RecruiterLayout";
// import { jobService } from "../../../services/Job/jobService";
// import { Search } from "../../../component/common/Search";
// import { DropdownFilter } from "../../../component/common/DropDownFilter";
// import { JobCard } from "../../../component/common/CardComponent";
// import Pagination from "../../../component/common/Pagination";
// import { Link, useNavigate } from "react-router-dom";
// import { JobDetailsModal } from "../../../component/recruiter/JobDetailsModal";
// import { ConfirmModal } from "../../../component/common/ConfirmModal";

// const ViewAllJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const navigate = useNavigate();

//   const [pagination, setPagination] = useState({
//     total: 0,
//     page: 1,
//     pages: 1,
//     limit: 6,
//     hasNextPage: false,
//     hasPrevPage: false,
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     status: "",
//     workmode: "",
//     worktime: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [jobToToggle, setJobToToggle] = useState(null);

//   const limit = 6;

//   const activeFilterCount = Object.values(filters).filter(Boolean).length;

//   useEffect(() => {
//     if (searchTerm.trim() !== "") {
//       const delay = setTimeout(() => fetchJobs(), 500);
//       return () => clearTimeout(delay);
//     } else {
//       fetchJobs();
//     }
//   }, [searchTerm]);

//   useEffect(() => {
//     fetchJobs();
//   }, [currentPage, filters.status, filters.workmode, filters.worktime]);

//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
//       const response = await jobService.viewAllJobs({
//         page: currentPage,
//         limit,
//         search: searchTerm || undefined,
//         status: filters.status || undefined,
//         workmode: filters.workmode || undefined,
//         worktime: filters.worktime || undefined,
//       });

//       if (response.data.success && response.data.data) {
//         setJobs(response.data.data.jobs || []);
//         setPagination(response.data.data.pagination || pagination);
//       } else {
//         setJobs([]);
//       }
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       setJobs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchChange = (value) => {
//     setCurrentPage(1);
//     setSearchTerm(value);
//   };

//   const handleFilterChange = (key, value) => {
//     setCurrentPage(1);
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const clearAllFilters = () => {
//     setFilters({ status: "", workmode: "", worktime: "" });
//     setCurrentPage(1);
//   };

//   const handleUpdate = (job) => {
//     navigate(`/recruiter/jobpost`, { state: { jobs: job } });
//   };

//   const openConfirmModal = (job) => {
//     setJobToToggle(job);
//     setModalOpen(true);
//   };

//   const handleConfirmToggle = async () => {
//     if (!jobToToggle) return;
//     try {
//       const response = await jobService.toggleJobStatus(jobToToggle._id);
//       if (response.data && response.data._id) {
//         setJobs((prev) =>
//           prev.map((job) =>
//             job._id === response.data._id
//               ? { ...job, status: response.data.status }
//               : job
//           )
//         );
//         toast.success(
//           response.data.status === "Inactive"
//             ? "Job closed successfully"
//             : "Job reopened successfully"
//         );
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setModalOpen(false);
//       setJobToToggle(null);
//     }
//   };

//   const handleView = (jobId) => {
//     const job = jobs.find((j) => j._id === jobId);
//     if (job) setSelectedJob(job);
//   };

//   const statusOptions = [
//     { value: "active", label: "Active" },
//     { value: "blocked", label: "Inactive" },
//   ];

//   const workModeOptions = [
//     { value: "remote", label: "Remote" },
//     { value: "on-site", label: "On Site" },
//     { value: "hybrid", label: "Hybrid" },
//   ];

//   const workTimeOptions = [
//     { value: "full-time", label: "Full Time" },
//     { value: "part-time", label: "Part Time" },
//     { value: "contract", label: "Contract" },
//     { value: "internship", label: "Internship" },
//   ];

//   if (loading) {
//     return (
//       <RecruiterLayout>
//         <JobsLoadingSkeleton />
//       </RecruiterLayout>
//     );
//   }

//   return (
//     <RecruiterLayout>
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
//         <div className="max-w-7xl mx-auto px-6 py-8">

//           {/* ── Header ── */}
//           <div className="flex items-start justify-between mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-white">Posted Jobs</h1>
//               <p className="text-slate-400 mt-1 text-sm">
//                 {pagination.total > 0
//                   ? `${pagination.total} job${pagination.total !== 1 ? "s" : ""} posted`
//                   : "Manage and track your job postings"}
//               </p>
//             </div>

//             <Link to="/recruiter/jobpost">
//               <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/20">
//                 <Plus className="w-4 h-4" />
//                 Post a Job
//               </button>
//             </Link>
//           </div>

//           {/* ── Search + Filters — no box, lives in the open ── */}
//           <div className="mb-6 space-y-3">
//             {/* Search row */}
//             <Search
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Search by job title..."
//             />

//             {/* Filters row */}
//             <div className="flex flex-wrap items-center gap-2">
//               {/* Label */}
//               <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium pr-1">
//                 <SlidersHorizontal className="w-3.5 h-3.5" />
//                 Filters
//               </span>

//               {/* Dropdowns — z-50 is on the dropdown panel itself inside DropdownFilter */}
//               <DropdownFilter
//                 label="Status"
//                 options={statusOptions}
//                 value={filters.status}
//                 onChange={(value) => handleFilterChange("status", value)}
//               />
//               <DropdownFilter
//                 label="Work Mode"
//                 options={workModeOptions}
//                 value={filters.workmode}
//                 onChange={(value) => handleFilterChange("workmode", value)}
//               />
//               <DropdownFilter
//                 label="Work Time"
//                 options={workTimeOptions}
//                 value={filters.worktime}
//                 onChange={(value) => handleFilterChange("worktime", value)}
//               />

//               {/* Clear all — only shown when a filter is active */}
//               {activeFilterCount > 0 && (
//                 <button
//                   onClick={clearAllFilters}
//                   className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium
//                     text-slate-400 hover:text-white border border-dashed border-slate-600
//                     hover:border-slate-400 transition-all duration-150"
//                 >
//                   <X className="w-3 h-3" />
//                   Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
//                 </button>
//               )}
//             </div>

//             {/* Active filter chips */}
//             {activeFilterCount > 0 && (
//               <div className="flex flex-wrap gap-2 pt-1">
//                 {filters.status && (
//                   <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
//                     bg-blue-500/10 border border-blue-500/30 text-blue-300">
//                     Status: {statusOptions.find(o => o.value === filters.status)?.label}
//                     <button onClick={() => handleFilterChange("status", "")} className="hover:text-white">
//                       <X className="w-3 h-3" />
//                     </button>
//                   </span>
//                 )}
//                 {filters.workmode && (
//                   <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
//                     bg-purple-500/10 border border-purple-500/30 text-purple-300">
//                     Mode: {workModeOptions.find(o => o.value === filters.workmode)?.label}
//                     <button onClick={() => handleFilterChange("workmode", "")} className="hover:text-white">
//                       <X className="w-3 h-3" />
//                     </button>
//                   </span>
//                 )}
//                 {filters.worktime && (
//                   <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
//                     bg-pink-500/10 border border-pink-500/30 text-pink-300">
//                     Time: {workTimeOptions.find(o => o.value === filters.worktime)?.label}
//                     <button onClick={() => handleFilterChange("worktime", "")} className="hover:text-white">
//                       <X className="w-3 h-3" />
//                     </button>
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* ── Results count ── */}
//           {jobs.length > 0 && (
//             <p className="text-slate-500 text-xs mb-4">
//               Showing{" "}
//               <span className="text-slate-300 font-medium">{jobs.length}</span>{" "}
//               of{" "}
//               <span className="text-slate-300 font-medium">{pagination.total}</span>{" "}
//               jobs
//             </p>
//           )}

//           {/* ── Job grid ── */}
//           {jobs.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-24 text-center">
//               <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
//                 <Briefcase className="w-7 h-7 text-slate-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-slate-400 mb-1">No jobs found</h3>
//               <p className="text-slate-600 text-sm">
//                 {activeFilterCount > 0 || searchTerm
//                   ? "Try adjusting your search or filters"
//                   : "Post your first job to get started"}
//               </p>
//               {(activeFilterCount > 0 || searchTerm) && (
//                 <button
//                   onClick={() => { clearAllFilters(); handleSearchChange(""); }}
//                   className="mt-4 px-4 py-2 rounded-xl text-sm text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
//                 >
//                   Clear all filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
//               {jobs.map((job) => (
//                 <JobCard
//                   key={job._id}
//                   job={job}
//                   onView={handleView}
//                   onUpdate={() => handleUpdate(job)}
//                   toggleStatus={() => openConfirmModal(job)}
//                 />
//               ))}
//             </div>
//           )}

//           {/* ── Pagination ── */}
//           {pagination.pages > 1 && (
//             <Pagination
//               currentPage={pagination.page}
//               totalPages={pagination.pages}
//               onPageChange={setCurrentPage}
//             />
//           )}
//         </div>
//       </div>

//       {selectedJob && (
//         <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
//       )}

//       <ConfirmModal
//         isOpen={modalOpen}
//         title={jobToToggle?.status === "Active" ? "Close Job Posting" : "Reopen Job Posting"}
//         message={
//           jobToToggle?.status === "Active"
//             ? "Candidates will no longer be able to apply once this job is closed."
//             : "This job will be visible to candidates again."
//         }
//         confirmText={jobToToggle?.status === "Active" ? "Close Job" : "Reopen Job"}
//         variant={jobToToggle?.status === "Active" ? "danger" : "info"}
//         onConfirm={handleConfirmToggle}
//         onCancel={() => setModalOpen(false)}
//       />
//     </RecruiterLayout>
//   );
// };

// export default ViewAllJobs;


import React, { useState, useEffect } from "react";
import { Briefcase, Plus, SlidersHorizontal, X } from "lucide-react";
import { toast } from "react-toastify";

import { JobsLoadingSkeleton, JobGridSkeleton } from "../../../utils/shimmer/JobCardSkeleton";
import RecruiterLayout from "../../../layouts/RecruiterLayout";
import { jobService } from "../../../services/Job/jobService";
import { Search } from "../../../component/common/Search";
import { DropdownFilter } from "../../../component/common/DropDownFilter";
import { JobCard } from "../../../component/common/CardComponent";
import Pagination from "../../../component/common/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { JobDetailsModal } from "../../../component/recruiter/JobDetailsModal";
import { ConfirmModal } from "../../../component/common/ConfirmModal";

const ViewAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    workmode: "",
    worktime: "",
  });

 
  const [initialLoad, setInitialLoad] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [jobToToggle, setJobToToggle] = useState(null);

  const limit = 6;

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

   

  useEffect(() => {
    const isTyping = searchTerm.trim() !== "";
    const delay = isTyping ? 500 : 0;

    const timer = setTimeout(() => {
      fetchJobs(currentPage, searchTerm, filters);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, currentPage, filters.status, filters.workmode, filters.worktime]);

  const fetchJobs = async (page, search, activeFilters) => {
    try {
      
      if (initialLoad) {
        setInitialLoad(false);
      }
      setIsFetching(true);

      const response = await jobService.viewAllJobs({
        page,
        limit,
        search: search?.trim() || undefined,
        status: activeFilters.status || undefined,
        workmode: activeFilters.workmode || undefined,
        worktime: activeFilters.worktime || undefined,
      });

      if (response.data.success && response.data.data) {
        setJobs(response.data.data.jobs || []);
        setPagination(response.data.data.pagination || pagination);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearchChange = (value) => {
    setCurrentPage(1);
    setSearchTerm(value);
  };

  const handleFilterChange = (key, value) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({ status: "", workmode: "", worktime: "" });
    setCurrentPage(1);
  };

  const handleUpdate = (job) => {
    navigate(`/recruiter/jobpost`, { state: { jobs: job } });
  };

  const openConfirmModal = (job) => {
    setJobToToggle(job);
    setModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (!jobToToggle) return;
    try {
      const response = await jobService.toggleJobStatus(jobToToggle._id);
      if (response.data && response.data._id) {
        setJobs((prev) =>
          prev.map((job) =>
            job._id === response.data._id
              ? { ...job, status: response.data.status }
              : job
          )
        );
        toast.success(
          response.data.status === "Inactive"
            ? "Job closed successfully"
            : "Job reopened successfully"
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setModalOpen(false);
      setJobToToggle(null);
    }
  };

  const handleView = (jobId) => {
    const job = jobs.find((j) => j._id === jobId);
    if (job) setSelectedJob(job);
  };

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "blocked", label: "Inactive" },
  ];

  const workModeOptions = [
    { value: "remote", label: "Remote" },
    { value: "on-site", label: "On Site" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const workTimeOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  // Initial full-page skeleton only for very first mount if desired, 
  // but we prefer showing the layout with filter bar + card skeletons.
  // if (initialLoad && isFetching) {
  //   return (
  //     <RecruiterLayout>
  //       <JobsLoadingSkeleton />
  //     </RecruiterLayout>
  //   );
  // }

  return (
    <RecruiterLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Posted Jobs</h1>
              <p className="text-slate-400 mt-1 text-sm">
                {pagination.total > 0
                  ? `${pagination.total} job${pagination.total !== 1 ? "s" : ""} posted`
                  : "Manage and track your job postings"}
              </p>
            </div>

            <Link to="/recruiter/jobpost">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/20">
                <Plus className="w-4 h-4" />
                Post a Job
              </button>
            </Link>
          </div>

          {/* ── Search + Filters ── */}
          <div className="mb-6 space-y-3">
            {/* Search row with inline fetching indicator */}
            <div className="relative">
              <Search
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by job title..."
              />
              {isFetching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                  <span className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Filters row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Label */}
              <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium pr-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </span>

              {/* Dropdowns — z-50 is on the dropdown panel itself inside DropdownFilter */}
              <DropdownFilter
                label="Status"
                options={statusOptions}
                value={filters.status}
                onChange={(value) => handleFilterChange("status", value)}
              />
              <DropdownFilter
                label="Work Mode"
                options={workModeOptions}
                value={filters.workmode}
                onChange={(value) => handleFilterChange("workmode", value)}
              />
              <DropdownFilter
                label="Work Time"
                options={workTimeOptions}
                value={filters.worktime}
                onChange={(value) => handleFilterChange("worktime", value)}
              />

              {/* Clear all — only shown when a filter is active */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium
                    text-slate-400 hover:text-white border border-dashed border-slate-600
                    hover:border-slate-400 transition-all duration-150"
                >
                  <X className="w-3 h-3" />
                  Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
                </button>
              )}
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {filters.status && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
                    bg-blue-500/10 border border-blue-500/30 text-blue-300">
                    Status: {statusOptions.find(o => o.value === filters.status)?.label}
                    <button onClick={() => handleFilterChange("status", "")} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.workmode && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
                    bg-purple-500/10 border border-purple-500/30 text-purple-300">
                    Mode: {workModeOptions.find(o => o.value === filters.workmode)?.label}
                    <button onClick={() => handleFilterChange("workmode", "")} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.worktime && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
                    bg-pink-500/10 border border-pink-500/30 text-pink-300">
                    Time: {workTimeOptions.find(o => o.value === filters.worktime)?.label}
                    <button onClick={() => handleFilterChange("worktime", "")} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── Results count ── */}
          {jobs.length > 0 && (
            <p className="text-slate-500 text-xs mb-4">
              Showing{" "}
              <span className="text-slate-300 font-medium">{jobs.length}</span>{" "}
              of{" "}
              <span className="text-slate-300 font-medium">{pagination.total}</span>{" "}
              jobs
            </p>
          )}

          {/* ── Job grid ── */}
          {isFetching && jobs.length === 0 ? (
            <JobGridSkeleton count={limit} columns="grid md:grid-cols-2 lg:grid-cols-3 gap-5" />
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                <Briefcase className="w-7 h-7 text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-400 mb-1">No jobs found</h3>
              <p className="text-slate-600 text-sm">
                {activeFilterCount > 0 || searchTerm
                  ? "Try adjusting your search or filters"
                  : "Post your first job to get started"}
              </p>
              {(activeFilterCount > 0 || searchTerm) && (
                <button
                  onClick={() => { clearAllFilters(); handleSearchChange(""); }}
                  className="mt-4 px-4 py-2 rounded-xl text-sm text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 transition-all duration-300 ${isFetching ? "opacity-40 grayscale-[0.5] pointer-events-none" : "opacity-100"}`}>
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onView={handleView}
                  onUpdate={() => handleUpdate(job)}
                  toggleStatus={() => openConfirmModal(job)}
                />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {pagination.pages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      <ConfirmModal
        isOpen={modalOpen}
        title={jobToToggle?.status === "Active" ? "Close Job Posting" : "Reopen Job Posting"}
        message={
          jobToToggle?.status === "Active"
            ? "Candidates will no longer be able to apply once this job is closed."
            : "This job will be visible to candidates again."
        }
        confirmText={jobToToggle?.status === "Active" ? "Close Job" : "Reopen Job"}
        variant={jobToToggle?.status === "Active" ? "danger" : "info"}
        onConfirm={handleConfirmToggle}
        onCancel={() => setModalOpen(false)}
      />
    </RecruiterLayout>
  );
};

export default ViewAllJobs;