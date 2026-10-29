import { ChefHat, Crown, House, Shirt, Sparkles, type LucideIcon } from "lucide-react";

import type { ServiceId } from "@/data/types";

export const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  "house-cleaning": Sparkles,
  cooking: ChefHat,
  laundry: Shirt,
  housekeeping: House,
  "home-management": Crown,
};
