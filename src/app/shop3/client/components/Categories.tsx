'use client';

import { Box, Chip, Grid } from '@mui/material';
import {
  Briefcase,
  Footprints,
  Glasses,
  Hand,
  LucideIcon,
  Shirt,
  ShoppingBasket,
  Venus,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Category = {
  name: string;
  slug: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  { name: 'All', icon: ShoppingBasket, slug: 'all' },
  { name: 'T-shirts', icon: Shirt, slug: 't-shirts' },
  { name: 'Shoes', icon: Footprints, slug: 'shoes' },
  { name: 'Accessories', icon: Glasses, slug: 'accessories' },
  { name: 'Bags', icon: Briefcase, slug: 'bags' },
  { name: 'Dresses', icon: Venus, slug: 'dresses' },
  { name: 'Jackets', icon: Shirt, slug: 'jackets' },
  { name: 'Gloves', icon: Hand, slug: 'gloves' },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get('category') ?? 'all';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', value || 'all');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Box
      sx={{
        bgcolor: 'grey.100',
        p: 1.5,
        borderRadius: 2,
        mb: 2,
        fontSize: '0.875rem',
      }}
    >
      <Grid container spacing={1}>
        {categories.map((category) => {
          const Icon = category.icon;
          const selected = category.slug === selectedCategory;
          return (
            <Grid
              key={category.slug}
              sx={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 1 }}
            >
              <Chip
                clickable
                onClick={() => handleChange(category.slug)}
                icon={<Icon size={18} />}
                label={category.name}
                variant={selected ? 'filled' : 'outlined'}
                color={selected ? 'primary' : 'default'}
                sx={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  px: 1,
                  py: 0.5,
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Categories;
