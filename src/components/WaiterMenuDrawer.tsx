"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, ShoppingCart, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { Language } from "@/context/AppContext";
import { foodCategories, type MenuItem } from "@/data/hotelData";
import { translations } from "@/lib/translations";

export function WaiterMenuDrawer({
  open,
  language,
  cart,
  onClose,
  onAddToCart,
  onSubmit,
  menuItems,
}: {
  open: boolean;
  language: Language;
  cart: Record<string, number>;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  onSubmit: (payload: { roomNumber: string; deliveryTime: string; note: string }) => void;
  menuItems: Record<string, MenuItem[]>;
}) {
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [roomNumber, setRoomNumber] = useState("304");
  const [deliveryTime, setDeliveryTime] = useState("10:00 PM");
  const [note, setNote] = useState("Extra napkins and no onion");

  const ui = translations[language];

  const flatItems = useMemo(
    () => Object.values(menuItems).flatMap((items) => items),
    [menuItems],
  );

  const cartItems = useMemo(
    () =>
      flatItems
        .filter((item) => cart[item.id])
        .map((item) => ({ ...item, quantity: cart[item.id] })),
    [cart, flatItems],
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSubmit = () => {
    onSubmit({ roomNumber, deliveryTime, note });
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm"
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28 }}
            className="ml-auto flex h-full w-full max-w-xl flex-col border-l border-border bg-background/90 p-5 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-500">{ui.waiterTitle}</p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">{ui.waiterTitle}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-4 text-sm leading-6 text-muted-foreground">{ui.waiterSubtitle}</p>

            <div className="mb-5 flex flex-wrap gap-2">
              {foodCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  {category.label[language]}
                </button>
              ))}
            </div>

            <div className="grid flex-1 gap-4 overflow-y-auto pr-1">
              {menuItems[activeCategory]?.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-[1.5rem] border border-border bg-card/80 p-3">
                  <img src={item.image} alt={item.name[language]} className="h-24 w-24 rounded-2xl object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-semibold text-foreground">{item.name[language]}</h4>
                        <span className="text-sm font-semibold text-amber-500">${item.price}</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description[language]}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-500"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {ui.addToCart}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-border bg-card/80 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShoppingCart className="h-4 w-4 text-amber-500" />
                {ui.cart}
              </div>

              <div className="space-y-3">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
                      <span>
                        {item.name[language]} × {item.quantity}
                      </span>
                      <span>${item.quantity * item.price}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">{ui.cart} is empty</p>
                )}
              </div>

              <div className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.roomNumber}</span>
                    <input
                      value={roomNumber}
                      onChange={(event) => setRoomNumber(event.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground focus:outline-none"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.deliveryTime}</span>
                    <input
                      value={deliveryTime}
                      onChange={(event) => setDeliveryTime(event.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground focus:outline-none"
                    />
                  </label>
                </div>

                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.note}</span>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    className="min-h-20 w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground focus:outline-none"
                  />
                </label>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{ui.total}</p>
                  <p className="text-2xl font-semibold text-foreground">${subtotal}</p>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  {ui.submitOrder}
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
