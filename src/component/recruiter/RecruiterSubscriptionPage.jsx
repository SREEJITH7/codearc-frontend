import React, { useEffect, useState } from "react";
import { Crown, Loader2, Briefcase, AlertTriangle, CheckCircle } from "lucide-react";
import { subscriptionService } from "../../services/subscriptionService";
import { toast } from "react-toastify";

const RecruiterSubscriptionPage = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [featureAccess, setFeatureAccess] = useState({});
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchSubscription();
    fetchPlans();
  }, []);

  const fetchSubscription = async () => {
    try {
      const data = await subscriptionService.getCurrentSubscription();
      setSubscription(data.current_subscription);
      setFeatureAccess(data.feature_access || {});
    } catch (error) {
      toast.error("Failed to load subscription info");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const plansData = await subscriptionService.getPlans("RECRUITER");
      setPlans(plansData || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscribe = async (planId) => {
    try {
      const response = await subscriptionService.subscribe(planId);
      if (response.checkout_url) {
        window.location.href = response.checkout_url;
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Subscription failed");
    }
  };

  const handlePortal = async () => {
    try {
      const res = await subscriptionService.createPortalSession();
      window.location.href = res.url;
    } catch (error) {
      toast.error("Failed to open billing portal");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* CURRENT PLAN */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-yellow-400" />
            Current Subscription
          </h2>

          {subscription ? (
            <>
              <p className="text-lg font-semibold mb-2">
                Plan: {subscription.plan_name}
              </p>
              <p className="text-sm text-slate-400">
                Status: {subscription.status}
              </p>

              {featureAccess?.can_post_job !== undefined && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  {featureAccess.can_post_job
                    ? "You can post jobs"
                    : featureAccess.job_limit_message}
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={handlePortal}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                >
                  Manage Billing
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              No active subscription
            </div>
          )}
        </div>

        {/* AVAILABLE PLANS */}
        <div>
          <h2 className="text-xl font-bold mb-6">
            Available Plans
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isCurrent = subscription?.plan_id === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`rounded-xl p-6 border transition-all duration-300 ${
                    isCurrent
                      ? "bg-indigo-600/20 border-indigo-500 scale-105 shadow-lg"
                      : "bg-slate-800 border-slate-700 opacity-70 hover:opacity-100"
                  }`}
                >
                  {isCurrent && (
                    <div className="flex items-center gap-2 mb-3 text-indigo-400 text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Current Plan
                    </div>
                  )}

                  <h3 className="text-lg font-bold mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-3xl font-bold mb-4">
                    ₹{plan.price}
                  </p>

                  <ul className="text-sm text-slate-300 space-y-2 mb-6">
                    {Object.entries(plan.features || {}).map(([key, value]) => (
                      <li key={key}>
                        {key.replace(/_/g, " ")}:{" "}
                        <span className="font-semibold">
                          {String(value)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    disabled={isCurrent}
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full py-2 rounded-lg font-medium transition ${
                      isCurrent
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {isCurrent ? "Active Plan" : "Choose Plan"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecruiterSubscriptionPage;