// Pfad: app/seller/products/page.tsx
'use client';

import Image from 'next/image';
import * as React from 'react';
import { assets, productsDummyData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Footer from '../../components/seller/Footer';
import { useAppContext } from '../../context/AppContext';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

type Product = {
  _id: string;
  name: string;
  category: string;
  image: string[];
  offerPrice: number;
};

export default function ProductList(): JSX.Element {
  const { router, currency } = useAppContext();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchSellerProduct = React.useCallback(async () => {
    setProducts(productsDummyData as Product[]);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    void fetchSellerProduct();
  }, [fetchSellerProduct]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
          <Typography variant="h6" fontWeight={600} pb={1.5}>
            All Product
          </Typography>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: 1, borderColor: 'divider', maxWidth: 1024 }}
          >
            <Table size="small" aria-label="seller products">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ width: { xs: '66%', md: '40%' }, fontWeight: 600 }}
                  >
                    Product
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      display: { xs: 'none', sm: 'table-cell' },
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      display: { xs: 'none', sm: 'table-cell' },
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{ borderTop: 1, borderColor: 'divider' }}
                  >
                    {/* Product (image + name) */}
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                        minWidth={0}
                      >
                        <Box
                          sx={{
                            bgcolor: 'action.hover',
                            borderRadius: 1,
                            p: 1,
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={product.image[0]}
                            alt="product image"
                            width={64}
                            height={64}
                            style={{ width: 64, height: 'auto' }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          noWrap
                          title={product.name}
                          sx={{ flex: 1 }}
                        >
                          {product.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Category (hidden on xs) */}
                    <TableCell
                      sx={{ display: { xs: 'none', sm: 'table-cell' } }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {product.category}
                      </Typography>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      <Typography variant="body2">
                        {currency}
                        {product.offerPrice}
                      </Typography>
                    </TableCell>

                    {/* Action (hidden on xs) */}
                    <TableCell
                      sx={{ display: { xs: 'none', sm: 'table-cell' } }}
                    >
                      <Button
                        onClick={() =>
                          router.push(`/shop/product/${product._id}`)
                        }
                        variant="contained"
                        size="small"
                        sx={{ gap: 1 }}
                        endIcon={
                          <Image
                            src={assets.redirect_icon}
                            alt="visit"
                            width={14}
                            height={14}
                          />
                        }
                      >
                        Visit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}

      <Footer />
    </Box>
  );
}
