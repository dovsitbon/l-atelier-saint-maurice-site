import pdj from "@/data/plat-du-jour.json";
import type { Locale } from "@/lib/locales";
import { addDays, isOpenDay, weekday } from "@/lib/hours";

type Dish = { fr: string; en: string };
const semaine = pdj.semaine as Record<string, Dish>;
const dates = pdj.dates as Record<string, Dish>;

/** Plat du jour d'une date : date précise, sinon le plat habituel de ce jour de la semaine. */
export const dishOn = (iso: string): Dish | null => (isOpenDay(iso) ? (dates[iso] ?? semaine[String(weekday(iso))] ?? null) : null);

/** Aujourd'hui, ou le prochain jour d'ouverture qui a un plat du jour. */
export function nextDish(today: string): { day: string; dish: Dish } | null {
  for (let i = 0; i < 14; i++) {
    const day = addDays(today, i);
    const dish = dishOn(day);
    if (dish) return { day, dish };
  }
  return null;
}

export const dishName = (dish: Dish, lang: Locale) => dish[lang];
export const dishPrice = pdj.prix as number | null;

/** La semaine du plat du jour (mardi → vendredi), pour l'ardoise. */
export const weekDishes = () => [2, 3, 4, 5].map((n) => ({ n, dish: semaine[String(n)] ?? null }));
