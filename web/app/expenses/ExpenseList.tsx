import ExpenseRow from "./ExpenseRow";
import type { Expense } from "./types";

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return <div className="rounded border p-4 text-sm">No expenses yet.</div>;
  }

  return (
    <div className="space-y-2">
      {expenses.map((e) => (
        <ExpenseRow key={e.id} expense={e} />
      ))}
    </div>
  );
}
