import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import type { PWAConfig } from "next-pwa";
import withPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

// Base Next.js configuration
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify is no longer needed
};

// PWA configuration
const pwaConfig: PWAConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
};

// Create a type-safe composition
const withPWAConfig = withPWA(pwaConfig) as (config: NextConfig) => NextConfig;
const finalConfig = withNextIntl(withPWAConfig(nextConfig));

export default finalConfig;
