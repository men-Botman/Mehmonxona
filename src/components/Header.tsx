"use client";

import { Menu, Moon, Phone, SunMedium, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

import { useApp, type Language } from "@/context/AppContext";
import { translations } from "@/lib/translations";

const languageOptions: Array<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
  { value: "uz", label: "UZ" },
];

export function Header({
  onOpenWaiter,
  onOpenBooking,
}: {
  onOpenWaiter: () => void;
  onOpenBooking: () => void;
}) {
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const ui = translations[language];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/30">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500">Grand</p>
            <h1 className="text-lg font-semibold text-foreground">{ui.appName}</h1>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#top" className="transition hover:text-foreground">{ui.navHome}</a>
          <a href="#suites" className="transition hover:text-foreground">{ui.navRooms}</a>
          <a href="#amenities" className="transition hover:text-foreground">{ui.navAmenities}</a>
          <button type="button" onClick={onOpenWaiter} className="transition hover:text-foreground">
            {ui.navConcierge}
          </button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card/70 p-1 md:flex">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setLanguage(option.value)}
                className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition ${
                  language === option.value
                    ? "bg-amber-400 text-slate-950"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 text-foreground transition hover:border-amber-400"
            aria-label={ui.themeText}
          >
            {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onOpenBooking}
            className="hidden rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 md:inline-flex"
          >
            {ui.reserveNow}
          </motion.button>

          <button
            type="button"
            onClick={onOpenWaiter}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 text-sm text-foreground md:hidden"
          >
            <Phone className="h-4 w-4" />
          </button>

          <button type="button" className="inline-flex md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
