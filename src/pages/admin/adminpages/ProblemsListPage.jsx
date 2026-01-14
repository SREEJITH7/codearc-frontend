import { useState, useEffect } from "react";
import { AdminLayout } from "../../../layouts/AdminLayouts";

import { DropdownFilter } from "../../../component/common/DropDownFilter";
import { Search } from "../../../component/common/Search";
import Button from "../../../component/common/Button";
import Table from "../../../component/common/Table";
import Pagination from "../../../component/common/Pagination";
import { useNavigate } from "react-router-dom";

import { problemService } from "../../../services/problem/problemService";
import { ConfirmModal } from "../../../component/common/ConfirmModal";

export const ProblemsListPage = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const limit = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProblems();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm, difficultyFilter, tagFilter, statusFilter]);

  const fetchProblems = async () => {
    try {
      const res = await problemService.getAllProblems({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        status: difficultyFilter || undefined,
        verified: statusFilter || undefined,
      });

      if (res.success && res.data) {
        setProblems(res.data.problems || []);
        setTotalPages(res.data.pagination.pages || 1);
      } else {
        setProblems([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching problems:", error);
      setProblems([]);
    }
  };

  const openConfirmModal = (problem) => {
    setSelectedProblem(problem);
    setModalOpen(true);
  };

  const openDeleteModal = (problem) => {
    setSelectedProblem(problem);
    setDeleteModalOpen(true);
  };

  const handleEdit = (item) => {
    navigate(`/admin/problems/edit/${item.id}`);
  };

  const handleAddProblem = () => {
    navigate("/admin/addproblems");
  };

  const handleConfirmToggle = async () => {
    if (!selectedProblem) return;
    try {
      const res = await problemService.toggleProblemStatus(selectedProblem.id);

      if (res.success) {
        setProblems((prevProblems) =>
          prevProblems.map((p) =>
            p.id === selectedProblem.id
              ? {
                  ...p,
                  status: p.status === "Active" ? "InActive" : "Active",
                }
              : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle status:", error);
    } finally {
      setModalOpen(false);
      setSelectedProblem(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedProblem) return;
    try {
        const res = await problemService.deleteProblem(selectedProblem.id);
        if (res.success) {
            setProblems(prev => prev.filter(p => p.id !== selectedProblem.id));
        }
    } catch(error) {
        console.error("Failed to delete problem:", error);
    } finally {
        setDeleteModalOpen(false);
        setSelectedProblem(null);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "difficulty", label: "Difficulty" },
    {
      key: "tags",
      label: "Tags",
      render: (item) => item.tags.join(", "),
    },
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
      key: "action1",
      label: "Action",
      render: (item) => (
        <Button variant="primary" size="sm" onClick={() => handleEdit(item)}>
          Edit
        </Button>
      ),
    },
    {
      key: "action2",
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
       key: "action3",
       label: "Action",
       render: (item) => (
         <Button
           variant="danger"
           size="sm"
           onClick={() => openDeleteModal(item)}
           className="bg-red-500 hover:bg-red-600 text-white"
         >
           Delete
         </Button>
       ),
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Problems</h1>
          <Button variant="primary" onClick={handleAddProblem}>
            Add Problem
          </Button>
        </div>

        <div className="mb-4 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div className="relative w-full lg:w-1/3">
            <Search
              value={searchTerm}
              onChange={(val) => {
                setCurrentPage(1);
                setSearchTerm(val);
              }}
              placeholder="Search by problem title"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="w-full sm:w-50">
              <DropdownFilter
                label="Filter by Difficulty"
                value={difficultyFilter}
                onChange={(val) => {
                  setCurrentPage(1);
                  setDifficultyFilter(val);
                }}
                options={[
                  { value: "easy", label: "Easy" },
                  { value: "medium", label: "Medium" },
                  { value: "hard", label: "Hard" },
                ]}
              />
            </div>

            <div className="w-full sm:w-50">
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
        </div>

        <Table
          data={problems}
          columns={columns}
          currentPage={currentPage}
          pageSize={limit}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <ConfirmModal
          isOpen={modalOpen}
          title={
            selectedProblem?.status === "Active" ? "Block User" : "Unblock User"
          }
          message={`Are you sure you want to ${
            selectedProblem?.status === "Active" ? "block" : "unblock"
          } this user?`}
          confirmText={
            selectedProblem?.status === "Active" ? "Block" : "Unblock"
          }
          onConfirm={handleConfirmToggle}
          onCancel={() => setModalOpen(false)}
        />

        <ConfirmModal
          isOpen={deleteModalOpen}
          title="Delete Problem"
          message={`Are you sure you want to delete "${selectedProblem?.title}"? This action cannot be undone.`}
          confirmText="Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
      </div>
    </AdminLayout>
  );
};
