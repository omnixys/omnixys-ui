"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Mock-Daten
const mockPopularTags = {
  event: {
    title: "Nadal v Federer Grand Slam",
    time: "Last Night",
    image: "/images/general/event.png",
  },
  topics: [
    { category: "Technology • Trending", name: "OpenAI", posts: "20K posts" },
    { category: "Science • Trending", name: "SpaceX", posts: "15K posts" },
    { category: "Sports • Trending", name: "Euro 2024", posts: "50K posts" },
    { category: "Finance • Trending", name: "Bitcoin", posts: "120K posts" },
  ],
};

const PopularTags: React.FC = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="text.primary">
        What's Happening
      </Typography>

      {/* TREND EVENT */}
      <Stack direction="row" spacing={2}>
        <CardMedia
          component="img"
          image={mockPopularTags.event.image}
          alt={mockPopularTags.event.title}
          sx={{ width: 80, height: 80, borderRadius: 2 }}
        />
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
            {mockPopularTags.event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mockPopularTags.event.time}
          </Typography>
        </Box>
      </Stack>

      <Divider />

      {/* TOPICS */}
      {mockPopularTags.topics.map((topic, idx) => (
        <Box key={idx}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="caption" color="text.secondary">
              {topic.category}
            </Typography>
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
            {topic.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {topic.posts}
          </Typography>
          {idx < mockPopularTags.topics.length - 1 && <Divider sx={{ my: 1 }} />}
        </Box>
      ))}

      {/* Show More Link */}
      <Link href="/" style={{ color: "#1DA1F2", textDecoration: "none" }}>
        <Typography variant="body2" fontWeight="bold">
          Show More
        </Typography>
      </Link>
    </Card>
  );
};

export default PopularTags;
