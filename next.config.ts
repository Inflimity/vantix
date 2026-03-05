import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com https://embed.tawk.to",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://embed.tawk.to",
              "img-src 'self' blob: data: https: https://*.tawk.to",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https: wss: https://*.tawk.to wss://*.tawk.to",
              "frame-src https://translate.google.com",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
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
