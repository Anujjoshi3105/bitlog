import type { Metadata } from "next";
import "./globals.css";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitlog.netlify.app/"),
  title: "Bitlog: The Future of Learning",
  description: `Bitlog is your go-to platform for exploring in-depth tutorials, expert insights, and real-world tech stories. Empowering developers with knowledge and fostering a vibrant tech community.`,
  applicationName: "Bitlog",
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
  authors: { name: "Anuj Joshi", url: "https://anujjoshi.netlify.app" },
  creator: "Anuj Joshi",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    url: "https://bitlog.netlify.app",
    title: "Bitlog: The Future of Learning",
    description: `Discover the latest in tech tutorials and insights. Join the Bitlog community to enhance your skills and stay ahead in the tech world.`,
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
    title: "Bitlog: The Future of Learning",
    description: `Stay updated with the latest tech trends, tutorials, and insights. Join Bitlog and elevate your expertise in AI, Machine Learning, and more.`,
    images: "https://bitlog.netlify.app/logo.svg",
    creator: "@bitlogtech",
    site: "@bitlogtech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={`relative antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
