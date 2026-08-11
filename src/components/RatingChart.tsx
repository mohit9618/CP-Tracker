"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { getCodeforcesData } from "../services/codeforces";

export default function RatingChart({
  username,
}: any) {

  const [data, setData] = useState<any[]>([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [maxRating, setMaxRating] = useState(0);

  useEffect(() => {

    async function fetchRating() {

  // Clear old graph data before new search
  setData([]);
  setCurrentRating(0);
  setMaxRating(0);

  try {

    const data = await getCodeforcesData(username);

    console.log(data);

    if (!data || !data.ratingHistory) {
      return;
    }

    const formatted = data.ratingHistory.map((contest, index) => ({
  contest: contest.contestName,
  rating: contest.newRating,
  contestNo: index + 1,
}));
  <XAxis
  dataKey="contestNo"
  stroke="#94a3b8"
/>
    setData(formatted);

    if (data.ratingHistory.length > 0) {

      setCurrentRating(
        data.ratingHistory[data.ratingHistory.length - 1].newRating
      );

      const max = Math.max(
        ...data.ratingHistory.map((c: any) => c.newRating)
      );

      setMaxRating(max);
    }

  } catch (error) {

    console.error(error);

    // Clear graph on error
    setData([]);
    setCurrentRating(0);
    setMaxRating(0);
  }
}

    fetchRating();

  }, [username]);

  if (!data.length) {
  return (
    <div className="bg-[#111a2e] rounded-3xl p-8 mt-10 border border-[#263550]">
      <div className="h-8 w-48 bg-[#1a2740] rounded animate-pulse mb-6" />
      <div className="h-[400px] bg-[#1a2740] rounded animate-pulse" />
    </div>
  );
}
 return (
  <div
    className="
      bg-[#111a2e]/80
      backdrop-blur-xl
      border
      border-[#263550]
      rounded-3xl
      p-8
      mt-10
      shadow-[0_10px_40px_rgba(0,0,0,0.2)]
    "
  >
    {/* Header */}

    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

      <div>
        <h2 className="text-3xl font-bold text-slate-100">
          Rating Analytics
        </h2>

        <p className="text-slate-400 mt-2">
          Track rating growth across contests
        </p>
      </div>

    </div>

    {/* Stats */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      <div
        className="
          bg-[#151f35]/90
          border
          border-[#2a3852]
          rounded-2xl
          p-6
          shadow-[0_8px_30px_rgba(0,0,0,0.15)]
        "
      >
        <p className="text-slate-500 text-sm">
          Current Rating
        </p>

        <h3 className="text-4xl font-bold text-cyan-400 mt-2">
          {currentRating || "--"}
        </h3>
      </div>

      <div
        className="
          bg-[#151f35]/90
          border
          border-[#2a3852]
          rounded-2xl
          p-6
          shadow-[0_8px_30px_rgba(0,0,0,0.15)]
        "
      >
        <p className="text-slate-500 text-sm">
          Highest Rating
        </p>

        <h3 className="text-4xl font-bold text-purple-400 mt-2">
          {maxRating || "--"}
        </h3>
      </div>

    </div>

    {/* Chart */}

    <div className="h-[450px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27344D"
          />

          <XAxis
            dataKey="contest"
            hide
          />

          <YAxis
            stroke="#64748b"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111a2e",
              border: "1px solid #344258",
              borderRadius: "12px",
              color: "#f8fafc",
            }}
          />

          <Line
            type="monotone"
            dataKey="rating"
            stroke="#818cf8"
            strokeWidth={4}
            dot={false}
            animationDuration={1800}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>
);
}