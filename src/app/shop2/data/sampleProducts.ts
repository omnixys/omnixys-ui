export const sampleProducts = [
  {
    _id: 'p-2001',
    slug: 'ultradesk-pro',
    name: 'UltraDesk Pro',
    productType: 'physical',
    collectionIds: ['featured', 'office'],
    price: { price: 499.9, discountedPrice: 449.0 },
    media: {
      mainMedia: { image: { url: '/images/products/desk.jpg' } },
      items: [
        { image: { url: '/images/products/desk.jpg' } },
        { image: { url: '/images/products/desk-2.jpg' } },
      ],
    },
    additionalInfoSections: [
      {
        title: 'shortDesc',
        description: '<p>Höhenverstellbarer Schreibtisch.</p>',
      },
    ],
  },
  {
    _id: 'p-2002',
    slug: 'silentmouse-x',
    name: 'SilentMouse X',
    productType: 'physical',
    collectionIds: ['new', 'accessories'],
    price: { price: 39.95 },
    media: {
      mainMedia: { image: { url: '/images/products/mouse.jpg' } },
      items: [{ image: { url: '/images/products/mouse.jpg' } }],
    },
    additionalInfoSections: [
      { title: 'shortDesc', description: '<p>Leise & präzise.</p>' },
    ],
  },
];

export function findProductById(id: string) {
  return sampleProducts.find((p) => p._id === id);
}
