import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর — আজকের বাজারের দাম",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর দেখুন।",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme = "light"
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <Navbar></Navbar>
        
        {children}
        
        </body>
    </html>
  );
}
