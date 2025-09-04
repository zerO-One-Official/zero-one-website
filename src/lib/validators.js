import { branchOptions } from "@/utils/helper";

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
    designation,
    phone,
  } = form;
  if (role !== "ADMIN" && role !== "USER") {
    throw new Error("Role must be either ADMIN or USER.");
  }
  if (
    ![
      "STUDENT",
      "ALUMNI",
      "FACULTY",
      "STAFF",
      "CLUB LEAD",
      "CLUB MEMBER",
      "CLUB COORDINATOR",
      "HOD",
      "FACULTY COORDINATOR",
    ].includes(designation)
  )
    throw new Error("enter a valid designation.");
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
    "FACULTY COORDINATOR",
    "HOD",
  ];
  const isFaculty = facultyDesignations.includes(designation);

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
};
