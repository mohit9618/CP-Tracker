export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h1
        className="
          text-4xl
          font-bold
          bg-gradient-to-r
          from-cyan-400
          to-blue-500
          bg-clip-text
          text-transparent
        "
      >
        {title}
      </h1>

      {subtitle && (
        <p className="text-slate-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}