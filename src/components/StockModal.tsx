import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useTracker } from "@/lib/actions";
import { Button, Field, Input, Modal } from "@/components/ui/kit";

export function StockModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, saveStock, addStock } = useTracker();
  const [used, setUsed] = useState(String(state.stock.used));
  const [available, setAvailable] = useState(String(state.stock.available));
  const [bought, setBought] = useState("");
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (open) {
      setUsed(String(state.stock.used));
      setAvailable(String(state.stock.available));
      setBought("");
      setError(undefined);
    }
  }, [open, state.stock.used, state.stock.available]);

  const handleSave = () => {
    const u = Number(used);
    const a = Number(available);
    if (!Number.isFinite(u) || !Number.isFinite(a) || u < 0 || a < 0) {
      setError("Informe números iguais ou maiores que zero.");
      return;
    }
    saveStock(u, a);
    toast.success("Estoque atualizado");
    onClose();
  };

  const handleAdd = () => {
    const q = Number(bought);
    if (!Number.isFinite(q) || q <= 0) {
      setError("Informe uma quantidade maior que zero.");
      return;
    }
    addStock(q);
    setAvailable(String(state.stock.available + Math.round(q)));
    setBought("");
    setError(undefined);
    toast.success(`${Math.round(q)} dose(s) adicionada(s) ao estoque`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Controle de doses"
      description="Ajuste seus números manualmente. O histórico de aplicações nunca é apagado."
    >
      <Field label="Doses já utilizadas" error={error}>
        {(id) => (
          <Input
            id={id}
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            value={used}
            onChange={(e) => setUsed(e.target.value)}
          />
        )}
      </Field>
      <Field label="Doses atualmente armazenadas">
        {(id) => (
          <Input
            id={id}
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
          />
        )}
      </Field>
      <Button fullWidth onClick={handleSave}>
        Salvar
      </Button>

      <div className="rounded-2xl bg-muted p-4">
        <h3 className="text-sm font-semibold">Comprou mais doses?</h3>
        <div className="mt-3 flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <Field label="Quantidade comprada">
              {(id) => (
                <Input
                  id={id}
                  type="number"
                  min={1}
                  step={1}
                  inputMode="numeric"
                  placeholder="0"
                  value={bought}
                  onChange={(e) => setBought(e.target.value)}
                />
              )}
            </Field>
          </div>
          <Button variant="soft" onClick={handleAdd} className="shrink-0">
            <Plus size={16} /> Adicionar
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          As novas doses são somadas ao estoque atual.
        </p>
      </div>
    </Modal>
  );
}
