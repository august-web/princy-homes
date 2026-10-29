export const SITE_NAME = "PRINCY HOME SERVICE";
export const TAGLINE = "Your Home. Our Care.";
export const SITE_TITLE = `${SITE_NAME} — ${TAGLINE}`;
export const SITE_DESCRIPTION =
  "Book trusted, verified domestic workers in Nigeria for house cleaning, cooking, laundry, housekeeping and full home management.";

export const PHONE_DISPLAY = "0916 211 9265";
export const PHONE_TEL = "+2349162119265";
const WHATSAPP_NUMBER = "2349162119265";

export function waLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const MAIN_NAV = [
  { to: "/services", label: "Services" },
  { to: "/workers", label: "Find a worker" },
  { to: "/apply", label: "Work with us" },
  { to: "/policies", label: "Safety & policies" },
  { to: "/contact", label: "Contact" },
] as const;
