export type MenuItem = {
    name: string;
    price: number;
    description?: string;
    productImage?: { url?: string };
  };

  export type MenuCategory = {
    category: string;
    menuItem: MenuItem[];
  };

  export type Restaurant = {
    slug: string;
    name: string;
    address: string;
    banner?: { url?: string };
    rating?: number;
    reviewsCount?: number;
    aboutUs?: string;
    menu?: MenuCategory[];
  };

  const restaurants: Restaurant[] = [
    {
      slug: "pizza-palace",
      name: "Pizza Palace",
      address: "123 Main St, Sample City",
      banner: { url: "/images/pizza-palace.jpg" },
      rating: 4.3,
      reviewsCount: 87,
      aboutUs:
        "Frische Zutaten, Holzofen und eine Karte voller Klassiker & Specials.",
      menu: [
        {
          category: "Pizzen",
          menuItem: [
            {
              name: "Margherita",
              price: 8.9,
              description: "Tomaten, Mozzarella, Basilikum",
              productImage: { url: "/images/menu/margherita.jpg" },
            },
            {
              name: "Salami",
              price: 10.5,
              description: "Tomaten, Mozzarella, italienische Salami",
              productImage: { url: "/images/menu/salami.jpg" },
            },
          ],
        },
        {
          category: "Getränke",
          menuItem: [
            {
              name: "Hausgemachte Limonade",
              price: 3.5,
              description: "Zitrone-Minze",
              productImage: { url: "/images/menu/lemonade.jpg" },
            },
          ],
        },
      ],
    },
    {
      slug: "green-bowl",
      name: "Green Bowl",
      address: "45 Park Ave, Sample City",
      banner: { url: "/images/green-bowl.jpg" },
      rating: 4.6,
      reviewsCount: 112,
      aboutUs: "Gesunde Bowls, frisch und saisonal.",
      menu: [
        {
          category: "Bowls",
          menuItem: [
            {
              name: "Avocado Power",
              price: 11.9,
              description: "Quinoa, Avocado, Kichererbsen, Spinat",
              productImage: { url: "/images/menu/avocado-bowl.jpg" },
            },
          ],
        },
      ],
    },
  ];

  export async function getRestaurantBySlug(slug: string): Promise<Restaurant | null> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(restaurants.find((r) => r.slug === slug) ?? null), 250)
    );
  }
