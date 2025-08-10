"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedBackground({ className, children }: AnimatedBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Floating orbs - only visible in light theme */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl dark:hidden"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl dark:hidden"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl dark:hidden"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern overlay - only visible in light theme */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] dark:hidden" />
      
      {/* Floating particles - only visible in light theme */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full dark:hidden"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Hero section specific background
export function HeroBackground({ className, children }: AnimatedBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Main gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Animated waves - only visible in light theme */}
      <motion.div
        className="absolute inset-0 opacity-10 dark:hidden"
        style={{
          background: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1200'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%234F46E5'/%3E%3C/svg%3E')",
          backgroundSize: "cover",
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating geometric shapes - only visible in light theme */}
      <motion.div
        className="absolute top-32 left-16 w-32 h-32 border border-blue-200/30 rounded-lg rotate-12 dark:hidden"
        animate={{
          rotate: [12, 372, 12],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-48 right-24 w-24 h-24 border border-purple-200/30 rounded-full dark:hidden"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
