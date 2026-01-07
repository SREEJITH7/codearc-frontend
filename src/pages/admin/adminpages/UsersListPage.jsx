// src/pages/admin/adminPages/UsersListPage.jsx
import React, { useEffect, useState } from "react";
import { adminAuthService } from "../../../services/adminAuth";
// import AdminLayout from "../../../layouts/AdminLayout";

import { AdminLayout } from "../../../layouts/AdminLayouts";
import Table from "../../../component/common/Table";
import Button from "../../../component/common/Button";
import { Search } from "../../../component/common/Search";
import { ConfirmModal } from "../../../component/common/ConfirmModal";
import Pagination from "../../../component/common/Pagination";
// import { DropdownFilter } from "../../../component/common/DropDownFilter";
import { DropdownFilter } from "../../../component/common/DropDownFilter";



const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

  /* ----------------------------------------------------
     FETCH USERS (with debounce)
  ---------------------------------------------------- */
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm, statusFilter]);

  const fetchUsers = async () => {
    try {
      const res = await adminAuthService.getAllUsers({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      });

      if (res.success && res.data?.data) {
  setUsers(res.data.data.users || []);
  setTotalPages(res.data.data.pagination?.pages || 1);
  } else {
        setUsers([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  /* ----------------------------------------------------
     BLOCK / UNBLOCK
  ---------------------------------------------------- */
  const openConfirmModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (!selectedUser) return;

    try {
      const res = await adminAuthService.toggleUserStatus(selectedUser._id);

      if (res.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === selectedUser._id
              ? {
                  ...user,
                  status: user.status === "Active" ? "InActive" : "Active",
                }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Toggle status failed:", error);
    } finally {
      setModalOpen(false);
      setSelectedUser(null);
    }
  };

  /* ----------------------------------------------------
     TABLE COLUMNS
  ---------------------------------------------------- */
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
          className={`px-2 py-1 rounded-full text-sm font-medium ${
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
  ];

  /* ----------------------------------------------------
     UI
  ---------------------------------------------------- */
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-white">Students</h1>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="w-full lg:w-1/3">
            <Search
              value={searchTerm}
              onChange={(val) => {
                setCurrentPage(1);
                setSearchTerm(val);
              }}
              placeholder="Search by username or email"
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
                { value: "active", label: "Active" },
                { value: "blocked", label: "Blocked" },
              ]}
            />
          </div>
        </div>

        {/* Table */}
        <Table
          data={users}
          columns={columns}
          currentPage={currentPage}
          pageSize={limit}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {/* Confirm Modal */}
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

export default UsersListPage;
