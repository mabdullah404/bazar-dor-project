import React from "react";

// ====================================================================
// ফুটার কম্পোনেন্ট (Simple Minimal Footer)
// ====================================================================
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-500">
        <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        <span>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</span>
      </div>
    </footer>
  );
};

export default Footer;
