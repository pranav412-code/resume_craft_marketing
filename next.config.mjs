/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dev is browsed from LAN IPs too (e.g. http://192.168.1.6:5173) — allow
  // those origins to load /_next/* assets without the cross-origin warning.
  allowedDevOrigins: ["192.168.1.6", "localhost", "127.0.0.1"],
  // Don't advertise the framework.
  poweredByHeader: false,
  // Canonical URLs have no trailing slash (matches sitemap + canonicals).
  trailingSlash: false,
  // Modern formats for Core Web Vitals (LCP).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Baseline security headers, applied to every route (served via `next start`).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
