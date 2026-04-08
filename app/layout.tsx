import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jooscale | Precision Engineering for Radical Growth",
  description:
    "High-performance growth engines bridging technical architecture and creative marketing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Next.js بيفضل إنك تعتمد على metadata icons اللي فوق وتمسح سطر الـ link icon من هنا عشان ميعملش تعارض */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@500;600;700&family=Cairo:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
