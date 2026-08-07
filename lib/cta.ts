import { siteConfig } from "@/lib/site";

/** Build the marketing → app deep-link with attribution query params. */
export function ctaHref(opts: {
  page: string;
  role?: string;
  template?: string;
}): string {
  const url = new URL(`${siteConfig.appUrl}/`);
  url.searchParams.set("src", "marketing");
  url.searchParams.set("page", opts.page);
  if (opts.role) url.searchParams.set("role", opts.role);
  if (opts.template) url.searchParams.set("template", opts.template);
  return url.toString();
}
