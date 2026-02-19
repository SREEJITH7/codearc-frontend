export const validateJobPost = (formData) => {
  const errors = {};

  if (!formData.role || !formData.role.trim()) {
    errors.role = "Role is required.";
  } else if (formData.role.trim().length < 3) {
    errors.role = "Role must be at least 3 characters long.";
  } else if (formData.role.trim().length > 100) {
    errors.role = "Role must not exceed 100 characters.";
  }

  if (!formData.jobLocation || !formData.jobLocation.trim()) {
    errors.jobLocation = "Job location is required.";
  } else if (formData.jobLocation.trim().length < 2) {
    errors.jobLocation = "Job location must be at least 2 characters long.";
  } else if (formData.jobLocation.trim().length > 100) {
    errors.jobLocation = "Job location must not exceed 100 characters.";
  }

  const validWorkTimes = ["full-time", "part-time", "internship"];
  if (!formData.workTime || !formData.workTime.trim()) {
    errors.workTime = "Work time is required.";
  } else if (!validWorkTimes.includes(formData.workTime.toLowerCase())) {
    errors.workTime = "Please select a valid work time option.";
  }

  const validWorkModes = ["remote", "on-site", "hybrid"];
  if (!formData.workMode || !formData.workMode.trim()) {
    errors.workMode = "Work mode is required.";
  } else if (!validWorkModes.includes(formData.workMode.toLowerCase())) {
    errors.workMode = "Please select a valid work mode option.";
  }

  if (!formData.minExperience) {
    errors.minExperience = "Minimum experience is required.";
  } else {
    const minExp = Number(formData.minExperience);
    if (isNaN(minExp)) {
      errors.minExperience = "Minimum experience must be a valid number.";
    } else if (minExp < 0) {
      errors.minExperience = "Minimum experience cannot be negative.";
    } else if (minExp > 50) {
      errors.minExperience = "Minimum experience seems unrealistic (max 50 years).";
    } else if (!Number.isInteger(minExp)) {
      errors.minExperience = "Minimum experience must be a whole number.";
    }
  }

  const hasMinSalary = formData.minSalary;
  const hasMaxSalary = formData.maxSalary;

  if (hasMinSalary || hasMaxSalary) {
    if (hasMinSalary && !hasMaxSalary) {
      errors.salary = "Maximum salary is required when minimum salary is provided.";
    } else if (!hasMinSalary && hasMaxSalary) {
      errors.salary = "Minimum salary is required when maximum salary is provided.";
    } else if (hasMinSalary && hasMaxSalary) {
      const minSal = parseFloat(formData.minSalary);
      const maxSal = parseFloat(formData.maxSalary);

      if (isNaN(minSal)) {
        errors.salary = "Minimum salary must be a valid number.";
      } else if (minSal < 0) {
        errors.salary = "Minimum salary cannot be negative.";
      } else if (minSal > 1000) {
        errors.salary = "Minimum salary seems unrealistic (max 1000 LPA).";
      } else if (isNaN(maxSal)) {
        errors.salary = "Maximum salary must be a valid number.";
      } else if (maxSal < 0) {
        errors.salary = "Maximum salary cannot be negative.";
      } else if (maxSal > 1000) {
        errors.salary = "Maximum salary seems unrealistic (max 1000 LPA).";
      } else if (minSal > maxSal) {
        errors.salary = "Minimum salary cannot be greater than maximum salary.";
      } else if (minSal === maxSal) {
        errors.salary = "Minimum and maximum salary cannot be the same.";
      } else if (maxSal - minSal < 0.5) {
        errors.salary = "Salary range should be at least 0.5 LPA.";
      }
    }
  }

  if (formData.requirements && formData.requirements.length > 0) {
    const cleanedRequirements = formData.requirements
      .map((r) => r.trim())
      .filter((r) => r !== "");

    if (cleanedRequirements.length === 0) {
      errors.requirements = "Please add at least one valid requirement.";
    } else if (cleanedRequirements.length > 20) {
      errors.requirements = "You can add a maximum of 20 requirements.";
    } else {
      const uniqueReqs = new Set(cleanedRequirements.map((r) => r.toLowerCase()));
      if (uniqueReqs.size !== cleanedRequirements.length) {
        errors.requirements = "Duplicate requirements are not allowed.";
      } else {
        for (let i = 0; i < cleanedRequirements.length; i++) {
          const req = cleanedRequirements[i];
          if (req.length < 10) {
            errors.requirements = `Requirement ${i + 1} is too short (min 10 characters).`;
            break;
          }
          if (req.length > 150) {
            errors.requirements = `Requirement ${i + 1} is too long (max 150 characters).`;
            break;
          }
          const wordCount = req.split(/\s+/).length;
          if (wordCount > 30) {
            errors.requirements = `Requirement ${i + 1} should not exceed 30 words.`;
            break;
          }
        }
      }
    }
  }

  if (formData.responsibilities && formData.responsibilities.length > 0) {
    const uniqueResps = new Set(formData.responsibilities.map((r) => r.trim().toLowerCase()));
    
    if (uniqueResps.size < formData.responsibilities.length) {
      errors.responsibilities = "Duplicate responsibilities found. Please remove duplicates.";
    } else if (formData.responsibilities.length > 20) {
      errors.responsibilities = "Maximum 20 responsibilities allowed.";
    } else {
      for (let i = 0; i < formData.responsibilities.length; i++) {
        const resp = formData.responsibilities[i].trim();
        if (!resp) {
          errors.responsibilities = `Responsibility ${i + 1} is empty.`;
          break;
        }
        if (resp.length < 5) {
          errors.responsibilities = `Responsibility ${i + 1} is too short (min 5 characters).`;
          break;
        }
        if (resp.length > 200) {
          errors.responsibilities = `Responsibility ${i + 1} is too long (max 200 characters).`;
          break;
        }
        const wordCount = resp.split(/\s+/).length;
        if (wordCount > 40) {
          errors.responsibilities = `Responsibility ${i + 1} is too wordy (max 40 words).`;
          break;
        }
      }
    }
  }

  if (
    (!formData.requirements || formData.requirements.length === 0) &&
    (!formData.responsibilities || formData.responsibilities.length === 0)
  ) {
    errors.general = "Please add at least one requirement or responsibility.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
