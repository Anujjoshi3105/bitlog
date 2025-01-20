import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BITLOG",
    short_name: "Bitlog",
    description:
      "A platform for tech tutorials, insights, and innovation, shaping the future of learning.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/images/manifest-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/manifest-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/apple-icon-180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
