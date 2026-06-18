export type LeadKind = "booking" | "inquiry" | "contact";

export type Lead = {
  id: string;
  kind: LeadKind;
  name: string;
  phone: string; // digits incl. country code where available
  email?: string;
  roomType?: string;
  checkin?: string;
  checkout?: string;
  guests?: string;
  message?: string;
  source: string; // page / form
  createdAt: string; // ISO
};
