"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Clock3,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useApp } from "@/context/AppContext";
import { foodCategories, menuItems, type MenuItem } from "@/data/hotelData";
import { translations } from "@/lib/translations";

const formatMoney = (amount: number) => {
  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

  const uzs = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount * 12000);

  return `${uzs} UZS / ${usd}`;
};

export function WaiterDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { language } = useApp();
  const ui = translations[language];

  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [roomNumber, setRoomNumber] = useState("Xona 304");
  const [specialNote, setSpecialNote] = useState("Muz va limon qo'shib keling");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const flatMenu = useMemo(
    () => Object.values(menuItems).flatMap((items) => items),
    [language],
  );

  const cartItems = useMemo(
    () =>
      flatMenu
        .filter((item) => cart[item.id])
        .map((item) => ({ ...item, quantity: cart[item.id] })),
    [cart, flatMenu],
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const addToCart = (item: MenuItem) => {
    setCart((current) => ({
      ...current,
      [item.id]: (current[item.id] ?? 0) + 1,
    }));

    setToast(`${item.name[language]} ${ui.addToCart.toLowerCase()}`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((current) => {
      const nextQty = (current[id] ?? 0) + delta;
      if (nextQty <= 0) {
        const { [id]: _removed, ...rest } = current;
        return rest;
      }
      return { ...current, [id]: nextQty };
    });
  };

  const submitOrder = () => {
    if (cartItems.length === 0) {
      setToast(language === "uz" ? "Savat bo'sh. Avval mahsulot tanlang." : language === "ru" ? "Корзина пуста. Сначала выберите товар." : "Cart is empty. Please add an item first.");
      return;
    }

    setToast(
      language === "uz"
        ? `Buyurtma qabul qilindi • ${roomNumber}`
        : language === "ru"
          ? `Заказ принят • ${roomNumber}`
          : `Order placed • ${roomNumber}`,
    );
    setCart({});
    setSpecialNote(language === "uz" ? "Muz va limon qo'shib keling" : language === "ru" ? "Принести со льдом и лимоном" : "Bring with ice and lemon");
    setRoomNumber(language === "uz" ? "Xona 304" : language === "ru" ? "Комната 304" : "Room 304");
    onClose();
  };

  const currentCategoryItems = menuItems[activeCategory] ?? [];

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="ml-auto flex h-full w-full max-w-xl flex-col border-l border-border bg-background/90 p-4 shadow-2xl shadow-slate-950/30 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber-500">{ui.waiterTitle}</p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">{ui.waiterTitle}</h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground"
                aria-label={ui.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-5 text-sm leading-6 text-muted-foreground">{ui.waiterSubtitle}</p>

            <div className="mb-5 flex flex-wrap gap-2">
              {foodCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  {category.label[language]}
                </button>
              ))}
            </div>

            <div className="grid flex-1 gap-4 overflow-y-auto pr-1 pb-1">
              {currentCategoryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-[1.5rem] border border-border bg-card/80 p-3 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-semibold text-foreground">{item.name[language]}</h4>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description[language]}</p>
                      </div>
                      <span className="text-sm font-semibold text-amber-500">${item.price}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5 text-amber-500" />
                        12 min
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1.5 text-[11px] font-medium text-amber-500"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        {ui.addToCart}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-border bg-card/80 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShoppingBag className="h-4 w-4 text-amber-500" />
                {ui.cart}
              </div>

              <div className="space-y-3">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {language === "uz"
                      ? "Savat bo'sh"
                      : language === "ru"
                        ? "Корзина пуста"
                        : "Cart is empty"}
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/80 p-2.5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{item.name[language]}</p>
                        <p className="text-xs text-muted-foreground">{formatMoney(item.price)}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <label className="block space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{ui.roomNumber}</span>
                  <input
                    value={roomNumber}
                    onChange={(event) => setRoomNumber(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-0"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{ui.note}</span>
                  <textarea
                    value={specialNote}
                    onChange={(event) => setSpecialNote(event.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-0"
                  />
                </label>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{ui.total}</p>
                  <p className="text-2xl font-semibold text-foreground">{formatMoney(subtotal)}</p>
                </div>

                <button
                  type="button"
                  onClick={submitOrder}
                  className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30"
                >
                  {ui.submitOrder}
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="fixed bottom-6 left-6 z-[60] max-w-xs rounded-[1.4rem] border border-border bg-card/85 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.22)] backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/15 text-amber-500">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-foreground">{toast}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </AnimatePresence>
  );
}
