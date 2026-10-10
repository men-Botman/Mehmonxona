"use client";

import { BedDouble, MapPin, Sparkles, Star, Wifi, Waves } from "lucide-react";
import { motion } from "framer-motion";

import type { Hotel } from "@/data/hotelData";
import type { Language } from "@/context/AppContext";
import { translations } from "@/lib/translations";

const amenityLabels: Record<string, string> = {
  pool: "Pool",
  billiards: "Billiards",
  spa: "Spa",
  gym: "Gym",
  dining: "Dining",
  wifi: "Wi‑Fi",
};

export function HotelCard({
  hotel,
  language,
  onOpenDetail,
  onOpenBooking,
}: {
  hotel: Hotel;
  language: Language;
  onOpenDetail: (hotel: Hotel) => void;
  onOpenBooking: (hotel: Hotel) => void;
}) {
  const ui = translations[language];
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(hotel.price);

  const tags = Array.from(new Set([...hotel.facilities, "wifi"])).map((facility) => amenityLabels[facility] ?? facility);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[2rem] border border-border bg-card/80 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm"
    >
      <div className="relative overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.title[language]}
          className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full border border-white/20 bg-slate-950/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            {hotel.badge}
          </span>
          <span className="rounded-full border border-amber-300/30 bg-amber-400/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100">
            {hotel.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 rounded-full border border-amber-300/30 bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
          {hotel.stars}★
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{hotel.title[language]}</h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-amber-500" />
              {hotel.location[language]}
            </div>
          </div>
          <div className="rounded-xl bg-amber-400/10 px-2 py-1 text-sm font-semibold text-amber-500">
            {hotel.rating.toFixed(1)}
          </div>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">{hotel.description[language]}</p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1.5">
            <BedDouble className="h-4 w-4 text-amber-500" /> {hotel.guestCapacity} {ui.guests}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {hotel.rating.toFixed(1)} rating
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:text-amber-300"
            >
              {tag === "Pool" && <Waves className="h-3.5 w-3.5" />}
              {tag === "Billiards" && <Sparkles className="h-3.5 w-3.5" />}
              {tag === "Spa" && <Star className="h-3.5 w-3.5" />}
              {tag === "Wi‑Fi" && <Wifi className="h-3.5 w-3.5" />}
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-2xl font-semibold text-foreground">{price}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.perNight}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onOpenDetail(hotel)}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-amber-400"
            >
              {ui.viewDetails}
            </button>
            <button
              type="button"
              onClick={() => onOpenBooking(hotel)}
              className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              {ui.bookNow}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
