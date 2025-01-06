import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "./globals.css";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer/Footer";
import { ThemeProvider } from "@/providers/theme-provider";
import { Locale, routing } from "@/i18n/routing";
import { getLangDir } from "rtl-detect";
import { Toaster } from "sonner";
import { Providers } from "@/providers/session-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Cookies from "@/components/Cookies";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    metadataBase: new URL("https://bitlog.netlify.app/"),
    applicationName: "BITLOG",
    authors: { name: "Anuj Joshi", url: "https://anujjoshi.netlify.app" },
    creator: "Anuj Joshi",
    icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
      apple: "/logo.svg",
    },
    title: t("title"),
    description: t("description"),
    keywords: [
      "Bitlog",
      "Tech Tutorials",
      "Tech Insights",
      "Developer Community",
      "AI",
      "Machine Learning",
      "Quantum Computing",
      "Computer Vision",
      "Technology Archives",
      "Learning Platform",
      "Tech Articles",
      "Innovation",
      "Future of Learning",
      "Programming Guides",
      "Tech News",
    ],
    openGraph: {
      type: "website",
      url: "https://bitlog.netlify.app",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "https://bitlog.netlify.app/logo.svg",
          width: 1200,
          height: 630,
          alt: "Bitlog Logo",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: "https://bitlog.netlify.app/logo.svg",
      creator: "@bitlogtech",
      site: "@bitlogtech",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  const direction = getLangDir(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="relative antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ThemeProvider attribute="class">
              <Header />
              {children}
              <Footer />
              <Cookies />
              <Toaster richColors />
            </ThemeProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-LCFWLWYGL8" />
    </html>
  );
}
