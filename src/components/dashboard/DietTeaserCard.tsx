import { Link } from "@tanstack/react-router";
import { Salad } from "lucide-react";

import { Card, CardTitle, buttonClass } from "@/components/ui/kit";
import { plannedMealsCount } from "@/lib/selectors";
import { useStore } from "@/lib/store";

export function DietTeaserCard() {
  const { state } = useStore();
  const count = plannedMealsCount(state);

  return (
    <Card>
      <CardTitle icon={<Salad size={15} />}>Alimentação</CardTitle>
      <p className="num mt-4 text-2xl font-extrabold">
        {count}{" "}
        <span className="text-base font-semibold text-muted-foreground">
          {count === 1 ? "refeição planejada" : "refeições planejadas"}
        </span>
      </p>
      {count === 0 ? (
        <p className="mt-1 text-sm text-muted-foreground">
          Sua semana ainda está vazia.
        </p>
      ) : null}
      <Link to="/alimentacao" className={buttonClass("soft", "md", "mt-4 w-full")}>
        {count === 0 ? "Montar minha dieta" : "Ver minha dieta"}
      </Link>
    </Card>
  );
}
