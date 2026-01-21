import { useState, useEffect } from "react";
import { AdminLayout } from "../../../layouts/AdminLayouts";

import Button from "../../../component/common/Button";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../../../services/problem/categoryService";
import Table from "../../../component/common/Table";
import { Search } from "../../../component/common/Search";
import Pagination from "../../../component/common/Pagination";
import { ConfirmModal } from "../../../component/common/ConfirmModal";
import { toast } from "react-toastify"; // Added toast
import { EditCategoryModal } from "../../../component/admin/EditCategoryModal";

import ProblemAddingPage from "./ProblemAddingPage";

export const CategoriesListPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'toggle' or 'delete'

  const limit = 5;
  const navigate = useNavigate();

  const openConfirmModal = (category, action) => {
    setSelectedCategory(category);
    setModalAction(action);
    setModalOpen(true);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCategories();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm]);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAllCategories({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
      });

      if (res.success && res.data) {
        setCategories(res.data.categories || []);
        setTotalPages(res.data.pagination.pages || 1);
      } else {
        setCategories([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const handleEdit = (item) => {
    setSelectedCategory(item);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (newName) => {
    if (!selectedCategory) return;
    
    try {
        const res = await categoryService.updateCategory(selectedCategory.id, newName);
        if (res.success) {
            toast.success("Category updated successfully");
            await fetchCategories();
            setEditModalOpen(false);
            setSelectedCategory(null);
        } else {
            toast.error(res.message);
        }
    } catch (error) {
        console.error("Failed to update category:", error);
        toast.error("Failed to update category");
    }
  };
  const handleConfirmAction = async () => {
    if (!selectedCategory || !modalAction) return;

    if (modalAction === "toggle") {
        await handleConfirmToggle();
    } else if (modalAction === "delete") {
        await handleConfirmDelete();
    }
  };

  const handleConfirmDelete = async () => {
    try {
        const res = await categoryService.deleteCategory(selectedCategory.id);
        if (res.success) {
            await fetchCategories();
            toast.success("Category deleted successfully");
        } else {
            toast.error(res.message);
        }
    } catch (error) {
        console.error("Failed to delete category:", error);
        toast.error("Failed to delete category");
    } finally {
        setModalOpen(false);
        setSelectedCategory(null);
        setModalAction(null);
    }
  };

  const handleConfirmToggle = async () => {
      try {
        const res = await categoryService.toggleCategoryStatus(
          selectedCategory.id
        );
    
        if (res.success) {
          
          if (res.data) {
            setCategories((prev) =>
              prev.map((category) =>
                category.id === selectedCategory.id
                  ? { ...category, status: res.data.status }  
                  : category
              )
            );
          } else {
            // Fallback: refetch all categories
            await fetchCategories();
          }
        } else {
          console.error(res.message);
        }
      } catch (error) {
        console.error("Failed to toggle status:", error);
      } finally {
        setModalOpen(false);
        setSelectedCategory(null);
        setModalAction(null);
      }
    };

  const handleAddProblemCat = () => {
    console.log("Navigating to add category page...");
    navigate("/admin/addproblemcategory");
  };

  const columns = [
    {
      key: "name",
      label: "Category Name",
      render: (item) => item.name,
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
      key: "edit",
      label: "Action",
      render: (item) => (
        <Button variant="primary" size="sm" onClick={() => handleEdit(item)}>
          Edit
        </Button>
      ),
    },
    {
      key: "toggle",
      label: "Status",
      render: (item) => (
        <Button
          variant={item.status === "Active" ? "secondary" : "primary"}
          size="sm"
          onClick={() => openConfirmModal(item, "toggle")}
        >
          {item.status === "Active" ? "Block" : "Unblock"}
        </Button>
      ),
    },
    {
      key: "delete",
      label: "Delete",
      render: (item) => (
        <Button
          className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
          size="sm"
          onClick={() => openConfirmModal(item, "delete")}
        >
          Delete
        </Button>
      ),
    },
  ];

  // Determine modal content
  let modalTitle = "";
  let modalMessage = "";
  let confirmText = "";

  if (selectedCategory && modalAction === "toggle") {
      const isBlocking = selectedCategory.status === "Active";
      modalTitle = isBlocking ? "Block Category" : "Unblock Category";
      confirmText = isBlocking ? "Block" : "Unblock";
      
      if (isBlocking) {
          const count = selectedCategory.problem_count || 0;
          modalMessage = (
            <span>
                This category has <strong className="text-yellow-400">{count} problems</strong>. 
                Blocking it will <strong className="text-yellow-400">hide these problems</strong> from users.
                <br/><br/>
                Are you sure you want to proceed?
            </span>
          );
      } else {
          modalMessage = "Are you sure you want to unblock this category?";
      }

  } else if (selectedCategory && modalAction === "delete") {
      modalTitle = "Delete Category";
      const count = selectedCategory.problem_count || 0;
      modalMessage = (
        <span>
            This category has <strong className="text-red-400">{count} problems</strong>. 
            Deleting it will <strong className="text-red-400">PERMANENTLY DELETE</strong> all associated problems.
            <br/><br/>
            Are you sure you want to proceed?
        </span>
      );
      confirmText = "Delete";
  }

        return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <Button variant="primary" onClick={handleAddProblemCat}>
            Add Category
          </Button>
        </div>

        <div className="mb-6 w-full lg:w-1/3">
          <Search
            value={searchTerm}
            onChange={(val) => {
              setCurrentPage(1);
              setSearchTerm(val);
            }}
            placeholder="Search by category name"
          />
        </div>

        <Table
          data={categories}
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
          title={modalTitle}
          message={modalMessage}
          confirmText={confirmText}
          onConfirm={handleConfirmAction}
          onCancel={() => {
              setModalOpen(false);
              setModalAction(null);
              setSelectedCategory(null);
          }}
        />

        <EditCategoryModal
            isOpen={editModalOpen}
            onClose={() => {
                setEditModalOpen(false);
                setSelectedCategory(null);
            }}
            onSave={handleSaveEdit}
            category={selectedCategory}
        />
      </div>
    </AdminLayout>
  );
};
