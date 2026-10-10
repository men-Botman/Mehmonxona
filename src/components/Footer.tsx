"use client";

import { Camera, Mail, MapPin, Phone } from "lucide-react";

import { useApp } from "@/context/AppContext";
import { translations } from "@/lib/translations";

export function Footer() {
  const { language } = useApp();
  const ui = translations[language];

  return (
    <footer className="border-t border-border bg-card/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500">Grand</p>
          <h3 className="mt-3 text-2xl font-semibold text-foreground">{ui.appName}</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">{ui.footerNote}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-foreground">{ui.contactUs}</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" /> Dubai Marina, UAE
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-500" /> +998 90 123 45 67
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-500" /> concierge@grandluxury.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-foreground">{ui.ourStory}</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>{ui.hotelDetails}</li>
            <li>{ui.premiumSupport}</li>
            <li className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-amber-500" /> @grandluxurycollection
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
