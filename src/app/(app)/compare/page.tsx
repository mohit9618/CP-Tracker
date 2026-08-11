"use client";

import { useState } from "react";
import { getCodeforcesData } from "../../../services/codeforces";

export default function ComparePage() {
  const [user1, setUser1] = useState("tourist");
  const [user2, setUser2] = useState("Petr");

  const [data1, setData1] = useState<any>(null);
  const [data2, setData2] = useState<any>(null);

  async function compareUsers() {
    const userData1 = await getCodeforcesData(user1);
    const userData2 = await getCodeforcesData(user2);

    setData1(userData1);
    setData2(userData2);
  }

  function getWinner(value1: number, value2: number) {
    if (value1 > value2) return user1;
    if (value2 > value1) return user2;
    return "Tie";
  }

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
        Compare Profiles
      </h1>

      <p className="text-slate-400 mt-3">
        Battle two Codeforces users side by side
      </p>
    </div>

    {/* Search Section */}

    <div
      className="
        bg-[#151f35]/90
        backdrop-blur-md
        border
        border-[#2a3852]
        rounded-3xl
        p-6
        mb-8
      "
    >
      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="text"
          value={user1}
          onChange={(e) => setUser1(e.target.value)}
          placeholder="First Username"
          className="
            bg-[#080D1C]
            border
            border-[#344258]
            p-4
            rounded-xl
            outline-none
            focus:border-cyan-500
          "
        />

        <input
          type="text"
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
          placeholder="Second Username"
          className="
            bg-[#080D1C]
            border
            border-[#344258]
            p-4
            rounded-xl
            outline-none
            focus:border-cyan-500
          "
        />

        <button
          onClick={compareUsers}
          className="
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            rounded-xl
            font-semibold
            hover:scale-105
            transition
          "
        >
          Compare
        </button>

      </div>
    </div>

    {data1 && data2 && (
      <>
        {/* Profile Cards */}

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-[#151f35] border border-[#2a3852] rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-cyan-400">
              {data1.userInfo.handle}
            </h3>

            <p className="text-slate-400 mt-2 capitalize">
              {data1.userInfo.rank}
            </p>

            <div className="mt-4 text-4xl font-bold">
              {data1.userInfo.rating}
            </div>
          </div>

          <div className="bg-[#151f35] border border-[#2a3852] rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-purple-400">
              {data2.userInfo.handle}
            </h3>

            <p className="text-slate-400 mt-2 capitalize">
              {data2.userInfo.rank}
            </p>

            <div className="mt-4 text-4xl font-bold">
              {data2.userInfo.rating}
            </div>
          </div>

        </div>

        {/* Comparison Table */}

        <div
          className="
            bg-[#151f35]/90
            backdrop-blur-md
            border
            border-[#2a3852]
            rounded-3xl
            p-6
            overflow-x-auto
          "
        >
          <table className="w-full border-separate border-spacing-y-3">

            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-lg">
                  Metric
                </th>

                <th className="text-left px-6 py-4 text-lg text-cyan-400">
                  {data1.userInfo.handle}
                </th>

                <th className="text-left px-6 py-4 text-lg text-purple-400">
                  {data2.userInfo.handle}
                </th>

                <th className="text-left px-6 py-4 text-lg">
                  Winner
                </th>
              </tr>
            </thead>

            <tbody>

              <tr className="bg-[#19243b]">
                <td className="px-6 py-5 rounded-l-xl">
                  Rating
                </td>

                <td
                  className={`px-6 py-5 ${
                    data1.userInfo.rating > data2.userInfo.rating
                      ? "text-green-400 font-bold"
                      : ""
                  }`}
                >
                  {data1.userInfo.rating}
                </td>

                <td
                  className={`px-6 py-5 ${
                    data2.userInfo.rating > data1.userInfo.rating
                      ? "text-green-400 font-bold"
                      : ""
                  }`}
                >
                  {data2.userInfo.rating}
                </td>

                <td className="px-6 py-5 rounded-r-xl">
                  {getWinner(
                    data1.userInfo.rating,
                    data2.userInfo.rating
                  )}
                </td>
              </tr>

              <tr className="bg-[#19243b]">
                <td className="px-6 py-5 rounded-l-xl">
                  Max Rating
                </td>

                <td
                  className={`px-6 py-5 ${
                    data1.userInfo.maxRating > data2.userInfo.maxRating
                      ? "text-green-400 font-bold"
                      : ""
                  }`}
                >
                  {data1.userInfo.maxRating}
                </td>

                <td
                  className={`px-6 py-5 ${
                    data2.userInfo.maxRating > data1.userInfo.maxRating
                      ? "text-green-400 font-bold"
                      : ""
                  }`}
                >
                  {data2.userInfo.maxRating}
                </td>

                <td className="px-6 py-5 rounded-r-xl">
                  {getWinner(
                    data1.userInfo.maxRating,
                    data2.userInfo.maxRating
                  )}
                </td>
              </tr>

              <tr className="bg-[#19243b]">
                <td className="px-6 py-5 rounded-l-xl">
                  Problems Solved
                </td>

                <td
                  className={`px-6 py-5 ${
                    data1.totalSolved > data2.totalSolved
                      ? "text-green-400 font-bold"
                      : ""
                  }`}
                >
                  {data1.totalSolved}
                </td>

                <td
                  className={`px-6 py-5 ${
                    data2.totalSolved > data1.totalSolved
                      ? "text-green-400 font-bold"
                      : ""
                  }`}
                >
                  {data2.totalSolved}
                </td>

                <td className="px-6 py-5 rounded-r-xl">
                  {getWinner(
                    data1.totalSolved,
                    data2.totalSolved
                  )}
                </td>
              </tr>

              <tr className="bg-[#19243b]">
                <td className="px-6 py-5 rounded-l-xl">
                  Contests
                </td>

                <td
                  className={`px-6 py-5 ${
                    data1.totalContests > data2.totalContests
                      ? "text-green-400 font-bold"
                      : ""
                  }`}
                >
                  {data1.totalContests}
                </td>

                <td
                  className={`px-6 py-5 ${
                    data2.totalContests > data1.totalContests
                      ? "text-green-400 font-bold"
                      : ""
                  }`}
                >
                  {data2.totalContests}
                </td>

                <td className="px-6 py-5 rounded-r-xl">
                  {getWinner(
                    data1.totalContests,
                    data2.totalContests
                  )}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
);
}