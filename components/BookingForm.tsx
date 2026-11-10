"use client";

import { useMemo, useState, type FormEvent } from "react";
import site from "@/data/site.json";
import { CheckIcon, PhoneIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { fill } from "@/lib/i18n";
import { formatDay, formatTime } from "@/lib/format";
import { useMounted } from "@/lib/useMounted";
import { bookableDays, isEmail, isPhone, SERVICES, servicesOn, timesOn, type Service } from "@/lib/reservation";

type Errors = Partial<Record<"date" | "service" | "time" | "name" | "phone" | "email", string>>;

/**
 * Demande de réservation : date (jours ouverts seulement), service (déjeuner ou dîner selon le jour), heure, nombre de personnes,
 * nom, téléphone, e-mail, message. Envoi via /api/reservation (Resend) : notification au restaurant, confirmation au client.
 * Sans Resend configuré, le client est invité à appeler pour confirmer : aucune demande ne se perd en silence.
 */
export function BookingForm({ initialService }: { initialService?: Service }) {
  const { lang, d } = useLocale();
  const b = d.book;
  const { groupFrom, maxGuests } = site.reservation;
  const mounted = useMounted();
  const now = useMemo(() => (mounted ? new Date() : null), [mounted]);

  const days = useMemo(() => (now ? bookableDays(now) : []), [now]);
  const [date, setDate] = useState("");
  const [rawService, setService] = useState<Service | "">(initialService ?? "");
  const [rawTime, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<null | { notified: boolean; confirmed: boolean; when: string; name: string }>(null);

  // Services possibles ce jour-là ; s'il n'y en a qu'un, il est choisi d'office
  const available = useMemo(() => (date && now ? servicesOn(date, now) : []), [date, now]);
  const service: Service | "" = available.length === 1 ? available[0] : available.includes(rawService as Service) ? rawService : "";
  const times = useMemo(() => (date && service && now ? timesOn(date, service, now) : []), [date, service, now]);
  const time = times.includes(rawTime) ? rawTime : "";

  async function submit(e: FormEvent) {
    e.preventDefault();
    const err: Errors = {};
    if (!date) err.date = b.errors.date;
    else if (!service) err.service = b.errors.service;
    if (date && service && !time) err.time = b.errors.time;
    if (!name.trim()) err.name = b.errors.name;
    if (!isPhone(phone)) err.phone = b.errors.phone;
    if (!isEmail(email)) err.email = b.errors.email;
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`bk-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lang, booking: { date, service, time, guests, name, phone, email, message } }),
      });
      const json = (await res.json()) as { ok: boolean; notified?: boolean; confirmed?: boolean };
      if (!res.ok || !json.ok) throw new Error("server");
      setDone({ notified: !!json.notified, confirmed: !!json.confirmed, name: name.trim(), when: `${formatDay(date, lang)}, ${formatTime(time, lang)}` });
      setState("idle");
    } catch {
      setState("error");
    }
  }

  if (done)
    return (
      <div className="fade-in border border-line bg-paper p-6 md:p-10" role="status" aria-live="polite">
        <span className="flex size-11 items-center justify-center rounded-full bg-vert text-cream">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="display mt-5 text-[1.75rem]">{b.done.title}</h3>
        <p className="lead mt-3">{fill(b.done.text, { name: done.name, when: done.when })}</p>
        <p className="mt-3 text-muted">{done.notified ? (done.confirmed ? b.done.mail : "") : b.done.notSent}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {!done.notified && (
            <a href={`tel:${site.phoneIntl}`} className="btn">
              <PhoneIcon />
              {d.nav.call} · {site.phone}
            </a>
          )}
          <button type="button" className="btn-line" onClick={() => setDone(null)}>
            {b.done.again}
          </button>
        </div>
      </div>
    );

  const fieldErr = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`bk-${k}-err`} className="mt-1.5 text-[0.875rem] text-bordeaux">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `bk-${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="border border-line bg-paper p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-date" className="label">
            {b.date}
          </label>
          <select id="bk-date" className="field" value={date} onChange={(e) => setDate(e.target.value)} {...aria("date")}>
            <option value="">{b.chooseDate}</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {formatDay(day, lang)}
              </option>
            ))}
          </select>
          {fieldErr("date")}
        </div>
        <fieldset>
          <legend className="label">{b.service}</legend>
          <div className="flex gap-2" id="bk-service" tabIndex={-1}>
            {SERVICES.map((s) => (
              <label key={s} className="seg">
                <input type="radio" name="service" className="sr-only" checked={service === s} disabled={!!date && !available.includes(s)} onChange={() => setService(s)} />
                {b.services[s]}
              </label>
            ))}
          </div>
          {fieldErr("service")}
        </fieldset>
        <div>
          <label htmlFor="bk-time" className="label">
            {b.time}
          </label>
          <select id="bk-time" className="field tabular-nums" value={time} onChange={(e) => setTime(e.target.value)} disabled={!service} {...aria("time")}>
            <option value="">{b.chooseTime}</option>
            {times.map((t) => (
              <option key={t} value={t}>
                {formatTime(t, lang)}
              </option>
            ))}
          </select>
          {date && service && !times.length && <p className="mt-1.5 text-[0.875rem] text-muted">{b.noTimes}</p>}
          {fieldErr("time")}
        </div>
        <div>
          <label htmlFor="bk-guests" className="label">
            {b.guests}
          </label>
          <select id="bk-guests" className="field tabular-nums" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          {guests >= groupFrom && <p className="mt-1.5 text-[0.875rem] text-muted">{fill(b.groupHint, { n: groupFrom })}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bk-name" className="label">
            {b.name}
          </label>
          <input id="bk-name" className="field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} {...aria("name")} />
          {fieldErr("name")}
        </div>
        <div>
          <label htmlFor="bk-phone" className="label">
            {b.phone}
          </label>
          <input id="bk-phone" className="field" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} {...aria("phone")} />
          {fieldErr("phone")}
        </div>
        <div>
          <label htmlFor="bk-email" className="label">
            {b.email}
          </label>
          <input id="bk-email" className="field" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} {...aria("email")} />
          {fieldErr("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bk-message" className="label">
            {b.message}
          </label>
          <textarea id="bk-message" className="field min-h-24" rows={3} placeholder={b.messagePh} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? b.sending : b.submit}
        </button>
        <span className="text-[0.9375rem] text-muted">
          {b.callInstead}{" "}
          <a href={`tel:${site.phoneIntl}`} className="link-line text-ink tabular-nums">
            {site.phone}
          </a>
        </span>
      </div>
      {state === "error" && (
        <p className="mt-4 text-bordeaux" role="alert">
          {b.errors.server}
        </p>
      )}
      <p className="mt-5 text-[0.8125rem] text-muted">{b.privacy}</p>
    </form>
  );
}
