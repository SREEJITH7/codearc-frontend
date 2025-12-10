// import React, { useState } from "react";
// import InputField from "../common/InputField";
// import Button from "../common/Button";
// import { useNavigate } from "react-router-dom";
// import { validateSignupForm } from "../../utils/validations/validateSignupForm";




// const SignupForm = ({ role, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (field) => (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: e.target.value,
//     }));

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: undefined,
//       }));
//     }
//   };

//   const handleBlur = (field) => () => {
//     setTouched((prev) => ({
//       ...prev,
//       [field]: true,
//     }));

//     const currentErrors = validateSignupForm(formData);
//     setErrors((prev) => ({
//       ...prev,
//       [field]: currentErrors[field],
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = validateSignupForm(formData);
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setTouched({
//       username: true,
//       email: true,
//       password: true,
//       confirmPassword: true,
//     });

//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       if (onSubmit) {
//         await onSubmit(formData);
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const navigateToLogin = () => {
//     navigate(`/${role.toLowerCase()}/login`);
//   };

//   return (
//     <div className="w-full">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
//           <span className="text-2xl font-bold text-white">
//             {role.charAt(0)}
//           </span>
//         </div>

//         <h1 className="text-4xl font-bold mt-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//           Create Account
//         </h1>
//         <p className="text-gray-300 text-lg">
//           Join as a {role.toLowerCase()} and start your journey
//         </p>
//       </div>

//       {/* Form Fields */}
//       <div className="space-y-6">
//         <InputField
//           label="Username"
//           name="username"
//           type="text"
//           placeholder="Enter your username"
//           value={formData.username}
//           onChange={handleChange("username")}
//           onBlur={handleBlur("username")}
//           error={errors.username}
//           touched={touched.username}
//           required
//         />

//         <InputField
//           label="Email"
//           name="email"
//           type="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleChange("email")}
//           onBlur={handleBlur("email")}
//           error={errors.email}
//           touched={touched.email}
//           required
//         />

//         <InputField
//           label="Password"
//           name="password"
//           type="password"
//           placeholder="Create a strong password"
//           value={formData.password}
//           onChange={handleChange("password")}
//           onBlur={handleBlur("password")}
//           error={errors.password}
//           touched={touched.password}
//           required
//           toggleable
//         />

//         <InputField
//           label="Confirm Password"
//           name="confirmPassword"
//           type="password"
//           placeholder="Re-enter your password"
//           value={formData.confirmPassword}
//           onChange={handleChange("confirmPassword")}
//           onBlur={handleBlur("confirmPassword")}
//           error={errors.confirmPassword}
//           touched={touched.confirmPassword}
//           required
//           toggleable
//         />

//         <Button
//           type="submit"
//           variant="primary"
//           size="lg"
//           disabled={isLoading}
//           className={isLoading ? "opacity-75 cursor-not-allowed" : ""}
//           onClick={handleSubmit}
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center gap-2">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               Creating Account...
//             </div>
//           ) : (
//             "Create Account"
//           )}
//         </Button>
//       </div>

//       {/* Divider */}
//       <div className="mt-8 border-t border-slate-600"></div>

//       {/* Link */}
//       <div className="mt-6 text-center">
//         <p className="text-gray-400">
//           Already have an account?{" "}
//           <button
//             onClick={navigateToLogin}
//             className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
//           >
//             Sign in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { validateSignupForm } from "../../utils/validations/validateSignupForm";

const SignupForm = ({ role, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    const currentErrors = validateSignupForm(formData);
    setErrors((prev) => ({
      ...prev,
      [field]: currentErrors[field],
    }));
  };

  const validateForm = () => {
    const newErrors = validateSignupForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Add safety check

    console.log("Submit button clicked!"); // Debug log

    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    setIsLoading(true);
    try {
      if (onSubmit) {
        console.log("Calling onSubmit with:", formData); // Debug log
        await onSubmit(formData);
      } else {
        console.log("No onSubmit provided - form data:", formData);
        // Fallback like your friend's code
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("Account created successfully! 🎉");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate(`/${role.toLowerCase()}/login`);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
          <span className="text-2xl font-bold text-white">
            {role.charAt(0)}
          </span>
        </div>

        <h1 className="text-4xl font-bold mt-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-gray-300 text-lg">
          Join as a {role.toLowerCase()} and start your journey
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <InputField
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange("username")}
          onBlur={handleBlur("username")}
          error={errors.username}
          touched={touched.username}
          required
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={errors.email}
          touched={touched.email}
          required
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          error={errors.password}
          touched={touched.password}
          required
          toggleable
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          required
          toggleable
        />

        {/* FIXED BUTTON - Use your friend's approach */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className={isLoading ? "opacity-75 cursor-not-allowed" : ""}
            onClick={(e) => {
              e.preventDefault(); // This is the key difference
              handleSubmit(e);
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 border-t border-slate-600"></div>

      {/* Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <button
            onClick={navigateToLogin}
            className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;