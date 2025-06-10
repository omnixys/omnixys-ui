// components/common/NavigationProgress.tsx
"use client";

import { useEffect } from "react";
import { useProgressBar } from "./PageProgressBar";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const { start, finish } = useProgressBar();
  const pathname = usePathname();

  useEffect(() => {
    start();
    const timer = setTimeout(() => {
      finish();
    }, 500); // evtl. dynamisch anpassbar

    return () => clearTimeout(timer);
    // ohne finish und start
  }, [finish, pathname, start]);

  return null;
}
