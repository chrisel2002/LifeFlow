// import { API_Base } from "@/lib/api";
// import ExpenseForm from "./ExpenseForm";
// import ExpenseRow from "./ExpenseRow";
// import StatusBadge from "./StatusBadge";
// type Expense = {
//   id: string;
//   title: string;
//   amount: number;
//   currency: string;
//   spentAt: string;
//   category?: { name: string } | null;
//   status: "CREATED" | "SUBMITTED" | "APPROVED" | "PAID" | "ARCHIVED";
// };
// async function getExpenses() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, { cache: "no-store" });
//   if (!res.ok) throw new Error("Failed to load expenses");
//   return res.json();
// }

// async function getCategories() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { cache: "no-store" });
//   if (!res.ok) throw new Error("Failed to load categories");
//   return res.json();
// }
// // export default async function ExpensesPage() {
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, {
// //     cache: "no-store",
// //   });
// //   const expenses: Expense[] = await res.json();
// //     return (
// //     <main style={{ padding: 20 }}>
// //       <h1>Expenses</h1>
// //       <ul>
// //         <div className="space-y-4">
// //         {expenses.map((e) => (
// //            <div key={e.id} className="flex items-center justify-between rounded border p-3">
// //           <div className="space-y-1">
// //             <div className="font-medium">{e.title}</div>
// //             <div className="text-sm text-gray-600">€ {e.amount.toFixed(2)}</div>
// //           </div>
// //           <li key={e.id}>
// //             {new Date(e.spentAt).toLocaleDateString()} — {e.title} — {e.amount} {e.currency}
// //             {e.category?.name ? ` (${e.category.name})` : ""}
// //             <StatusBadge status={e.status} />
// //           </li>
// //             </div>
// //         ))}
// //         </div>
// //       </ul>
// //     </main>
// //   );
// // }
// export default async function ExpensesPage() {
//   const [expenses, categories] = await Promise.all([getExpenses(), getCategories()]);

//   return (
//     <div className="mx-auto max-w-2xl space-y-6 p-4">
//       <h1 className="text-2xl font-bold">Expenses</h1>

//       <ExpenseForm categories={categories} />

//       <div className="space-y-2">
//         {expenses.map((e: any) => (
//           <ExpenseRow key={e.id} expense={e} />
//         ))}
//       </div>
//     </div>
//   );
// }
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { fetchCategories, fetchExpenses } from "./api";

export default async function ExpensesPage() {
  const [categories, expenses] = await Promise.all([fetchCategories(), fetchExpenses()]);

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <p className="text-sm text-gray-600">
          Process-aware expenses: CREATED → SUBMITTED → APPROVED → PAID
        </p>
      </div>

      <ExpenseForm categories={categories} />

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Recent Expenses</h2>
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
}
