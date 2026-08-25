import { AlertTriangle, Pill } from "lucide-react";
import { useState } from "react";

import { StockModal } from "@/components/StockModal";
import { Alert, Button, Card, CardTitle } from "@/components/ui/kit";
import { useStore } from "@/lib/store";

export function StockCard() {
  const { state } = useStore();
  const [open, setOpen] = useState(false);
  const { available, used, alertThreshold } = state.stock;
  const low = available <= alertThreshold;

  return (
    <Card>
      <CardTitle icon={<Pill size={15} />}>Estoque</CardTitle>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="num text-3xl font-extrabold">
            {available}{" "}
            <span className="text-base font-semibold text-muted-foreground">
              {available === 1 ? "dose disponível" : "doses disponíveis"}
            </span>
          </p>
          <p className="num mt-1 text-sm text-muted-foreground">{used} doses utilizadas</p>
          <p className="num mt-0.5 text-xs text-muted-foreground">
            Total registrado: {available + used}
          </p>
        </div>
      </div>

      {low ? (
        <div className="mt-4">
          <Alert tone={available === 0 ? "danger" : "warning"} icon={<AlertTriangle size={16} />}>
            {available === 0
              ? "Seu estoque está zerado. Você não possui doses disponíveis."
              : `Seu estoque está baixo. Você possui apenas ${available} ${available === 1 ? "dose" : "doses"} disponível.`}
          </Alert>
        </div>
      ) : null}

      <Button variant="soft" fullWidth className="mt-4" onClick={() => setOpen(true)}>
        Gerenciar estoque
      </Button>
      <StockModal open={open} onClose={() => setOpen(false)} />
    </Card>
  );
}
