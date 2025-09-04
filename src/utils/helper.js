import { formatInTimeZone } from "date-fns-tz";

export const branchOptions = [
  {
    value: "Artificial Intelligence",
    label: "Artificial Intelligence",
  },
  {
    value: "Computer Science & Engineering",
    label: "Computer Science & Engineering",
  },
  {
    value: "Electrical & Electronics Engineering",
    label: " Electrical & Electronics Engineering",
  },
  {
    value: "Civil with Computer Applications",
    label: "Civil with Computer Applications",
  },
  {
    value: "Mechanical Engineering",
    label: "Mechanical Engineering",
  },
  {
    value: "Civil Engineering",
    label: "Civil Engineering",
  },
];

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

const KOLKATA_TZ = "Asia/Kolkata";

export function getTime(date) {
  if (!date || !(date instanceof Date)) return date;
  const kolkataTime = formatInTimeZone(date, KOLKATA_TZ, "h:mm a");
  return kolkataTime;
}

export function getDate(date) {
  if (!date || !(date instanceof Date)) return date;
  const kolkataTime = formatInTimeZone(date, KOLKATA_TZ, "d LLL yyyy");
  return kolkataTime;
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

export const capitalizeFirstLetter = (string) => {
  if (!string) return string; // Check if the string is empty or null
  if (typeof string !== "string") return string; // Check if the input is a string
  let str = string.toLowerCase();
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export function convertIdsToString(data) {
  if (Array.isArray(data)) {
    return data.map((item) => convertIdsToString(item));
  } else if (data instanceof Date) {
    return data; // ✅ Preserve Date objects
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
