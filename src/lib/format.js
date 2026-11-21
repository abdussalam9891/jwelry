export function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

export function formatDate(date, options) {
  return new Date(date).toLocaleDateString(
    "en-IN",
    options || { day: "2-digit", month: "long", year: "numeric" },
  );
}

export function capitalize(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// "engagement-ring" -> "Engagement Ring"
export function formatLabel(value = "") {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
