"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const Hero: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [startExit, setStartExit] = useState(false);
  const { theme } = useTheme();

  const portfolioLetters = "INTRODUCTION".split("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Start exit animation after 1.5 seconds
    const exitTimer = setTimeout(() => {
      setStartExit(true);
    }, 1500);

    // Hide loading screen after exit animation completes
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // exit animation -> 1.5s
    
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

    useEffect(() => {
    if (startExit) {
        // Show hero content 1s after letters start flying out
        const heroTimer = setTimeout(() => {
        setShowHero(true);
        }, 1000);
        return () => clearTimeout(heroTimer);
        }
    }, [startExit]);

  // Letter animation variants
  const letterVariants = {
    initial: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotate: 0
    },
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      }
    },
    exit: (index: number) => {
        
        // Note: These are hardcoded positions and rotations for each letter
        const directions = [
          { x: 0, y: 0, rotate: 0 },           // I (center)
          { x: 200, y: 0, rotate: 90 },        // N
          { x: 200, y: 200, rotate: 180 },     // T
          { x: 0, y: 200, rotate: 270 },       // R
          { x: -200, y: 200, rotate: 360 },    // O
          { x: -200, y: 0, rotate: 450 },      // D
          { x: -200, y: -200, rotate: 540 },   // U
          { x: 0, y: -200, rotate: 630 },      // C
          { x: 200, y: -200, rotate: 720 },    // T
          { x: 400, y: -200, rotate: 810 },    // I
          { x: 400, y: 0, rotate: 900 },       // O
          { x: 400, y: 200, rotate: 990 }      // N
        ];
      
      const direction = directions[index];
      return {
        x: direction.x,
        y: direction.y,
        rotate: direction.rotate,
        scale: 0.2,
        opacity: 0,
        transition: {
          duration: 2,
          delay: index * 0.1,
          ease: "easeOut" as const
        }
      };
    }
  };

  // Loading container variants
  const loadingContainerVariants = {
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 1.5,
        when: "afterChildren"
      }
    }
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-black overflow-hidden z-[100] flex items-center justify-center">
        <div className="text-2xl text-black dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-[100]"
            variants={loadingContainerVariants}
            initial="show"
            animate="show"
            exit="exit"
          >
            <motion.div 
              className="flex space-x-1 md:space-x-2"
              variants={loadingContainerVariants}
              initial="show"
              animate={startExit ? "exit" : "show"}
            >
              {portfolioLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-6xl md:text-8xl font-bold text-black dark:text-white tracking-wider select-none"
                  variants={letterVariants}
                  initial="initial"
                  animate={startExit ? "exit" : "enter"}
                  custom={index}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Content */}
      <AnimatePresence>
        {showHero && (
          <div className="relative z-20 flex items-center justify-center min-h-screen pt-16">
            <div className="text-center max-w-7xl mx-auto px-4">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black dark:text-white mb-6 leading-tight select-none">
                  Welcome to {" "}
                  <span className="relative text-black dark:text-white">
                    EleetSquad
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-black dark:bg-white" />
                  </span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                Your one and only {" "}
                <span className="text-black dark:text-white font-medium relative">
                  codeBuddy
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black dark:bg-white" />
                </span>
                 u need
              </p>

              {/* Floating Particles (blobs) */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 4 + 2,
                      height: Math.random() * 4 + 2,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: theme === "dark" ? "white" : "black",
                    }}
                    animate={{
                      x: [0, (Math.random() - 0.5) * 150],
                      y: [0, (Math.random() - 0.5) * 150],
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, Math.random() * 1.5 + 0.8, 1],
                      }}
                    transition={{
                      duration: Math.random() * 5 + 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: Math.random() * 2,
                      ease: "easeInOut" as const,
                    }}
                  />
                ))}
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2, delay: 1 }}
              >
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(0,0,0,0.2)",
                  }}
                />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;