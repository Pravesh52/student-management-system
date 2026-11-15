export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const required = (value) => String(value ?? "").trim().length > 0;
export const getInitials = (name = "") => name.split(" ").filter(Boolean).slice(0, 2).map(x => x[0].toUpperCase()).join("");
export const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
export const getId = (item) => item?._id || item?.id;
