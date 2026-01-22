"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpense } from "./api";
import type { Category } from "./types";

const schema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  amount: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseFloat(val);
    }
    return val;
  }, z.number().positive("Amount must be greater than 0")),
  categoryId: z.string().uuid("Please choose a valid category"),
});

type FormData = z.infer<typeof schema>;

export default function ExpenseForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      amount: 0,
      categoryId: "",
    },
  });
useEffect(() => {
  if (categories.length > 0) {
    setValue("categoryId", categories[0].id, { shouldValidate: true });
  }
}, [categories, setValue]);

  async function onSubmit(values: FormData) {
    setLoading(true);
    setServerError(null);
    console.log("SUBMIT VALUES:", values);

    try {
      await createExpense(values);
      toast.success("Expense created ✅");
      reset({ title: "", amount: 0, categoryId: values.categoryId });
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Add Expense</h2>
        <span className="text-xs text-gray-500">Status starts as CREATED</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1 sm:col-span-1">
          <label className="block text-sm font-medium">Title</label>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="e.g., Groceries"
            {...register("title")}
            disabled={loading}
          />
          {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div className="space-y-1 sm:col-span-1">
          <label className="block text-sm font-medium">Amount (€)</label>
          <input
            className="w-full rounded border px-3 py-2"
            type="number"
            step="0.01"
            placeholder="e.g., 12.50"
            {...register("amount")}
            disabled={loading}
          />
          {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
        </div>

        <div className="space-y-1 sm:col-span-1">
          <label className="block text-sm font-medium">Category</label>
          <select className="w-full rounded border px-3 py-2" 
          {...register("categoryId")} disabled={loading || categories.length === 0}>

            <option value="">Choose a category</option>
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
      </div>

      {serverError && (
        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}
