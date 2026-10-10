"use client";

import { ArrowRight, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

import { useApp } from "@/context/AppContext";
import { translations } from "@/lib/translations";

export function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { language } = useApp();
  const ui = translations[language];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.2),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.2),transparent_20%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col justify-center"
        >
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            {ui.luxuryService}
          </div>

          <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {ui.heroTitle}
          </h2>

          <p className="mt-5 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
            {ui.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/40 transition hover:brightness-110"
            >
              {ui.reserveNow}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card/80 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-amber-400"
            >
              {ui.exploreSuites}
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: ui.privateChef, value: "24/7" },
              { label: ui.airportPickup, value: "Gold" },
              { label: "Guest rating", value: "4.9/5" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {item.value}
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-10"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-card/60 p-3 shadow-[0_30px_80px_rgba(17,24,39,0.45)] backdrop-blur-sm">
            <div className="overflow-hidden rounded-[1.5rem]">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury hotel suite"
                className="h-[560px] w-full object-cover"
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400">
                  <MapPin className="h-3.5 w-3.5" />
                  Dubai
                </div>
                <p className="mt-3 text-xl font-semibold text-foreground">Skyline suites</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  24/7
                </div>
                <p className="mt-3 text-xl font-semibold text-foreground">Concierge care</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
