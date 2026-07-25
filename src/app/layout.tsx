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
  icons: {
    icon: [
      { url: "/it-board-logo.jpg" },
      { url: "/it-board-logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/it-board-logo.jpg",
    apple: "/it-board-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${cursive.variable} font-sans antialiased bg-[#0a0a0a] text-white min-h-screen flex flex-col overflow-x-hidden w-full`}>
        <Navbar />
        <main className="flex-1 overflow-x-hidden w-full">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
