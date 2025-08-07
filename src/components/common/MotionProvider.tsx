// components/common/MotionProvider.tsx
'use client';

import { AnimatePresence } from 'framer-motion';
import { createContext, ReactNode, useContext, useState } from 'react';

type MotionContextType = {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
};

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export const useMotion = (): MotionContextType => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within MotionProvider');
  }
  return context;
};

export function MotionProvider({ children }: { children: ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const toggleAnimations = () => setAnimationsEnabled((prev) => !prev);

  return (
    <MotionContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      <AnimatePresence mode="wait" initial={false}>
        {children}
      </AnimatePresence>
    </MotionContext.Provider>
  );
}
