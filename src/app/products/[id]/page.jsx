import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// ====================================================================
// ১. সংখ্যাকে বাংলায় রূপান্তর 
// ====================================================================
const toBengaliNumber = (num) => {
  if (num === null || num === undefined || num === "") return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[digit]);
};

// ====================================================================
// ২. দশমিক পার্সেন্টেজ বাংলায় রূপান্তর (যেমন: 3.1 -> ৩.১)
// ====================================================================
const formatPercentage = (num) => {
  const val = Math.abs(num || 0).toFixed(1);
  return toBengaliNumber(val);
};

// ====================================================================
// ৩. পরিমাপের একক বাংলায় রূপান্তরের ফাংশন
// ====================================================================
const formatUnit = (unit) => {
  if (unit === "kg") return "প্রতি কেজি";
  if (unit === "dozen") return "প্রতি ডজন";
  if (unit === "piece") return "প্রতি পিস";
  if (unit === "liter" || unit === "litre") return "প্রতি লিটার";
  if (unit === "hali") return "প্রতি হালি";
  return `প্রতি ${unit || "কেজি"}`;
};

const getUnitLabel = (unit) => {
  if (unit === "kg") return "কেজি";
  if (unit === "dozen") return "ডজন";
  if (unit === "piece") return "পিস";
  if (unit === "liter" || unit === "litre") return "লিটার";
  if (unit === "hali") return "হালি";
  return unit || "কেজি";
};

// ====================================================================
// ৪. গড় দাম ফরম্যাটিং (পূর্ণসংখ্যা হলে সরাসরি, দশমিক হলে দুই ঘর)
// ====================================================================
const formatMarketAvg = (min, max) => {
  const avg = (min + max) / 2;
  if (Number.isInteger(avg)) {
    return `${toBengaliNumber(avg)} টাকা`;
  }
  return `${toBengaliNumber(avg.toFixed(2))} টাকা`;
};

// ====================================================================
// ৫. API থেকে নির্দিষ্ট প্রডাক্ট ফেচ করার ফাংশন
// ====================================================================
async function getProduct(id) {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products/${id}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      // যদি ID দিয়ে না পাওয়া যায়, তবে সব প্রডাক্ট ফেচ করে slug দিয়ে চেক করবে
      const allRes = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
        next: { revalidate: 60 },
      });
      if (allRes.ok) {
        const allProducts = await allRes.json();
        return allProducts.find(
          (p) => String(p.id) === String(id) || p.slug === String(id)
        ) || null;
      }
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("প্রডাক্ট ডেটা লোড করতে সমস্যা হয়েছে:", error);
    return null;
  }
}

// ====================================================================
// ৬. ডাইনামিক মেটাডাটা (SEO)
// ====================================================================
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি — বাজার দর",
    };
  }

  return {
    title: `${product.nameBn} এর আজকের বাজার দর — বাজার দর`,
    description: `${product.nameBn}-এর আজকের গড় দাম ${product.today} টাকা। বাজারভিত্তিক বিস্তারিত দর দেখুন।`,
  };
}

