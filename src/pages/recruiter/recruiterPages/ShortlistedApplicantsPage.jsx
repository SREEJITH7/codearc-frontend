import React, { useEffect, useState } from "react";
import RecruiterLayout from "../../../layouts/RecruiterLayout";
import Table from "../../../component/common/Table";
import Button from "../../../component/common/Button";
import { Search } from "../../../component/common/Search";
import Pagination from "../../../component/common/Pagination";
import { useNavigate } from "react-router-dom";
import { applicationService } from "../../../services/ApplicationService";
import { Star } from "lucide-react";

const ShortlistedApplicantsPage = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 5;
  const statusFilter = "shortlisted"; // Fixed to shortlisted

  useEffect(() => {
    const delay = setTimeout(fetchApplicants, 500);
    return () => clearTimeout(delay);
  }, [currentPage, searchTerm]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await applicationService.getAllApplicants({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        status: statusFilter,
      });

      if (res?.success) {
        setApplicants(res.data.applications || []);
        setTotalPages(res.data.pagination.pages || 1);
      } else {
        setApplicants([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Failed to fetch shortlisted applicants", err);
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  const getCoding = (item) => item.coding_stats || {};

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
        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit capitalize ${
          item.status.toLowerCase() === "shortlisted" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
        }`}>
          <Star size={12} /> {item.status}
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
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <div className="flex gap-2">
            <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/recruiter/applicants-details/${item.id}`)}
            >
            View Profile
            </Button>
            <Button
            variant="secondary"
            size="sm"
            className="bg-green-600/20 hover:bg-green-600/30 text-green-400 border-green-500/30"
            onClick={() => navigate(`/recruiter/applicants-details/${item.id}/send-offer`)}
            >
            Send Offer
            </Button>
        </div>
      ),
    },
  ];

  return (
    <RecruiterLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
            <Star className="text-blue-400" size={28} />
            <h1 className="text-3xl font-bold text-white">Shortlisted Applicants</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Search
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            placeholder="Search by name or email"
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </RecruiterLayout>
  );
};

export default ShortlistedApplicantsPage;
