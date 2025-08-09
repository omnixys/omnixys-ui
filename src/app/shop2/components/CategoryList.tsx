// Pfad: src/components/CategoryList.tsx

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { sampleCategories } from '../data/categories';

// Server Component ist okay, da wir keine Hooks verwenden
const CategoryList = async () => {
  // Datenquelle: lokale Beispieldaten
  const cats = sampleCategories;

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
      {/* Horizontal scrollbarer Bereich */}
      <Box
        sx={{
          overflowX: 'auto',
          pb: 2,
          // Scrollbar ausblenden (optional)
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 4 }}
          sx={{ minWidth: '100%', py: 1 }}
        >
          {cats.map((item) => (
            <Card
              key={item._id}
              sx={{
                flex: '0 0 auto',
                width: { xs: '80%', sm: '48%', lg: '24%', xl: '16.666%' }, // ähnlich: w-full / sm:1/2 / lg:1/4 / xl:1/6
                borderRadius: 2,
              }}
              elevation={1}
            >
              <CardActionArea
                component={Link}
                href={`/shop2/list?cat=${item.slug}`}
                sx={{ display: 'block' }}
              >
                {/* Bildbereich mit fester Höhe (≈ h-96) */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 384,
                    bgcolor: 'grey.100',
                  }}
                >
                  <Image
                    src={item.imageUrl || '/shop.png'}
                    alt={item.name}
                    fill
                    sizes="(max-width: 600px) 80vw, (max-width: 900px) 48vw, (max-width: 1200px) 24vw, 16vw"
                    style={{ objectFit: 'cover' }}
                    priority={false}
                  />
                </Box>

                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ mt: 1, fontWeight: 300, letterSpacing: 0.5 }}
                  >
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default CategoryList;
