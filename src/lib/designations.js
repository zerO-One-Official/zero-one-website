export const DESIGNATIONS = [
  "STUDENT",
  "ALUMNI",
  "FACULTY",
  "STAFF",
  "CLUB LEAD",
  "CLUB MEMBER",
  "CLUB COORDINATOR",
  "HOD",
  "FACULTY COORDINATOR",
];

export function normalizeDesignations(value) {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}
