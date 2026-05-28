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

import { getUserRating } from "@/services/codeforces";

export default function RatingChart({
  username,
}: any) {

  const [data, setData] = useState<any[]>([]);
  const [currentRating, setCurrentRating] = useState(0);

const [maxRating, setMaxRating] = useState(0);

  useEffect(() => {

    async function fetchRating() {

      const result = await getUserRating(username);

      const formattedData = result.map((contest: any) => ({
        contest: contest.contestName,
        rating: contest.newRating,
      }));

      setData(formattedData);
      if (result.length > 0) {

  setCurrentRating(
    result[result.length - 1].newRating
  );

  const max = Math.max(
    ...result.map((c: any) => c.newRating)
  );

  setMaxRating(max);
}
    }

    fetchRating();

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
      <div className="w-full h-96">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

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
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}