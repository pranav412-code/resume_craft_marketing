import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * 404 page. Next serves this with a 404 status. Keep it link-rich so a
 * crawler (or a person) that lands on a dead URL still has a path into the
 * indexable surface.
 */
const LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/ats-checker", label: "Free ATS resume checker" },
  { href: "/resume-examples", label: "Resume examples by job title" },
  { href: "/guides", label: "Resume guides" },
  { href: "/tools/jd-match-checker", label: "JD match checker" },
  { href: "/pricing", label: "Pricing" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader page="/404" />
      <main>
        <article className="prose">
          <h1>Page not found</h1>
          <p>
            That URL doesn&apos;t exist or has moved. Nothing is broken on your
            end — try one of these instead:
          </p>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
