// Beispiel-Daten für Kategorien (statt Wix)
// Pfad: src/data/categories.ts

export type Category = {
  _id: string;
  slug: string;
  name: string;
  imageUrl: string;
};

export const sampleCategories: Category[] = [
  {
    _id: 'cat-1',
    slug: 'fashion',
    name: 'Fashion',
    imageUrl: '/images/categories/fashion.jpg',
  },
  {
    _id: 'cat-2',
    slug: 'electronics',
    name: 'Electronics',
    imageUrl: '/images/categories/electronics.jpg',
  },
  {
    _id: 'cat-3',
    slug: 'home-living',
    name: 'Home & Living',
    imageUrl: '/images/categories/home-living.jpg',
  },
  {
    _id: 'cat-4',
    slug: 'sports',
    name: 'Sports',
    imageUrl: '/images/categories/sports.jpg',
  },
  {
    _id: 'cat-5',
    slug: 'beauty',
    name: 'Beauty',
    imageUrl: '/images/categories/beauty.jpg',
  },
  {
    _id: 'cat-6',
    slug: 'toys',
    name: 'Toys',
    imageUrl: '/images/categories/toys.jpg',
  },
];
