import Link from "next/link";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { Vagues } from "@/components/Art";
import { HoursTable } from "@/components/HoursTable";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const linkCls = "inline-flex min-h-9 items-center transition-colors hover:text-laiton";
  return (
    <footer className="bg-ink pb-24 text-cream md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr_1fr] md:px-10 md:py-20">
        <div className="flex flex-col items-start">
          <Logo className="text-cream" />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-cream/80">{d.footer.tagline}</p>
          <Vagues className="mt-6 h-3 w-28 text-laiton" />
        </div>
        <div className="text-[0.9375rem] leading-relaxed">
          <p className="mb-3 text-laiton">{d.infos.address}</p>
          <address className="not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a href={`tel:${site.phoneIntl}`} className="link-line mt-3 inline-block tabular-nums">
            {site.phone}
          </a>
          <ul className="mt-8 text-cream/80">
            <li>
              <Link href={pagePath("carte", lang)} className={linkCls}>
                {d.footer.menu}
              </Link>
            </li>
            <li>
              <Link href={pagePath("traditionnel", lang)} className={linkCls}>
                {d.footer.traditionnel}
              </Link>
            </li>
            <li>
              <Link href={pagePath("dejeuner", lang)} className={linkCls}>
                {d.footer.dejeuner}
              </Link>
            </li>
            <li>
              <Link href={pagePath("cadeau", lang)} className={linkCls}>
                {d.footer.gift}
              </Link>
            </li>
            <li>
              <Link href={pagePath("legal", lang)} className={linkCls}>
                {d.footer.legal}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[0.9375rem] text-laiton">{d.infos.hours}</p>
          <HoursTable lang={lang} d={d} />
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-6 text-center">
        <p className="text-[0.8125rem] text-cream/70">{fill(d.footer.rights, { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
