export type ServiceId =
  | "house-cleaning"
  | "cooking"
  | "laundry"
  | "housekeeping"
  | "home-management";

export interface Service {
  id: ServiceId;
  name: string;
  short: string;
  description: string;
  includes: string[];
  idealFor: string;
  image: string;
}

export type Verification = "verified" | "pending" | "not-verified";
export type Availability = "live-in" | "live-out" | "either";

export interface Worker {
  id: string;
  isSample: boolean;
  displayName: string;
  photoUrl: string | null;
  services: ServiceId[];
  yearsExperience: number;
  state: string;
  city: string;
  verification: Verification;
  languages: string[];
  bio: string;
  availability: Availability;
}

export interface LaunchCity {
  state: string;
  city: string;
}

export interface ServiceArea extends LaunchCity {
  verifiedCount: number;
  available: boolean;
}

export type BookingStatus =
  | "new"
  | "contacted"
  | "matched"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  customerName: string;
  serviceId: ServiceId;
  workerId: string | null;
  state: string;
  city: string;
  date: string;
  time: string;
  status: BookingStatus;
  createdAt: string;
}

export type ApplicationStage =
  | "received"
  | "documents"
  | "interview"
  | "background-check";

export interface Application {
  id: string;
  applicantName: string;
  services: ServiceId[];
  state: string;
  city: string;
  yearsExperience: number;
  stage: ApplicationStage;
  submittedAt: string;
}
