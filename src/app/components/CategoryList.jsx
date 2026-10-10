"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


function CategoryPillsContent({ categories = [] }) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* ১. সকল পণ্য (All items) বাটন */}
      <Link
        href="/"
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
          !currentCategory
            ? "bg-[#059669] text-white shadow-xs"
            : "bg-white hover:bg-emerald-50 text-gray-700 hover:text-[#059669] border border-gray-200/90 hover:border-emerald-300 shadow-2xs"
        }`}
      >
        <span className="text-sm">🏪</span>
        <span>সকল পণ্য</span>
      </Link>

      {/* ২. ডায়নামিক ক্যাটাগরি তালিকা */}
      {categories.map((category) => {
        const isActive = currentCategory === category.slug;

        return (
          <Link
            key={category.id || category.slug}
            href={`/?category=${encodeURIComponent(category.slug)}`}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              isActive
                ? "bg-[#059669] text-white shadow-xs"
                : "bg-white hover:bg-emerald-50 text-gray-700 hover:text-[#059669] border border-gray-200/90 hover:border-emerald-300 shadow-2xs"
            }`}
          >
            <span className="text-base leading-none">{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function CategoryList({ categories = [] }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2 py-2.5 overflow-x-auto">
          <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      }
    >
      <CategoryPillsContent categories={categories} />
    </Suspense>
  );
}
