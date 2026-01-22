import type { Expense, Category, ExpenseStatus } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

function ensureBaseUrl() {
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");
  return baseUrl;
}

export async function fetchExpenses(): Promise<Expense[]> {
  const res = await fetch(`${ensureBaseUrl()}/expenses`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load expenses");
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${ensureBaseUrl()}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

export async function createExpense(input: {
  title: string;
  amount: number;
  categoryId: string;
}): Promise<Expense> {
  const res = await fetch(`${ensureBaseUrl()}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    let msg = "Failed to create expense";
    try {
      const data = await res.json();
      if (Array.isArray(data?.message)) msg = data.message.join(", ");
      else if (typeof data?.message === "string") msg = data.message;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}

export async function transitionExpense(id: string, endpoint: "submit" | "approve" | "pay") {
  const res = await fetch(`${ensureBaseUrl()}/expenses/${id}/${endpoint}`, { method: "PATCH" });

  if (!res.ok) {
    let msg = "Failed to update status";
    try {
      const data = await res.json();
      if (Array.isArray(data?.message)) msg = data.message.join(", ");
      else if (typeof data?.message === "string") msg = data.message;
    } catch {}
    throw new Error(msg);
  }

  return res.json() as Promise<{ id: string; status: ExpenseStatus }>;
}
