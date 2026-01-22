 import type { ExpenseStatus } from "./types";
 
 export const NEXT_ACTION: Record<
  ExpenseStatus,
  { label: string; endpoint: "submit" | "approve" | "pay"; next: ExpenseStatus } | null
> = {
  CREATED: { label: "Submit", endpoint: "submit", next: "SUBMITTED" },
  SUBMITTED: { label: "Approve", endpoint: "approve", next: "APPROVED" },
  APPROVED: { label: "Mark Paid", endpoint: "pay", next: "PAID" },
  PAID: null,
  ARCHIVED: null,
};
