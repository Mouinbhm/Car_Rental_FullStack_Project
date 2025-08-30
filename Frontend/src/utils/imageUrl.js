// Frontend/src/utils/imageUrl.js

// Builds a full URL for images returned by the backend.
// - If the value is an absolute URL (http/https/data), return as-is
// - If it starts with "/", prefix the API origin (backend server)
// - Otherwise return as-is

const API_ORIGIN =
  (typeof window !== "undefined" && window.__API_ORIGIN__) ||
  "http://localhost:5000";

export function resolveImageUrl(input) {
  if (!input) return "";
  const url = String(input).trim();
  if (/^(https?:)?\/\//i.test(url)) return url; // absolute http(s)
  if (/^data:/i.test(url)) return url; // data URI
  if (url.startsWith("/")) return `${API_ORIGIN}${url}`;
  return url;
}

export default resolveImageUrl;
