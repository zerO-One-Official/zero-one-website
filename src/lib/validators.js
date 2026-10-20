import { branchOptions } from "@/utils/helper";
import { DESIGNATIONS, normalizeDesignations } from "@/lib/designations";
import validator from "validator";

export function validateAndNormalizeOtherLinks(otherLinks) {
  if (!Array.isArray(otherLinks)) {
    throw new Error("Other links must be a list.");
  }

  const normalizedLinks = [];
  const platforms = new Set();
  for (const item of otherLinks) {
    if (!item || typeof item !== "object") {
      throw new Error("Each other link must include a platform and URL.");
    }

    const platform = typeof item.platform === "string"
      ? item.platform.trim().toLowerCase()
      : "";
    const link = typeof item.link === "string" ? item.link.trim() : "";
    if (!platform && !link) continue;
    if (!platform || !link) {
      throw new Error("Each other link needs a platform name and URL.");
    }
    if (platforms.has(platform)) {
      throw new Error("Other link platform names must be unique.");
    }
    if (!validator.isURL(link)) {
      throw new Error(`Enter a valid URL for ${platform}.`);
    }

    platforms.add(platform);
    normalizedLinks.push({ platform, link });
  }

  return normalizedLinks;
}

export const validateSignup = (form) => {
  const {
    firstName,
    lastName,
    roll,
    registrationNumber,
    email,
    profilePic,
    username,
    gender,
    branch,
    role,
    designations,
    phone,
    otherLinks = [],
  } = form;
  if (role !== "ADMIN" && role !== "USER") {
    throw new Error("Role must be either ADMIN or USER.");
  }
  const normalizedDesignations = normalizeDesignations(designations);
  if (
    !normalizedDesignations.length ||
    normalizedDesignations.some((value) => !DESIGNATIONS.includes(value)) ||
    new Set(normalizedDesignations).size !== normalizedDesignations.length
  )
    throw new Error("Enter valid, unique designations.");
  if (!["MALE", "FEMALE", "OTHER"].includes(gender))
    throw new Error("choose a valid gender.");

  if (!branchOptions.map((branch) => branch.value).includes(branch))
    throw new Error("choose a valid branch.");

  if (!firstName || !email || !username || !gender || !branch || !role) {
    throw new Error("All required fields must be provided.");
  }

  if (profilePic !== "" && !(profilePic instanceof File)) {
    throw new Error("Profile picture must be a valid file.");
  }

  if (firstName.length < 3) {
    throw new Error("First name must be at least 3 characters long.");
  }

  const facultyDesignations = [
    "FACULTY",
    "STAFF",
    "DIRECTOR",
    "FACULTY COORDINATOR",
    "HOD",
  ];
  const isFaculty = normalizedDesignations.some((value) => facultyDesignations.includes(value));

  if (!isFaculty) {
    if (!roll || !registrationNumber)
      throw new Error(
        "Roll number and registration number are required for students."
      );
    if (!/^\d{5}$/.test(String(roll))) {
      throw new Error("Roll number must be a valid 5-digit number.");
    }
    const currentYearLastTwoDigits = new Date().getFullYear() % 100;
    const minRoll = 20100;
    const maxRoll = currentYearLastTwoDigits * 1000 + 700;

    if (parseInt(roll) === NaN) {
      throw new Error("Roll number must be Numerical.");
    }

    if (parseInt(roll) < minRoll || parseInt(roll) > maxRoll) {
      throw new Error(`Roll must be between ${minRoll} and ${maxRoll}.`);
    }

    if (!/^\d{11}$/.test(String(registrationNumber))) {
      throw new Error("Registration number must be a valid 11-digit number.");
    }
  }

  if (!/^\d{10}$/.test(String(parseInt(phone)))) {
    throw new Error("Invalid phone number. Must be 10 digits.");
  }

  validateAndNormalizeOtherLinks(otherLinks);
};
