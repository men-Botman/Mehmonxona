"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, MessageSquareText, MoonStar, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { BookingModal, type BookingPayload } from "@/components/BookingModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HotelGrid } from "@/components/HotelGrid";
import { LoadingScreen } from "@/components/LoadingScreen";
import { RoomDetailModal } from "@/components/RoomDetailModal";
import { WaiterDrawer } from "@/components/WaiterDrawer";
import { useApp } from "@/context/AppContext";
import { hotelCatalog, menuItems, type Hotel, type MenuItem } from "@/data/hotelData";
import { translations } from "@/lib/translations";

type ToastState = {
  title: string;
  message: string;
};

export default function Home() {
  const { language, setLanguage, toggleTheme } = useApp();
  const ui = translations[language];

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(hotelCatalog[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isWaiterOpen, setIsWaiterOpen] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = (item: MenuItem) => {
    setCart((current) => ({
      ...current,
      [item.id]: (current[item.id] ?? 0) + 1,
    }));

    setToast({
      title: ui.orderPlaced,
      message: `${item.name[language]} added to your cart.`,
    });
  };

  const handleOrderSubmit = (payload: { roomNumber: string; deliveryTime: string; note: string }) => {
    const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

    if (itemCount === 0) {
      setToast({
        title: "Cart empty",
        message: "Choose at least one item before placing the order.",
      });
      return;
    }

    setCart({});
    setIsWaiterOpen(false);
    setToast({
      title: ui.orderPlaced,
      message: `${payload.roomNumber} • ${payload.deliveryTime} • ${payload.note}`,
    });
  };

  const handleBookingConfirm = (payload: BookingPayload) => {
    const nightCount = Math.max(
      1,
      Math.round(
        (new Date(payload.checkOut).getTime() - new Date(payload.checkIn).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    );
    const roomTotal = (bookingHotel?.price ?? 0) * nightCount;
    const taxTotal = Math.round(roomTotal * 0.12);
    const total = roomTotal + taxTotal + 35;

    setIsBookingOpen(false);
    setToast({
      title: ui.bookingSaved,
      message: `${payload.fullName} • ${ui.total}: $${total}`,
    });
  };

  const openBooking = (hotel: Hotel) => {
    setBookingHotel(hotel);
    setIsBookingOpen(true);
  };

  return (
    <>
      <LoadingScreen visible={isLoading} />

      <AnimatePresence>
        {!isLoading && (
          <motion.main
            key="app-shell"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative min-h-screen overflow-hidden text-foreground"
          >
            <AnimatedBackground />
            <Header onOpenWaiter={() => setIsWaiterOpen(true)} onOpenBooking={() => openBooking(hotelCatalog[0])} />

            <Hero onOpenBooking={() => openBooking(hotelCatalog[0])} />

      <HotelGrid
        hotels={hotelCatalog}
        language={language}
        onOpenDetail={(hotel) => setSelectedHotel(hotel)}
        onOpenBooking={openBooking}
      />

      <AmenitiesSection />

      <Footer />

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <a
          href="tel:+998901234567"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-lg backdrop-blur-md transition hover:scale-105"
          aria-label={ui.quickCall}
        >
          <PhoneCall className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={() => setIsWaiterOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-lg backdrop-blur-md transition hover:scale-105"
          aria-label={ui.quickOrder}
        >
          <ChefHat className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-lg backdrop-blur-md transition hover:scale-105"
          aria-label={ui.themeText}
        >
          <MoonStar className="h-4 w-4" />
        </button>

        <div className="flex rounded-full border border-border bg-card/80 p-1 shadow-lg backdrop-blur-md">
          {(["en", "ru", "uz"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLanguage(option)}
              className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase ${
                language === option ? "bg-amber-400 text-slate-950" : "text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

            <RoomDetailModal
              hotel={selectedHotel}
              language={language}
              onClose={() => setSelectedHotel(null)}
              onBook={openBooking}
            />

            <BookingModal
              hotel={bookingHotel}
              language={language}
              open={isBookingOpen}
              onClose={() => setIsBookingOpen(false)}
              onConfirm={handleBookingConfirm}
            />

            <WaiterDrawer isOpen={isWaiterOpen} onClose={() => setIsWaiterOpen(false)} />

            <AnimatePresence>
              {toast ? (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  className="fixed bottom-6 left-6 z-[60] max-w-sm rounded-[1.5rem] border border-border bg-card/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.22)] backdrop-blur-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/15 text-amber-500">
                      <MessageSquareText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{toast.title}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{toast.message}</p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
