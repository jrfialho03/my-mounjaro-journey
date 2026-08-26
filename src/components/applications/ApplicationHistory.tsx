import { Check, History, Pencil, Syringe, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button, Card, CardTitle, EmptyState, Field, Modal, Textarea } from "@/components/ui/kit";
import { useTracker } from "@/lib/actions";
import { formatDayMonth, formatShort } from "@/lib/dates";

export function ApplicationHistory() {
  const { state, removeApplication, editApplication } = useTracker();
  const [editId, setEditId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const records = [...state.applications].sort((a, b) => b.date.localeCompare(a.date));
  const editing = records.find((r) => r.id === editId) ?? null;

  return (
    <Card>
      <CardTitle icon={<History size={15} />}>Histórico</CardTitle>

      {records.length === 0 ? (
        <EmptyState
          icon={<Syringe size={22} />}
          title="Nenhuma aplicação registrada."
          description="Ao marcar uma aplicação como tomada, ela aparece aqui."
        />
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {records.map((record) => (
            <li key={record.id} className="flex items-start gap-3 py-3.5">
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                  record.status === "done"
                    ? "bg-success-soft text-success"
                    : "bg-warning-soft text-warning-foreground"
                }`}
                aria-hidden
              >
                {record.status === "done" ? <Check size={16} /> : <X size={16} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="num text-sm font-bold uppercase">{formatDayMonth(record.date)}</p>
                <p className="text-sm text-muted-foreground">
                  {record.status === "done" ? "Aplicação realizada" : "Não realizada"}
                </p>
                {record.note ? (
                  <p className="mt-1 text-xs text-muted-foreground">{record.note}</p>
                ) : null}
                <p className="num mt-0.5 text-[11px] text-muted-foreground">
                  {formatShort(record.date)}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  aria-label="Editar observação"
                  onClick={() => {
                    setEditId(record.id);
                    setNote(record.note ?? "");
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
                >
                  <Pencil size={15} />
                </button>
                <button
                  aria-label="Excluir registro"
                  onClick={() => {
                    removeApplication(record.id);
                    toast("Registro excluído");
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive-soft hover:text-destructive"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditId(null)}
        title="Observação"
        description={editing ? formatShort(editing.date) : undefined}
      >
        <Field label="Observação">
          {(id) => (
            <Textarea
              id={id}
              value={note}
              placeholder="Aplicação realizada normalmente."
              onChange={(e) => setNote(e.target.value)}
            />
          )}
        </Field>
        <Button
          fullWidth
          onClick={() => {
            if (editId) editApplication(editId, { note });
            setEditId(null);
            toast.success("Observação salva");
          }}
        >
          Salvar
        </Button>
      </Modal>
    </Card>
  );
}
