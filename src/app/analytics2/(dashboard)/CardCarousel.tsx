"use client";
/**
 * @file CardCarousel.tsx
 * @description Diese Komponente stellt ein Karussell dar, das mehrere Informationskarten zyklisch anzeigt.
 * Es verwendet Material-UI-Komponenten und bietet Navigationstasten mit sanften Animationen für einen modernen Look.
 */

import { FC, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export type CardCarouselProps = {
  /** Basis-Titel für das Karussell */
  title: string;
  /** Array von Elementen, die im Karussell angezeigt werden */
  items: { label: string; formatted?: string; status?: string }[];
  /** Typ des Karussells, bestimmt das angezeigte Icon (für zukünftige Erweiterungen) */
  type: "invoices" | "customers" | "pending" | "collected";
};

const CardCarousel: FC<CardCarouselProps> = ({ title, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Wechselt zum vorherigen Element.
   */
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  /**
   * Wechselt zum nächsten Element.
   */
  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const activeItem = items[activeIndex];

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "secondary.main",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {title}
            {activeItem.status ? ` - ${activeItem.status}` : ""}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          {activeItem.formatted || activeItem.label}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <IconButton
            onClick={handlePrev}
            color="primary"
            sx={{
              "&:hover": { backgroundColor: "#4E3792" },
              borderRadius: "50%",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            color="primary"
            sx={{
              "&:hover": { backgroundColor: "#4E3792" },
              borderRadius: "50%",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardCarousel;
