"use client";

import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import { ExpenseActions } from "./ExpenseActions";
import type { Expense } from "./types";

export default function ExpenseRow({ expense }: { expense: Expense }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between rounded border p-3">
      <div className="space-y-1">
        <div className="font-medium">{expense.title}</div>
        <div className="text-sm text-gray-600">€ {expense.amount.toFixed(2)}</div>
      </div>

      <div className="flex items-center gap-2">
        <StatusBadge status={expense.status} />
        <ExpenseActions id={expense.id} status={expense.status} onDone={() => router.refresh()} />
      </div>
    </div>
  );
}
