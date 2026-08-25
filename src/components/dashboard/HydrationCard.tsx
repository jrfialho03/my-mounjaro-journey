import { Droplets, Plus, Settings2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button, Card, CardTitle, Field, Input, Modal, Progress } from "@/components/ui/kit";
import { formatLiters, useTracker } from "@/lib/actions";
import { hydrationToday } from "@/lib/selectors";

export function HydrationCard() {
  const { state, addWater, setWaterGoal } = useTracker();
  const [goalOpen, setGoalOpen] = useState(false);
  const [goal, setGoal] = useState(String(state.hydration.goalMl));
  const [error, setError] = useState<string>();

  const current = hydrationToday(state);
  const percent = state.hydration.goalMl ? (current / state.hydration.goalMl) * 100 : 0;

  return (
    <Card>
      <CardTitle
        icon={<Droplets size={15} />}
        action={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setGoal(String(state.hydration.goalMl));
              setGoalOpen(true);
            }}
            aria-label="Editar meta de água"
          >
            <Settings2 size={15} /> Meta
          </Button>
        }
      >
        Água
      </CardTitle>

      <p className="num mt-4 text-2xl font-extrabold">
        {formatLiters(current)} L{" "}
        <span className="text-base font-semibold text-muted-foreground">
          / {formatLiters(state.hydration.goalMl)} L
        </span>
      </p>
      <Progress
        className="mt-3"
        value={percent}
        tone={percent >= 100 ? "success" : "primary"}
        label="Progresso de hidratação"
      />

      <div className="mt-4 flex gap-2">
        <Button
          variant="soft"
          className="flex-1"
          onClick={() => {
            addWater(250);
            toast.success("+250 ml registrados");
          }}
        >
          <Plus size={16} /> 250 ml
        </Button>
        <Button
          variant="soft"
          className="flex-1"
          onClick={() => {
            addWater(500);
            toast.success("+500 ml registrados");
          }}
        >
          <Plus size={16} /> 500 ml
        </Button>
        <Button
          variant="outline"
          onClick={() => addWater(-250)}
          disabled={current <= 0}
          aria-label="Remover 250 ml"
        >
          −250
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        A meta é definida por você ou pelo seu profissional de saúde.
      </p>

      <Modal
        open={goalOpen}
        onClose={() => setGoalOpen(false)}
        title="Meta diária de água"
        description="Defina em mililitros. Ex.: 2500 ml = 2,5 L."
      >
        <Field label="Meta (ml)" error={error}>
          {(id) => (
            <Input
              id={id}
              type="number"
              min={250}
              step={250}
              inputMode="numeric"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          )}
        </Field>
        <Button
          fullWidth
          onClick={() => {
            const v = Number(goal);
            if (!Number.isFinite(v) || v < 250) {
              setError("Informe um valor de 250 ml ou mais.");
              return;
            }
            setWaterGoal(v);
            setError(undefined);
            setGoalOpen(false);
            toast.success("Meta atualizada");
          }}
        >
          Salvar meta
        </Button>
      </Modal>
    </Card>
  );
}
