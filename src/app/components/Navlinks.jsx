import React from "react";
import Link from "next/link";

const Navlinks = async () => {
  let categories = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories",
      {
        // Revalidate cache periodically (e.g. every hour)
        next: { revalidate: 3600 },
      }
    );

    if (res.ok) {
      categories = await res.json();
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  // If no categories returned, don't break the layout
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-100 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* সকল পণ্য (All items) */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 bg-[#059669] text-white hover:bg-[#047857] shadow-xs cursor-pointer"
          >
            <span className="text-sm">🏪</span>
            <span>সকল পণ্য</span>
          </Link>

          {/* Dynamic categories from API */}
          {categories.map((category) => (
            <Link
              key={category.id || category.slug}
              href={`/?category=${encodeURIComponent(category.slug)}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 bg-white hover:bg-emerald-50 text-gray-700 hover:text-[#059669] border border-gray-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-xs cursor-pointer"
            >
              <span className="text-base leading-none">{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navlinks;