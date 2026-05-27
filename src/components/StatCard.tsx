interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <h2 className="text-gray-400 text-lg">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}