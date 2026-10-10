"use client";

import { motion } from "framer-motion";

const floatVariants = [
  {
    size: "h-44 w-44 md:h-52 md:w-52",
    color: "from-amber-400/35 via-amber-300/20 to-transparent",
    top: "top-12 left-10",
    delay: 0,
  },
  {
    size: "h-60 w-60 md:h-72 md:w-72",
    color: "from-blue-500/25 via-indigo-500/15 to-transparent",
    top: "top-1/3 right-10",
    delay: 1.2,
  },
  {
    size: "h-40 w-40 md:h-52 md:w-52",
    color: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    top: "bottom-8 left-1/3",
    delay: 2.3,
  },
  {
    size: "h-32 w-32 md:h-40 md:w-40",
    color: "from-emerald-500/15 via-cyan-400/10 to-transparent",
    top: "top-1/4 left-1/2",
    delay: 0.8,
  },
] as const;

const particles = [
  { left: "8%", size: 8, bottom: "-6%", delay: 0, duration: 16 },
  { left: "18%", size: 10, bottom: "-12%", delay: 1.6, duration: 18 },
  { left: "28%", size: 6, bottom: "-10%", delay: 0.7, duration: 17 },
  { left: "38%", size: 12, bottom: "-18%", delay: 2.1, duration: 20 },
  { left: "48%", size: 9, bottom: "-15%", delay: 3.2, duration: 19 },
  { left: "58%", size: 11, bottom: "-20%", delay: 1.2, duration: 21 },
  { left: "66%", size: 7, bottom: "-8%", delay: 2.4, duration: 18 },
  { left: "74%", size: 13, bottom: "-16%", delay: 0.9, duration: 22 },
  { left: "82%", size: 8, bottom: "-12%", delay: 4.2, duration: 17 },
  { left: "92%", size: 10, bottom: "-10%", delay: 1.8, duration: 20 },
  { left: "12%", size: 6, bottom: "-20%", delay: 2.8, duration: 18 },
  { left: "52%", size: 7, bottom: "-22%", delay: 0.4, duration: 16 },
  { left: "70%", size: 9, bottom: "-18%", delay: 3.7, duration: 19 },
  { left: "86%", size: 8, bottom: "-24%", delay: 1.1, duration: 17 },
  { left: "35%", size: 10, bottom: "-12%", delay: 4.5, duration: 20 },
] as const;

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#070b1d]">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-60"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.45, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="goldWave" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,340 C180,260 260,520 440,450 S760,220 920,420 S1230,510 1440,350 L1440,900 L0,900 Z"
          fill="url(#goldWave)"
          initial={{ opacity: 0.15, x: -24 }}
          animate={{ opacity: [0.12, 0.35, 0.18], x: [0, 28, -18, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,420 C180,520 320,280 500,420 S760,620 980,500 S1260,340 1440,430 L1440,900 L0,900 Z"
          fill="url(#goldWave)"
          initial={{ opacity: 0.14, x: 20 }}
          animate={{ opacity: [0.1, 0.28, 0.14], x: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.path
          d="M0,520 C180,420 340,660 520,560 S810,380 1020,610 S1280,700 1440,560 L1440,900 L0,900 Z"
          fill="url(#goldWave)"
          initial={{ opacity: 0.08, x: 12 }}
          animate={{ opacity: [0.08, 0.22, 0.12], x: [0, 22, -12, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        />
      </motion.svg>

      {floatVariants.map((shape, index) => (
        <motion.div
          key={index}
          aria-hidden="true"
          className={`absolute ${shape.top} ${shape.size}`}
          initial={{ opacity: 0.32, scale: 0.9, y: 18 }}
          animate={{
            opacity: [0.18, 0.48, 0.22],
            scale: [0.9, 1.08, 0.97],
            y: [10, -16, 10],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <div className={`h-full w-full rounded-full bg-gradient-to-br ${shape.color} blur-3xl`} />
        </motion.div>
      ))}

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${index}`}
          aria-hidden="true"
          className="absolute rounded-full bg-white/70 shadow-[0_0_18px_rgba(251,191,36,0.8)]"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            bottom: particle.bottom,
            boxShadow: "0 0 18px rgba(251,191,36,0.7), 0 0 30px rgba(30,27,75,0.45)",
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0.1, 0.8, 0.4],
            y: [0, -260, -430],
            x: [0, 18, -20, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
