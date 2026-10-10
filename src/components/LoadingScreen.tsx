"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Hotel } from "lucide-react";

export function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0a0e1a]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.20),transparent_40%),radial-gradient(circle_at_bottom,_rgba(30,27,75,0.60),transparent_55%)]" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/30 bg-white/5 shadow-[0_0_30px_rgba(245,158,11,0.25)] backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/40 bg-gradient-to-br from-amber-400/25 to-amber-500/10">
                <Hotel className="h-7 w-7 text-amber-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.45em] text-amber-300/80">
                Grand Luxury
              </div>
              <div className="text-2xl font-semibold tracking-[0.14em] text-white">Loading...</div>
            </motion.div>

            <div className="mt-7 w-64 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "0%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1/2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 shadow-[0_0_20px_rgba(245,158,11,0.7)]"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
