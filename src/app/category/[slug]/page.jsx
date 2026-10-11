import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProductGrid from "./CategoryProductGrid";

export const instant = false;

// ====================================================================
// ১. সব ক্যাটাগরি ফেচ করার ফাংশন
// ====================================================================
async function getCategories() {
  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories",
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// ====================================================================
// ২. নির্দিষ্ট ক্যাটাগরির পণ্য ফেচ করার ফাংশন
// ====================================================================
async function getProductsByCategory(slug) {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// ====================================================================
// ৩. ডায়নামিক মেটাডাটা (SEO)
// ====================================================================
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "ক্যাটাগরি পাওয়া যায়নি — বাজার দর" };
  }

  return {
    title: `${category.nameBn} — বাজার দর`,
    description: `${category.nameBn} বিভাগের সকল পণ্যের আজকের বাজার দর দেখুন।`,
  };
}

// ====================================================================
// ৪. কঙ্কাল লোডার (Skeleton Loader)
// ====================================================================
function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs animate-pulse"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
              <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
            </div>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div className="space-y-1.5">
              <div className="h-3 bg-gray-100 rounded w-16" />
              <div className="h-5 bg-gray-200 rounded w-24" />
            </div>
            <div className="h-6 bg-gray-100 rounded-full w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ====================================================================
// ৫. মূল Category পেজ কম্পোনেন্ট
// ====================================================================
export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);

  // ক্যাটাগরি ভ্যালিড কিনা চেক করা
  const category = categories.find((c) => c.slug === slug);

  // ইনভ্যালিড slug → 404
  if (!category && products.length === 0) {
    notFound();
  }

  // ক্যাটাগরির তথ্য (API থেকে না পেলে পণ্যের data থেকে নেওয়া)
  const categoryIcon = category?.icon || products[0]?.categoryIcon || "🛒";
  const categoryNameBn = category?.nameBn || products[0]?.categoryNameBn || slug;

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* ================= ব্রেডক্রাম্ব ================= */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-[#059669] transition-colors">
            হোম
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-800 font-semibold">{categoryNameBn}</span>
        </nav>

        {/* ================= ক্যাটাগরি হেডার ================= */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-3xl shadow-2xs shrink-0">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {categoryNameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              এই বিভাগের সকল পণ্যের আজকের বাজার দর
            </p>
          </div>
        </div>

        {/* ================= পণ্য গ্রিড (Loading State with Suspense) ================= */}
        <Suspense fallback={<ProductSkeleton />}>
          <CategoryProductGrid
            products={products}
            categoryNameBn={categoryNameBn}
          />
        </Suspense>

      </div>
    </main>
  );
}
