// components/common/PageTransitionOverlay.tsx
'use client';

import { Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProgressBar } from './PageProgressBar';

export default function PageTransitionOverlay() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const { start, finish } = useProgressBar();

  useEffect(() => {
    setIsTransitioning(true);
    start();
    if (playSound) {
      const audio = new Audio('/transition-sound.mp3'); // platziere unter /public
      audio.volume = 0.4;
      audio.play().catch(() => {}); // Fehler ignorieren (Autoplay-Schutz)
    }

    const timeout = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timeout);
    finish(); // ✅ Ladebalken beenden
    // ohne playSound, finish und start
  }, [finish, pathname, playSound, start]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key="page-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            zIndex: 1600,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <Button onClick={() => setPlaySound((prev) => !prev)}>
            {playSound ? '🔊 Sound Aus' : '🔈 Sound An'}
          </Button>

          <motion.img
            src="/omnixys-symbol.png"
            alt="Omnixys Logo"
            initial={{
              scale: 0.7,
              filter: 'grayscale(100%) brightness(0.7)',
              rotate: -90,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              rotate: 0,
              filter: 'grayscale(0%) brightness(1)',
              opacity: 1,
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
              rotate: 45,
              filter: 'grayscale(100%)',
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ width: 80, height: 80 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
