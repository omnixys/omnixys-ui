import { ProductCategoryType } from './product-category.enum';

export interface ProductVariantType {
  name: string;
  value: string;
  additional_price: number;
}

export interface ProductType {
  id: string;
  name: string;
  brand?: string;
  price: number;
  description?: string;
  category: ProductCategoryType;
  image_paths: string[];
  variants: ProductVariantType[];
  tags?: string[];
  created: string;
  updated: string;
}
