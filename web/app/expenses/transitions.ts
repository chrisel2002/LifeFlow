 export const NEXT_ACTION: Record<
  "CREATED" | "SUBMITTED" | "APPROVED" | "PAID" | "ARCHIVED",
  { label: string; endpoint: "submit" | "approve" | "pay"; next: string } | null
> = {
  CREATED: { label: "Submit", endpoint: "submit", next: "SUBMITTED" },
  SUBMITTED: { label: "Approve", endpoint: "approve", next: "APPROVED" },
  APPROVED: { label: "Mark Paid", endpoint: "pay", next: "PAID" },
  PAID: null,
  ARCHIVED: null,
};
