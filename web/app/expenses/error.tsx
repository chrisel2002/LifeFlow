"use client";

import * as React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-3 rounded border p-4">
      <h2 className="text-lg font-semibold">Expenses page crashed</h2>
      <p className="text-sm text-gray-700">
        {error.message || "Something went wrong."}
      </p>
      <button
        onClick={reset}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
