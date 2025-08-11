"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const TestPage = () => {
  const [active, setActive] = useState<"variant1" | "variant2">("variant1");

  const variants = {
    variant1: {
      x: 400,
      y: 300,
      opacity: 0.5,
      transition: {
        duration: 3,
      },
    },
    variant2: {
      x: 100,
      y: -300,
      rotation: 90,
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6">
      <motion.div
        className="w-96 h-96 bg-red-400 rounded"
        variants={variants}
        animate={active}
      />
      <button
        onClick={() =>
          setActive(active === "variant1" ? "variant2" : "variant1")
        }
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Toggle Animation
      </button>
    </div>
  );
};

export default TestPage;
