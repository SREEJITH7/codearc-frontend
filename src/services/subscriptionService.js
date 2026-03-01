import { axiosInstance } from "../config/axios.config";

export const subscriptionService = {
  /**
   * Fetch available subscription plans based on role
   */
  getPlans: async (role) => {
    try {
      const response = await axiosInstance.get(
        `/api/subscription/plans/?role=${role}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching plans:", error);
      throw error;
    }
  },

  /**
   * Initiate a subscription for a specific plan
   */
  subscribe: async (planId) => {
    try {
      const response = await axiosInstance.post(
        "/api/subscription/subscribe/",
        {
          plan_id: planId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error initiating subscription:", error);
      throw error;
    }
  },

  /**
   * Get current subscription and feature access
   */
  getCurrentSubscription: async () => {
    try {
      const response = await axiosInstance.get(
        "/api/subscription/current/"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching current subscription:", error);
      throw error;
    }
  },

  /**
   * Create a Stripe Customer Portal session
   */
  createPortalSession: async () => {
    try {
      const response = await axiosInstance.post(
        "/api/subscription/portal/"
      );
      return response.data;
    } catch (error) {
      console.error("Error creating portal session:", error);
      throw error;
    }
  },

  /**
   * Cancel Pending Subscription
   */
  cancelPendingSubscription: async () => {
    try {
      const response = await axiosInstance.post(
        "/api/subscription/cancel-pending/",
        {}
      );
      return response.data;
    } catch (error) {
      console.error("Error cancelling pending subscription:", error);
      throw error;
    }
  },
};