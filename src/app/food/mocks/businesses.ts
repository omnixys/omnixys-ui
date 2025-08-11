import type { Business } from "../components/BusinessItem";
import { mockBusinesses } from "./businesses.data";

// Filtert nach Kategorie-Slug; "all" liefert alles.
// Nutzt sowohl category.name als auch restroType für einfache Demozwecke.
export async function getBusinessesByCategory(category: string): Promise<Business[]> {
  const data = mockBusinesses;
  if (!category || category === "all") {
    return new Promise((r) => setTimeout(() => r(data), 300));
  }

  const catLower = category.toLowerCase();
  const filtered = data.filter(
    (b) =>
      b.categories?.some((c) => c.name.toLowerCase() === catLower) ||
      b.restroType?.some((t) => t.toLowerCase() === catLower)
  );

  return new Promise((r) => setTimeout(() => r(filtered), 300));
}
