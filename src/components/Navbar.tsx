"use client";

import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
  <div
    className="
      bg-[#0d1424]/80
      backdrop-blur-xl
      border
      border-[#26334A]
      rounded-2xl
      px-6
      py-4
      flex
      justify-between
      items-center
      mb-8
      shadow-[0_8px_30px_rgba(0,0,0,0.25)]
    "
  >
    {/* Left */}

    <div>
      <h1 className="text-2xl font-bold text-slate-100">
        CP Tracker
      </h1>

      <p className="text-sm text-slate-400">
        Competitive Programming Analytics
      </p>
    </div>

    {/* Right */}

    <div className="flex items-center gap-4">

      <div
        className="
          hidden
          md:flex
          items-center
          gap-3
          bg-[#080d19]
          border
          border-[#2b3850]
          rounded-xl
          px-4
          py-2
          shadow-inner
        "
      >
        <FaSearch className="text-slate-500" />

        <span className="text-slate-500 text-sm">
          Search users...
        </span>
      </div>

      <div
        className="
          bg-gradient-to-br
          from-indigo-500
          to-purple-600
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          font-bold
          text-white
          shadow-lg
          shadow-purple-500/20
        "
      >
        M
      </div>

    </div>
  </div>
);
}