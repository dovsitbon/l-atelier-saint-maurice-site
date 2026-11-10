import site from "@/data/site.json";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay, formatTime, isoDay } from "@/lib/format";
import { addDays, parisTime, slotsOn } from "@/lib/hours";

export const SERVICES = ["lunch", "dinner"] as const;
export type Service = (typeof SERVICES)[number];

export type Booking = {
  date: string;
  service: Service;
  time: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
  message: string;
};

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/**
 * Heures d'arrivée d'un service un jour donné : toutes les 15 min dans la fenêtre du service (data/site.json),
 * seulement si le restaurant est ouvert à cette heure-là (data/horaires.json). Le jour même : rien avant maintenant + 1 h.
 */
export function timesOn(iso: string, service: Service, now?: Date): string[] {
  const { services, stepMinutes: step } = site.reservation;
  const [from, to] = services[service];
  const floor = now && iso === isoDay(now) ? toMin(parisTime(now)) + 60 : -1;
  const slots = slotsOn(iso);
  const out: string[] = [];
  for (let t = toMin(from); t <= toMin(to); t += step) {
    if (t < floor) continue;
    if (slots.some(([a, b]) => t >= toMin(a) && t < toMin(b))) out.push(toHhmm(t));
  }
  return out;
}

export const servicesOn = (iso: string, now?: Date) => SERVICES.filter((s) => timesOn(iso, s, now).length > 0);

/** Prochains jours où il reste au moins un service réservable. */
export function bookableDays(now: Date, count = 45) {
  const out: string[] = [];
  let day = isoDay(now);
  for (let i = 0; i < 120 && out.length < count; i++, day = addDays(day, 1)) if (servicesOn(day, now).length) out.push(day);
  return out;
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Nettoie une demande reçue côté serveur : null si elle est incomplète ou hors des services. */
export function parseBooking(v: unknown): Booking | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const guests = Math.round(Number(o.guests));
  const service = (SERVICES as readonly string[]).includes(o.service as string) ? (o.service as Service) : null;
  if (!service) return null;
  const b: Booking = {
    date: ISO.test(str(o.date, 10)) ? str(o.date, 10) : "",
    service,
    time: str(o.time, 5),
    guests: Number.isFinite(guests) ? Math.min(Math.max(guests, 1), site.reservation.maxGuests) : 0,
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
    message: str(o.message, 1500),
  };
  if (!b.date || !b.guests || !b.name || !isPhone(b.phone) || !isEmail(b.email)) return null;
  if (!timesOn(b.date, b.service).includes(b.time)) return null;
  return b;
}

/** Lignes du récapitulatif (e-mails) : [libellé, valeur]. */
export function bookingRows(b: Booking, lang: Locale, d: Dict, withContact = true): [string, string][] {
  const m = d.book.mail;
  const rows: [string, string][] = [
    [m.date, formatDay(b.date, lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" })],
    [m.service, d.book.services[b.service]],
    [m.time, formatTime(b.time, lang)],
    [m.guests, String(b.guests)],
  ];
  if (withContact) rows.push([m.name, b.name], [m.phone, b.phone], [m.email, b.email]);
  if (b.message) rows.push([m.message, b.message]);
  return rows;
}

export const isGroup = (b: Pick<Booking, "guests">) => b.guests >= site.reservation.groupFrom;

/** Lien WhatsApp (vide tant que le restaurant n'a pas donné de portable : data/site.json → whatsapp). */
export const waLink = (text: string) => (site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "");
