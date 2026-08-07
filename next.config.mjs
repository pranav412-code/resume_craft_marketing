/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dev is browsed from LAN IPs too (e.g. http://192.168.1.6:5173) - allow
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
  async redirects() {
    return [
      {
        source: "/tools/ats-resume-scan",
        destination: "/ats-checker",
        permanent: true,
      },
      {
        source: "/resume-templates",
        destination: "/resume-examples",
        permanent: true,
      },
      {
        source: "/resume-templates/:style",
        destination: "/resume-examples",
        permanent: true,
      },
    ];
  },
  // Baseline security + CDN cache headers (SSG marketing; cuts hub TTFB).
  // Skip long-lived Cache-Control in dev — immutable /_next/static headers
  // leave browsers on stale webpack chunks (__webpack_require__.n errors).
  async headers() {
    if (process.env.NODE_ENV !== "production") {
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
            { key: "Cache-Control", value: "no-store" },
          ],
        },
      ];
    }

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
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/opengraph-image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
