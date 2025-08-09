import { Container } from '@mui/material';
import ProductList from '../components/ProductList';

type SearchParams = { [key: string]: string | string[] | undefined };

export default function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const category =
    typeof searchParams?.category === 'string' ? searchParams.category : '';

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <ProductList category={category} params="products" />
    </Container>
  );
}
