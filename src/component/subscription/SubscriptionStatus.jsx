// SubscriptionStatus.jsx

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { subscriptionService } from "../../services/subscriptionService";
import { toast } from "react-toastify";

const SubscriptionStatus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentSubscription();
  }, []);

  const fetchCurrentSubscription = async () => {
    try {
      setLoading(true);
      const response = await subscriptionService.getCurrentSubscription();
      setData(response);
    } catch (err) {
      console.error("Error fetching subscription:", err);
      toast.error("Failed to load subscription details");
    } finally {
      setLoading(false);
    }
  };

  const handlePortal = async () => {
    try {
      const response = await subscriptionService.createPortalSession();
      if (response?.url) {
        window.location.href = response.url;
      }
    } catch (err) {
      toast.error("Unable to open billing portal.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!data?.subscription) {
    return (
      <div className="text-center py-8 text-gray-400">
        No active subscription.
      </div>
    );
  }

  const { current_subscription, feature_access } = data;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">
        Current Subscription
      </h2>

      <div className="text-gray-300">
        <p>
          <strong>Plan:</strong> {current_subscription.plan_name}
        </p>
        <p>
          <strong>Status:</strong> {current_subscription.status}
        </p>
      </div>

      {feature_access?.ai_tutor && (
        <div className="mt-4 text-sm text-gray-400">
          AI Tutor Access:{" "}
          {feature_access.ai_tutor.allowed ? "✅ Allowed" : "❌ Not Allowed"}
        </div>
      )}

      <button
        onClick={handlePortal}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
      >
        Manage Billing
      </button>
    </div>
  );
};

export default SubscriptionStatus;