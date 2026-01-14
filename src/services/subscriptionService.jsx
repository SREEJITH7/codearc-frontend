import { axiosInstance } from "../config/axios.config";
import { ADMIN_API, USER_API } from "../utils/apiRoutes";

const getAllSubscription = async (params = {}) => {
  try {
    const response = await axiosInstance.get(`${ADMIN_API}/subscriptions`, {
      params: {
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.status,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subscriptions:",
      error?.response?.data || error?.message
    );
    throw error;
  }
};

const showAllSubscriptions = async () => {
  try {
    const response = await axiosInstance.get(
      `${USER_API}/showallsubscriptions`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subscriptions:",
      error?.response?.data || error?.message
    );
    throw error;
  }
};

const addSubscription = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${ADMIN_API}/addsubscription`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding subscription:",
      error?.response?.data || error?.message
    );
    throw error;
  }
};

const makePurcahse = async (planId) => {
  try {
    const response = await axiosInstance.post(`${USER_API}/purchase`, {
      planId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error making purchase:",
      error?.response?.data || error?.message
    );
    throw error;
  }
};

const toggleSubscriptionStatus = async (subscriptionId) => {
  try {
    const response = await axiosInstance.patch(
      `${ADMIN_API}/subscriptions/${subscriptionId}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Failed to update status",
    };
  }
};

const updateSubscription = async (subscriptionId, data) => {
  try {
    const response = await axiosInstance.put(
      `${ADMIN_API}/editsubscriptions/${subscriptionId}`,
      data
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Failed to update subscription",
    };
  }
};

export const subscriptionService = {
  getAllSubscription,
  addSubscription,
  showAllSubscriptions,
  makePurcahse,
  toggleSubscriptionStatus,
  updateSubscription,
};
