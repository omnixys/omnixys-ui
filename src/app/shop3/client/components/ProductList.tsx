'use client';

import NextLink from 'next/link';
import { ProductsType } from '../types';
import Categories from './Categories';
import Filter from './Filter';
import ProductCard from './ProductCard';

import { Box, Grid, Link as MUILink } from '@mui/material';

// TEMPORARY
const products: ProductsType = [
  {
    id: 1,
    name: 'Adidas CoreFit T-Shirt',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 39.9,
    sizes: ['s', 'm', 'l', 'xl', 'xxl'],
    colors: ['gray', 'purple', 'green'],
    images: {
      gray: '/shop3/products/1g.png',
      purple: '/shop3/products/1p.png',
      green: '/shop3/products/1gr.png',
    },
  },
  {
    id: 2,
    name: 'Puma Ultra Warm Zip',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 59.9,
    sizes: ['s', 'm', 'l', 'xl'],
    colors: ['gray', 'green'],
    images: {
      gray: '/shop3/products/2g.png',
      green: '/shop3/products/2gr.png',
    },
  },
  {
    id: 3,
    name: 'Nike Air Essentials Pullover',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 69.9,
    sizes: ['s', 'm', 'l'],
    colors: ['green', 'blue', 'black'],
    images: {
      green: '/shop3/products/3gr.png',
      blue: '/shop3/products/3b.png',
      black: '/shop3/products/3bl.png',
    },
  },
  {
    id: 4,
    name: 'Nike Dri Flex T-Shirt',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 29.9,
    sizes: ['s', 'm', 'l'],
    colors: ['white', 'pink'],
    images: { white: '/shop3/products/4w.png', pink: '/shop3/products/4p.png' },
  },
  {
    id: 5,
    name: 'Under Armour StormFleece',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 49.9,
    sizes: ['s', 'm', 'l'],
    colors: ['red', 'orange', 'black'],
    images: {
      red: '/shop3/products/5r.png',
      orange: '/shop3/products/5o.png',
      black: '/shop3/products/5bl.png',
    },
  },
  {
    id: 6,
    name: 'Nike Air Max 270',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 59.9,
    sizes: ['40', '42', '43', '44'],
    colors: ['gray', 'white'],
    images: { gray: '/shop3/products/6g.png', white: '/shop3/products/6w.png' },
  },
  {
    id: 7,
    name: 'Nike Ultraboost Pulse ',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 69.9,
    sizes: ['40', '42', '43'],
    colors: ['gray', 'pink'],
    images: { gray: '/shop3/products/7g.png', pink: '/shop3/products/7p.png' },
  },
  {
    id: 8,
    name: 'Levi’s Classic Denim',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 59.9,
    sizes: ['s', 'm', 'l'],
    colors: ['blue', 'green'],
    images: {
      blue: '/shop3/products/8b.png',
      green: '/shop3/products/8gr.png',
    },
  },
];

const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: 'homepage' | 'products';
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Categories />
      {params === 'products' && <Filter />}

      <Grid container spacing={6}>
        {products.map((product) => (
          <Grid
            key={product.id}
            sx={{ xs: 12, sm: 6, md: 4,  xl: 13 }}

          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <MUILink
          component={NextLink}
          href={
            category
              ? `/shop3/products/?category=${category}`
              : '/shop3/products'
          }
          underline="hover"
          sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
        >
          View all products
        </MUILink>
      </Box>
    </Box>
  );
};

export default ProductList;
