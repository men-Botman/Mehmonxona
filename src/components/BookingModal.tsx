"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Phone,
  ReceiptText,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { Hotel } from "@/data/hotelData";
import type { Language } from "@/context/AppContext";
import { translations } from "@/lib/translations";

export type BookingPayload = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  fullName: string;
  passport: string;
  phone: string;
  email: string;
  specialRequests: string;
};

const stepTitles = {
  en: ["Booking details", "Guest information", "Summary & confirm"],
  ru: ["Детали бронирования", "Личные данные", "Итог и подтверждение"],
  uz: ["Bron ma’lumotlari", "Mehmon ma’lumotlari", "Umumiy hisob va tasdiq"],
} as const;

export function BookingModal({
  hotel,
  language,
  open,
  onClose,
  onConfirm,
}: {
  hotel: Hotel | null;
  language: Language;
  open: boolean;
  onClose: () => void;
  onConfirm: (payload: BookingPayload) => void;
}) {
  const [form, setForm] = useState<BookingPayload>({
    checkIn: "2026-10-18",
    checkOut: "2026-10-22",
    adults: 2,
    children: 1,
    fullName: "Amina Karimova",
    passport: "AB1234567",
    phone: "+998901234567",
    email: "amina@luxurystay.com",
    specialRequests: "Late checkout and flower decoration",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const ui = translations[language];
  const titles = stepTitles[language];

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const start = new Date(form.checkIn);
    const end = new Date(form.checkOut);
    const difference = end.getTime() - start.getTime();
    return Math.max(1, Math.round(difference / (1000 * 60 * 60 * 24)));
  }, [form.checkIn, form.checkOut]);

  const subtotal = (hotel?.price ?? 0) * nights;
  const taxes = Math.round(subtotal * 0.12);
  const concierge = 35;
  const total = subtotal + taxes + concierge;

  const handleInput = (field: keyof BookingPayload, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleConfirm = () => {
    onConfirm(form);
    setConfirmationOpen(true);
  };

  const downloadReceipt = () => {
    const report = [
      "Grand Luxury Hotel & Concierge",
      `Guest: ${form.fullName}`,
      `Room: ${hotel?.title[language] ?? "Suite"}`,
      `Dates: ${form.checkIn} - ${form.checkOut}`,
      `Nights: ${nights}`,
      `Total: $${total}`,
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "grand-luxury-receipt.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!hotel) {
    return null;
  }

  const directCallText = language === "uz" ? "Qo'ng'iroq qilib bron qilish" : language === "ru" ? "Позвонить и забронировать" : "Call to book";
  const confirmText = language === "uz" ? "Tasdiqlash" : language === "ru" ? "Подтвердить" : "Confirm";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-card shadow-[0_35px_120px_rgba(15,23,42,0.4)]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {!confirmationOpen ? (
              <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-5 p-6 sm:p-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-amber-500">{ui.bookReservation}</p>
                    <h3 className="mt-2 text-3xl font-semibold text-foreground">{hotel.title[language]}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 pb-2">
                    {titles.map((title, index) => (
                      <div
                        key={title}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] ${
                          index === currentStep
                            ? "bg-amber-400 text-slate-950"
                            : "border border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {index + 1}. {title}
                      </div>
                    ))}
                  </div>

                  {currentStep === 0 && (
                    <div className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.checkIn}</span>
                          <input
                            type="date"
                            value={form.checkIn}
                            onChange={(event) => handleInput("checkIn", event.target.value)}
                            className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-foreground focus:outline-none"
                          />
                        </label>
                        <label className="space-y-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.checkOut}</span>
                          <input
                            type="date"
                            value={form.checkOut}
                            onChange={(event) => handleInput("checkOut", event.target.value)}
                            className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-foreground focus:outline-none"
                          />
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.adults}</span>
                          <input
                            type="number"
                            min={1}
                            value={form.adults}
                            onChange={(event) => handleInput("adults", Number(event.target.value))}
                            className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-foreground focus:outline-none"
                          />
                        </label>
                        <label className="space-y-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.children}</span>
                          <input
                            type="number"
                            min={0}
                            value={form.children}
                            onChange={(event) => handleInput("children", Number(event.target.value))}
                            className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-foreground focus:outline-none"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <label className="block space-y-2">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {language === "uz" ? "Ism va familiya" : ui.fullName}
                        </span>
                        <input
                          value={form.fullName}
                          onChange={(event) => handleInput("fullName", event.target.value)}
                          className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-foreground focus:outline-none"
                        />
                      </label>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block space-y-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {language === "uz" ? "Telefon raqam" : ui.phone}
                          </span>
                          <input
                            value={form.phone}
                            onChange={(event) => handleInput("phone", event.target.value)}
                            className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-foreground focus:outline-none"
                          />
                        </label>
                        <label className="block space-y-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {language === "uz" ? "Pasport / ID raqami" : ui.passport}
                          </span>
                          <input
                            value={form.passport}
                            onChange={(event) => handleInput("passport", event.target.value)}
                            className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-foreground focus:outline-none"
                          />
                        </label>
                      </div>

                      <label className="block space-y-2">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.email}</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(event) => handleInput("email", event.target.value)}
                          className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-foreground focus:outline-none"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {language === "uz" ? "Maxsus so‘rov" : ui.specialRequests}
                        </span>
                        <textarea
                          value={form.specialRequests}
                          onChange={(event) => handleInput("specialRequests", event.target.value)}
                          className="min-h-24 w-full rounded-2xl border border-border bg-background px-3 py-3 text-foreground focus:outline-none"
                        />
                      </label>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-5">
                      <div className="rounded-[1.5rem] border border-border bg-background p-4">
                        <div className="mb-4 flex items-center gap-3 text-amber-500">
                          <UserRound className="h-5 w-5" />
                          <span className="text-sm font-medium uppercase tracking-[0.2em]">{ui.reservationSummary}</span>
                        </div>

                        <div className="space-y-3 text-sm text-muted-foreground">
                          <div className="flex items-center justify-between">
                            <span>{ui.fullName}</span>
                            <span className="font-medium text-foreground">{form.fullName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{ui.phone}</span>
                            <span className="font-medium text-foreground">{form.phone}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{ui.checkIn}</span>
                            <span className="font-medium text-foreground">{form.checkIn}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{ui.checkOut}</span>
                            <span className="font-medium text-foreground">{form.checkOut}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{ui.guests}</span>
                            <span className="font-medium text-foreground">{form.adults + form.children}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href="tel:+998901234567"
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm font-medium text-foreground"
                        >
                          <Phone className="h-4 w-4 text-amber-500" />
                          {directCallText}
                        </a>
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-400">
                          <ShieldCheck className="h-4 w-4" />
                          {ui.availability}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {language === "uz" ? "Orqaga" : ui.close}
                    </button>

                    {currentStep < 2 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-2.5 text-sm font-semibold text-slate-950"
                      >
                        {language === "uz" ? "Keyingi" : "Next"}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleConfirm}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-2.5 text-sm font-semibold text-slate-950"
                      >
                        {confirmText}
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white sm:p-8">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400">
                    <CalendarDays className="h-4 w-4" />
                    {ui.reservationSummary}
                  </div>

                  <div className="mt-6 space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{hotel.title[language]}</span>
                      <span>${hotel.price} x {nights}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{ui.nights}</span>
                      <span>{nights}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{ui.taxes}</span>
                      <span>${taxes}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{ui.conciergeFee}</span>
                      <span>${concierge}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4 text-lg font-semibold text-white">
                      <span>{ui.total}</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    <p className="font-medium text-white">{language === "uz" ? "Bron qilish shartlari" : ui.supportText}</p>
                    <p className="mt-2 leading-6 text-slate-300">
                      {language === "uz"
                        ? "Hammasi vaqti-vaqtida yangilanadi, 24/7 qo‘llab-quvvatlash va xususiy ehtiyojlar uchun maxsus xizmat mavjud."
                        : ui.supportText}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center sm:p-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-500">
                  <ReceiptText className="h-8 w-8" />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.25em] text-amber-500">{ui.bookingComplete}</p>
                <h3 className="mt-3 text-3xl font-semibold text-foreground">{ui.bookingSaved}</h3>
                <p className="mt-3 text-muted-foreground">{ui.savedMessage}</p>

                <div className="mx-auto mt-8 max-w-md rounded-[1.5rem] border border-border bg-background p-5 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{ui.customer}</span>
                    <span className="font-medium text-foreground">{form.fullName}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{ui.room}</span>
                    <span className="font-medium text-foreground">{hotel.title[language]}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{ui.total}</span>
                    <span className="font-medium text-foreground">${total}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={downloadReceipt}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950"
                  >
                    <Download className="h-4 w-4" />
                    {ui.downloadReceipt}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground"
                  >
                    {ui.close}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
