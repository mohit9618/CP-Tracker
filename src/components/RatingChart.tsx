"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getCodeforcesData } from "../services/codeforces";

export default function RatingChart({
  username,
}: {
  username: string;
}) {

  const [chartData, setChartData] = useState<any[]>([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [maxRating, setMaxRating] = useState(0);

  useEffect(() => {

    async function fetchRating() {

      try {

        const response = await getCodeforcesData(username);

        console.log("Rating API Response:", response);

        if (
          !response ||
          !response.ratingHistory ||
          !Array.isArray(response.ratingHistory)
        ) {
          setChartData([]);
          return;
        }

        const formattedData = response.ratingHistory.map(
          (contest: any) => ({
            contest: contest.contestName,
            rating: contest.newRating,
          })
        );

        setChartData(formattedData);

        if (response.userInfo) {

          setCurrentRating(
            response.userInfo.rating || 0
          );

          setMaxRating(
            response.userInfo.maxRating || 0
          );
        }

      } catch (error) {

        console.error(
          "Error fetching rating data:",
          error
        );

        setChartData([]);
      }
    }

    if (username) {
      fetchRating();
    }

  }, [username]);

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-10">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Rating Progress
      </h2>

      <div className="flex gap-10 mb-6 text-white">

        <div>
          <p className="text-gray-400">
            Current Rating
          </p>

          <h3 className="text-3xl font-bold">
            {currentRating}
          </h3>
        </div>

        <div>
          <p className="text-gray-400">
            Max Rating
          </p>

          <h3 className="text-3xl font-bold text-yellow-400">
            {maxRating}
          </h3>
        </div>

      </div>

      <div className="w-full h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={chartData}>

            <XAxis
              dataKey="contest"
              hide
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="rating"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}