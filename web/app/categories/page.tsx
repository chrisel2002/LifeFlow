import { API_Base } from "@/lib/api";
await fetch(`${API_Base}/categories`, { cache: "no-store" });
export default async function CategoriesPage() {
  const res = await fetch(`${API_Base}/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Categories</h1>
        <p>Backend error: {res.status}</p>
      </main>
    );
  }

  const categories = await res.json();

  return (
    <main style={{ padding: 20 }}>
      <h1>Categories</h1>
      <ul>
        {categories.map((c: any) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </main>
  );
}

