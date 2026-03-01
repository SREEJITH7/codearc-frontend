

  
import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { JobGridSkeleton } from "../../../utils/shimmer/JobCardSkeleton";
import { jobService } from "../../../services/Job/jobService";
import { Search } from "../../../component/common/Search";
import { DropdownFilter } from "../../../component/common/DropDownFilter";
import { JobCard } from "../../../component/common/CardComponent";
import Pagination from "../../../component/common/Pagination";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import UserJobDetailsModal from "../../../component/user/UserJobDetailsModal";

const JobDetailsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    total: 0, page: 1, pages: 1, limit: 6,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    workmode: "",
    worktime: "",
    skills: "",
    location: "",
  });

  const limit = 6;

  useEffect(() => {
    fetchJobs();
  }, [currentPage, searchTerm, filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.jobDetails({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        workmode: filters.workmode || undefined,
        worktime: filters.worktime || undefined,
        skills: filters.skills || undefined,
        location: filters.location || undefined,
      });
      if (response.data?.success) {
        setJobs(response.data.data.jobs || []);
        setPagination(response.data.data.pagination);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
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

  const workModeOptions = [
    { value: "remote",  label: "Remote" },
    { value: "on-site", label: "On Site" },
    { value: "hybrid",  label: "Hybrid" },
  ];

  const workTimeOptions = [
    { value: "full-time",  label: "Full Time" },
    { value: "part-time",  label: "Part Time" },
    // { value: "contract",   label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  return (
    <UserLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">

        
        <div className="relative z-20 bg-slate-700/30 backdrop-blur-md rounded-lg border border-slate-600/50 p-6 mb-6">
          <div className="mb-4">
            <Search
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for job titles..."
              className="max-w-2xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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

            <input
              type="text"
              placeholder="Filter by Skill (e.g. React)"
              value={filters.skills}
              onChange={(e) => handleFilterChange("skills", e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
            />

            <input
              type="text"
              placeholder="Filter by Location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>

         
        <div className="relative z-10">
          {loading && jobs.length === 0 ? (
            <JobGridSkeleton count={limit} columns="grid md:grid-cols-2 lg:grid-cols-3 gap-6" />
          ) : jobs.length === 0 ? (
            <div className="bg-slate-700/30 rounded-lg p-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <h3 className="text-xl font-semibold text-gray-400">No Jobs Found</h3>
            </div>
          ) : (
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 transition-all duration-300
              ${loading ? "opacity-40 grayscale-[0.5] pointer-events-none" : "opacity-100"}`}>
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onView={() => setSelectedJob(job)}
                  onApply={(jobId) => navigate(`/user/job-apply/${jobId}`)}
                />
              ))}
            </div>
          )}

          {pagination.pages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        {selectedJob && (
          <UserJobDetailsModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </div>
    </UserLayout>
  );
};

export default JobDetailsPage;