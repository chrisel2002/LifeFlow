export type ExpenseStatus = "CREATED" | "SUBMITTED" | "APPROVED" | "PAID" | "ARCHIVED";

export type Category = { id: string; name: string };

export type Expense = {
  id: string;
  title: string;
  amount: number;
  categoryId: string;
  status: ExpenseStatus;
  createdAt?: string;
  updatedAt?: string;
};
