import { BarChart3 } from "lucide-react";

import { Card, CardTitle } from "@/components/ui/kit";
import { formatKg, formatLiters } from "@/lib/actions";
import { weeklySummary } from "@/lib/selectors";
import { useStore } from "@/lib/store";

export function WeeklySummaryCard() {
  const { state } = useStore();
  const s = weeklySummary(state);

  const items = [
    { emoji: "💉", label: "Aplicações", value: String(s.applications) },
    {
      emoji: "⚖️",
      label: "Peso",
      value: s.weightDelta == null ? "—" : `${s.weightDelta > 0 ? "+" : "−"}${formatKg(Math.abs(s.weightDelta))} kg`,
    },
    { emoji: "💧", label: "Hidratação média", value: `${formatLiters(s.avgHydrationMl)} L` },
    { emoji: "🥗", label: "Refeições planejadas", value: String(s.plannedMeals) },
    {
      emoji: "🎯",
      label: "Progresso",
      value: s.progressDelta === 0 ? "—" : `${s.progressDelta > 0 ? "+" : ""}${s.progressDelta.toFixed(0)}%`,
    },
  ];

  return (
    <Card>
      <CardTitle icon={<BarChart3 size={15} />}>Resumo da semana</CardTitle>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.label} className="rounded-2xl bg-muted px-3.5 py-3">
            <p className="text-xs font-medium text-muted-foreground">
              <span aria-hidden className="mr-1">
                {item.emoji}
              </span>
              {item.label}
            </p>
            <p className="num mt-1 text-lg font-bold">{item.value}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
