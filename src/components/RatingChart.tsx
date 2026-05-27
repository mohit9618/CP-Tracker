"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { contest: "C1", rating: 900 },
  { contest: "C2", rating: 1100 },
  { contest: "C3", rating: 1250 },
  { contest: "C4", rating: 1400 },
  { contest: "C5", rating: 1500 },
];

export default function RatingChart() {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Rating Progress
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="contest" />
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