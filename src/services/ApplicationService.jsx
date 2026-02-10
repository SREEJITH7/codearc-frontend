
// import axios from "axios";
// import { axiosInstance } from "../config/axios.config";

// export const applicationService = {
//     // user side 
//     // Submit job application
//     postJobApplication: async (formData) => {
//         try {
//             const response = await axiosInstance.post("/api/user/applications/", formData);
//             return response.data;
//         } catch (error) {
//             console.error("Error in postJobApplication details:", {
//                 message: error.message,
//                 response: error.response?.data,
//                 status: error.response?.status
//             });
//             throw error;
//         }
//     },

//     // recruiter side 
    
//     getAllApplicants : async({ page = 1, limit = 5 , search ,status}) => {
//         try{
//             const params = {
//                 page,
//                 limit,
//                 ...(search && { search }),
//                 ...(status && { status }),
//             }

//             const response = await axiosInstance.get(
//                 "/api/recruiter/applicants/",
//                 { params }
//             );
//             return response.data
//         } catch (error) {
//             console.log("Error fetching applicants:", error);
//             throw error;
//         }
//     },

//     getApplicantDetails: async (applicationId) => {
//         try{
//             const response = await axiosInstance.get(
//                 `/api/recruiter/applicants/${applicationId}/`
//             );
//             return response.data;
//         } catch (error) {
//             console.error("Errors fetching applicant details:",error);
//             throw error;
//         }
//     },


//     updateApplicationStatus: async (applicationId, status) => {
//         try{
//             const response = await axiosInstance.patch(
//                 `/api/recruiter/applicants/${applicationId}/status/`,
//                 {status}
//             );
//             return response.data
//         } catch (error) {
//             console.error("Error updating applications status:", error);
//             throw error;
//         }
        
//     }


// };


import { axiosInstance } from "../config/axios.config";

export const applicationService = {

  // ======================
  // USER SIDE
  // ======================
  postJobApplication: async (formData) => {
    const res = await axiosInstance.post(
      "/api/user/applications/",
      formData
    );
    return res.data;
  },

  // ======================
  // RECRUITER SIDE
  // ======================
  getAllApplicants: async ({ page = 1, limit = 5, search, status }) => {
    const params = {
      page,
      limit,
      ...(search && { search }),
      ...(status && { status }),
    };

    const res = await axiosInstance.get(
      "/api/recruiter/applicants/",
      { params }
    );

    return res.data;
  },

  getApplicantDetails: async (applicationId) => {
    const res = await axiosInstance.get(
      `/api/recruiter/applicants/${applicationId}/`
    );
    return res.data;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const res = await axiosInstance.patch(
      `/api/recruiter/applicants/${applicationId}/status/`,
      { status }
    );
    return res.data;
  },

  sendOffer: async (applicationId, emailData) => {
    const res = await axiosInstance.post(
      `/api/recruiter/applicants/${applicationId}/send-offer/`,
      emailData
    );
    return res.data;
  },
};
 