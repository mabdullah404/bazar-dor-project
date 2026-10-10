"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ====================================================================
// হিরো সেকশন কম্পোনেন্ট (Hero Section)
// ফিগমা ডিজাইন অনুযায়ী সহজে তৈরি করা হয়েছে
// ====================================================================
const Hero = () => {
  // আজকের তারিখ বাংলায় ডায়নামিকভাবে দেখানোর জন্য স্টেট
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // বাংলা লোকাল ডেট ফরম্যাট (যেমন: শনিবার, ১০ অক্টোবর, ২০২৬)
    setCurrentDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* ফিগমার মতো রাউন্ডেড ব্যাকগ্রাউন্ড কার্ড কন্টেইনার */}
      <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* ================= বাম পাশ: টেক্সট ও বাটন ================= */}
          <div className="md:col-span-7 space-y-4">
            
            {/* ১. তারিখের গ্রিন পিল ব্যাজ */}
            <div className="inline-block">
              <span className="bg-[#e8f5e9] text-[#059669] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full">
                {currentDate || "আজকের তাজা বাজার দর"}
              </span>
            </div>

            {/* ২. মূল টাইটেল (Title) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* ৩. বর্ণনা (Subtitle / Description) */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* ৪. 'সব পণ্য দেখুন' অ্যাকশন বাটন */}
            <div className="pt-2">
              <Link
                href="#সব-পণ্য"
                className="inline-block bg-[#059669] hover:bg-[#047857] text-white font-medium text-sm sm:text-base px-6 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                সব পণ্য দেখুন
              </Link>
            </div>
          </div>

          {/* ================= ডান পাশ: ঝুড়িভর্তি ফলের ইলাস্ট্রেশন ================= */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[4/3]">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ইলাস্ট্রেশন"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
