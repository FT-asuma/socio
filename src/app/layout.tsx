import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.sass";
import { AppProvider } from "@/context";

const sora = Sora({
  variable: "--font-sora",
  weight: ["100", "300", "400", "500", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social media",
  description: "Node js + mongoDb + next.js tutorial app",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.variable}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
