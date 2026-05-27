import Link from "next/link";
import { FaHome, FaUser, FaTrophy, FaChartBar } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-900 text-white p-5 fixed left-0 top-0">
      <h1 className="text-3xl font-bold mb-10">
        CP Tracker
      </h1>

      <ul className="space-y-6 text-lg">
  <li>
    <Link
      href="/"
      className="flex items-center gap-3 hover:text-blue-400"
    >
      <FaHome />
      Dashboard
    </Link>
  </li>

  <li>
    <Link
      href="/profile"
      className="flex items-center gap-3 hover:text-blue-400"
    >
      <FaUser />
      Profile
    </Link>
  </li>

  <li>
    <Link
      href="/contests"
      className="flex items-center gap-3 hover:text-blue-400"
    >
      <FaTrophy />
      Contests
    </Link>
  </li>

  <li>
    <Link
      href="/leaderboard"
      className="flex items-center gap-3 hover:text-blue-400"
    >
      <FaChartBar />
      Leaderboard
    </Link>
  </li>
</ul>
    </div>
  );
}