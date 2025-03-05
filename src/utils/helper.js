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
  // Extract hours and minutes from the input string
  // const [hours, minutes] = time24.split(':');

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to a number
  let hours12 = parseInt(hours, 10);

  // Determine AM or PM
  const meridiem = hours12 >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours12 = hours12 % 12 || 12;

  // Add leading zero to minutes if necessary
  const minutesWithLeadingZero = minutes.toString().padStart(2, "0");

  // Return the formatted time
  return `${hours12}:${minutesWithLeadingZero} ${meridiem}`;
}
