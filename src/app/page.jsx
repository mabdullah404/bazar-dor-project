import React from "react";
import Hero from "./components/Hero";
import PriceChanges from "./components/PriceChanges";
import AllProducts from "./components/AllProducts";

// ====================================================================
// হোম পেইজ (Home Page)
// এখানে পর্যায়ক্রমে হিরো, দাম বৃদ্ধি-হ্রাস এবং সব পণ্য সেকশন সাজানো হয়েছে
// ====================================================================
export default async function Home({ searchParams }) {
  // ক্যাটাগরি ফিল্টার কুয়েরি প্যারামিটার (যেমন: ?category=chal)
  const params = await searchParams;
  const selectedCategory =
    typeof params?.category === "string" ? params.category : "";

  return (
    <main className="pb-20">
      {!selectedCategory && <Hero />}

      {!selectedCategory && <PriceChanges />}

      <AllProducts category={selectedCategory} />
    </main>
  );
}