"use client";

import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import { ExpenseActions } from "./ExpenseActions";

export default function ExpenseRow({ expense }: { expense: any }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between rounded border p-3">
      <div>
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
