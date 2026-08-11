interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
  <div className="bg-[#151f35]/90 border border-[#2a3852] p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.08)] hover:scale-105 transition duration-300">
    <h2 className="text-slate-500 text-lg">
      {title}
    </h2>

    <p className="text-slate-100 text-3xl font-bold mt-2">
      {value}
    </p>
  </div>
);
}