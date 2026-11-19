import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Mart | Everything you need, one marketplace",
  description: "Discover fashion, electronics, phones, home essentials and beauty products from trusted Nigerian sellers on Nova Mart.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
