"use client";

import React from "react";
import { Box, Stack, Paper, Avatar, Typography, Skeleton } from "@mui/material";
import { Rating as ReactRating } from "@smastrom/react-rating";
import moment from "moment";

export type Review = {
  profileImage: string;
  reviewText: string;
  star: number; // 0..5
  userName: string;
  publishedAt: string | Date;
};

interface ReviewListProps {
  reviewList?: Review[] | null;
}

export default function ReviewList({ reviewList }: ReviewListProps) {
  if (!reviewList) {
    // Loading-Skeletons
    return (
      <Stack spacing={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Paper key={i} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="circular" width={50} height={50} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ width: "60%" }} />
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    );
  }

  if (reviewList.length === 0) {
    return <Typography color="text.secondary">No reviews yet.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {reviewList.map((review, idx) => (
        <Paper
          key={idx}
          variant="outlined"
          sx={{ p: 2, borderRadius: 2 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={review.profileImage}
              alt="profile"
              sx={{ width: 50, height: 50 }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                {review.reviewText}
              </Typography>

              <Box sx={{ my: 0.5 }}>
                <ReactRating style={{ maxWidth: 120 }} value={review.star} readOnly />
              </Box>

              <Typography variant="caption" color="text.secondary">
                <strong>{review.userName}</strong> ·{" "}
                {moment(review.publishedAt).format("DD-MMM-YYYY")}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
