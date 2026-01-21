"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  amount: z.coerce.number().positive(" Amount must be greater than 0"),
  categoryId: z.string().uuid("Please choose a valid category"),
}).strict();

type FormData = z.infer<typeof schema>;

type props = {
    categories: { id: string; name: string }[];
    onCreated?: () => void;
};

export default function ExpenseForm({ categories, onCreated }: props) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      title: "",
      amount: 0,
      categoryId: categories?.[0]?.id ?? "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        // Try to read backend validation errors (Nest usually returns { message: [...] })
        let msg = "Something went wrong. Please try again.";
        try {
          const data = await res.json();
          if (Array.isArray(data?.message)) msg = data.message.join(", ");
          else if (typeof data?.message === "string") msg = data.message;
        } catch {}
        throw new Error(msg);
      }

      toast.success("Expense created");
      reset({ title: "", amount: 0, categoryId: values.categoryId });
      onCreated?.();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div className="space-y-1">
        <label className="block text-sm font-medium">Title</label>
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="e.g., Groceries"
          {...register("title")}
          disabled={isSubmitting}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Amount */}
      <div className="space-y-1">
        <label className="block text-sm font-medium">Amount (€)</label>
        <input
          className="w-full rounded border px-3 py-2"
          type="number"
          step="0.01"
          placeholder="e.g., 12.50"
          {...register("amount")}
          disabled={isSubmitting}
          aria-invalid={!!errors.amount}
        />
        {errors.amount && (
          <p className="text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label className="block text-sm font-medium">Category</label>
        <select
          className="w-full rounded border px-3 py-2"
          {...register("categoryId")}
          disabled={isSubmitting}
          aria-invalid={!!errors.categoryId}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-sm text-red-600">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Server error fallback (in addition to toast) */}
      {serverError && (
        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}
