// helpers.ts

// Format seconds into mm:ss format
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// Truncate long text with ellipsis
export const truncateText = (text: string, maxLength: number = 30): string => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// Capitalize first letter of each word
export const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
};
