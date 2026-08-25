import { Trophy } from "lucide-react";
import { useEffect } from "react";

/** Discrete achievement overlay shown when a milestone is reached. */
export function Celebration({
  message,
  onDone,
}: {
  message: string | null;
  onDone: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 top-6 z-[60] flex justify-center px-4"
    >
      <div className="flex animate-pop items-center gap-3 rounded-2xl bg-card px-5 py-3.5 shadow-lift">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-success-soft text-success">
          <Trophy size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold">Meta alcançada!</p>
          <p className="truncate text-xs text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}
