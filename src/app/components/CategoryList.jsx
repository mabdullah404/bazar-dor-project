"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryList({ categories = [] }) {
  const pathname = usePathname();

  // pathname /category/[slug] থেকে slug বের করা
  const pathSlug = pathname?.startsWith("/category/")
    ? pathname.replace("/category/", "").split("/")[0]
    : "";

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* ১. সকল পণ্য বাটন — শুধু হোমপেজে active */}
      <Link
        href="/"
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
          pathname === "/"
            ? "bg-[#059669] text-white shadow-xs"
            : "bg-white hover:bg-emerald-50 text-gray-700 hover:text-[#059669] border border-gray-200/90 hover:border-emerald-300 shadow-2xs"
        }`}
      >
        <span className="text-sm">🏪</span>
        <span>সকল পণ্য</span>
      </Link>

      {/* ২. ডায়নামিক ক্যাটাগরি লিংক — /category/[slug] রুটে যাবে */}
      {categories.map((category) => {
        const isActive = pathSlug === category.slug;

        return (
          <Link
            key={category.id || category.slug}
            href={`/category/${encodeURIComponent(category.slug)}`}
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
