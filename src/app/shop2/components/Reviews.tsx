import {
  Avatar,
  ImageList,
  ImageListItem,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';

type FeraMedia = { id: string; url: string };
type FeraCustomer = { display_name?: string; avatar_url?: string };
type FeraReview = {
  id: string;
  rating: number;
  heading?: string;
  body?: string;
  media?: FeraMedia[];
  customer?: FeraCustomer;
};

export default async function Reviews({ productId }: { productId: string }) {
  const url = `https://api.fera.ai/v3/public/reviews?product.id=${productId}&public_key=${process.env.NEXT_PUBLIC_FERA_ID}`;

  let data: FeraReview[] = [];
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      data = json?.data ?? [];
    }
  } catch {
    // optional: Loggen
  }

  if (!data.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        Keine Bewertungen vorhanden.
      </Typography>
    );
  }

  return (
    <Stack spacing={3}>
      {data.map((review) => (
        <Stack key={review.id} spacing={1.5}>
          {/* USER */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              src={review.customer?.avatar_url || undefined}
              sx={{ width: 32, height: 32 }}
            />
            <Typography fontWeight={600}>
              {review.customer?.display_name || 'Anonymous'}
            </Typography>
          </Stack>

          {/* STARS */}
          <Rating value={Number(review.rating) || 0} precision={0.5} readOnly />

          {/* DESC */}
          {review.heading && (
            <Typography variant="subtitle1" fontWeight={600}>
              {review.heading}
            </Typography>
          )}
          {review.body && (
            <Typography variant="body2">{review.body}</Typography>
          )}

          {/* MEDIA */}
          {!!review.media?.length && (
            <ImageList cols={3} gap={8} sx={{ mt: 1 }}>
              {review.media.map((m) => (
                <ImageListItem key={m.id}>
                  <Image
                    src={m.url}
                    alt=""
                    width={300}
                    height={200}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Stack>
      ))}
    </Stack>
  );
}
