import { axiosInstance } from "../../config/axios.config";

// Base path - keep it consistent (usually without trailing slash)
const CATEGORY_BASE = "/api";

// Recommended: Use ONE consistent endpoint for "get all categories"
// Here we use /categorylist/ as per your urls.py
export const categoryService = {
  // Add new category
  addCategories: async (name) => {
    try {
      const response = await axiosInstance.post(`${CATEGORY_BASE}/addcategory/`, { name });
      return response.data;
    } catch (error) {
      console.error("Add category error:", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to add category",
      };
    }
  },

  getAllCategories : async () => {
  try {
    const response = await axiosInstance.get(`${CATEGORY_BASE}/categorylist/`);
    console.log("[getAllCategory] Raw response.data:", response.data);

    // Return consistent shape that frontend can always trust
    return {
      success: true,
      data: Array.isArray(response.data)
        ? response.data
        : response.data?.results || response.data?.data || [],
    };
  } catch (error) {
    console.error("[getAllCategory] Failed:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to load categories",
      data: [],
    };
  }
} ,

  

  updateCategory: async (categoryId, name) => {
    try {
      const response = await axiosInstance.put(
        `${CATEGORY_BASE}/updatecategory/${categoryId}/`,
        { name }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to update category",
      };
    }
  },

  toggleCategoryStatus: async (categoryId) => {
    try {
      const response = await axiosInstance.patch(`${CATEGORY_BASE}/category/${categoryId}/`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to toggle status",
      };
    }
  },
};