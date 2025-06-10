import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import MotionWrapper from "../common/MotionWrapper";

export default function AppDownloadSection() {
  return (
    <MotionWrapper delay={0.2}>
      <Box sx={{ py: 6 }}>
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Jetzt herunterladen
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
            OmnixysSphere ist auch als App verfügbar
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="https://play.google.com/store/apps/details?id=de.omnixys"
              passHref
              legacyBehavior
            >
              <Image
                src="/google-play-badge.png"
                alt="Google Play Store Badge"
                width={160}
                height={50}
              />
            </Link>
            <Link
              href="https://apps.apple.com/app/id0000000000"
              passHref
              legacyBehavior
            >
              <Image
                src="/app-store-badge.svg"
                alt="Apple App Store Badge"
                width={160}
                height={50}
              />
            </Link>
          </Box>
        </Container>
      </Box>
    </MotionWrapper>
  );
}
