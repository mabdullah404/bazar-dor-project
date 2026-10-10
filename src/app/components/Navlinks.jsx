import React from "react";
import CategoryList from "./CategoryList";

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
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default Navlinks;