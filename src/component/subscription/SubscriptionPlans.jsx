// SubscriptionPlans.jsx

import React, { useEffect, useState } from "react";
import { Check, Star, Loader2 } from "lucide-react";
import { subscriptionService } from "../../services/subscriptionService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribingId, setSubscribingId] = useState(null);
  const [error, setError] = useState("");

  const role = Cookies.get("user_role") || "USER";

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await subscriptionService.getPlans(role);
      setPlans(data || []);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
      setError("Unable to load subscription plans.");
      toast.error("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    try {
      setSubscribingId(planId);
      const response = await subscriptionService.subscribe(planId);

      if (response?.checkout_url) {
        window.location.href = response.checkout_url; // Stripe redirect
      } else {
        toast.error("Failed to initiate checkout.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      toast.error(
        err.response?.data?.error || "Subscription failed. Try again."
      );
    } finally {
      setSubscribingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  if (plans.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No subscription plans available.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {plans.map((plan) => {
        const features =
          Array.isArray(plan.features)
            ? plan.features
            : typeof plan.features === "string"
            ? plan.features.split(",")
            : [];

        return (
          <div
            key={plan.id}
            className={`bg-slate-800 p-6 rounded-xl border ${
              plan.is_popular
                ? "border-indigo-500 shadow-lg"
                : "border-slate-700"
            }`}
          >
            {plan.is_popular && (
              <div className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full w-fit mb-3 flex items-center gap-1">
                <Star size={12} /> Most Popular
              </div>
            )}

            <h2 className="text-xl font-bold text-white">{plan.name}</h2>

            <div className="mt-3 text-3xl font-bold text-indigo-400">
              ${plan.price}
              <span className="text-sm text-gray-400">
                /{plan.interval}
              </span>
            </div>

            <ul className="mt-4 space-y-2">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <Check size={16} className="text-green-400 mt-1" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={subscribingId === plan.id}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
            >
              {subscribingId === plan.id ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </span>
              ) : (
                "Choose Plan"
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionPlans;