import { Box, Typography } from '@mui/material';
import { motion, MotionValue } from 'framer-motion';

interface FooterProps {
  opacity: number | MotionValue<number>;
}

export default function Footer({ opacity }: FooterProps) {
  return (
    <motion.footer id="footer" style={{ opacity }} className="footer">
      <Box sx={{ textAlign: 'center', py: 6, opacity: 0.9 }}>
        <Typography variant="body2">
          © 2025 Omnixys – Modular Thinking. Infinite Possibilities.
        </Typography>
      </Box>
    </motion.footer>
  );
}
