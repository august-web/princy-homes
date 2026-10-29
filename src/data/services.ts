import type { Service } from "./types";

export const SERVICES: Service[] = [
  {
    id: "house-cleaning",
    name: "House Cleaning",
    short: "Spotless rooms, kitchens and bathrooms — one-off or recurring.",
    description:
      "Thorough, detail-minded cleaning for apartments and family homes. Choose a one-off deep clean before an event or move, or a weekly routine that keeps every room fresh.",
    includes: [
      "Dusting, sweeping, mopping and vacuuming",
      "Kitchen surfaces, appliances and sinks",
      "Bathroom and toilet sanitising",
      "Bed-making and tidying of living areas",
    ],
    idealFor: "Busy professionals, families and post-event clean-ups",
    image: "/img/cleaning.webp",
  },
  {
    id: "cooking",
    name: "Cooking & Meal Preparation",
    short: "Home-cooked Nigerian and continental meals, made your way.",
    description:
      "Experienced home cooks prepare daily meals or weekly batch cooking to suit your family’s taste, diet and budget — from soups and stews to light continental dishes.",
    includes: [
      "Menu planning around your preferences",
      "Market list and ingredient preparation",
      "Daily cooking or weekly batch meals",
      "Clean-down of the kitchen after cooking",
    ],
    idealFor: "Families, elderly relatives and health-conscious households",
    image: "/img/cooking.webp",
  },
  {
    id: "laundry",
    name: "Laundry & Ironing",
    short: "Washed, pressed and neatly folded — handled with care.",
    description:
      "Careful sorting, washing and ironing of everyday clothes, uniforms, native wear and household linens, with attention to fabric care labels.",
    includes: [
      "Sorting by colour and fabric",
      "Machine or hand washing",
      "Ironing of shirts, uniforms and native attire",
      "Folding and wardrobe organising",
    ],
    idealFor: "Households with school uniforms, work shirts and linens",
    image: "/img/laundry.webp",
  },
  {
    id: "housekeeping",
    name: "General Housekeeping",
    short: "A dependable hand to keep the whole home in order.",
    description:
      "A regular housekeeper who combines light cleaning, laundry, tidying and simple errands so the household runs smoothly day to day.",
    includes: [
      "Daily tidying and light cleaning",
      "Laundry and linen changes",
      "Restocking household supplies",
      "Simple errands within the neighbourhood",
    ],
    idealFor: "Homes that need steady, all-round daily support",
    image: "/img/housekeeping.webp",
  },
  {
    id: "home-management",
    name: "Full Home Management",
    short: "A trusted manager for the entire household.",
    description:
      "For larger homes and busy families: a senior home manager who coordinates cleaning, cooking, laundry, supplies and other staff, and keeps you informed.",
    includes: [
      "Coordination of household staff and schedules",
      "Budgeting and household supply management",
      "Oversight of cooking, cleaning and laundry",
      "Regular check-ins and household reports",
    ],
    idealFor: "Large homes, frequent travellers and executive households",
    image: "/img/management.webp",
  },
];
