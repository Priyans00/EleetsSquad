"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface Props {
  className?: string;
}

const BackgroundAnimation: React.FC<Props> = ({ className = "" }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [bubbles, setBubbles] = useState<
    { id: number; size: number; left: number; top: number }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setBubbles(generated);
  }, []);

  if (!mounted) return null;

  const bubbleColor = theme === "light" ? "rgba(0,0,0,0.3)" : "white";

  return (
    <div className={`${className} pointer-events-none`}>
      <div className="absolute inset-0">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              backgroundColor: bubbleColor,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 150],
              y: [0, (Math.random() - 0.5) * 150],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, Math.random() * 1.5 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
