export type Category = {
    id: string;
    name: string;
    slug: string;
    icon: { url: string };
  };

  // Mock-Daten – ersetze die URLs ggf. durch lokale Assets (z. B. /public/icons/*)
  // Wenn du externe Domains nutzt, vergiss nicht, sie in next.config.js unter images.domains freizugeben.
  export const mockCategories: Category[] = [
    { id: "1", name: "Alle", slug: "all", icon: { url: "/icons/all.png" } },
    { id: "2", name: "Kaffee", slug: "coffee", icon: { url: "/icons/coffee.png" } },
    { id: "3", name: "Tee", slug: "tea", icon: { url: "/icons/tea.png" } },
    { id: "4", name: "Smoothies", slug: "smoothies", icon: { url: "/icons/smoothie.png" } },
    { id: "5", name: "Säfte", slug: "juice", icon: { url: "/icons/juice.png" } },
    { id: "6", name: "Snacks", slug: "snacks", icon: { url: "/icons/snack.png" } },
    { id: "7", name: "Gebäck", slug: "bakery", icon: { url: "/icons/bakery.png" } },
    { id: "8", name: "Vegan", slug: "vegan", icon: { url: "/icons/vegan.png" } },
    { id: "9", name: "Glutenfrei", slug: "gluten-free", icon: { url: "/icons/glutenfree.png" } },
    { id: "10", name: "Neuheiten", slug: "new", icon: { url: "/icons/new.png" } },
  ];

  // Simuliert einen API-Call
  export async function getCategories(): Promise<Category[]> {
    return new Promise((resolve) => setTimeout(() => resolve(mockCategories), 250));
  }
