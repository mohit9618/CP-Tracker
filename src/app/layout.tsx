import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import GlowBackground from "../components/ui/GlowBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CP Tracker",
  description:
    "Track, analyze, and improve your competitive programming performance.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <body
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-950
          via-slate-900
          to-black
          text-white
        "
      >
        <GlowBackground />
        {children}
      </body>
    </html>
  );
}
