// components/landing/ModuleCarousel.jsx
"use client";

import { Box } from "@mui/material";
import { motion, MotionValue } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import { JSX, useEffect, useRef } from "react";
import "keen-slider/keen-slider.min.css";

// interface Module {
//   name: string | undefined;
//   year: string | undefined;
//   icon: JSX.Element | undefined;
//   description: string | undefined;
//   image: string | undefined;
//   video?: string | undefined;
// }

interface ModuleCarouselProps {
  // modules: Module[];
  modules: (string | JSX.Element)[];
  yModules?: MotionValue<number>;
}


export default function ModuleCarousel({ modules, yModules }: ModuleCarouselProps) {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: { perView: 3, spacing: 16 },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1.2, spacing: 12 },
      },
    },
    created(s) {
      s.moveToIdx(2, true, { duration: 0 });
    },
    // autoplay: true,
  });

  useEffect(() => {
    if (!slider.current) return;
    const interval = setInterval(() => {
      slider.current?.next();
    }, 2500);
    return () => clearInterval(interval);
  }, [slider]);

  const moduleRef = useRef(null);

  return (
    <motion.div style={{ y: yModules }} ref={moduleRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <Box
          ref={sliderRef}
          className="keen-slider"
          sx={{ mt: 6, overflow: "hidden", px: 1 }}
        >
          {modules.map((label, i) => (
            <Box
              key={i}
              className="keen-slider__slide"
              sx={{
                width: "100%",
                height: 120,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: 18,
                backdropFilter: "blur(6px)",
                boxShadow: 3,
                color: "text.primary",
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
      </motion.div>
    </motion.div>
  );
}
