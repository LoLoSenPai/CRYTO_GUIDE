export default function ProgressBar({
  value
}: {
  value: number;
}) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-teal-400 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
