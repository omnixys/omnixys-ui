'use client';

import { trackVideoEvent } from '@/utils/trackVideo';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Box, Dialog, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

export default function AppVideoPreview() {
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reportedMilestones = useRef<Set<number>>(new Set());

  const handleOpen = () => {
    trackVideoEvent('video_play', 'Omnixys Vorschau');
    setVideoOpen(true);
  };

  const handleClose = () => {
    if (videoRef.current) {
      const played = Math.floor(
        (videoRef.current.currentTime / videoRef.current.duration) * 100,
      );
      if (played < 95) {
        trackVideoEvent('video_aborted', 'Omnixys Vorschau', played);
      }
      videoRef.current.pause();
    }
    setVideoOpen(false);
  };

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      const percent = Math.floor((video.currentTime / video.duration) * 100);
      [25, 50, 75].forEach((milestone) => {
        if (
          percent >= milestone &&
          !reportedMilestones.current.has(milestone)
        ) {
          trackVideoEvent(
            `video_${milestone}_percent`,
            'Omnixys Vorschau',
            milestone,
          );
          reportedMilestones.current.add(milestone);
        }
      });
    },
    [],
  );

  return (
    <>
      {/* Vorschau-Thumbnail */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: 800,
            mx: 'auto',
            mt: 10,
            borderRadius: 3,
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: 6,
            backgroundColor: 'rgba(255,255,255,0.125)',
          }}
          onClick={handleOpen}
        >
          <Image
            src="/preview/omnixys-logo.png"
            alt="Omnixys Vorschau"
            width={120}
            height={600}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
            }}
          >
            <EmojiObjectsIcon sx={{ fontSize: 64, color: '#fff' }} />
          </Box>
        </Box>
        <Typography
          variant="caption"
          sx={{
            textAlign: 'center',
            display: 'block',
            mt: 2,
            opacity: 0.8,
          }}
        >
          Kurzer Einblick in die OmnixysSphere-App – modulare Innovation live
          erleben.
        </Typography>
      </motion.div>

      {/* Lightbox-Dialog */}
      <Dialog
        open={videoOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box sx={{ position: 'relative', pt: '56.25%', width: '100%' }}>
          <video
            ref={videoRef}
            src="/preview/omnixys-preview.mp4"
            controls
            autoPlay
            onEnded={() =>
              trackVideoEvent('video_complete', 'Omnixys Vorschau', 100)
            }
            onTimeUpdate={handleTimeUpdate}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: 4,
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}
