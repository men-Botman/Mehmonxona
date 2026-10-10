"use client";

import { motion } from "framer-motion";
import { Dumbbell, Martini, Sparkles, Waves } from "lucide-react";
import { useState } from "react";

import { useApp } from "@/context/AppContext";
import { translations } from "@/lib/translations";

const amenityTabs = [
  {
    id: "pool",
    label: "🏊 Basseynlar",
    headline: "Infinity Pool & Yopiq issiq basseyn",
    summary: "Keng ko‘lamli hovuz zonasi va dam oluvchi aqua-lounge.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
    ],
    icon: Waves,
  },
  {
    id: "billiards",
    label: "🎱 Bilyard & VIP Lounge",
    headline: "Premium billiards & late-night lounge",
    summary: "VIP bilyard stollari, relax zonalari va musiqa bilan kechki dam olish.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb866b0?auto=format&fit=crop&w=900&q=80",
    ],
    icon: Martini,
  },
  {
    id: "spa",
    label: "🧘 Spa & Sauna",
    headline: "Spa, sauna & restorative rituals",
    summary: "Sauna, hidromassaj va terapiya marosimlari bilan to‘liq dam olish.",
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
    ],
    icon: Sparkles,
  },
  {
    id: "dining",
    label: "🍽️ Restoran",
    headline: "Chef-led dining & signature dishes",
    summary: "Mavsumiy menyu, samimiy atmosferada kundalik va kechki ovqatlanish.",
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
    ],
    icon: Dumbbell,
  },
] as const;

export function AmenitiesSection() {
  const { language } = useApp();
  const ui = translations[language];
  const [activeTab, setActiveTab] = useState<(typeof amenityTabs)[number]["id"]>("pool");

  const activeArea = amenityTabs.find((tab) => tab.id === activeTab) ?? amenityTabs[0];
  const ActiveIcon = activeArea.icon;

  return (
    <section id="amenities" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-500">{ui.amenitiesTitle}</p>
        <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">{ui.amenitiesSubtitle}</h2>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {amenityTabs.map((tab) => {
          const Icon = tab.icon;
          const selected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                selected
                  ? "border-amber-400 bg-amber-400 text-slate-950"
                  : "border-border bg-card/70 text-foreground hover:border-amber-400/80"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeArea.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[2rem] border border-border bg-card/80 p-6 shadow-[0_25px_50px_rgba(15,23,42,0.08)]"
      >
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">
              <ActiveIcon className="h-3.5 w-3.5" />
              {activeArea.label}
            </div>
            <h3 className="text-2xl font-semibold text-foreground">{activeArea.headline}</h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">{activeArea.summary}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {activeArea.images.map((image, index) => (
            <motion.div
              key={`${activeArea.id}-${index}`}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="group overflow-hidden rounded-[1.5rem] border border-border bg-background"
            >
              <img
                src={image}
                alt={activeArea.headline}
                className="h-52 w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
