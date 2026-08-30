import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Sunteck OneWorld – Premium Luxury Township in Naigaon",
  description:
    "Discover Sunteck OneWorld, a 150-acre aspirational luxury township in Naigaon West with 1 & 2 BHK homes, world-class amenities, and excellent connectivity.",
  keywords:
    "Sunteck OneWorld, luxury township Naigaon, 1BHK 2BHK flats Naigaon, premium homes Mumbai, Sunteck Realty",
  openGraph: {
    title: "Sunteck OneWorld – Premium Luxury Township",
    description:
      "150-acre luxury township in Naigaon. Ultra-spacious 1 & 2 BHK homes with world-class amenities.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
