import { StatTile } from "@/components/ui/kit";
import { formatKg } from "@/lib/actions";
import { relativeLabel } from "@/lib/dates";
import { weightProgress } from "@/lib/selectors";
import { useStore } from "@/lib/store";

export function WeightIndicators() {
  const { state } = useStore();
  const p = weightProgress(state);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatTile
        label="Peso perdido"
        value={p.lost > 0 ? `${formatKg(p.lost)} kg` : "—"}
        tone={p.lost > 0 ? "success" : "default"}
      />
      <StatTile label="Progresso" value={`${Math.round(p.percent)}%`} tone="primary" />
      <StatTile label="Faltam" value={p.target != null ? `${formatKg(p.remaining)} kg` : "—"} />
      <StatTile
        label="Última pesagem"
        value={p.lastDate ? relativeLabel(p.lastDate) : "—"}
      />
    </div>
  );
}
