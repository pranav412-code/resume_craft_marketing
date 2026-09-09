import { renderOgCard } from "@/lib/seo/og-card";
import { guides } from "@/lib/content/guides";
import { publishedRoles, getRole } from "@/data/roles";

/**
 * Per-entity OG cards: /og/resume-examples/{slug} and /og/guides/{slug}.
 * Wired in via createMetadata({ image }) on the role + guide pages so each
 * share/citation carries its own title. Fully prerendered at build.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...publishedRoles().map((r) => ({ kind: "resume-examples", slug: r.slug })),
    ...guides.map((g) => ({ kind: "guides", slug: g.slug })),
  ];
}

function clip(s: string, max = 96): string {
  return s.length <= max ? s : `${s.slice(0, max - 1).trimEnd()}…`;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ kind: string; slug: string }> },
) {
  const { kind, slug } = await params;

  if (kind === "resume-examples") {
    const role = getRole(slug);
    if (!role) return new Response("Not found", { status: 404 });
    return renderOgCard({
      eyebrow: "Resume example",
      heading: `${role.title} Resume`,
      subheading: `${role.category} · skills, ATS keywords, example bullets`,
    });
  }

  if (kind === "guides") {
    const guide = guides.find((g) => g.slug === slug);
    if (!guide) return new Response("Not found", { status: 404 });
    return renderOgCard({
      eyebrow: "Krafiter guide",
      heading: guide.title,
      subheading: clip(guide.description),
    });
  }

  return new Response("Not found", { status: 404 });
}
