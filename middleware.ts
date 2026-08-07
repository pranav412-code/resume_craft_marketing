import { NextResponse, type NextRequest } from "next/server";

/**
 * Forward visitor country so /pricing can render a single regional currency
 * (INR for India, USD elsewhere) — matching app billing, no cross-price compare.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  let country: string | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const geo = (globalThis as any)?.Netlify?.context?.geo;
    const code = geo?.country?.code;
    if (typeof code === "string" && code.trim()) country = code.trim().toUpperCase();
  } catch {
    /* Netlify global absent in local next dev */
  }

  if (!country) {
    for (const name of [
      "x-nf-country",
      "cf-ipcountry",
      "x-vercel-ip-country",
      "x-appengine-country",
    ]) {
      const val = request.headers.get(name);
      if (val && val.trim() && !["XX", "T1", "ZZ"].includes(val.trim().toUpperCase())) {
        country = val.trim().toUpperCase();
        break;
      }
    }
  }

  if (country) requestHeaders.set("x-visitor-country", country);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/pricing", "/pricing/:path*"],
};
