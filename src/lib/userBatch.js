export function getUserBatch(user) {
  if (!/^\d{5}$/.test(String(user.roll || ""))) return null;
  return 2000 + Number(String(user.roll).slice(0, 2)) - (user.lateralEntry === true ? 1 : 0);
}
