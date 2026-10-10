"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BedDouble, Check, MapPin, Star, X } from "lucide-react";

import type { Hotel } from "@/data/hotelData";
import type { Language } from "@/context/AppContext";
import { translations } from "@/lib/translations";

const amenityMap: Record<string, string> = {
  privateButler: "Private butler",
  skyLounge: "Sky lounge",
  sunsetDeck: "Sunset deck",
  jacuzzi: "Jacuzzi",
  oceanView: "Ocean view",
  inRoomDining: "In-room dining",
  rainShower: "Rain shower",
  sunriseTea: "Sunrise tea service",
  familySuite: "Family suite",
  privatePool: "Private pool",
  gardenDining: "Garden dining",
  kidsClub: "Kids club",
  spaAccess: "Spa access",
  rooftopPool: "Rooftop pool",
  steamRoom: "Steam room",
};

export function RoomDetailModal({
  hotel,
  language,
  onClose,
  onBook,
}: {
  hotel: Hotel | null;
  language: Language;
  onClose: () => void;
  onBook: (hotel: Hotel) => void;
}) {
  if (!hotel) {
    return null;
  }

  const ui = translations[language];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-card shadow-[0_30px_120px_rgba(15,23,42,0.35)]"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/40 text-white backdrop-blur-sm"
            aria-label={ui.close}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {hotel.gallery.map((image, index) => (
                  <div key={`${hotel.id}-${index}`} className={`${index === 0 ? "sm:col-span-2" : ""}`}>
                    <img
                      src={image}
                      alt={`${hotel.title[language]} ${index + 1}`}
                      className="h-56 w-full rounded-[1.4rem] object-cover sm:h-72"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-500">{ui.suiteDetails}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-foreground">{hotel.title[language]}</h3>
                </div>
                <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm font-semibold text-amber-400">
                  {hotel.rating.toFixed(1)} ⭐
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-amber-500" />
                {hotel.location[language]}
              </div>

              <p className="text-sm leading-7 text-muted-foreground">{hotel.description[language]}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-amber-500">
                    <BedDouble className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-[0.18em]">{ui.guests}</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-foreground">{hotel.guestCapacity}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs uppercase tracking-[0.18em]">{ui.ratingLabel}</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-foreground">{hotel.rating.toFixed(1)}/5</p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{ui.facilities}</p>
                <div className="flex flex-wrap gap-2">
                  {hotel.facilities.map((facility) => (
                    <span
                      key={facility}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{ui.amenity}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {hotel.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-amber-500" />
                      {amenityMap[amenity] ?? amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{ui.from}</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">${hotel.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onBook(hotel)}
                  className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  {ui.bookNow}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
