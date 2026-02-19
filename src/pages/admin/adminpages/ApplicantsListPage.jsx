import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../layouts/AdminLayouts";
import Table from "../../../component/common/Table";
import { Search } from "../../../component/common/Search";
import Pagination from "../../../component/common/Pagination";
import { DropdownFilter } from "../../../component/common/DropDownFilter";
import { adminService } from "../../../services/Admin/adminService";

const ApplicantsListPage = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchApplications();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getAllApplicants({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      });

      if (res.data && res.data.success) {
        setApplications(res.data.data.applications || []);
        setTotalPages(res.data.data.pagination?.pages || 1);
        setTotalResults(res.data.data.pagination?.total || 0);
      } else {
        setApplications([]);
        setTotalPages(1);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error fetching admin applications:", error);
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      key: "serial",
      label: "S.No",
      render: (_item, index) => (currentPage - 1) * limit + index + 1,
    },
    { key: "applicant_name", label: "Applicant" },
    { key: "email", label: "Email" },
    { key: "job_title", label: "Job Title" },
    { key: "recruiter_name", label: "Recruiter" },
    {
      key: "coding_score",
      label: "Coding Score",
      render: (item) => (
        <span className="font-semibold text-blue-400">
          {item.coding_stats?.score || 0}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.status === "ACCEPTED"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : item.status === "REJECTED"
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : item.status === "SHORTLISTED"
              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Applied On",
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">All Applicants</h1>
          <div className="text-slate-400 text-sm">
            Total Applications: <span className="text-white font-semibold">{totalResults}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="w-full lg:w-1/3">
            <Search
              value={searchTerm}
              onChange={(val) => {
                setCurrentPage(1);
                setSearchTerm(val);
              }}
              placeholder="Search by name or email"
            />
          </div>

          <div className="w-full lg:w-64">
            <DropdownFilter
              label="Filter by Status"
              value={statusFilter}
              onChange={(val) => {
                setCurrentPage(1);
                setStatusFilter(val);
              }}
              options={[
                { value: "", label: "All Statuses" },
                { value: "pending", label: "Pending" },
                { value: "shortlisted", label: "Shortlisted" },
                { value: "accepted", label: "Accepted" },
                { value: "rejected", label: "Rejected" },
              ]}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
          <Table
            data={applications}
            columns={columns}
            currentPage={currentPage}
            pageSize={limit}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default ApplicantsListPage;
