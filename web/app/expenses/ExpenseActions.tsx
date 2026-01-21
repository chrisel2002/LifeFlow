"use client";

import { useState } from "react";
import { toast } from "sonner";
import { NEXT_ACTION } from "./transitions";

export function ExpenseActions({
  id,
  status,
  onDone,
}: {
  id: string;
  status: "CREATED" | "SUBMITTED" | "APPROVED" | "PAID" | "ARCHIVED";
  onDone?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const action = NEXT_ACTION[status];

if (action === null) return null;

const { endpoint, label, next } = action;

  if (!action) return null;

  async function run() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}/${endpoint}`,
        { method: "PATCH" }
      );

      if (!res.ok) throw new Error("Failed to update status");

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
      {loading ? "Updating..." : action.label}
    </button>
  );
}
