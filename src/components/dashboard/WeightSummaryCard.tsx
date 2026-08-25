import { Link } from "@tanstack/react-router";
import { ArrowDown, Scale } from "lucide-react";

import { Card, CardTitle, EmptyState, Progress, buttonClass } from "@/components/ui/kit";
import { formatKg } from "@/lib/actions";
import { useStore } from "@/lib/store";
import { weightProgress } from "@/lib/selectors";

export function WeightSummaryCard() {
  const { state } = useStore();
  const p = weightProgress(state);

  if (p.current == null || p.target == null) {
    return (
      <Card>
        <CardTitle icon={<Scale size={15} />}>Minha evolução</CardTitle>
        <EmptyState
          icon={<Scale size={22} />}
          title="Ainda não há registros"
          description="Registre seu primeiro peso para começar a acompanhar sua evolução."
          action={
            <Link to="/peso" className={buttonClass("soft")}>
              Registrar peso
            </Link>
          }
        />
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle icon={<Scale size={15} />}>Minha evolução</CardTitle>
      <div className="mt-4 flex items-center gap-4">
        <p className="num text-3xl font-extrabold">{formatKg(p.current)} kg</p>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
          <ArrowDown size={16} />
        </span>
        <p className="num text-xl font-bold text-muted-foreground">{formatKg(p.target)} kg</p>
      </div>
      <p className="num mt-3 text-sm text-muted-foreground">
        {p.remaining > 0
          ? `${formatKg(p.remaining)} kg para atingir sua meta`
          : "Meta de peso alcançada 🎉"}
      </p>
      <Progress className="mt-3" value={p.percent} label="Progresso da meta de peso" />
      <p className="num mt-2 text-xs font-semibold text-primary">
        {Math.round(p.percent)}% da meta alcançada
      </p>
      <Link to="/peso" className={buttonClass("soft", "md", "mt-4 w-full")}>
        Ver evolução completa
      </Link>
    </Card>
  );
}
