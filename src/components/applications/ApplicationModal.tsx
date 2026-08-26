import { Check, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, Field, Input, Modal, Textarea } from "@/components/ui/kit";
import { useTracker } from "@/lib/actions";
import { formatShort, isValidISO, todayISO } from "@/lib/dates";
import { dayStatus } from "@/lib/selectors";

const STATUS_LABEL = {
  done: "Realizada",
  scheduled: "Programada",
  late: "Não realizada",
  cancelled: "Cancelada",
  none: "Sem aplicação",
} as const;

export function ApplicationModal({
  date,
  onClose,
}: {
  date: string | null;
  onClose: () => void;
}) {
  const { state, markTaken, markMissed, cancelApplication, patch } = useTracker();
  const [editing, setEditing] = useState(false);
  const [newDate, setNewDate] = useState(date ?? todayISO());
  const [note, setNote] = useState("");
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!date) return;
    setEditing(false);
    setNewDate(date);
    setNote(state.applications.find((a) => a.date === date)?.note ?? "");
    setError(undefined);
  }, [date, state.applications]);

  if (!date) return null;
  const status = dayStatus(state, date);

  const applyEdit = () => {
    if (!isValidISO(newDate)) {
      setError("Informe uma data válida.");
      return;
    }
    patch((draft) => {
      const record = draft.applications.find((a) => a.date === date);
      if (record) {
        record.date = newDate;
        record.note = note;
      } else {
        draft.treatment.cancelledDates = [
          ...draft.treatment.cancelledDates.filter((d) => d !== date),
          date,
        ];
        draft.applications.push({
          id: `${Date.now()}`,
          date: newDate,
          status: "done",
          note,
        });
        draft.stock.available = Math.max(0, draft.stock.available - 1);
        draft.stock.used += 1;
      }
    });
    toast.success("Aplicação atualizada");
    onClose();
  };

  return (
    <Modal open onClose={onClose} title="Aplicação" description={formatShort(date)}>
      <div className="rounded-2xl bg-muted p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Status
        </p>
        <p className="mt-1 text-base font-bold">{STATUS_LABEL[status]}</p>
      </div>

      {editing ? (
        <>
          <Field label="Nova data" error={error}>
            {(id) => (
              <Input
                id={id}
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            )}
          </Field>
          <Field label="Observação (opcional)">
            {(id) => (
              <Textarea
                id={id}
                value={note}
                placeholder="Aplicação realizada normalmente."
                onChange={(e) => setNote(e.target.value)}
              />
            )}
          </Field>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setEditing(false)}>
              Voltar
            </Button>
            <Button className="flex-1" onClick={applyEdit}>
              Salvar
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          {status !== "done" ? (
            <Button
              fullWidth
              size="lg"
              onClick={() => {
                markTaken(date, note || undefined);
                toast.success("Aplicação registrada");
                onClose();
              }}
            >
              <Check size={18} /> Marcar como tomada
            </Button>
          ) : (
            <Button
              fullWidth
              variant="outline"
              onClick={() => {
                markMissed(date);
                toast("Registro alterado para não realizada");
                onClose();
              }}
            >
              Marcar como não realizada
            </Button>
          )}
          <Button variant="soft" fullWidth onClick={() => setEditing(true)}>
            Editar
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={() => {
              cancelApplication(date);
              toast("Aplicação cancelada nesta data");
              onClose();
            }}
          >
            {status === "done" ? <Trash2 size={16} /> : <X size={16} />} Cancelar aplicação
          </Button>
        </div>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        O calendário é apenas um organizador. Não altere dose ou frequência sem orientação
        médica.
      </p>
    </Modal>
  );
}
