import React, { useEffect, useState } from "react";
// import { adminAuthService } from "../../../service/adminAuth";
// import { AdminLayout } from "../../../layouts/AdminLayouts";
import Table from "../../../component/common/Table";
import Button from "../../../component/common/Button";
import { Search } from "../../../component/common/Search";
import { ConfirmModal } from "../../../component/common/ConfirmModal";
import Pagination from "../../../component/common/Pagination";
import { DropdownFilter } from "../../../component/common/DropDownFilter";
import { useNavigate } from "react-router-dom";

import { AdminLayout } from "../../../layouts/AdminLayouts";
import { adminAuthService } from "../../../services/adminAuth";

export const RecruiterListPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const limit = 5;

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, searchTerm, statusFilter, companyFilter]);

  const fetchUsers = async () => {
    try {
      const res = await adminAuthService.getAllRecruiters({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
        company: companyFilter || undefined,
      });

      if (res.success && res.data) {
        setUsers(res.data.recruiters || []);
        setTotalPages(res.data.pagination.pages || 1);
      } else {
        setUsers([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching recruiters:", error);
      setUsers([]);
    }
  };

  const openConfirmModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (!selectedUser) return;

    try {
      const res = await adminAuthService.toggleRecruiterStatus(selectedUser._id);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser._id
              ? {
                  ...u,
                  status: u.status === "Active" ? "InActive" : "Active",
                }
              : u
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle status:", error);
    } finally {
      setModalOpen(false);
      setSelectedUser(null);
    }
  };

  const columns = [
    {
      key: "serial",
      label: "S.No",
      render: (_item, index) => index + 1,
    },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            item.status === "Active"
              ? "bg-green-100 text-green-700"
              : item.status === "InActive"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (item) => (
        <Button
          variant={item.status === "Active" ? "secondary" : "primary"}
          size="sm"
          onClick={() => openConfirmModal(item)}
        >
          {item.status === "Active" ? "Block" : "Unblock"}
        </Button>
      ),
    },
    {
      key: "viewDetails",
      label: "Actions",
      render: (item) => (
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() =>
            navigate(`/admin/applicants/${item.id}`, {
              state: { applicant: item, user },
            })
          }
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-white">Recruiters</h1>

        <div className="mb-4 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div className="relative w-full md:w-1/3">
            <Search
              value={searchTerm}
              onChange={(val) => {
                setCurrentPage(1);
                setSearchTerm(val);
              }}
              placeholder="Search by username or email"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <DropdownFilter
              label="Filter by Status"
              value={statusFilter}
              onChange={(val) => {
                setCurrentPage(1);
                setStatusFilter(val);
              }}
              options={[
                { value: "active", label: "Active" },
                { value: "blocked", label: "Blocked" },
              ]}
            />

            <DropdownFilter
              label="Filter by Company Type"
              value={companyFilter}
              onChange={(val) => {
                setCurrentPage(1);
                setCompanyFilter(val);
              }}
              options={[
                { value: "Private Limited", label: "Private Limited" },
                { value: "Public Limited", label: "Public Limited" },
                { value: "LLP", label: "LLP" },
                { value: "Proprietorship", label: "Proprietorship" },
                { value: "Startup", label: "Startup" },
              ]}
            />
          </div>
        </div>

        <Table
          data={users}
          columns={columns}
          currentPage={currentPage}
          pageSize={limit}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <ConfirmModal
          isOpen={modalOpen}
          title={
            selectedUser?.status === "Active" ? "Block User" : "Unblock User"
          }
          message={`Are you sure you want to ${
            selectedUser?.status === "Active" ? "block" : "unblock"
          } this user?`}
          confirmText={
            selectedUser?.status === "Active" ? "Block" : "Unblock"
          }
          onConfirm={handleConfirmToggle}
          onCancel={() => setModalOpen(false)}
        />
      </div>
    </AdminLayout>
  );
};