// ====================================================================
// ৭. প্রডাক্ট ডিটেইলস পেজ কম্পোনেন্ট (Protected Route)
// ====================================================================
export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // প্রোটেক্টেড রাউট চেক — ইউজার লগইন না থাকলে সাইন ইন পেজে পাঠাবে
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/signin?redirect=/products/${encodeURIComponent(id)}&auth_required=true`);
  }

  const product = await getProduct(id);

  // যদি পণ্য না পাওয়া যায় তবে 404 পেজে রিডাইরেক্ট করবে
  if (!product) {
    notFound();
  }

  // দাম বৃদ্ধি/হ্রাসের হিসাব
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = formatPercentage(product.change?.pct);
  const diff = (product.today || 0) - (product.yesterday || 0);

  // সর্বনিম্ন ও সর্বাধিক দাম বের করা
  const minPrices = product.markets?.map((m) => m.min).filter(Boolean) || [];
  const maxPrices = product.markets?.map((m) => m.max).filter(Boolean) || [];
  const lowestPrice = minPrices.length > 0 ? Math.min(...minPrices) : product.today;
  const highestPrice = maxPrices.length > 0 ? Math.max(...maxPrices) : product.today;

  // বাজার অনুযায়ী লিস্ট সাজানো (সর্বনিম্ন দাম অনুযায়ী ছোট থেকে বড়)
  const sortedMarkets = [...(product.markets || [])].sort((a, b) => a.min - b.min);

  return (
    <main className="min-h-screen bg-[#f4f7f5] py-6 sm:py-10 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= ১. ব্রেডক্রাম্ব নেভিগেশন ================= */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-[#059669] transition-colors">
            হোম
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href={`/?category=${product.category}`}
            className="hover:text-[#059669] transition-colors"
          >
            {product.categoryNameBn || "ক্যাটাগরি"}
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-800 font-semibold">{product.nameBn}</span>
        </nav>

        {/* ================= ২. টপ হেডার কার্ড (পণ্যের মূল তথ্য) ================= */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-2xs mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* বাম পাশ: আইকন, পণ্যের নাম, ক্যাটাগরি ও গতকালের তুলনায় পরিবর্তন */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {/* পণ্যের আইকন বক্স */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-50/90 border border-gray-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0 select-none shadow-2xs">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                {formatUnit(product.unit)} • {product.categoryNameBn}
              </p>
              
              {/* গতকালের সাথে তুলনা */}
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-2">
                {diff > 0 && `গতকালের তুলনায় আজ দাম বেড়েছে • ${toBengaliNumber(diff)} টাকা`}
                {diff < 0 && `গতকালের তুলনায় আজ দাম কমেছে • ${toBengaliNumber(Math.abs(diff))} টাকা`}
                {diff === 0 && `গতকালের তুলনায় আজ দাম অপরিবর্তিত`}
              </p>
            </div>
          </div>

          {/* ডান পাশ: আজকের দামের বক্স */}
          <div className="bg-[#f0f9f4] border border-emerald-100/90 rounded-2xl px-6 sm:px-8 py-4 sm:py-5 flex flex-col items-center justify-center min-w-[170px] text-center shrink-0">
            <span className="text-xs text-gray-500 font-medium">আজকের দাম</span>
            <span className="text-3xl sm:text-4xl font-black text-gray-900 my-0.5">
              {toBengaliNumber(product.today)}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              টাকা / {getUnitLabel(product.unit)}
            </span>

            {/* পরিবর্তনের শতকরা হার */}
            <div className="mt-1.5">
              {isUp && (
                <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                  ▲ {pct}%
                </span>
              )}
              {isDown && (
                <span className="text-xs font-bold text-[#059669] flex items-center gap-1">
                  ▼ {pct}%
                </span>
              )}
              {!isUp && !isDown && (
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  — {pct}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ================= ৩. দামের সারসংক্ষেপ સેકશન ================= */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* ১. সর্বনিম্ন দাম */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs">
              <span className="text-xs text-gray-500 font-medium block">
                সর্বনিম্ন দাম
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#059669] my-1 block">
                {toBengaliNumber(lowestPrice)} টাকা
              </span>
              <span className="text-xs text-gray-400 font-medium">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            {/* ২. সর্বাধিক দাম */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs">
              <span className="text-xs text-gray-500 font-medium block">
                সর্বাধিক দাম
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-red-500 my-1 block">
                {toBengaliNumber(highestPrice)} টাকা
              </span>
              <span className="text-xs text-gray-400 font-medium">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            {/* ৩. গড় দাম */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs">
              <span className="text-xs text-gray-500 font-medium block">
                গড় দাম
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#059669] my-1 block">
                {toBengaliNumber(product.today)} টাকা
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {formatUnit(product.unit)}-এর হিসাবে
              </span>
            </div>
          </div>
        </div>

        {/* ================= ৪. বাজারভিত্তিক আজকের দাম (টেবিল) ================= */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200/90 text-xs sm:text-sm text-gray-700">
                    <th className="py-4 px-5 sm:px-6 font-bold">বাজার</th>
                    <th className="py-4 px-5 sm:px-6 font-bold">বিভাগ</th>
                    <th className="py-4 px-5 sm:px-6 font-bold">সর্বনিম্ন</th>
                    <th className="py-4 px-5 sm:px-6 font-bold">সর্বাধিক</th>
                    <th className="py-4 px-5 sm:px-6 font-bold text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {sortedMarkets.length > 0 ? (
                    sortedMarkets.map((m, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="py-3.5 px-5 sm:px-6 font-medium text-gray-900">
                          {m.market}
                        </td>
                        <td className="py-3.5 px-5 sm:px-6 text-gray-600">
                          {m.division}
                        </td>
                        <td className="py-3.5 px-5 sm:px-6 text-gray-900 font-medium">
                          {toBengaliNumber(m.min)} টাকা
                        </td>
                        <td className="py-3.5 px-5 sm:px-6 text-gray-900 font-medium">
                          {toBengaliNumber(m.max)} টাকা
                        </td>
                        <td className="py-3.5 px-5 sm:px-6 text-gray-900 font-bold text-right">
                          {formatMarketAvg(m.min, m.max)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-gray-500 font-medium"
                      >
                        বাজারভিত্তিক কোনো তথ্য পাওয়া যায়নি
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
