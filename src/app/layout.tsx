import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { PROFILE } from "@/contents/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PROFILE.fullName} — Tech/Business Analyst, Growth Marketer & Full Stack Developer`,
  description: PROFILE.extendedBio,
  keywords: [
    "Prashant Bikram Singh",
    "Prashant Singh",
    "Meta Ads Expert Nepal",
    "Google Ads Specialist",
    "SEO Expert Kathmandu",
    "Performance Marketing Consultant",
    "Tech/Business Analyst Nepal",
    "Full Stack Developer Nepal",
    "Next.js Developer Kathmandu",
    "Chitrabazar",
    "AllStockNepal",
    "Flutter AR Developer",
    "Web3 Solidity Developer",
  ],
  authors: [{ name: PROFILE.fullName, url: PROFILE.socials.github }],
  openGraph: {
    title: `${PROFILE.fullName} — ${PROFILE.title}`,
    description: PROFILE.bio,
    type: "website",
  },
};

const COLOR_SCHEME_INIT_SCRIPT = `
try {
  var stored = localStorage.getItem("color-scheme");
  var isLight = stored === "light";
  var meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) {
    meta.content = isLight ? "light" : "dark";
  }
  document.documentElement.classList.toggle("dark", !isLight);
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        {/* Default dark theme for all users; only switches on explicit toggle */}
        <meta name="color-scheme" content="dark" />
        <script
          dangerouslySetInnerHTML={{ __html: COLOR_SCHEME_INIT_SCRIPT }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
