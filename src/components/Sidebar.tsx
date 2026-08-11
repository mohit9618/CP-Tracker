"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


import {
  FaHome,
  FaTrophy,
  FaChartBar,
} from "react-icons/fa";

import { GiCrossedSwords } from "react-icons/gi";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Compare",
      href: "/compare",
      icon: <GiCrossedSwords />,
    },
    {
      name: "Contests",
      href: "/contests",
      icon: <FaTrophy />,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: <FaChartBar />,
    },
  ];

  return (
  <aside
    className="
      w-72
      h-screen
      fixed
      left-0
      top-0
      bg-[#080D1C]
      backdrop-blur-xl
      border-r
      border-[#202B40]
      text-white
      p-6
      shadow-[8px_0_30px_rgba(0,0,0,0.18)]
    "
  >
    {/* Logo */}

    <Link
      href="/"
      className="block mb-12"
    >
      <h1
        className="
          text-3xl
          font-extrabold
          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-indigo-500
          bg-clip-text
          text-transparent
        "
      >
        CP Tracker
      </h1>

      <p className="text-slate-500 text-sm mt-2">
        Track • Analyze • Improve
      </p>
    </Link>

    {/* Navigation */}

    <nav>
      <ul className="space-y-3">

        {links.map((link) => {

          const active =
            pathname === link.href;

          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  duration-300

                  ${
                    active
                      ? "bg-[#17233A] text-cyan-300 border border-cyan-400/25 shadow-[0_0_20px_rgba(34,211,238,0.06)]"
                      : "text-slate-400 hover:bg-[#111827] hover:text-slate-200"
                  }
                `}
              >
                <span
                  className={`text-xl ${
                    active ? "text-cyan-400" : "text-slate-500"
                  }`}
                >
                  {link.icon}
                </span>

                <span className="font-medium">
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}

      </ul>
    </nav>

    {/* Bottom Section */}

    <div
      className="
        absolute
        bottom-6
        left-6
        right-6
        bg-[#0f1729]
        border
        border-[#202B40]
        rounded-2xl
        p-4
        shadow-[0_8px_25px_rgba(0,0,0,0.2)]
      "
    >
      <p className="text-slate-500 text-sm">
        Competitive Programming
      </p>

      <h3 className="font-semibold mt-1 text-slate-200">
        Analytics Dashboard
      </h3>
    </div>
  </aside>
);
}