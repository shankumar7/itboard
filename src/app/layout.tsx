import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cursive = Great_Vibes({ subsets: ["latin"], variable: "--font-cursive", weight: ["400"] });

export const metadata: Metadata = {
  title: "IT Board · Recruitment Portal",
  description: "Join the IT Board - Lead the future of technical communities at CMRCET.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${cursive.variable} font-sans antialiased bg-[#0a0a0a] text-white min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
