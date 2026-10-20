const difficultyStyles = {
  easy: "border-green-400/30 bg-green-400/10 text-green-300",
  medium: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  hard: "border-red-400/30 bg-red-400/10 text-red-300",
  basic: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  expert: "border-purple-400/30 bg-purple-400/10 text-purple-300",
};

export const pointsBadgeClassName =
  "border-accent/30 bg-accent/10 text-accent";

export const getDifficultyBadgeClassName = (difficulty) =>
  difficultyStyles[difficulty?.toLowerCase()] ||
  "border-white/15 bg-white/5 text-foreground/70";
