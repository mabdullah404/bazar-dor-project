import React from "react";
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
// ৩. পরিমাপের একক বাংলায় রূপান্তরের সহজ ফাংশন
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
// ৪. API থেকে সকল প্রডাক্ট ফেচ করার ফাংশন
// ====================================================================
async function getProducts(category) {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products${
        category ? `?category=${encodeURIComponent(category)}` : ""
      }`,
      {
        // প্রতি ১ মিনিট পর পর ক্যাশ রিভ্যালিডেট হবে
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return await res.json();
  } catch (error) {
    console.error("সকল পণ্য লোড করতে সমস্যা হয়েছে:", error);
    return [];
  }
}

// ====================================================================
// ৫. মূল কম্পোনেন্ট: 'সব পণ্য' সেকশন
// ====================================================================
export default async function AllProducts({ category = "" }) {
  const products = await getProducts(category);

  // ক্যাটাগরির বাংলা নাম (যদি ফিল্টার করা থাকে)
  const categoryName =
    category && products.length > 0
      ? products[0].categoryNameBn
      : category || null;

  return (
    <section id="all-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {categoryName ? (
        <div className="mb-5 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs sm:p-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-3xl">
            {products[0]?.categoryIcon || "🛒"}
          </span>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              {categoryName}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
      )}

      {/* ৩ কলাম রেসপনসিভ গ্রিড (ফিগমা ডিজাইনের মতো) */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {products.map((product) => {
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
                {/* আইকন বক্স */}
                <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-emerald-50 transition-colors flex items-center justify-center shrink-0 text-2xl select-none">
                  {product.image || product.categoryIcon || "🛒"}
                </div>

                {/* প্রডাক্টের নাম ও পরিমাপের একক */}
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
                {/* আজকের দাম */}
                <div>
                  <span className="text-[11px] text-gray-400 block font-normal leading-tight">
                    আজকের দাম
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-gray-900 leading-none mt-1 inline-block">
                    {toBengaliNumber(product.today)} টাকা
                  </span>
                </div>

                {/* পরিবর্তনের হার (বাড়লে লাল ▲, কমলে সবুজ ▼, অপরিবর্তিত থাকলে ধূসর —) */}
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
    </section>
  );
}
