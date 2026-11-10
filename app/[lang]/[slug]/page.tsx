import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import carte from "@/data/carte.json";
import { fill, getDict, isLocale, locales, type Dict, type Locale } from "@/lib/i18n";
import { formatDay, price } from "@/lib/format";
import { PAGE_IDS, pageOfSlug, pagePath, SLUGS, type PageId } from "@/lib/pages";
import { pageJsonLd } from "@/lib/jsonld";
import { Menu, Price } from "@/components/Menu";
import { OpenStatus } from "@/components/OpenStatus";
import { Rating } from "@/components/Rating";
import { HoursTable } from "@/components/HoursTable";
import { PhotoSlot, type PhotoId } from "@/components/PhotoSlot";
import { Cocotte, type ArtId } from "@/components/Art";
import { GiftIcon, MoonIcon, PhoneIcon, SunIcon } from "@/components/icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => PAGE_IDS.map((id) => ({ lang, slug: SLUGS[id][lang] })));
}
export const dynamicParams = false;

function resolve(lang: string, slug: string): { lang: Locale; id: PageId } | null {
  if (!isLocale(lang)) return null;
  const id = pageOfSlug(slug, lang);
  return id ? { lang, id } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) return {};
  const d = getDict(r.lang);
  const p = d.pages[r.id];
  const description = "metaDescription" in p ? p.metaDescription : d.meta.description;
  return {
    title: p.metaTitle,
    description,
    alternates: {
      canonical: pagePath(r.id, r.lang),
      languages: { ...Object.fromEntries(locales.map((x) => [x, pagePath(r.id, x)])), "x-default": pagePath(r.id, "fr") },
    },
    openGraph: { title: p.metaTitle, description, url: pagePath(r.id, r.lang), images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
    robots: r.id === "legal" ? { index: false, follow: true } : undefined,
  };
}

const checkedOn = (iso: string, lang: Locale) => formatDay(iso, lang, { day: "numeric", month: "long", year: "numeric" });

function PageHead({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display mt-3 text-[2.75rem] md:text-[4.25rem]">{title}</h1>
      {lead && <p className="lead mt-5">{lead}</p>}
      {children}
    </header>
  );
}

