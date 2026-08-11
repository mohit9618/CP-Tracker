"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "../../../services/leaderboard";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const data = await getLeaderboard();
      setUsers(data);
    }

    fetchLeaderboard();
  }, []);

  return (
  <div className="min-h-screen bg-[#0B0F19] text-white p-8 lg:p-10">

    {/* Header */}

    <div className="mb-10">
      <h1
        className="
          text-5xl
          font-extrabold
          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-purple-500
          bg-clip-text
          text-transparent
        "
      >
        Leaderboard
      </h1>

      <p className="text-slate-400 mt-3">
        Top competitive programmers ranked by performance
      </p>
    </div>

    {/* Top 3 Cards */}

    {users.length >= 3 && (
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* 2nd Place */}

        <div className="bg-[#151f35] border border-[#2a3852] rounded-3xl p-6 text-center">
          <div className="text-4xl mb-3">🥈</div>

          <h3 className="text-2xl font-bold">
            {users[1]?.username}
          </h3>

          <p className="text-slate-400 mt-2">
            Rating
          </p>

          <div className="text-3xl font-bold mt-2">
            {users[1]?.rating}
          </div>
        </div>

        {/* 1st Place */}

        <div className="bg-[#151f35] border border-yellow-500/40 rounded-3xl p-8 text-center scale-105">
          <div className="text-5xl mb-3">🏆</div>

          <h3 className="text-3xl font-bold text-yellow-400">
            {users[0]?.username}
          </h3>

          <p className="text-slate-400 mt-2">
            Rating
          </p>

          <div className="text-4xl font-bold mt-2">
            {users[0]?.rating}
          </div>
        </div>

        {/* 3rd Place */}

        <div className="bg-[#151f35] border border-[#2a3852] rounded-3xl p-6 text-center">
          <div className="text-4xl mb-3">🥉</div>

          <h3 className="text-2xl font-bold">
            {users[2]?.username}
          </h3>

          <p className="text-slate-400 mt-2">
            Rating
          </p>

          <div className="text-3xl font-bold mt-2">
            {users[2]?.rating}
          </div>
        </div>

      </div>
    )}

    {/* Table */}

    <div
      className="
        bg-[#151f35]/90
        backdrop-blur-md
        border
        border-[#2a3852]
        rounded-3xl
        overflow-hidden
      "
    >
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b border-[#2a3852] bg-[#080D1C]">

              <th className="text-left p-5">
                Rank
              </th>

              <th className="text-left p-5">
                Username
              </th>

              <th className="text-left p-5">
                Rating
              </th>

              <th className="text-left p-5">
                Solved
              </th>

              <th className="text-left p-5">
                Contests
              </th>

            </tr>
          </thead>

          <tbody>

            {users.map((user, index) => (

              <tr
                key={user.username}
                className="
                  border-b
                  border-[#2a3852]
                  hover:bg-[#19243b]
                  transition
                "
              >

                <td className="p-5 font-semibold">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `#${index + 1}`}
                </td>

                <td className="p-5 font-medium">
                  {user.username}
                </td>

                <td className="p-5 text-cyan-400 font-bold">
                  {user.rating}
                </td>

                <td className="p-5">
                  {user.totalSolved}
                </td>

                <td className="p-5">
                  {user.totalContests}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>

  </div>
);
}