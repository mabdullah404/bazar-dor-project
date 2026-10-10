import React from "react";
import ProductGridClient from "./ProductGridClient";

// ====================================================================
// ১. API থেকে প্রডাক্ট ফেচ ফাংশন
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
// ২. 'সব পণ্য' সেকশন (Server Component)
// ====================================================================
export default async function AllProducts({ category = "" }) {
  const products = await getProducts(category);

  // ক্যাটাগরির বাংলা নাম (যদি ফিল্টার করা থাকে)
  const categoryName =
    category && products.length > 0
      ? products[0].categoryNameBn
      : category || null;

  return (
    <section id="সব-পণ্য" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-6">
    
      <div id="all-products" />

      {/* ক্লায়েন্ট কম্পোনেন্টে সর্টিং এবং কার্ড রেন্ডারিং */}
      <ProductGridClient
        initialProducts={products}
        categoryName={categoryName}
      />
    </section>
  );
}
