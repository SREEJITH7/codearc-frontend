// pages/recruiter/RecruiterProfilePage.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LogOut, Shield } from "lucide-react";
import Cookies from "js-cookie";
import RecruiterLayout from "../../../layouts/RecruiterLayout";

import { recruiterAuthService } from "../../../services/RecruiterAuth";
import RecruiterDetails from "../../../component/recruiter/RecruiterDetails";
import RecruiterDetailsSkeleton from "../../../utils/shimmer/RecruiterDetailsSkeleton";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../store/authSlice";
import { logoutThunk } from "../../../store/authThunks";
import RecruiterProfileEditModal from "../../../component/recruiter/RecruiterEditModal";

const RecruiterProfilePage = () => {
  const [recruiterInfo, setRecruiterInfo] = useState({
    username: "",
    email: "",
    phone: undefined,
    companyName: "",
    companyType: "",
    yearEstablished: "",
    registrationCertificate: "",
    status: "pending",
    createdAt: "",
    profileImage: "",
    location: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRecruiterProfile = async () => {
    try {
      const res = await recruiterAuthService.getRecruiterProfile();
      const d = res.data;

      setRecruiterInfo({
        username: d.username || "",
        email: d.email || "",
        phone: d.phone || "",
        companyName: d.company_name || "",
        companyType: d.company_type || "",
        yearEstablished: d.year_established || "",
        registrationCertificate: d.registration_certificate || "",
        status: d.status || "pending",
        createdAt: d.created_at || "",
        profileImage: d.profileimage || "",
        location: d.location || "",
      });
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      if (error?.response?.status === 403 && errorMessage === "Invalid role to perform this action") {
        toast.error("Unauthorized access. Redirecting to login.");
        navigate("/recruiter/login");
      } else {
        toast.error("Failed to load profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiterProfile();
  }, []);

  // Calculate profile completion
  const profileFields = [
    recruiterInfo?.username,
    recruiterInfo?.email,
    recruiterInfo?.phone,
    recruiterInfo?.companyName,
    recruiterInfo?.companyType,
    recruiterInfo?.yearEstablished,
    recruiterInfo?.registrationCertificate,
  ];

  const filledCount = profileFields.filter(Boolean).length;
  const profileCompletion = Math.round((filledCount / profileFields.length) * 100);

const handleLogout = async () => {
  try {
    const result = await dispatch(logoutThunk("recruiter")).unwrap();
    toast.success(result.message || "Logged out successfully");
    navigate("/recruiter/login", { replace: true });
  } catch (err) {
    console.error("Logout error:", err);
    toast.error(err || "Something went wrong during logout");
  }
};

  return (
    <RecruiterLayout>
      <div className="min-h-screen bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Details */}
            <div className="lg:col-span-2">
              {loading ? (
                <RecruiterDetailsSkeleton />
              ) : (
                <RecruiterDetails recruiterInfo={recruiterInfo} 
                onEditClick={() => setOpenModal(true)}
                />
              )}

              
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-4">Quick Stats</h3>

                <div className="space-y-4">
                  <div className="flex justify-between border-b border-slate-700 py-2">
                    <span className="text-gray-400">Profile Completion</span>
                    <span className="text-indigo-400 font-medium">
                      {Number.isNaN(profileCompletion) ? "0%" : `${profileCompletion}%`}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-700 py-2">
                    <span className="text-gray-400">Account Status</span>
                    <span
                      className={`font-medium ${
                        recruiterInfo.status === "Active"
                          ? "text-green-400"
                          : recruiterInfo.status === "pending"
                          ? "text-yellow-400"
                          : recruiterInfo.status === "reject"
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {loading
                        ? "..."
                        : recruiterInfo.status === "Active"
                        ? "Active"
                        : recruiterInfo.status === "pending"
                        ? "Pending"
                        : recruiterInfo.status === "reject"
                        ? "Rejected"
                        : "Inactive"}
                    </span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-purple-400 font-medium">
                      {loading ? "..." : new Date(recruiterInfo.createdAt).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Tips */}
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-4">Profile Tips</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>• Complete all sections to improve visibility</p>
                  <p>• Upload a professional profile image</p>
                  <p>• Keep registration certificate updated</p>
                  <p>• Provide accurate company information</p>
                </div>
              </div>

              {/* Account Security */}
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-semibold text-gray-200">Account Security</h3>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm font-medium text-gray-300">Account Secured</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Your account is protected with secure authentication
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-rose-600/20 hover:bg-rose-600/30
                           border border-rose-500/30 text-rose-400
                           font-semibold py-3 px-4 rounded-xl
                           transition-all flex items-center justify-center
                           space-x-2 hover:shadow-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Status Messages */}
              {recruiterInfo.status === "reject" && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-red-400 mb-3">Account Rejected</h3>
                  <p className="text-gray-300 text-sm mb-4">Please contact support for assistance.</p>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
                    Contact Support
                  </button>
                </div>
              )}

              {recruiterInfo.status === "pending" && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Pending Approval</h3>
                  <p className="text-gray-300 text-sm">Your account is under review.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
     

      {/* Edit Modal */}
      {openModal && (
        <RecruiterProfileEditModal
          profile={recruiterInfo} // ← better to pass consistent data
          onClose={() => setOpenModal(false)}
          onProfileUpdate={(updatedProfile) => {
            console.log("Profile updated:", updatedProfile);
            fetchRecruiterProfile(); // ← refresh everything
            setOpenModal(false);
          }}
        />
      )}
    </RecruiterLayout>
  );
};

export default RecruiterProfilePage;