/** Grille de cartes déjeuner / dîner / groupes. */
function Formules({ lang, d }: { lang: Locale; d: Dict }) {
  const f = d.carte.formules;
  const data = Object.fromEntries(carte.formules.map((x) => [x.id, x])) as Record<string, { price: number | null; from: boolean }>;
  const cards = [
    { id: "midi", Icon: SunIcon, href: `/${lang}#reserver`, tel: false },
    { id: "soir", Icon: MoonIcon, href: `/${lang}#reserver`, tel: false },
    { id: "groupes", Icon: GiftIcon, href: `tel:${site.phoneIntl}`, tel: true },
  ] as const;
  return (
    <section aria-labelledby="formules" className="mt-16">
      <h2 id="formules" className="sr-only">
        {f.title}
      </h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {cards.map(({ id, Icon, href, tel }) => {
          const t = f[id];
          const p = data[id];
          return (
            <li key={id} className="flex flex-col border border-line bg-paper p-7">
              <Icon className="h-8 w-8 text-bordeaux" />
              <h3 className="display mt-5 text-[1.75rem]">{t.title}</h3>
              <p className="mt-1 text-[0.875rem] text-muted">{t.when}</p>
              <p className="mt-4 flex-1 leading-relaxed text-muted">{t.text}</p>
              <p className="mt-5 font-[family-name:var(--font-playfair)] text-[1.375rem]">{p.price !== null ? <Price value={p.price} from={p.from} lang={lang} d={d} /> : id === "soir" ? <span className="text-[1rem] text-muted">{d.tiles.title}</span> : <Price value={null} lang={lang} d={d} />}</p>
              {tel ? (
                <a href={href} className="btn-line mt-6 self-start">
                  <PhoneIcon className="h-4 w-4" />
                  {f.cta[id]}
                </a>
              ) : (
                <Link href={href} className="btn-line mt-6 self-start">
                  {f.cta[id]}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function CtaRow({ lang, d, label }: { lang: Locale; d: Dict; label?: string }) {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Link href={`/${lang}#reserver`} className="btn">
          {label ?? d.nav.bookCta}
        </Link>
        <a href={`tel:${site.phoneIntl}`} className="btn-line">
          <PhoneIcon />
          <span className="tabular-nums">{site.phone}</span>
        </a>
      </div>
      <div className="flex flex-col gap-1 text-[0.9375rem] text-muted sm:flex-row sm:gap-6">
        <Rating d={d} lang={lang} starClass="text-laiton-ink" />
        <OpenStatus />
      </div>
    </div>
  );
}

function Carte({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <div className="px-6 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <PageHead eyebrow={d.carte.eyebrow} title={d.pages.carte.title} lead={d.carte.lead}>
          <CtaRow lang={lang} d={d} />
        </PageHead>
        <Formules lang={lang} d={d} />
        <div className="mt-20">
          <Menu lang={lang} d={d} headingLevel={2} />
        </div>
        <p className="mt-12 border-t border-line pt-6 text-[0.8125rem] text-muted">{fill(d.carte.checked, { date: checkedOn(carte.checked, lang) })}</p>
      </div>
    </div>
  );
}

/** Pages SEO locales : « Restaurant traditionnel à Amiens », « Déjeuner à Amiens ». */
function Landing({ lang, d, id }: { lang: Locale; d: Dict; id: "traditionnel" | "dejeuner" }) {
  const p = d.pages[id];
  const lunch = carte.formules.find((f) => f.id === "midi")!;
  const photos: { photo: PhotoId; art: ArtId }[] = id === "traditionnel" ? [{ photo: "cassoulet", art: "cocotte" }, { photo: "veau", art: "assiette" }] : [{ photo: "dejeuner", art: "table" }, { photo: "platDuJour", art: "ardoise" }];
  return (
    <div className="px-6 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <PageHead eyebrow={p.eyebrow} title={p.title} lead={p.lead}>
            <CtaRow lang={lang} d={d} label={p.cta} />
          </PageHead>
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
            <PhotoSlot id={photos[0].photo} d={d} art={photos[0].art} sizes="(min-width: 768px) 42vw, 100vw" artClass="h-20 w-auto md:h-28" />
          </div>
        </div>
        <div className="mt-20 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {p.sections.map((s) => (
            <section key={s.h}>
              <h2 className="display text-[1.75rem] md:text-[2.125rem]">{s.h}</h2>
              <div className="rule mt-4 w-16" aria-hidden="true" />
              <p className="lead mt-4">{fill(s.p, { price: price(lunch.price!, lang) })}</p>
            </section>
          ))}
        </div>
        {id === "traditionnel" ? (
          <div className="mt-20">
            <Menu lang={lang} d={d} headingLevel={2} only={["plats"]} />
            <Link href={pagePath("carte", lang)} className="btn-line mt-10">
              {d.carte.seeAll}
            </Link>
          </div>
        ) : (
          <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden">
              <PhotoSlot id={photos[1].photo} d={d} art={photos[1].art} sizes="(min-width: 768px) 46vw, 100vw" artClass="h-20 w-auto md:h-24" />
            </div>
            <div>
              <h2 className="display text-[1.75rem] md:text-[2.125rem]">{d.infos.hours}</h2>
              <HoursTable lang={lang} d={d} className="mt-4" />
              <Link href={`/${lang}#plat-du-jour`} className="btn-line mt-8">
                {d.pdj.title}
              </Link>
            </div>
          </div>
        )}
        <p className="mt-16 border-t border-line pt-6 text-[0.9375rem] text-muted">
          {site.name} · {site.address.street}, {site.address.postalCode} {site.address.city} ·{" "}
          <a href={`tel:${site.phoneIntl}`} className="link-line tabular-nums">
            {site.phone}
          </a>
        </p>
      </div>
    </div>
  );
}

function Cadeau({ d }: { d: Dict }) {
  const p = d.pages.cadeau;
  return (
    <div className="px-6 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div>
          <PageHead eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
          <h2 className="display mt-14 text-[1.75rem]">{p.how}</h2>
          <ol className="mt-6 space-y-5">
            {p.steps.map((s, i) => (
              <li key={s} className="flex gap-5">
                <span className="font-[family-name:var(--font-playfair)] text-[1.75rem] leading-none text-bordeaux">{i + 1}</span>
                <span className="lead">{s}</span>
              </li>
            ))}
          </ol>
          <a href={`tel:${site.phoneIntl}`} className="btn mt-10">
            <PhoneIcon />
            {p.cta}
          </a>
        </div>
        <div className="flex aspect-[4/5] items-center justify-center bg-bordeaux p-10 text-cream md:aspect-auto">
          <div className="flex h-full w-full flex-col items-center justify-center border border-laiton/60 p-8 text-center">
            <Cocotte className="h-12 w-auto text-laiton" />
            <p className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] tracking-[0.14em]" translate="no">
              L’ATELIER
            </p>
            <div className="rule mt-4 w-20" aria-hidden="true" />
            <p className="display mt-5 text-[1.75rem] italic">{p.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Legal({ d }: { d: Dict }) {
  const p = d.pages.legal;
  const pending = <em className="text-muted">{p.pending}</em>;
  const blocks: [string, React.ReactNode][] = [
    [p.editor, p.editorText],
    [p.company, site.legal.company || pending],
    [p.siret, site.legal.siret || pending],
    [p.director, site.legal.director || pending],
    [p.host, site.legal.host],
    [p.data, p.dataText],
    [p.cookies, p.cookiesText],
    [p.photos, p.photosText],
  ];
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="display text-[2.75rem] md:text-[3.5rem]">{p.title}</h1>
      {blocks.map(([title, body]) => (
        <section key={title} className="mt-10">
          <h2 className="text-bordeaux">{title}</h2>
          <p className="mt-2 leading-relaxed">{body}</p>
        </section>
      ))}
    </div>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) notFound();
  const d = getDict(r.lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(r.lang, r.id)) }} />
      {r.id === "carte" && <Carte lang={r.lang} d={d} />}
      {(r.id === "traditionnel" || r.id === "dejeuner") && <Landing lang={r.lang} d={d} id={r.id} />}
      {r.id === "cadeau" && <Cadeau d={d} />}
      {r.id === "legal" && <Legal d={d} />}
    </>
  );
}
