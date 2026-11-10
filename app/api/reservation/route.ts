import { Resend } from "resend";
import site from "@/data/site.json";
import { bookingRows, isGroup, parseBooking } from "@/lib/reservation";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";

// Demande de réservation. Le restaurant n'a qu'une ligne fixe : la demande part par e-mail (Resend).
//  1. notification au restaurant (en français, avec la langue du client) ; « Répondre » écrit directement au client ;
//  2. confirmation de réception au client, dans sa langue.
// Variables Vercel : RESEND_API_KEY, BOOKING_NOTIFY_EMAIL (adresse du restaurant), RESEND_FROM (domaine vérifié dans Resend,
// ex. « L'atelier <reservation@mondomaine.fr> » ; sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte).
// Sans ces variables, la route répond { notified: false } et le site invite le client à appeler pour confirmer.

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const para = (s: string) => esc(s).replace(/\n/g, "<br>");

/** E-mail HTML sobre, aux couleurs du site (crème, bordeaux, filet laiton), lisible dans tous les clients mail. */
function mail({ title, intro = [], rows, outro = [] }: { title: string; intro?: string[]; rows: [string, string][]; outro?: string[] }) {
  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 16px 10px 0;border-bottom:1px solid #E4D9C4;color:#574C42;font-size:13px;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #E4D9C4;color:#1E1B18;font-size:15px">${para(v)}</td></tr>`,
    )
    .join("");
  const ps = (list: string[]) => list.map((p) => `<p style="margin:0 0 16px">${para(p)}</p>`).join("");
  return `<div style="background:#F5EFE3;padding:32px 16px"><div style="max-width:560px;margin:0 auto;background:#FBF8F1;border:1px solid #DACDB6;padding:32px 28px;font-family:Georgia,'Times New Roman',serif;color:#1E1B18;font-size:15px;line-height:1.65">
<p style="margin:0;text-align:center;letter-spacing:4px;font-size:20px;color:#1E1B18">L’ATELIER</p>
<p style="margin:4px 0 0;text-align:center;letter-spacing:2px;font-size:10px;color:#574C42;font-family:Arial,sans-serif">CUISINE FRANÇAISE · AMIENS</p>
<div style="margin:20px auto 24px;width:80px;border-top:1px solid #B08D57;border-bottom:1px solid #B08D57;height:3px"></div>
<h1 style="margin:0 0 20px;font-weight:normal;font-size:22px;color:#6E1F27">${esc(title)}</h1>
${ps(intro)}<table style="width:100%;border-collapse:collapse;margin:0 0 20px">${table}</table>${ps(outro)}
<p style="margin:24px 0 0;font-size:12px;color:#574C42;font-family:Arial,sans-serif">${esc(site.address.street)}, ${site.address.postalCode} ${esc(site.address.city)} · ${site.phone}</p>
</div></div>`;
}

const plain = (lines: string[], rows: [string, string][], outro: string[] = []) => [...lines, "", ...rows.map(([k, v]) => `${k} : ${v}`), "", ...outro].join("\n");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const b = parseBooking(body.booking);
  if (!b) return Response.json({ ok: false }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  if (!key || !to) return Response.json({ ok: true, notified: false, confirmed: false });

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM ?? "L'atelier <onboarding@resend.dev>";
  const fr = getDict("fr");
  const d = getDict(lang);

  // 1. Au restaurant
  const rows = bookingRows(b, "fr", fr);
  if (lang !== "fr") rows.push([fr.book.mail.lang, lang.toUpperCase()]);
  const group = isGroup(b) ? `[${fr.book.mail.group}] ` : "";
  const subject = `${group}${fr.book.mail.subject} · ${fr.book.services[b.service]} ${b.date} ${b.time} · ${b.guests} pers. · ${b.name}`;
  let notified = false;
  let confirmed = false;
  try {
    const r = await resend.emails.send({
      from,
      to,
      replyTo: b.email,
      subject,
      html: mail({ title: fr.book.mail.title, rows, outro: [fr.book.mail.replyHint] }),
      text: plain([fr.book.mail.title], rows, [fr.book.mail.replyHint]),
    });
    notified = !r.error;
  } catch {}

  // 2. Au client, dans sa langue
  if (notified) {
    const m = d.book.mail;
    const intro = [fill(m.confirmIntro, { name: b.name }), m.confirmBody];
    const crow = bookingRows(b, lang, d, false);
    const outro = [m.confirmOutro, m.signature];
    try {
      const r = await resend.emails.send({ from, to: b.email, replyTo: to, subject: m.confirmSubject, html: mail({ title: m.confirmSubject, intro, rows: crow, outro }), text: plain(intro, crow, outro) });
      confirmed = !r.error;
    } catch {}
  }
  return Response.json({ ok: true, notified, confirmed });
}
