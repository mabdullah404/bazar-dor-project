import React from "react";
import Link from "next/link";

// ====================================================================
// ১. সংখ্যাকে বাংলায় রূপান্তর 
// ====================================================================
const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  return Number(num).toLocaleString("bn-BD");
};

// ====================================================================
// ২. পরিমাপের একক   ফাংশন
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
// ৩. API থেকে প্রডাক্টের ডেটা ফেচ
// ====================================================================
async function getProducts() {
  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        // প্রতি ১ মিনিট পর পর ক্যাশ অটো-রিভ্যালিডেট হবে
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return await res.json();
  } catch (error) {
    console.error("প্রডাক্ট ডেটা লোড করতে সমস্যা হয়েছে:", error);
    return [];
  }
}

// ====================================================================
// ৪. (Reusable Card)
// ====================================================================
function ProductCard({ product, type }) {
  const isUp = type === "up";
  
  // পার্সেন্টেজ এক দশমিক স্থান পর্যন্ত বাংলায় রূপান্তর
  const pctFormatted = toBengaliNumber(
    Math.abs(product.change?.pct || 0).toFixed(1)
  );

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white border border-gray-100 hover:border-emerald-300 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
    >
      {/* কার্ডের উপরের অংশ: আইকন, নাম ও একক */}
      <div className="flex items-center gap-3.5">
        {/* আইকন বক্স */}
        <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-emerald-50 transition-colors flex items-center justify-center shrink-0 text-2xl select-none">
          {product.image || product.categoryIcon || "🛒"}
        </div>
        
        {/* প্রডাক্টের নাম এবং প্রতি কেজি/ডজন */}
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-[#059669] transition-colors text-base leading-snug">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* কার্ডের নিচের অংশ: আজকের দাম ও দাম পরিবর্তনের পার্সেন্টেজ */}
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

        {/* দাম বাড়া বা কমার ইন্ডিকেটর */}
        <div>
          {isUp ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50/70 px-2.5 py-1 rounded-full">
              ▲ {pctFormatted}%
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#059669] bg-emerald-50/70 px-2.5 py-1 rounded-full">
              ▼ {pctFormatted}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ====================================================================
// ৫. মূল কম্পোনেন্ট: আজ দাম বেড়েছে এবং আজ দাম কমেছে সেকশন
// ====================================================================
export default async function PriceChanges() {
  const products = await getProducts();

  // ১. যেগুলোর দাম বেড়েছে (সর্বোচ্চ পরিবর্তন অনুযায়ী ক্রমানুসারে ৬টি)
  const increasedProducts = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  // ২. যেগুলোর দাম কমেছে (সর্বোচ্চ পরিবর্তন অনুযায়ী ক্রমানুসারে ৬টি)
  const decreasedProducts = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-4">
      
      {/* ============================================================
          সেকশন ১: আজ দাম বেড়েছে
      ============================================================ */}
      <section>
        {/* সেকশন হেডার */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-500 text-sm font-black">▲</span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            আজ দাম বেড়েছে
          </h2>
        </div>

        {/* ৩ কলাম গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {increasedProducts.map((product) => (
            <ProductCard key={`up-${product.id}`} product={product} type="up" />
          ))}
        </div>
      </section>

      {/* ============================================================
          সেকশন ২: আজ দাম কমেছে
      ============================================================ */}
      <section>
        {/* সেকশন হেডার */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#059669] text-sm font-black">▼</span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            আজ দাম কমেছে
          </h2>
        </div>

        {/* ৩ কলাম গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {decreasedProducts.map((product) => (
            <ProductCard key={`down-${product.id}`} product={product} type="down" />
          ))}
        </div>
      </section>

    </div>
  );
}
