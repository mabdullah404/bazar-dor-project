"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// ====================================================================
// ১. সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন (যেমন: ৩৩ -> ৩৩, ১২৯০ -> ১,২৯০)
// ====================================================================
const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  return Number(num).toLocaleString("bn-BD");
};

// ====================================================================
// ২. দশমিক পার্সেন্টেজ বাংলায় রূপান্তর (যেমন: 0 -> ০.০, 2.1 -> ২.১)
// ====================================================================
const formatPercentage = (num) => {
  const formatted = Math.abs(num || 0).toFixed(1);
  return Number(formatted).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};

// ====================================================================
// ৩. পরিমাপের একক বাংলায় রূপান্তর
// ====================================================================
const formatUnit = (unit) => {
  if (unit === "kg") return "প্রতি কেজি";
  if (unit === "dozen") return "প্রতি ডজন";
  if (unit === "piece") return "প্রতি পিস";
  if (unit === "liter") return "প্রতি লিটার";
  if (unit === "hali") return "প্রতি হালি";
  return `প্রতি ${unit || "কেজি"}`;
};

// ====================================================================
// ৪. দাম থেকে সঠিক সংখ্যা বের করার সহজ ফাংশন (বাংলা সংখ্যা সমর্থনসহ)
// ====================================================================
const parsePrice = (price) => {
  if (typeof price === "number") return price;
  if (!price) return 0;
  
  // বাংলা ডিজিটকে ইংরেজি ডিজিটে পরিবর্তন
  const banglaDigits = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };
  const englishStr = String(price).replace(/[০-৯]/g, (char) => banglaDigits[char]);
  const cleanNumber = parseFloat(englishStr.replace(/[^0-9.-]/g, ""));
  return isNaN(cleanNumber) ? 0 : cleanNumber;
};

// ====================================================================
// ৫. মেইন প্রোডাক্ট গ্রিড ক্লায়েন্ট কম্পোনেন্ট (সর্টিং অপশনসহ)
// ====================================================================
export default function ProductGridClient({ initialProducts = [], categoryName = null }) {
  // সর্ট করার স্টেট (default / low-to-high / high-to-low)
  const [sortBy, setSortBy] = useState("default");

  // মেমোরাইজড সর্ট করা প্রোডাক্ট তালিকা
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];

    if (sortBy === "low-to-high") {
      // কম থেকে বেশি দাম অনুযায়ী সর্ট
      return list.sort((a, b) => parsePrice(a.today) - parsePrice(b.today));
    }

    if (sortBy === "high-to-low") {
      // বেশি থেকে কম দাম অনুযায়ী সর্ট
      return list.sort((a, b) => parsePrice(b.today) - parsePrice(a.today));
    }

    // ডিফল্ট অর্ডার
    return list;
  }, [initialProducts, sortBy]);

  return (
    <div>
      {/* হেডার অংশ: নাম, পণ্যের সংখ্যা এবং সর্ট ড্রপডাউন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          {categoryName ? (
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
                {initialProducts[0]?.categoryIcon || "🛒"}
              </span>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                  {categoryName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                  {toBengaliNumber(initialProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                সব পণ্য
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                মোট {toBengaliNumber(initialProducts.length)}টি পণ্য দেখানো হচ্ছে
              </p>
            </div>
          )}
        </div>

        {/* সাজান (Sort) ড্রপডাউন */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white border border-gray-200/90 rounded-xl px-3 py-1.5 shadow-2xs">
          <label htmlFor="sort-dropdown" className="text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap">
            সাজান:
          </label>
          <select
            id="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs sm:text-sm font-medium text-gray-800 bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* প্রোডাক্ট কার্ডের গ্রিড */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sortedProducts.map((product) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";
            const pct = formatPercentage(product.change?.pct);

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white border border-gray-100 hover:border-emerald-300 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
              >
                {/* কার্ডের উপরের অংশ: আইকন, নাম ও একক */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-emerald-50 transition-colors flex items-center justify-center shrink-0 text-2xl select-none">
                    {product.image || product.categoryIcon || "🛒"}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#059669] transition-colors text-base leading-snug">
                      {product.nameBn}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatUnit(product.unit)}
                    </p>
                  </div>
                </div>

                {/* কার্ডের নিচের অংশ: আজকের দাম ও পরিবর্তনের হার */}
                <div className="flex items-end justify-between mt-6 pt-1">
                  <div>
                    <span className="text-[11px] text-gray-400 block font-normal leading-tight">
                      আজকের দাম
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-gray-900 leading-none mt-1 inline-block">
                      {toBengaliNumber(product.today)} টাকা
                    </span>
                  </div>

                  <div>
                    {isUp && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50/70 px-2.5 py-1 rounded-full">
                        ▲ {pct}%
                      </span>
                    )}

                    {isDown && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#059669] bg-emerald-50/70 px-2.5 py-1 rounded-full">
                        ▼ {pct}%
                      </span>
                    )}

                    {!isUp && !isDown && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-50/80 px-2.5 py-1 rounded-full">
                        — {pct}%
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
          এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
}
