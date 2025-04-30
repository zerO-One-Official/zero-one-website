import { format } from "date-fns";

export function generateAccessCode() {
  // Define the character set for alphanumeric code
  const charset =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // Initialize an empty string to store the generated code
  let code = "";

  // Generate 8 random characters from the character set
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset.charAt(randomIndex);
  }

  return code;
}

export function decodeBase64(base64String) {
  // Check if the input is a valid Base64 string
  if (!base64String) return null;
  if (typeof base64String !== "string") {
    throw new Error("Input must be a Base64 encoded string");
  }

  // Decode the Base64 string using Buffer
  const decodedText = Buffer.from(base64String, "base64").toString("utf-8");

  return decodedText;
}

export const getMonthName = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[date.getMonth()];
};

export function getTime(date) {
  return format(new Date(date), "h:mm a");
}

export function getDate(date) {
  return format(new Date(date), "d LLL yyyy");
}

export const distanceTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);

  // Calculate the difference in milliseconds
  const diff = targetDate - now;
  const isPast = diff < 0; // Whether the time is in the past or future

  // Get the absolute values for calculations
  const absDiff = Math.abs(diff);

  // Convert milliseconds into days, hours, and minutes
  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

  // Create the detailed string
  let timeString = "";
  timeString += `${days} day${days > 1 ? "s" : ""} `;
  timeString += `${hours} hour `;
  timeString += `${minutes} min`;

  // Append "ago" or "in" based on whether it's past or future
  if (isPast) {
    return `${timeString} ago`;
  } else {
    return `in ${timeString}`;
  }
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with "-"
    .replace(/^-+|-+$/g, ""); // Trim "-" from start and end
};

export function convertIdsToString(data) {
  if (Array.isArray(data)) {
    return data.map((item) => convertIdsToString(item));
  } else if (data !== null && typeof data === "object") {
    const newObj = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (
          key === "_id" &&
          typeof data[key] === "object" &&
          data[key].toString
        ) {
          newObj[key] = data[key].toString();
        } else {
          newObj[key] = convertIdsToString(data[key]);
        }
      }
    }
    return newObj;
  }
  return data;
}
