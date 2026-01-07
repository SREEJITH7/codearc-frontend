
import React from "react";
import { ArrowLeft } from "lucide-react"; // ← Add this import!

import CategoryAddingComponent from "../../../component/admin/CategoryAddingComponent";
import { categoryService } from "../../../services/problem/categoryService";
import { AdminLayout } from "../../../layouts/AdminLayouts";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryAddingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editCategory = location.state?.category;

  console.log("editCategory:", editCategory);

  const handleBack = () => {
    navigate("/admin/problemcategory");
  };

  const handleSaveCategory = async (categoryName) => {
    try {
      let response;

      if (editCategory) {
        response = await categoryService.updateCategory(
          editCategory._id,
          categoryName
        );
      } else {
        response = await categoryService.addCategories(categoryName);
      }

      if (response.success) {
        toast.success(
          response.message ||
            (editCategory ? "Category updated successfully!" : "Category added successfully!")
        );
        navigate("/admin/problemcategory");
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Categories
        </button>

        <h1 className="text-3xl font-bold mb-8 text-white">
          {editCategory ? "Edit Category" : "Add New Category"}
        </h1>

        <CategoryAddingComponent
          onAdd={handleSaveCategory}
          initialValue={editCategory?.name || ""}
        />
      </div>
    </AdminLayout>
  );
};

export default CategoryAddingPage;