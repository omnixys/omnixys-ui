"use client";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Category } from "../mocks/categories";
import { getCategories } from "../mocks/categories";

const cardMinWidth = 112;

export default function CategoryList() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const params = useSearchParams();

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const selectedCategory = params.get("category") ?? "all";

  useEffect(() => {
    // Mock-API Call
    getCategories().then((cats) => setCategoryList(cats));
  }, []);

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ mt: 3, position: "relative" }}>
      <Box
        ref={listRef}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollBehavior: "smooth",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {categoryList.map((category) => {
          const isSelected = selectedCategory === category.slug;
          return (
            <Paper
              key={category.slug}
              component={Link}
              href={`?category=${category.slug}`}
              elevation={isSelected ? 3 : 1}
              sx={{
                minWidth: cardMinWidth,
                px: 2,
                py: 1.5,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                border: 1,
                borderColor: isSelected ? "primary.main" : "divider",
                bgcolor: isSelected ? "action.selected" : "background.paper",
                transition: "transform 200ms ease, background 200ms ease, border-color 200ms ease",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "action.hover",
                  transform: "scale(1.02)",
                },
              }}
            >
              {/* Icon / Bild */}
              <Box sx={{ width: 40, height: 40, position: "relative", mb: 1 }}>
                <Image
                  src={category.icon.url}
                  alt={category.name}
                  fill
                  sizes="40px"
                  style={{ objectFit: "contain" }}
                />
              </Box>

              <Typography
                variant="body2"
                fontWeight={600}
                color={isSelected ? "primary.main" : "text.primary"}
                align="center"
              >
                {category.name}
              </Typography>
            </Paper>
          );
        })}
      </Box>

      <IconButton
        onClick={scrollRight}
        aria-label="weiter scrollen"
        sx={{
          position: "absolute",
          right: -36,
          top: 36,
          bgcolor: "grey.600",
          color: "common.white",
          "&:hover": { bgcolor: "grey.700" },
          width: 40,
          height: 40,
        }}
      >
        <ArrowForwardRoundedIcon />
      </IconButton>
    </Box>
  );
}
