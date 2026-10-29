import type { Application } from "./types";

export const APPLICATIONS: Application[] = [
  {
    id: "AP-311",
    applicantName: "Sample Applicant 1",
    services: ["cooking"],
    state: "Imo",
    city: "Owerri",
    yearsExperience: 6,
    stage: "background-check",
    submittedAt: "2026-10-18",
  },
  {
    id: "AP-312",
    applicantName: "Sample Applicant 2",
    services: ["house-cleaning", "laundry"],
    state: "Lagos",
    city: "Yaba",
    yearsExperience: 2,
    stage: "interview",
    submittedAt: "2026-10-21",
  },
  {
    id: "AP-313",
    applicantName: "Sample Applicant 3",
    services: ["home-management"],
    state: "FCT (Abuja)",
    city: "Wuse",
    yearsExperience: 10,
    stage: "received",
    submittedAt: "2026-10-24",
  },
  {
    id: "AP-314",
    applicantName: "Sample Applicant 4",
    services: ["housekeeping"],
    state: "Cross River",
    city: "Calabar",
    yearsExperience: 4,
    stage: "documents",
    submittedAt: "2026-10-19",
  },
];
