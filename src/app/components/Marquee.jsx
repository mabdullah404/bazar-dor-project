import React from "react";

// ====================================================================
// ১. ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার জন্য সহজ ফাংশন
// ====================================================================
const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[digit]);
};

// ====================================================================
// ২. পরিমাপের একক বাংলায় রূপান্তরের ফাংশন (যেমন: kg -> কেজি)
// ====================================================================
const getUnitText = (unit) => {
  if (unit === "kg") return "কেজি";
  if (unit === "liter") return "লিটার";
  if (unit === "piece") return "টি";
  if (unit === "hali") return "হালি";
  return unit || "কেজি";
};

// ====================================================================
// ৩. API থেকে প্রডাক্টের দাম ফেচ করার ফাংশন
// ====================================================================
async function getProducts() {
  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        // ক্যাশিং ও অটো-রিভ্যালিডেশন (প্রতি ১ মিনিট পর পর আপডেট চেক করবে)
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return await res.json();
  } catch (error) {
    console.error("মারকুই প্রডাক্ট ফেচ করতে সমস্যা হয়েছে:", error);
    return [];
  }
}

// ====================================================================
// ৪. মূল মারকুই (Marquee) কম্পোনেন্ট
// ====================================================================
const Marquee = async () => {
  const products = await getProducts();

  // যদি কোনো ডেটা না পাওয়া যায়
  if (!products || products.length === 0) {
    return null;
  }

  // ইনফিনিট ও স্মুথ লুপের জন্য প্রডাক্টের লিস্ট ডাবল করা হয়েছে
  const marqueeList = [...products, ...products];

  return (
    <div className="w-full bg-[#f8fafc] border-y border-gray-200/70 overflow-hidden select-none">
      {/* অটোমেটিক স্ক্রোলিং কন্টেইনার (globals.css এ ডিফাইন করা .animate-marquee) */}
      <div className="animate-marquee flex items-center py-2">
        {marqueeList.map((product, index) => {
          // দাম বৃদ্ধি বা হ্রাসের দিক
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex items-center gap-2 px-5 border-r border-gray-200 text-xs sm:text-sm whitespace-nowrap shrink-0"
            >
              {/* প্রডাক্টের আইকন */}
              <span className="text-base leading-none">
                {product.image || product.categoryIcon || "🛒"}
              </span>

              {/* প্রডাক্টের বাংলা নাম */}
              <span className="font-semibold text-gray-800">
                {product.nameBn}
              </span>

              {/* আজকের দাম ও একক */}
              <span className="text-gray-700">
                {toBengaliNumber(product.today)} টাকা/{getUnitText(product.unit)}
              </span>

              {/* দাম বৃদ্ধি বা হ্রাসের পার্সেন্টেজ ও তীর চিহ্ন */}
              {isUp && (
                <span className="text-red-500 font-bold flex items-center gap-0.5">
                  ▲ {toBengaliNumber(Math.abs(product.change.pct))}%
                </span>
              )}

              {isDown && (
                <span className="text-[#059669] font-bold flex items-center gap-0.5">
                  ▼ {toBengaliNumber(Math.abs(product.change.pct))}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Marquee;