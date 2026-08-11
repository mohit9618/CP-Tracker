"use client";

import AnimatedCard from "./AnimatedCard";

export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <AnimatedCard className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-cyan-400 text-3xl">
          {icon}
        </div>
      </div>
    </AnimatedCard>
  );
}