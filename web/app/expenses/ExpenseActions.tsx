"use client";

import { useState } from "react";
import { toast } from "sonner";
import { NEXT_ACTION } from "./transitions";
import type { ExpenseStatus } from "./types";
import { transitionExpense } from "./api";

export function ExpenseActions({
  id,
  status,
  onDone,
}: {
  id: string;
  status: ExpenseStatus;
  onDone?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const action = NEXT_ACTION[status];

if (!action) return null;

const { endpoint, label, next } = action;

  async function run() {
    setLoading(true);
    try {
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}/${endpoint}`,
      //   { method: "PATCH" }
      // );

      // if (!res.ok) throw new Error("Failed to update status");
      await transitionExpense(id, endpoint);
      toast.success(`Moved to ${next}`);
      onDone?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={run}
      disabled={loading}
      className="rounded bg-black px-3 py-1.5 text-sm text-white disabled:opacity-50"
    >
      {loading ? "Updating..." : label}
    </button>
  );
}
