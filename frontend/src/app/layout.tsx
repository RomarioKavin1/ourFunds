import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "@next/font/google";

const encodeSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Our Funds",
  description: "Our Funds Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={encodeSans.className}>{children}</body>
    </html>
  );
}
