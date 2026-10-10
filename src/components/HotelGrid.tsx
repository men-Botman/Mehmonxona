"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { HotelCard } from "@/components/HotelCard";
import type { Language } from "@/context/AppContext";
import type { Hotel, RoomCategory } from "@/data/hotelData";
import { translations } from "@/lib/translations";

const categoryOptions = [
  { value: "all", label: "Barchasi" },
  { value: "Luks", label: "Luks" },
  { value: "Presidential", label: "Presidential" },
  { value: "Basseynli Villa", label: "Basseynli Villa" },
  { value: "Bilyardli VIP Suite", label: "Bilyardli VIP Suite" },
] as const;

export function HotelGrid({
  hotels,
  language,
  onOpenDetail,
  onOpenBooking,
}: {
  hotels: Hotel[];
  language: Language;
  onOpenDetail: (hotel: Hotel) => void;
  onOpenBooking: (hotel: Hotel) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categoryOptions)[number]["value"]>("all");
  const ui = translations[language];

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesSearch =
        hotel.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = hotel.price <= maxPrice;
      const matchesCategory = selectedCategory === "all" || hotel.category === (selectedCategory as RoomCategory);
      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [hotels, language, maxPrice, searchTerm, selectedCategory]);

  return (
    <motion.section
      id="suites"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500">{ui.bestselling}</p>
          <h2 className="mt-2 text-3xl font-semibold text-foreground md:text-4xl">{ui.navRooms}</h2>
        </div>

        <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-3 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={ui.searchPlaceholder}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-8 grid gap-6 rounded-[2rem] border border-border bg-card/60 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-amber-500" />
            {ui.filtersTitle}
          </div>
          <input
            type="range"
            min={250}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>$250</span>
            <span>{ui.priceLabel}: ${maxPrice}</span>
            <span>$1000</span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Kategoriyalar</p>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedCategory(option.value)}
                className={`rounded-full px-3 py-2 text-sm font-medium ${
                  selectedCategory === option.value
                    ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950"
                    : "border border-border bg-background text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              language={language}
              onOpenDetail={onOpenDetail}
              onOpenBooking={onOpenBooking}
            />
          ))
        ) : (
          <div className="col-span-full rounded-[2rem] border border-dashed border-border bg-card/60 p-10 text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/15 text-amber-500">
              <Star className="h-5 w-5" />
            </div>
            <p className="text-xl font-semibold text-foreground">Hech bir xona mos kelmadi.</p>
            <p className="mt-2 text-muted-foreground">Boshqa narx yoki kategoriya tanlang.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
