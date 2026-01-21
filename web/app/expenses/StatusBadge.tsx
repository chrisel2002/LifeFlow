type ExpenseStatus = "CREATED" | "SUBMITTED" | "APPROVED" | "PAID" | "ARCHIVED";

const LABEL: Record<ExpenseStatus, string> = {
  CREATED: "Created ✅",
  SUBMITTED: "Submitted ⏳",
  APPROVED: "Approved ✅",
  PAID: "Paid 💸",
  ARCHIVED: "Archived 📦",
};

export default function StatusBadge({ status }: { status: ExpenseStatus }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
      {LABEL[status]}
    </span>
  );
}
