import Image from "next/image";
import Link from "next/link";
import Navlinks from "./Navlinks";
import DateDisplay from "./DateDisplay";
import UserInfo from "./UserInfo";

export const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-100 shadow-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Logo & Title & Date */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-[#059669] w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <DateDisplay />
          </div>
        </Link>

        {/* Right: User Session & Auth Buttons */}
        <UserInfo />
      </div>

      {/* Categories Navigation Bar below main Navbar */}
      <Navlinks />
    </header>
  );
};

export default Navbar;
