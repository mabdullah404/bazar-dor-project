import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

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
    <html
      data-theme="light"
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f7f5] text-gray-900">
        {/* সব পেজে ন্যাভবার */}
        <Navbar />
        
        {/* সব পেজে মারকুই লাইভ প্রাইস টিকার */}
        <Marquee />
        
        {/* মূল পেজ কনটেন্ট */}
        <div className="flex-1">{children}</div>
        
        {/* সব পেজে ফুটার */}
        <Footer />

        {/* টোস্ট নোটিফিকেশন কনটেইনার */}
        <ToastContainer position="top-center" autoClose={3000} limit={3} />
      </body>
    </html>
  );
}


