"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getMyAnalytics } from "../../../services/analytics";
import ProtectedRoute from "../../../components/ProtectedRoute";


export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const data = await getMyAnalytics();
        setAnalytics(data);
      } catch (error) {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 p-10">
      Loading analytics...
    </div>
  );
  }

  if (error || !analytics) {
    return (
    <div className="min-h-screen bg-[#0B0F19] text-red-400 p-10">
      {error}
    </div>
  );
  }

  // Convert rating object into array for Recharts
  const ratingData = Object.entries(
    analytics.ratingDistribution
  )
    .map(([rating, count]) => ({
      rating: Number(rating),
      solved: Number(count),
    }))
    .sort((a, b) => a.rating - b.rating);

  // Convert topic object into array
  const topicData = Object.entries(
    analytics.topicDistribution
  )
    .map(([topic, count]) => ({
      topic,
      solved: Number(count),
    }))
    .sort((a, b) => b.solved - a.solved)
    .slice(0, 10);
console.log("Rating data:", ratingData);
return (
  <ProtectedRoute>
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-10">

      {/* Header */}

      <Link
        href="/"
        className="inline-block text-slate-400 hover:text-cyan-300 transition mb-8"
      >
        ← Back to Home
      </Link>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-100">
          My Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Detailed competitive programming insights for{" "}
          <span className="text-cyan-400 font-semibold">
            {analytics.codeforcesHandle}
          </span>
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-[#151f35]/90 border border-[#2a3852] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
          <p className="text-slate-500 text-sm">
            Problems Solved
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-2">
            {analytics.totalSolved}
          </h2>
        </div>

        <div className="bg-[#151f35]/90 border border-[#2a3852] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
          <p className="text-slate-500 text-sm">
            Top Topic
          </p>

          <h2 className="text-2xl font-bold text-slate-100 mt-3 capitalize">
            {topicData[0]?.topic || "N/A"}
          </h2>
        </div>

        <div className="bg-[#151f35]/90 border border-[#2a3852] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
          <p className="text-slate-500 text-sm">
            Most Solved Rating
          </p>

          <h2 className="text-3xl font-bold text-purple-400 mt-2">
            {ratingData.length
              ? ratingData.reduce((best, current) =>
                  current.solved > best.solved
                    ? current
                    : best
                ).rating
              : "N/A"}
          </h2>
        </div>

      </div>

      {/* Problems Solved by Rating */}

      <div className="bg-[#111a2e]/90 border border-[#263550] rounded-2xl p-6 mb-8 shadow-[0_10px_40px_rgba(0,0,0,0.15)]">

        <div className="mb-6">

          <h2 className="text-xl font-semibold text-slate-100">
            Problems Solved by Rating
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Your solved problems across different difficulty ratings
          </p>

        </div>

        {ratingData.length > 0 ? (

          <div className="w-full" style={{ height: "350px" }}>

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={ratingData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 10,
                  bottom: 10,
                }}
              >

                <XAxis
                  dataKey="rating"
                  stroke="#64748b"
                  type="category"
                />

                <YAxis
                  stroke="#64748b"
                  allowDecimals={false}
                />

                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#111a2e",
                    border: "1px solid #344258",
                    borderRadius: "10px",
                    color: "#f8fafc",
                  }}
                  labelStyle={{
                    color: "#f8fafc",
                  }}
                />

                <Bar
                  dataKey="solved"
                  fill="#22d3ee"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        ) : (

          <p className="text-slate-500">
            No rating data available.
          </p>

        )}

      </div>

      {/* Topic Chart */}

      <div className="bg-[#111a2e]/90 border border-[#263550] rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.15)]">

        <div className="mb-6">

          <h2 className="text-xl font-semibold text-slate-100">
            Strongest Topics
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Topics where you have solved the most problems
          </p>

        </div>

        <div className="w-full h-[400px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={topicData}
              margin={{
                bottom: 50,
              }}
            >

              <XAxis
                dataKey="topic"
                stroke="#64748b"
                angle={-20}
                textAnchor="end"
                height={90}
              />

              <YAxis
                stroke="#64748b"
                allowDecimals={false}
              />

              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "#111a2e",
                  border: "1px solid #344258",
                  borderRadius: "10px",
                  color: "#f8fafc",
                }}
              />

              <Bar
                dataKey="solved"
                fill="#818cf8"
                radius={[6, 6, 0, 0]}
                maxBarSize={70}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  </ProtectedRoute>
);
}