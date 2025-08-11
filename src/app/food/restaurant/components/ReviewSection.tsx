"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Paper, Typography, Button, TextField, Snackbar, Alert, Stack } from "@mui/material";
import { Rating as ReactRating } from "@smastrom/react-rating";
import ReviewList, { Review } from "./ReviewList";

type MenuRestaurant = {
  slug: string;
  name: string;
};

interface ReviewSectionProps {
  restaurant: MenuRestaurant;
}

export default function ReviewSection({ restaurant }: ReviewSectionProps) {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewList, setReviewList] = useState<Review[] | null>(null);
  const [snack, setSnack] = useState<{ open: boolean; msg: string; sev: "success" | "error" }>({
    open: false,
    msg: "",
    sev: "success",
  });

  const lsKey = useMemo(() => (restaurant?.slug ? `reviews:${restaurant.slug}` : ""), [restaurant?.slug]);

  useEffect(() => {
    if (!lsKey) return;
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(lsKey) : null;
    if (!raw) {
      setReviewList([]);
      return;
    }
    try {
      setReviewList(JSON.parse(raw) as Review[]);
    } catch {
      setReviewList([]);
    }
  }, [lsKey]);

  const saveReviews = (reviews: Review[]) => {
    if (!lsKey) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(lsKey, JSON.stringify(reviews));
    }
    setReviewList(reviews);
  };

  const handleSubmit = () => {
    if (!restaurant?.slug) return;
    const newReview: Review = {
      profileImage: "/images/avatar-demo.jpg",
      reviewText,
      star: rating,
      userName: "Guest",
      publishedAt: new Date().toISOString(),
    };
    const next = [newReview, ...(reviewList ?? [])];
    saveReviews(next);
    setSnack({ open: true, msg: "Review added!", sev: "success" });
    setRating(0);
    setReviewText("");
  };

  const submitDisabled = rating === 0 || !reviewText?.trim();

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {/* Form */}
      <Grid item xs={12} md={4}>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Add your review
          </Typography>

          <Stack spacing={2}>
            <Box sx={{ maxWidth: 140 }}>
              <ReactRating value={rating} onChange={setRating} style={{ maxWidth: 140 }} />
            </Box>

            <TextField
              multiline
              minRows={4}
              fullWidth
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <Button variant="contained" onClick={handleSubmit} disabled={submitDisabled}>
              Submit
            </Button>
          </Stack>
        </Paper>
      </Grid>

      {/* Liste */}
      <Grid item xs={12} md={8}>
        <ReviewList reviewList={reviewList ?? []} />
      </Grid>

      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.sev} sx={{ width: "100%" }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
