import type { Business } from "../components/BusinessItem";

export const mockBusinesses: Business[] = [
  {
    slug: "cafe-mokka",
    name: "Café Mokka",
    banner: { url: "/food/images/cafe-mokka.jpg" },
    restroType: ["cafe"],
    categories: [{ name: "coffee" }],
    rating: 4.7,
  },
  {
    slug: "green-bowl",
    name: "Green Bowl",
    banner: { url: "/food/images/green-bowl.jpg" },
    restroType: ["vegan"],
    categories: [{ name: "healthy" }],
    rating: 4.6,
  },
  {
    slug: "pizza-palace",
    name: "Pizza Palace",
    banner: { url: "/food/images/pizza-palace.jpg" },
    restroType: ["restaurant"],
    categories: [{ name: "italian" }],
    rating: 4.3,
  },
  {
    slug: "tea-time",
    name: "Tea Time",
    banner: { url: "/food/images/tea-time.jpg" },
    restroType: ["cafe"],
    categories: [{ name: "tea" }],
    rating: 4.5,
  },
];
