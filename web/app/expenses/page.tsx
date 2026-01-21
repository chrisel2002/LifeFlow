import { API_Base } from "@/lib/api";

type Expense = {
  id: string;
  title: string;
  amount: number;
  currency: string;
  spentAt: string;
  category?: { name: string } | null;
};

export default async function ExpensesPage() {
  const res = await fetch(`${API_Base}/expenses`, {
    cache: "no-store",
  });
  const expenses: Expense[] = await res.json();
    return (
    <main style={{ padding: 20 }}>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {new Date(e.spentAt).toLocaleDateString()} — {e.title} — {e.amount} {e.currency}
            {e.category?.name ? ` (${e.category.name})` : ""}
          </li>
        ))}
      </ul>
    </main>
  );
}