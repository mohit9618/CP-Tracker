export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-slate-800 rounded animate-pulse" />
      <div className="h-40 bg-slate-800 rounded animate-pulse" />
      <div className="h-40 bg-slate-800 rounded animate-pulse" />
    </div>
  );
}