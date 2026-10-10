import React from "react";
import Link from "next/link";

// ====================================================================
// গ্লোবাল ৪০৪ পেইজ (Global 404 Not Found Page)
// ব্যবহারকারী ভুল বা অজানা কোনো রুটে গেলে Next.js স্বয়ংক্রিয়ভাবে এটি দেখাবে
// ====================================================================
export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm max-w-lg w-full text-center">
        {/* ২. ৪০৪ স্টাইলাইজড ব্যাজ ও আইকন */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-emerald-50 text-[#059669] mb-6 shadow-inner">
          <span className="text-4xl">🔍</span>
        </div>

        {/* ৩. ৪০৪ কোড ও হেডিং */}
        <div className="mb-2">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#059669] bg-emerald-100/60 px-3 py-1 rounded-full">
            ত্রুটি ৪০৪ • পৃষ্ঠা পাওয়া যায়নি
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-3 tracking-tight">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          দুঃখিত, আপনি যে ঠিকানায় যাওয়ার চেষ্টা করছেন তা বিদ্যমান নেই অথবা সরানো
          হয়েছে। সঠিক তথ্যের জন্য দয়া করে হোম পেজে ফিরে যান।
        </p>

        {/* ৫. অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* হোম পেইজে ফিরে যাওয়ার বাটন */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-medium text-sm sm:text-base px-6 py-3 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <span>🏠</span>
            <span>হোম পেজে ফিরে যান</span>
          </Link>

          {/* রিফ্রেশ বা ব্রাউজ বাটন */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm sm:text-base px-6 py-3 rounded-xl transition-all cursor-pointer"
          >
            <span>🏪</span>
            <span>সকল বাজার দর দেখুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
