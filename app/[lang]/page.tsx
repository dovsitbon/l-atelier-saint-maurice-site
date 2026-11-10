import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import avis from "@/data/avis.json";
import carte from "@/data/carte.json";
import { fill, getDict, isLocale, type Dict, type Locale } from "@/lib/i18n";
import { formatDay, isoDay } from "@/lib/format";
import { pagePath } from "@/lib/pages";
import { homeJsonLd } from "@/lib/jsonld";
import { Reveal } from "@/components/Reveal";
import { Rating, numberLocale } from "@/components/Rating";
import { FadeUp } from "@/components/FadeUp";
import { OpenStatus } from "@/components/OpenStatus";
import { Menu } from "@/components/Menu";
import { BookingForm } from "@/components/BookingForm";
import { HoursTable } from "@/components/HoursTable";
import { PlatDuJour } from "@/components/PlatDuJour";
import { PhotoSlot, hasPhoto, type PhotoId } from "@/components/PhotoSlot";
import { Cocotte, Vagues, type ArtId } from "@/components/Art";
import { ArrowIcon, CalendarIcon, MoonIcon, PhoneIcon, PinIcon, StarIcon, SunIcon } from "@/components/icons";

const nf = numberLocale;

function SectionHead({ eyebrow, title, lead, id, center = false }: { eyebrow: string; title: string; lead?: string; id?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display mt-3 text-[2.25rem] md:text-[3rem]">
        {title}
      </h2>
      {lead && <p className="lead mt-4">{lead}</p>}
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang: Locale = l;
  const d = getDict(lang);
  const carteHref = pagePath("carte", lang);
  const book = `/${lang}#reserver`;

  const tiles: { id: keyof Dict["tiles"]; href: string; photo: PhotoId; art: ArtId }[] = [
    { id: "platDuJour", href: `/${lang}#plat-du-jour`, photo: "platDuJour", art: "ardoise" },
    { id: "entrees", href: `${carteHref}#entrees`, photo: "entrees", art: "terrine" },
    { id: "plats", href: `${carteHref}#plats`, photo: "plats", art: "cocotte" },
    { id: "desserts", href: `${carteHref}#desserts`, photo: "desserts", art: "ramequin" },
    { id: "vins", href: `${carteHref}#vins`, photo: "vins", art: "verre" },
  ];
  const services = [
    { k: "lunch", Icon: SunIcon },
    { k: "dinner", Icon: MoonIcon },
    { k: "homemade", Icon: ({ className }: { className?: string }) => <Cocotte className={className} /> },
    { k: "booking", Icon: CalendarIcon },
  ] as const;
  const blocks: { k: keyof Dict["blocks"]; photo: PhotoId; art: ArtId; href: string }[] = [
    { k: "cuisine", photo: "cuisine", art: "cocotte", href: carteHref },
    { k: "lunch", photo: "dejeuner", art: "assiette", href: book },
    { k: "groups", photo: "groupes", art: "table", href: `tel:${site.phoneIntl}` },
  ];
  const quotes = avis.items as { name: string; date: string; text: Record<Locale, string> }[];
  const heroPhoto = hasPhoto("hero");
  const checkedOn = (iso: string) => formatDay(iso, lang, { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />

      {/* 3. Hero plein écran : la plus belle photo (data/photos.json → hero), sinon le vert bistrot et la cocotte au trait */}
      <section className="relative isolate flex min-h-[calc(100svh-6.5rem)] flex-col justify-end overflow-hidden bg-vert text-cream md:min-h-[calc(100svh-7.25rem)]">
        {heroPhoto ? (
          <>
            <PhotoSlot id="hero" d={d} priority sizes="100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(30_27_24/0.78),rgb(30_27_24/0.25)_55%,rgb(30_27_24/0.1))]" aria-hidden="true" />
          </>
        ) : (
          <div className="vichy-dark absolute inset-0 -z-10" role="img" aria-label={d.photos.hero.alt}>
            <Cocotte className="absolute end-[5%] top-[6%] h-[24svh] w-auto text-laiton/45 md:h-[30svh] lg:end-[8%] lg:top-[12%] lg:h-[50svh] lg:text-laiton/70" />
            <Vagues className="absolute inset-x-0 bottom-[22%] h-5 w-full text-laiton/35 md:bottom-[16%]" />
            <span className="absolute end-5 bottom-4 hidden text-[0.75rem] text-cream/50 md:block" aria-hidden="true">
              {d.placeholder} · {d.photos.hero.label}
            </span>
          </div>
        )}
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 pb-12 md:px-10 md:pb-20">
          <p className="caps max-w-xl leading-relaxed text-cream/85">{d.hero.eyebrow}</p>
          <h1 className="display mt-5 max-w-4xl text-[3rem] md:text-[5.25rem] lg:text-[6.25rem]">{d.hero.title}</h1>
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-cream/85">{d.hero.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={book} className="btn btn-cream">
                {d.hero.ctaBook}
              </Link>
              <Link href={carteHref} className="btn-line text-cream">
                {d.hero.ctaMenu}
              </Link>
            </div>
            <div className="mt-7 flex flex-col gap-1.5 text-[0.9375rem] text-cream/85 sm:flex-row sm:gap-6">
              <Rating d={d} lang={lang} />
              <OpenStatus dot="bg-[#9cc3a6]" closedDot="bg-laiton" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4. Tuiles de catégories, juste après le hero */}
      <section aria-labelledby="tuiles" className="px-6 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <h2 id="tuiles" className="sr-only">
            {d.tiles.title}
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {tiles.map((t, i) => (
              <Reveal as="li" key={t.id} delay={i * 0.05} className={i === 0 ? "col-span-2 sm:col-span-1" : ""}>
                <Link href={t.href} className="group block">
                  <div className={`zoom relative overflow-hidden ${i === 0 ? "aspect-[2/1] sm:aspect-[4/5]" : "aspect-[4/5]"}`}>
                    <PhotoSlot id={t.photo} d={d} art={t.art} dark={i === 0} caption={false} sizes="(min-width: 1024px) 19vw, (min-width: 640px) 31vw, 48vw" artClass="h-14 w-auto md:h-16" />
                  </div>
                  <p className="mt-3 flex items-center justify-between gap-2 border-b border-line pb-3 text-[1.0625rem] transition-colors group-hover:text-bordeaux">
                    <span className="font-[family-name:var(--font-playfair)] text-[1.25rem]">{d.tiles[t.id]}</span>
                    <ArrowIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Bande de services en 4 pictos */}
      <section aria-label={d.services.title} className="px-6 pt-16 md:px-10 md:pt-24">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 border-y border-line md:grid-cols-4">
          {services.map(({ k, Icon }, i) => (
            <li key={k} className={`flex flex-col gap-3 py-8 md:px-8 ${i % 2 ? "ps-5 md:ps-8" : "pe-5 md:pe-8"} ${i > 0 ? "md:border-s md:border-line" : "md:ps-0"} ${i % 2 ? "border-s border-line" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""}`}>
              <Icon className="h-8 w-auto text-bordeaux" />
              <p className="font-[family-name:var(--font-playfair)] text-[1.1875rem] leading-snug">{d.services[k].title}</p>
              <p className="text-[0.9375rem] leading-relaxed text-muted">{d.services[k].text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Le plat du jour (data/plat-du-jour.json) */}
      <section id="plat-du-jour" aria-labelledby="pdj" className="scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={d.pdj.eyebrow} title={d.pdj.title} id="pdj" />
          <Reveal className="mt-10">
            <PlatDuJour buildDay={isoDay(new Date())} />
          </Reveal>
        </div>
      </section>

      {/* 7. La carte, avec les prix (data/carte.json) */}
      <section id="carte" aria-labelledby="carte-titre" className="scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={d.carte.eyebrow} title={d.carte.title} lead={d.carte.lead} id="carte-titre" />
          <div className="mt-14">
            <Menu lang={lang} d={d} />
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <Link href={carteHref} className="btn-line">
              {d.carte.seeAll}
            </Link>
            <p className="text-[0.8125rem] text-muted">{fill(d.carte.checked, { date: checkedOn(carte.checked) })}</p>
          </div>
        </div>
      </section>

      {/* 8. Trois blocs alternés : photo + texte court + un seul bouton */}
      <section className="px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl space-y-20 md:space-y-28">
          {blocks.map((b, i) => {
            const t = d.blocks[b.k];
            const isLink = !b.href.startsWith("tel:");
            return (
              <div key={b.k} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <Reveal className={`relative aspect-[4/3] overflow-hidden md:aspect-[5/6] ${i % 2 ? "md:order-2" : ""}`}>
                  <PhotoSlot id={b.photo} d={d} art={b.art} sizes="(min-width: 768px) 46vw, 100vw" artClass="h-20 w-auto md:h-28" />
                </Reveal>
                <Reveal delay={0.08} className="md:px-6">
                  <p className="eyebrow">{t.eyebrow}</p>
                  <h2 className="display mt-3 text-[2.25rem] md:text-[3rem]">{t.title}</h2>
                  <p className="lead mt-5 max-w-md">{t.text}</p>
                  {isLink ? (
                    <Link href={b.href} className="btn-line mt-8">
                      {t.cta}
                    </Link>
                  ) : (
                    <a href={b.href} className="btn-line mt-8">
                      <PhoneIcon className="h-4 w-4" />
                      {t.cta}
                    </a>
                  )}
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Réserver une table */}
      <section id="reserver" aria-labelledby="reserver-titre" className="scroll-mt-20 px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
          <div>
            <SectionHead eyebrow={d.book.eyebrow} title={d.book.title} lead={d.book.lead} id="reserver-titre" />
            <div className="mt-8 space-y-2 text-[0.9375rem] text-muted">
              <Rating d={d} lang={lang} starClass="text-laiton-ink" />
              <OpenStatus />
            </div>
            <a href={`tel:${site.phoneIntl}`} className="btn-line mt-8">
              <PhoneIcon />
              {d.nav.call} · <span className="tabular-nums">{site.phone}</span>
            </a>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* 9. Avis : uniquement de vrais avis (data/avis.json), aucun inventé */}
      <section aria-labelledby="avis" className="px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl border-y border-line py-16 text-center md:py-20">
          <p className="eyebrow">{d.reviews.eyebrow}</p>
          <h2 id="avis" className="display mt-3 text-[2.25rem] md:text-[3rem]">
            {d.reviews.title}
          </h2>
          <p className="display mt-8 text-[4.5rem] leading-none text-bordeaux md:text-[6rem]">
            {site.rating.value.toLocaleString(nf(lang))}
            <span className="text-[0.4em] text-muted">/5</span>
          </p>
          <span className="mt-4 flex justify-center text-laiton-ink" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} className="h-5 w-5" />
            ))}
          </span>
          <p className="mt-4 text-[1.0625rem]">{fill(d.reviews.count, { count: site.rating.count })}</p>
          <p className="mt-1 text-[0.8125rem] text-muted">{fill(d.reviews.checked, { date: checkedOn(site.rating.checked) })}</p>
          <div dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR avec de vrais avis clients (data/avis.json), avec l'accord de leurs auteurs -->" }} hidden />
          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 text-start md:grid-cols-3">
            {(quotes.length ? quotes.slice(0, 3) : [null, null, null]).map((q, i) =>
              q ? (
                <li key={q.name + q.date} className="border border-line bg-paper p-6">
                  <blockquote className="leading-relaxed">« {q.text[lang]} »</blockquote>
                  <p className="mt-4 text-[0.875rem] text-muted">{q.name}</p>
                </li>
              ) : (
                <li key={i} className="flex min-h-36 flex-col justify-between border border-dashed border-line p-6" aria-hidden="true">
                  <span className="font-[family-name:var(--font-playfair)] text-[2.5rem] leading-none text-line">“</span>
                  <span className="text-[0.8125rem] text-muted">{d.reviews.slot}</span>
                </li>
              ),
            )}
          </ul>
          <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-line mt-10">
            {d.reviews.cta}
          </a>
        </div>
      </section>

      {/* 10. Infos pratiques */}
      <section id="infos" aria-labelledby="infos-titre" className="scroll-mt-20 px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={d.infos.eyebrow} title={d.infos.title} id="infos-titre" />
          <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.25fr]">
            <dl className="space-y-7">
              <div>
                <dt className="flex items-center gap-2 text-bordeaux">
                  <PinIcon />
                  {d.infos.address}
                </dt>
                <dd className="mt-1.5 font-[family-name:var(--font-playfair)] text-[1.375rem] leading-snug">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </dd>
                <dd>
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-2 inline-block text-[0.9375rem]">
                    {d.infos.directions}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-bordeaux">
                  <PhoneIcon />
                  {d.infos.phone}
                </dt>
                <dd className="mt-1.5">
                  <a href={`tel:${site.phoneIntl}`} className="link-line text-[1.25rem] tabular-nums">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-bordeaux">{d.infos.access}</dt>
                <dd className="mt-1.5 leading-relaxed text-muted">{d.infos.accessText}</dd>
              </div>
              <div>
                <dt className="text-bordeaux">{d.infos.parking}</dt>
                <dd className="mt-1.5 leading-relaxed text-muted">{d.infos.parkingText}</dd>
              </div>
            </dl>
            <div>
              <p className="text-bordeaux">{d.infos.hours}</p>
              <OpenStatus className="mt-2 text-[0.9375rem]" />
              <HoursTable lang={lang} d={d} className="mt-3" />
              <p className="mt-4 text-[0.8125rem] text-muted">{d.infos.hoursNote}</p>
            </div>
            <div className="grid gap-4 md:col-span-2 lg:col-span-1">
              <div className="relative aspect-[16/10] overflow-hidden">
                <PhotoSlot id="facade" d={d} art="facade" sizes="(min-width: 1024px) 36vw, 100vw" artClass="h-20 w-auto md:h-24" />
              </div>
              <iframe title={d.infos.mapTitle} src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[16/10] w-full border-0 bg-cream-deep grayscale-[35%]" />
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ (à valider) */}
      <section aria-labelledby="faq" className="px-6 pt-24 pb-24 md:px-10 md:pt-32 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">{d.faq.eyebrow}</p>
            <h2 id="faq" className="display mt-3 text-[2.25rem] md:text-[3rem]">
              {d.faq.title}
            </h2>
            <Cocotte className="mt-8 hidden h-14 w-auto text-laiton md:block" />
          </div>
          <div className="border-t border-line">
            {d.faq.items.map((f) => (
              <details key={f.q} className="border-b border-line">
                <summary className="flex min-h-16 items-center justify-between gap-6 py-4 text-[1.0625rem]">
                  {f.q}
                  <span className="faq-plus shrink-0 text-[1.5rem] leading-none font-light text-bordeaux" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
