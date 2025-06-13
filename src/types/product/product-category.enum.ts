// src/types/enums/product-category.enum.ts

export enum ProductCategoryEnum {
  ELEKTRONIK = 'ELEKTRONIK',
  KLEIDUNG = 'KLEIDUNG',
  BUECHER = 'BUECHER',
  HAUSHALT = 'HAUSHALT',
  SPIELWAREN = 'SPIELWAREN',
  SPORT = 'SPORT',
  BEAUTY = 'BEAUTY',
  BUERO = 'BUERO',
  LEBENSMITTEL = 'LEBENSMITTEL',
  SONSTIGES = 'SONSTIGES',
  ELECTRONICS = 'ELECTRONICS',
  FRUIT_AND_VEGETABLES = 'FRUIT_AND_VEGETABLES',
  FURNITURE = 'FURNITURE',
  CLOTHING = 'CLOTHING',
  TOYS = 'TOYS',
}

export type ProductCategoryType =
  | 'ELEKTRONIK'
  | 'KLEIDUNG'
  | 'BUECHER'
  | 'HAUSHALT'
  | 'SPIELWAREN'
  | 'SPORT'
  | 'BEAUTY'
  | 'BUERO'
  | 'LEBENSMITTEL'
  | 'SONSTIGES'
  | 'ELECTRONICS'
  | 'FRUIT_AND_VEGETABLES'
  | 'FURNITURE'
  | 'CLOTHING'
  | 'TOYS';

export const ProductCategoryLabelMap: Record<ProductCategoryEnum, string> = {
  [ProductCategoryEnum.ELEKTRONIK]: 'Elektronik',
  [ProductCategoryEnum.KLEIDUNG]: 'Kleidung',
  [ProductCategoryEnum.BUECHER]: 'Bücher',
  [ProductCategoryEnum.HAUSHALT]: 'Haushalt',
  [ProductCategoryEnum.SPIELWAREN]: 'Spielwaren',
  [ProductCategoryEnum.SPORT]: 'Sport',
  [ProductCategoryEnum.BEAUTY]: 'Beauty',
  [ProductCategoryEnum.BUERO]: 'Büro',
  [ProductCategoryEnum.LEBENSMITTEL]: 'Lebensmittel',
  [ProductCategoryEnum.SONSTIGES]: 'Sonstiges',
  [ProductCategoryEnum.ELECTRONICS]: 'Electronics',
  [ProductCategoryEnum.FRUIT_AND_VEGETABLES]: 'Obst & Gemüse',
  [ProductCategoryEnum.FURNITURE]: 'Möbel',
  [ProductCategoryEnum.CLOTHING]: 'Clothing',
  [ProductCategoryEnum.TOYS]: 'Toys',
};

// const label = ProductCategoryLabelMap[ProductCategoryEnum.BEAUTY]; // ➝ "Beauty"
