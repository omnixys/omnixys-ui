// components/common/ProgressBarContext.tsx
"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";

type ProgressBarContextType = {
  start: () => void;
  finish: () => void;
};

const ProgressBarContext = createContext<ProgressBarContextType | undefined>(
  undefined
);

export const useProgressBar = () => {
  const ctx = useContext(ProgressBarContext);
  if (!ctx)
    throw new Error("useProgressBar must be used within ProgressBarProvider");
  return ctx;
};

export function ProgressBarProvider({ children }: { children: ReactNode }) {
  const controls = useAnimationControls();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  const start = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setVisible(true);
    controls.set({ width: "0%" });
    controls.start({ width: "70%", transition: { duration: 0.4 } });
    timeoutRef.current = setTimeout(() => {
      controls.start({ width: "90%", transition: { duration: 2.0 } });
    }, 500);
  };

  const finish = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    controls
      .start({ width: "100%", transition: { duration: 0.3 } })
      .then(() => {
        setTimeout(() => {
          setVisible(false);
          controls.set({ width: "0%" });
        }, 300);
      });
  };

  return (
    <ProgressBarContext.Provider value={{ start, finish }}>
      {visible && (
        <motion.div
          animate={controls}
          initial={{ width: "0%" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: 4,
            zIndex: 2000,
            background: "linear-gradient(to right, #6A4BBC, #4E3792)",
          }}
        />
      )}
      {children}
    </ProgressBarContext.Provider>
  );
}
