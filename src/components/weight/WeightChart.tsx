import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardTitle, Chip, EmptyState } from "@/components/ui/kit";
import { addDays, formatShort, todayISO } from "@/lib/dates";
import { sortedWeights } from "@/lib/selectors";
import { useStore } from "@/lib/store";
import { TrendingDown } from "lucide-react";

const RANGES = [
  { key: "7", label: "7 dias", days: 7 },
  { key: "30", label: "30 dias", days: 30 },
  { key: "90", label: "3 meses", days: 90 },
  { key: "180", label: "6 meses", days: 180 },
  { key: "all", label: "Tudo", days: null },
] as const;

export function WeightChart() {
  const { state } = useStore();
  const [range, setRange] = useState<string>("30");

  const data = useMemo(() => {
    const all = sortedWeights(state);
    const conf = RANGES.find((r) => r.key === range);
    const filtered =
      conf?.days == null ? all : all.filter((r) => r.date >= addDays(todayISO(), -conf.days));
    return filtered.map((r) => ({
      date: r.date,
      label: r.date.slice(8) + "/" + r.date.slice(5, 7),
      kg: r.kg,
    }));
  }, [state, range]);

  return (
    <Card>
      <CardTitle icon={<TrendingDown size={15} />}>Evolução do peso</CardTitle>

      <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {RANGES.map((r) => (
          <Chip key={r.key} active={range === r.key} onClick={() => setRange(r.key)}>
            {r.label}
          </Chip>
        ))}
      </div>

      {data.length < 2 ? (
        <EmptyState
          icon={<TrendingDown size={22} />}
          title="Poucos registros neste período"
          description="Registre seu peso ao menos duas vezes para visualizar o gráfico."
        />
      ) : (
        <div className="mt-4 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                minTickGap={16}
              />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tickLine={false}
                axisLine={false}
                width={46}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  color: "var(--color-card-foreground)",
                  fontSize: 12,
                }}
                labelFormatter={(_, payload) =>
                  payload?.[0] ? formatShort(String(payload[0].payload.date)) : ""
                }
                formatter={(value: number) => [`${value} kg`, "Peso"]}
              />
              <Line
                type="monotone"
                dataKey="kg"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
