"use client";

import { useRef } from "react";
import Image from "next/image";
import { Box, Chip, Container, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { motion, useInView, useScroll } from "framer-motion";
import Brain from "../components/brain";
import { SKILLS, EXPERIENCE } from "../data/about.mock";
import { useTheme } from "@mui/material/styles";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef<HTMLDivElement | null>(null);
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef<HTMLDivElement | null>(null);
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <MotionBox
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      sx={{ height: "100%" }}
    >
      {/* CONTAINER */}
      <Box
        ref={containerRef}
        sx={{
          height: "100%",
          overflow: "auto",
          display: { xs: "block", lg: "flex" },
        }}
      >
        {/* TEXT COLUMN */}
        <Container
          maxWidth={false}
          sx={{
            py: { xs: 4, sm: 8, md: 12, lg: 20 },
            px: { xs: 2, sm: 4, md: 6, lg: 10, xl: 16 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 6, md: 10, lg: 14, xl: 20 },
            width: { lg: "66.6667%", xl: "50%" },
            pr: { lg: 0, xl: 0 },
          }}
        >
          {/* BIOGRAPHY */}
          <Stack spacing={3} justifyContent="center">
            <Image
              src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Portrait"
              width={112}
              height={112}
              style={{ width: 112, height: 112, borderRadius: "9999px", objectFit: "cover" }}
            />

            <Typography variant="h5" fontWeight={800}>
              BIOGRAPHY
            </Typography>

            <Typography variant="body1" sx={{ fontSize: { md: "1.125rem" } }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum quibusdam
              cupiditate nobis accusamus sed aut aperiam, reiciendis numquam! Voluptas voluptatibus
              obcaecati dolore itaque suscipit! Vel doloremque numquam quam nihil.
            </Typography>

            <Typography variant="subtitle1" fontStyle="italic">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>

            {/* SIGNATURE SVG */}
            <Box sx={{ alignSelf: "flex-end" }}>
              <svg width="185" height="77" viewBox="0 0 370 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M66 2C66 29.4851 68.6687 64.5118 49.3333 87.4444C42.4997 95.5495 35.7683 97.6796 26.2222 101C20.002 103.164 8.87322 103.873 4 99C-0.260934 94.7391 2.94804 88.1756 8.22222 86.2222C13.7053 84.1915 17.942 84 23.7778 84C33.359 84 41.3193 83.5602 50.2222 87C56.6125 89.469 63.5773 91.9131 69.5555 95.5C75.4778 99.0533 87.1838 104.357 93.5 99.4444C96.1292 97.3995 96.2752 92.5118 96.9444 89.5C97.9646 84.9092 92.6432 83.2024 89 83C84.472 82.7484 82.3397 81.8856 82 88C81.8025 91.5554 83.5627 94.4193 86 97C88.9648 100.139 92.0717 100.96 96 98.7778C99.3106 96.9386 98 90.7299 98 87.5C98 85.0327 98.4365 83.1348 99.2222 80.7778C100.357 77.3743 99.2311 78.4486 101.5 77.9444C105.352 77.0886 108 76.4766 108 81.5C108 85.6646 109 89.3473 109 93.5C109 100.142 108.863 95.0454 110.5 91.4444C112.765 86.4616 116.631 81.205 121.5 78.5C127.057 75.4129 126 82.1509 126 85.5C126 92.5532 124.42 102 134 102C142.932 102 153 102.569 153 91.2222C153 87.1735 153.772 81.3206 148 81C141.934 80.663 142.107 81.8068 139.5 86.5C134.378 95.7204 137.972 105 149.5 105C153.589 105 153.996 99.8977 155.5 96.8889C157.902 92.0843 161 85.4067 161 80C161 74.0547 158.407 82.7413 157.222 84.2222C155.194 86.7574 155 92.5718 155 95.7778C155 99.9302 153.8 104.999 158 107.222C161.954 109.316 164.884 106.382 167.778 103.778C171.15 100.743 175.896 99.1107 180 97C186.143 93.8409 191.659 91.4099 198.222 89.2222C206.505 86.4614 214.839 87 223.5 87C230.613 87 231.628 104 222.5 104C216.954 104 199.251 107.814 207 95.2222C211.456 87.9805 214.484 80.6007 220 73.7778C229.781 61.6805 242.696 50.8197 256.222 43C264.769 38.0591 274.192 34.6264 283 30.2222C286.55 28.4473 280.07 32.3343 278.5 33.5556..."
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </Box>

            {/* Scroll Hint */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              width={50}
              height={50}
            >
              <path d="M5 15c0 1.857.738 3.637 2.05 4.95A6.99 6.99 0 0 0 12 22a6.99 6.99 0 0 0 4.95-2.05A6.99 6.99 0 0 0 19 15V9a7 7 0 0 0-14 0v6Z" stroke="#000" />
              <path d="M12 6v8M15 11l-3 3-3-3" stroke="#000" />
            </motion.svg>
          </Stack>

          {/* SKILLS */}
          <Stack spacing={3} justifyContent="center" ref={skillRef}>
            <MotionTypography
              variant="h5"
              fontWeight={800}
              initial={{ x: -300 }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              SKILLS
            </MotionTypography>

            <MotionBox
              initial={{ x: -300 }}
              animate={isSkillRefInView ? { x: 0 } : {}}
            >
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {SKILLS.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    variant="filled"
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      "&:hover": { bgcolor: "common.white", color: "common.black" },
                    }}
                  />
                ))}
              </Box>
            </MotionBox>

            {/* Scroll Hint */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              width={50}
              height={50}
            >
              <path d="M5 15c0 1.857.738 3.637 2.05 4.95A6.99 6.99 0 0 0 12 22a6.99 6.99 0 0 0 4.95-2.05A6.99 6.99 0 0 0 19 15V9a7 7 0 0 0-14 0v6Z" stroke="#000" />
              <path d="M12 6v8M15 11l-3 3-3-3" stroke="#000" />
            </motion.svg>
          </Stack>

          {/* EXPERIENCE */}
          <Stack spacing={3} ref={experienceRef} pb={8}>
            <MotionTypography
              variant="h5"
              fontWeight={800}
              initial={{ x: -300 }}
              animate={isExperienceRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              EXPERIENCE
            </MotionTypography>

            <MotionBox
              initial={{ x: -300 }}
              animate={isExperienceRefInView ? { x: 0 } : {}}
            >
              <Stack spacing={6}>
                {EXPERIENCE.map((item, idx) => {
                  const leftSide = idx % 2 === 0;
                  return (
                    <Grid
                      key={`${item.company}-${idx}`}
                      container
                      alignItems="stretch"
                      sx={{ minHeight: 192 }} // ~ h-48
                    >
                      {/* LEFT */}
                      <Grid item xs={12} lg={4} order={{ xs: 2, lg: leftSide ? 1 : 3 }}>
                        <Stack spacing={1.5}>
                          {leftSide && (
                            <>
                              <Box sx={{ bgcolor: "common.white", p: 1.5, fontWeight: 600, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                {item.title}
                              </Box>
                              <Typography variant="body2" fontStyle="italic" sx={{ px: 1.5 }}>
                                {item.description}
                              </Typography>
                              <Typography variant="body2" sx={{ px: 1.5, color: "error.main", fontWeight: 600 }}>
                                {item.period}
                              </Typography>
                              <Box sx={{ px: 1.5 }}>
                                <Box sx={{ display: "inline-block", px: 1, py: 0.5, bgcolor: "common.white", borderRadius: 1, fontSize: 14, fontWeight: 600 }}>
                                  {item.company}
                                </Box>
                              </Box>
                            </>
                          )}
                        </Stack>
                      </Grid>

                      {/* CENTER TIMELINE */}
                      <Grid item xs={12} lg={4} order={{ xs: 1, lg: 2 }} sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ width: 4, bgcolor: "grey.600", borderRadius: 2, position: "relative" }}>
                          <Box
                            sx={{
                              position: "absolute",
                              left: -8,
                              top: 0,
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              bgcolor: "common.white",
                              boxShadow: `0 0 0 4px ${theme.palette.error.light}`,
                            }}
                          />
                        </Box>
                      </Grid>

                      {/* RIGHT */}
                      <Grid item xs={12} lg={4} order={{ xs: 3, lg: leftSide ? 3 : 1 }}>
                        <Stack spacing={1.5}>
                          {!leftSide && (
                            <>
                              <Box sx={{ bgcolor: "common.white", p: 1.5, fontWeight: 600, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                {item.title}
                              </Box>
                              <Typography variant="body2" fontStyle="italic" sx={{ px: 1.5 }}>
                                {item.description}
                              </Typography>
                              <Typography variant="body2" sx={{ px: 1.5, color: "error.main", fontWeight: 600 }}>
                                {item.period}
                              </Typography>
                              <Box sx={{ px: 1.5 }}>
                                <Box sx={{ display: "inline-block", px: 1, py: 0.5, bgcolor: "common.white", borderRadius: 1, fontSize: 14, fontWeight: 600 }}>
                                  {item.company}
                                </Box>
                              </Box>
                            </>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  );
                })}
              </Stack>
            </MotionBox>
          </Stack>
        </Container>

        {/* SVG / BRAIN COLUMN */}
        <Box
           sx={{
             display: { xs: "none", lg: "block" },
             width: { lg: "33.3333%", xl: "50%" },
             maxHeight:'6000px',
             position: "sticky",
             top: 0,
             zIndex: 30,
             height: "100vh",
           }}
        >
          {/* Brain bekommt scrollYProgress des linken Containers */}
          <Brain scrollYProgress={scrollYProgress} />
        </Box>
      </Box>
    </MotionBox>
  );
}
