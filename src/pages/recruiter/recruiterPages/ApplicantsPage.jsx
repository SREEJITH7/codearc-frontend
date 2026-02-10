import React, { useEffect, useState } from "react";
// import RecruiterLayout from "../../../layouts/RecruiterLayouts";
import RecruiterLayout from "../../../layouts/RecruiterLayout";
import Table from "../../../component/common/Table";
import Button from "../../../component/common/Button";
import { Search } from "../../../component/common/Search";
import Pagination from "../../../component/common/Pagination";
import { DropdownFilter } from "../../../component/common/DropDownFilter";
import { useNavigate } from "react-router-dom";
// import { applicationService } from "../../../services/Application/applicationService";
import { applicationService } from "../../../services/ApplicationService";
const ApplicantsPage = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 5;  
  const getCoding = (item) => item.coding_stats || {};

  useEffect(() => {
    const delay = setTimeout(fetchApplicants, 500);
    return () => clearTimeout(delay);
  }, [currentPage, searchTerm, statusFilter]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await applicationService.getAllApplicants({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      });

      if (res?.success) {
        setApplicants(res.data.applications || []);
        setTotalPages(res.data.pagination.pages || 1);
      } else {
        setApplicants([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Failed to fetch applicants", err);
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "accepted":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

const columns = [
  {
    key: "serial",
    label: "S.No",
    render: (_, index) => (currentPage - 1) * limit + index + 1,
  },

  {
    key: "name",
    label: "Name",
    render: (item) => item.applicant_name || "N/A",
  },

  {
    key: "job",
    label: "Job",
    render: (item) => item.job_title || "-",
  },

  {
    key: "status",
    label: "Status",
    render: (item) => (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
          item.status
        )}`}
      >
        {item.status}
      </span>
    ),
  },

  {
    key: "applied_date",
    label: "Applied Date",
    render: (item) => new Date(item.created_at).toLocaleDateString(),
  },

  
  {
    key: "rank",
    label: "Rank",
    render: (item) => {
      const stats = getCoding(item);
      return (
        <span className="font-bold text-blue-400">
          {stats.rank ? `#${stats.rank}` : "N/A"}
        </span>
      );
    },
  },

  
  {
    key: "score",
    label: "Score ⭐",
    render: (item) => {
      const stats = getCoding(item);
      return (
        <span className="font-semibold text-yellow-400">
          {stats.score ?? 0}
        </span>
      );
    },
  },

  
  {
    key: "solved",
    label: "Problems Solved",
    render: (item) => {
      const stats = getCoding(item);
      return stats.totalSolved ?? 0;
    },
  },

  /*   ACCEPTANCE RATE */
  // {
  //   key: "acceptance",
  //   label: "Acceptance %",
  //   render: (item) => {
  //     const stats = getCoding(item);
  //     return (
  //       <span className="text-green-400">
  //         {stats.acceptanceRate ?? 0}%
  //       </span>
  //     );
  //   },
  // },

  
  {
    key: "actions",
    label: "Details",
    render: (item) => (
      <Button
        variant="primary"
        size="sm"
        onClick={() => navigate(`/recruiter/applicants-details/${item.attachment_id || item.id || item._id}`)}
      >
        View
      </Button>
    ),
  },
];

  return (
    <RecruiterLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-white">Applicants</h1>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Search
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            placeholder="Search by name or email"
          />

          <DropdownFilter
            label="Status"
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
            options={[
              { value: "pending", label: "Pending" },
              { value: "shortlisted", label: "Shortlisted" },
              { value: "rejected", label: "Rejected" },
              { value: "accepted", label: "Accepted" },
            ]}
          />
        </div>

        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <Table
            data={applicants}
            columns={columns}
            currentPage={currentPage}
            pageSize={limit}
          />
        )}

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </RecruiterLayout>
  );
};

export default ApplicantsPage;
