import { Check, Plus, Target, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button, Card, CardTitle, Field, Input, Modal } from "@/components/ui/kit";
import { formatKg, useTracker } from "@/lib/actions";
import { currentWeight } from "@/lib/selectors";
import { uid } from "@/lib/store";

export function Milestones() {
  const { state, patch } = useTracker();
  const [open, setOpen] = useState(false);
  const [kg, setKg] = useState("");
  const [error, setError] = useState<string>();

  const current = currentWeight(state);
  const milestones = [...state.weight.milestones].sort((a, b) => b.kg - a.kg);

  const add = () => {
    const value = Number(kg.replace(",", "."));
    if (!Number.isFinite(value) || value <= 20 || value > 400) {
      setError("Informe um peso válido entre 20 e 400 kg.");
      return;
    }
    patch((draft) => {
      draft.weight.milestones.push({ id: uid(), kg: value });
    });
    setKg("");
    setError(undefined);
    setOpen(false);
    toast.success("Meta intermediária adicionada");
  };

  return (
    <Card>
      <CardTitle
        icon={<Target size={15} />}
        action={
          <Button size="sm" variant="soft" onClick={() => setOpen(true)}>
            <Plus size={16} /> Meta
          </Button>
        }
      >
        Marcos
      </CardTitle>

      <ul className="mt-4 space-y-2">
        <MilestoneRow
          emoji="🎯"
          label="Meta inicial"
          value={state.weight.startWeight != null ? `${formatKg(state.weight.startWeight)} kg` : "—"}
          done={false}
        />
        {milestones.map((m) => (
          <MilestoneRow
            key={m.id}
            emoji="🏆"
            label="Objetivo intermediário"
            value={`${formatKg(m.kg)} kg`}
            done={current != null && current <= m.kg}
            onRemove={() =>
              patch((draft) => {
                draft.weight.milestones = draft.weight.milestones.filter((x) => x.id !== m.id);
              })
            }
          />
        ))}
        <MilestoneRow
          emoji="⭐"
          label="Meta final"
          value={
            state.weight.targetWeight != null ? `${formatKg(state.weight.targetWeight)} kg` : "—"
          }
          done={
            current != null &&
            state.weight.targetWeight != null &&
            current <= state.weight.targetWeight
          }
        />
      </ul>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nova meta intermediária"
        description="Pequenos objetivos ajudam a acompanhar a evolução."
      >
        <Field label="Peso da meta (kg)" error={error}>
          {(id) => (
            <Input
              id={id}
              type="number"
              inputMode="decimal"
              step="0.1"
              min={20}
              placeholder="0,0"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
            />
          )}
        </Field>
        <Button fullWidth onClick={add}>
          Adicionar meta
        </Button>
      </Modal>
    </Card>
  );
}

function MilestoneRow({
  emoji,
  label,
  value,
  done,
  onRemove,
}: {
  emoji: string;
  label: string;
  value: string;
  done: boolean;
  onRemove?: () => void;
}) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3">
      <span aria-hidden className="text-lg">
        {emoji}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{label}</p>
        <p className="num text-xs text-muted-foreground">{value}</p>
      </div>
      {done ? (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
          <Check size={14} />
        </span>
      ) : null}
      {onRemove ? (
        <button
          aria-label="Remover meta"
          onClick={onRemove}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive-soft hover:text-destructive"
        >
          <Trash2 size={14} />
        </button>
      ) : null}
    </li>
  );
}
