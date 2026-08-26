import { Plus, Scale, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Celebration } from "@/components/Celebration";
import {
  Button,
  Card,
  CardTitle,
  EmptyState,
  Field,
  Input,
  Modal,
  Textarea,
} from "@/components/ui/kit";
import { formatKg, useTracker } from "@/lib/actions";
import { formatShort, isValidISO, todayISO } from "@/lib/dates";
import { sortedWeights } from "@/lib/selectors";

export function WeightTracker() {
  const { state, addWeight, removeWeight } = useTracker();
  const [open, setOpen] = useState(false);
  const [kg, setKg] = useState("");
  const [date, setDate] = useState(todayISO());
  const [note, setNote] = useState("");
  const [error, setError] = useState<string>();
  const [celebration, setCelebration] = useState<string | null>(null);

  const records = [...sortedWeights(state)].reverse();

  const submit = () => {
    const value = Number(kg.replace(",", "."));
    if (!Number.isFinite(value) || value <= 20 || value > 400) {
      setError("Informe um peso válido entre 20 e 400 kg.");
      return;
    }
    if (!isValidISO(date) || date > todayISO()) {
      setError("Informe uma data válida (não futura).");
      return;
    }
    const achieved = addWeight(value, date, note.trim() || undefined);
    toast.success("Peso registrado");
    if (achieved) setCelebration(achieved);
    setOpen(false);
    setKg("");
    setNote("");
    setDate(todayISO());
    setError(undefined);
  };

  return (
    <>
      <Celebration message={celebration} onDone={() => setCelebration(null)} />
      <Card>
        <CardTitle
          icon={<Scale size={15} />}
          action={
            <Button size="sm" onClick={() => setOpen(true)}>
              <Plus size={16} /> Registrar peso
            </Button>
          }
        >
          Histórico de peso
        </CardTitle>

        {records.length === 0 ? (
          <EmptyState
            icon={<Scale size={22} />}
            title="Ainda não há registros."
            description="Registre seu primeiro peso para começar a acompanhar sua evolução."
            action={<Button onClick={() => setOpen(true)}>Registrar peso</Button>}
          />
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {records.map((record, index) => {
              const prev = records[index + 1];
              const delta = prev ? record.kg - prev.kg : null;
              return (
                <li key={record.id} className="flex items-center gap-3 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="num text-base font-bold">{formatKg(record.kg)} kg</p>
                    <p className="num text-xs text-muted-foreground">
                      {formatShort(record.date)}
                    </p>
                    {record.note ? (
                      <p className="mt-1 text-xs text-muted-foreground">{record.note}</p>
                    ) : null}
                  </div>
                  {delta != null ? (
                    <span
                      className={`num shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        delta < 0
                          ? "bg-success-soft text-success"
                          : delta > 0
                            ? "bg-warning-soft text-warning-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {delta > 0 ? "+" : delta < 0 ? "−" : ""}
                      {formatKg(Math.abs(delta))} kg
                    </span>
                  ) : null}
                  <button
                    aria-label={`Excluir registro de ${formatShort(record.date)}`}
                    onClick={() => {
                      removeWeight(record.id);
                      toast("Registro excluído");
                    }}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive-soft hover:text-destructive"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Registrar peso">
        <Field label="Peso (kg)" error={error}>
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
        <Field label="Data">
          {(id) => (
            <Input
              id={id}
              type="date"
              max={todayISO()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          )}
        </Field>
        <Field label="Observação (opcional)">
          {(id) => (
            <Textarea
              id={id}
              value={note}
              placeholder="Pesagem em jejum."
              onChange={(e) => setNote(e.target.value)}
            />
          )}
        </Field>
        <Button fullWidth onClick={submit}>
          Salvar
        </Button>
      </Modal>
    </>
  );
}
