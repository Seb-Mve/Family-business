import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "La Quête Familiale",
  description: "Gamification familiale — accomplissez des quêtes, gagnez des récompenses !",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${nunito.variable} font-nunito antialiased bg-warm`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
