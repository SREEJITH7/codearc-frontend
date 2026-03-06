export const validateProfile = (data) => {
    const errors = {};

    // Name validation (only letters allowed)
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!data.firstName?.trim()) {
        errors.firstName = "First name is required";
    } else if (!nameRegex.test(data.firstName.trim())) {
        errors.firstName = "First name should contain only letters";
    }

    if (!data.lastName?.trim()) {
        errors.lastName = "Last name is required";
    } else if (!nameRegex.test(data.lastName.trim())) {
        errors.lastName = "Last name should contain only letters";
    }

    // Phone validation (exactly 10 digits, numbers only)
    const phoneRegex = /^[0-9]{10}$/;

    if (data.phone?.trim()) {
        if (!phoneRegex.test(data.phone.trim())) {
            errors.phone = "Phone number must contain exactly 10 digits";
        }
    }

    // GitHub validation
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/;

    if (data.github?.trim()) {
        if (!githubRegex.test(data.github.trim())) {
            errors.github = "Enter a valid GitHub profile URL";
        }
    }

    // LinkedIn validation
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;

    if (data.linkedin?.trim()) {
        if (!linkedinRegex.test(data.linkedin.trim())) {
            errors.linkedin = "Enter a valid LinkedIn profile URL";
        }
    }

    // Graduation year validation
    const yearRegex = /^(19|20)\d{2}$/;

    if (data.graduationYear?.trim()) {
        if (!yearRegex.test(data.graduationYear.trim())) {
            errors.graduationYear = "Enter a valid 4-digit graduation year";
        }
    }

    // CGPA validation (0–10 or percentage)
    const cgpaRegex = /^(10(\.0{1,2})?|[0-9](\.[0-9]{1,2})?|100|[0-9]{1,2})%?$/;

    if (data.cgpa?.trim()) {
        if (!cgpaRegex.test(data.cgpa.trim())) {
            errors.cgpa = "Enter valid CGPA or percentage";
        }
    }

    // Experience validation (must be number >= 0)
    if (data.totalExperience?.toString().trim()) {
        if (isNaN(data.totalExperience) || Number(data.totalExperience) < 0) {
            errors.totalExperience = "Experience must be a valid number";
        }
    }

    return errors;
};