'use client';

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import Link from 'next/link';

// Hinweis: Lege die Datei unten unter src/data/sampleProducts.ts an (siehe Inline-Dummy)
// oder ersetze den Import mit deiner Datenquelle/GraphQL
import { sampleProducts } from '../data/sampleProducts';

type SearchParams = {
  name?: string;
  type?: 'physical' | 'digital';
  min?: number;
  max?: number;
  page?: string; // kommt als String aus searchParams
  sort?: string; // z.B. "asc name" oder "desc price"
  cat?: string;
};

const PRODUCT_PER_PAGE = 8;

export default function ProductList({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: SearchParams;
}) {
  const pageSize = limit || PRODUCT_PER_PAGE;

  // 1) Filtern (Wix-Ersatz über lokale Beispieldaten)
  let data = sampleProducts.filter((p) =>
    p.collectionIds?.includes(categoryId),
  );

  if (categoryId === 'all') {
    data = sampleProducts.slice(); // keine Kategorie-Filterung
  } else {
    data = sampleProducts.filter((p) => p.collectionIds?.includes(categoryId));
  }

  if (searchParams?.name) {
    const q = searchParams.name.toLowerCase();
    data = data.filter((p) => p.name.toLowerCase().startsWith(q));
  }

  if (searchParams?.type) {
    data = data.filter((p) => p.productType === searchParams.type);
  }

  const min = searchParams?.min ?? 0;
  const max = searchParams?.max ?? 999999;
  data = data.filter(
    (p) => (p.price?.price ?? 0) > min && (p.price?.price ?? 0) < max,
  );

  // 2) Sortieren
  if (searchParams?.sort) {
    const [dir, by] = searchParams.sort.split(' ');
    data.sort((a, b) => {
      const av =
        by === 'price'
          ? (a.price?.price ?? 0)
          : (a as any)[by]?.toString().toLowerCase();
      const bv =
        by === 'price'
          ? (b.price?.price ?? 0)
          : (b as any)[by]?.toString().toLowerCase();
      if (av < bv) return dir === 'asc' ? -1 : 1;
      if (av > bv) return dir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // 3) Pagination
  const currentPage = Number.parseInt(searchParams?.page || '0', 10) || 0;
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const paged = data.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize,
  );

  // 4) Render
  return (
    <Box sx={{ mt: 6 }}>
      <Grid container spacing={4}>
        {paged.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardActionArea
                component={Link}
                href={`/shop2/${product.slug}`}
                sx={{ flexGrow: 1 }}
              >
                <Box sx={{ position: 'relative', width: '100%', height: 320 }}>
                  <Image
                    src={product.media?.mainMedia?.image?.url || '/shop.png'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 600px) 100vw, 25vw"
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                  />
                  {product.media?.items?.[1]?.image?.url && (
                    <Image
                      src={product.media.items[1].image.url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 600px) 100vw, 25vw"
                      style={{
                        objectFit: 'cover',
                        borderRadius: 8,
                        opacity: 0,
                      }}
                    />
                  )}
                </Box>
              </CardActionArea>

              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" fontWeight={600} noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={700}>
                    ${product.price?.price?.toFixed(2) ?? '0.00'}
                  </Typography>
                </Stack>

                {product.additionalInfoSections && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        product.additionalInfoSections.find(
                          (s: any) => s.title === 'shortDesc',
                        )?.description || '',
                      ),
                    }}
                  />
                )}
              </CardContent>

              <CardActions>
                <Button fullWidth variant="contained">
                  In den Warenkorb
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination (MUI) */}
      {(searchParams?.cat || searchParams?.name || totalPages > 1) && (
        <Stack alignItems="center" sx={{ mt: 6 }}>
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={(_, p) => {
              const url = new URL(window.location.href);
              url.searchParams.set('page', String(p - 1));
              window.location.assign(url.toString());
            }}
          />
        </Stack>
      )}
    </Box>
  );
}
