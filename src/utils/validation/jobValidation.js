export const validateStep1 = (data) => {
    const errors = {};

    if (!data.name?.trim()) {
        errors.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email?.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
        errors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^\d{10}$/;
    if (!data.contactNo?.trim()) {
        errors.contactNo = "Contact number is required";
    } else if (!phoneRegex.test(data.contactNo.replace(/\D/g, ''))) {
        errors.contactNo = "Please enter a valid 10-digit phone number";
    }

    if (!data.location?.trim()) {
        errors.location = "Current location is required";
    }

    return errors;
};

export const validateStep2 = (data) => {
    const errors = {};

    if (!data.highestQualification) {
        errors.highestQualification = "Please select your highest qualification";
    }

    if (!data.qualificationName?.trim()) {
        errors.qualificationName = "Specialization is required";
    }

    if (!data.institutionName?.trim()) {
        errors.institutionName = "Institution name is required";
    }

    const yearRegex = /^\d{4}$/;
    if (!data.yearOfGraduation) {
        errors.yearOfGraduation = "Graduation year is required";
    } else if (!yearRegex.test(data.yearOfGraduation)) {
        errors.yearOfGraduation = "Please enter a valid 4-digit year";
    }

    if (!data.cgpa || (typeof data.cgpa === 'string' && !data.cgpa.trim())) {
        errors.cgpa = "CGPA/Percentage is required";
    }

    return errors;
};

export const validateStep3 = (data) => {
    const errors = {};

    if (!data.skills || data.skills.length === 0) {
        errors.skills = "Please add at least one skill";
    }

    return errors;
};

export const validateStep4 = (data) => {
    const errors = {};

    if (!data.resume) {
        errors.resume = "Resume is required";
    }

    return errors;
};
