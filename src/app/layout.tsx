import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "Shunkin.com.ua",
  description: "Ваш спокій — наш пріоритет",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={` antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
