import React, { useEffect, useState } from "react";
import { X, Check, Zap, Star, Loader2, AlertCircle, Crown, XCircle } from "lucide-react";
import { subscriptionService } from "../../services/subscriptionService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const SubscriptionModal = ({ isOpen, onClose }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [subscribingId, setSubscribingId] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [pendingSubscription, setPendingSubscription] = useState(null);
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const [cancellingPending, setCancellingPending] = useState(false);

  const role = Cookies.get("user_role") || "USER";

  useEffect(() => {
    if (isOpen) {
      fetchCurrentSubscription();
      fetchPlans();
    }
  }, [isOpen]);



  const fetchCurrentSubscription = async () => {
  try {
    setCheckingSubscription(true);
    const response = await subscriptionService.getCurrentSubscription();
    
    console.log("Subscription response:", response); // Add this temporarily

    const subscription = response?.subscription;
    const pending = response?.pending_subscription;

    if (subscription && subscription.status?.toUpperCase() === "ACTIVE") {
      setCurrentSubscription(subscription);
      setPendingSubscription(null);
    } else if (pending) {
      setPendingSubscription(pending);
      setCurrentSubscription(null);
    } else {
      setCurrentSubscription(null);
      setPendingSubscription(null);
    }

  } catch (err) {
    console.error("Failed to fetch current subscription:", err);
    setCurrentSubscription(null);
    setPendingSubscription(null);
  } finally {
    setCheckingSubscription(false);
  }
};

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError("");

      const plansData = await subscriptionService.getPlans(role);

      if (!Array.isArray(plansData)) {
        console.warn("Plans response is not array:", plansData);
        setPlans([]);
        return;
      }

      setPlans(plansData);
    } catch (err) {
      console.error("Fetch subscription error:", err);
      setError("Failed to load subscription plans.");
      toast.error("Failed to load subscription plans.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPending = async () => {
    try {
      setCancellingPending(true);
      await subscriptionService.cancelPendingSubscription();
      toast.success("Pending subscription cancelled. You can now choose a new plan.");
      setPendingSubscription(null);
      fetchCurrentSubscription();
    } catch (error) {
      console.error("Cancel pending error:", error);
      toast.error("Failed to cancel pending subscription.");
    } finally {
      setCancellingPending(false);
    }
  };

  const handleSubscribe = async (plan) => {
    // Check if user already has an active subscription
    if (currentSubscription) {
      toast.error(`You already have an active ${currentSubscription.plan.name} subscription.`);
      return;
    }

    // Check if user has a pending subscription
    if (pendingSubscription) {
      toast.warning("Please complete or cancel your pending subscription first.");
      return;
    }

    try {
      setSubscribingId(plan.id);

      const response = await subscriptionService.subscribe(plan.id);

      if (response?.checkout_url) {
        window.location.href = response.checkout_url;
      } else {
        toast.error("Failed to generate checkout URL.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      
      const errorMessage = error?.response?.data?.error;
      
      // Handle specific error types
      if (errorMessage?.includes("pending subscription")) {
        toast.error("You have a pending payment. Please complete or cancel it first.");
        // Refresh to show pending subscription banner
        fetchCurrentSubscription();
      } else if (errorMessage?.includes("already have an active subscription")) {
        toast.error(errorMessage);
        fetchCurrentSubscription();
      } else {
        toast.error(errorMessage || "Failed to initiate subscription");
      }
    } finally {
      setSubscribingId(null);
    }
  };

  const isCurrentPlan = (planId) => {
    return currentSubscription?.plan?.id === planId;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl max-h-[88vh] overflow-hidden rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/40 shadow-xl flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-center shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-white/15 rounded-full hover:bg-white/25 transition"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Choose a Plan
          </h1>

          <p className="mt-1 text-sm text-indigo-100">
            {role === "RECRUITER"
              ? "Post jobs and find top talent"
              : "AI-powered learning, unlimited access"}
          </p>

          {/* Active Subscription Badge */}
          {currentSubscription && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Crown className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">
                Active: {currentSubscription.plan.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 bg-slate-900/50">
          {loading || checkingSubscription ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-400 font-medium">
              {error}
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              No plans available for your role.
            </div>
          ) : (
            <>
              {/* Pending Subscription Warning */}
              {pendingSubscription && (
                <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-orange-300 mb-1">
                        Payment Pending
                      </h3>
                      <p className="text-xs text-orange-200/80 mb-3">
                        You have a pending <strong>{pendingSubscription.plan_name}</strong> subscription. 
                        Please complete the payment or cancel it to choose a different plan.
                      </p>
                      <button
                        onClick={handleCancelPending}
                        disabled={cancellingPending}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cancellingPending ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Cancel Pending Subscription
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Subscription Warning */}
              {currentSubscription && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-amber-300 mb-1">
                      You Already Have an Active Subscription
                    </h3>
                    <p className="text-xs text-amber-200/80">
                      You're currently subscribed to <strong>{currentSubscription.plan.name}</strong>. 
                      To change plans, please cancel your current subscription first.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const features = Array.isArray(plan.features)
                    ? plan.features
                    : typeof plan.features === "string"
                    ? plan.features.split(",")
                    : [];

                  const isActive = isCurrentPlan(plan.id);
                  const hasActiveSubscription = currentSubscription !== null;
                  const hasPendingSubscription = pendingSubscription !== null;
                  const isDisabled = hasActiveSubscription || hasPendingSubscription;

                  return (
                    <div
                      key={plan.id}
                      className={`relative group rounded-xl bg-slate-800/70 border transition-all duration-300 p-6 flex flex-col
                        ${
                          plan.is_popular
                            ? "border-indigo-500/70 ring-1 ring-indigo-500/30 shadow-lg shadow-indigo-500/10"
                            : "border-slate-700/50"
                        }
                        ${
                          isActive
                            ? "ring-2 ring-emerald-500/50 border-emerald-500/70"
                            : ""
                        }
                        ${
                          hoveredId === plan.id && !isActive && !isDisabled
                            ? "-translate-y-1 shadow-xl border-slate-600"
                            : ""
                        }
                        ${isDisabled ? "opacity-60" : ""}`}
                      onMouseEnter={() => !isDisabled && setHoveredId(plan.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Current Plan Badge */}
                      {isActive && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-[10px] font-bold text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Crown className="w-3 h-3 fill-current" />
                            CURRENT PLAN
                          </span>
                        </div>
                      )}

                      {/* Popular Badge */}
                      {plan.is_popular && !isActive && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-[10px] font-bold text-slate-900 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Star className="w-3 h-3 fill-current" />
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-white text-center mb-4 truncate">
                        {plan.name}
                      </h3>

                      <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-extrabold text-white">
                            ${plan.price}
                          </span>
                          <span className="text-slate-400 text-sm font-medium uppercase">
                            /{plan.interval}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 min-h-[32px]">
                          {plan.description}
                        </p>
                      </div>

                      <ul className="space-y-3 mb-8 flex-1">
                        {features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-slate-300"
                          >
                            <div className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-indigo-400" />
                            </div>
                            <span>{feature.trim()}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handleSubscribe(plan)}
                        disabled={subscribingId === plan.id || isActive || isDisabled}
                        className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                          ${
                            isActive
                              ? "bg-emerald-500/20 text-emerald-400 cursor-not-allowed border border-emerald-500/30"
                              : isDisabled
                              ? "bg-slate-700/50 text-slate-500 cursor-not-allowed opacity-50"
                              : plan.is_popular
                              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/40 active:scale-95"
                              : "bg-slate-700 text-white hover:bg-slate-600 active:scale-95"
                          }
                          ${
                            subscribingId === plan.id
                              ? "opacity-70 cursor-not-allowed"
                              : ""
                          }`}
                      >
                        {subscribingId === plan.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Securing...
                          </>
                        ) : isActive ? (
                          <>
                            <Check className="w-4 h-4" />
                            Current Plan
                          </>
                        ) : hasPendingSubscription ? (
                          "Payment Pending"
                        ) : hasActiveSubscription ? (
                          "Subscription Active"
                        ) : (
                          <>
                            Choose Plan
                            {plan.is_popular && (
                              <Zap className="w-4 h-4 fill-current" />
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
};