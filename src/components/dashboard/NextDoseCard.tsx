import { Check, Syringe } from "lucide-react";
import { toast } from "sonner";

import { Alert, Button, Card } from "@/components/ui/kit";
import { useTracker } from "@/lib/actions";
import {
  MONTHS_SHORT,
  WEEKDAYS_SHORT,
  formatLong,
  fromISO,
  relativeLabel,
  todayISO,
} from "@/lib/dates";
import { lateApplications, nextApplicationDate } from "@/lib/selectors";

export function NextDoseCard() {
  const { state, markTaken } = useTracker();
  const today = todayISO();
  const next = nextApplicationDate(state, today);
  const late = lateApplications(state, today);

  if (!next) {
    return (
      <Card>
        <p className="text-sm text-muted-foreground">
          Configure o dia habitual da aplicação nas configurações para ver sua agenda.
        </p>
      </Card>
    );
  }

  const d = fromISO(next);

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
        <Syringe size={15} />
        <span>Próxima aplicação</span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="grid h-20 w-18 shrink-0 place-items-center rounded-2xl bg-primary-soft px-3 text-center">
          <div>
            <p className="text-xs font-bold uppercase text-primary">
              {WEEKDAYS_SHORT[d.getDay()]}
            </p>
            <p className="num text-2xl font-extrabold leading-tight text-accent-foreground">
              {d.getDate()}
            </p>
            <p className="text-[10px] font-semibold uppercase text-primary">
              {MONTHS_SHORT[d.getMonth()]}
            </p>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-base font-bold leading-snug">{formatLong(next)}</p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {relativeLabel(next, today)}
          </p>
        </div>
      </div>

      {late.length > 0 ? (
        <div className="mt-4">
          <Alert tone="warning">
            {late.length === 1
              ? `A aplicação de ${formatLong(late[0])} ainda não foi registrada.`
              : `${late.length} aplicações passadas ainda não foram registradas.`}
          </Alert>
        </div>
      ) : null}

      <Button
        fullWidth
        size="lg"
        className="mt-5"
        onClick={() => {
          markTaken(next);
          toast.success("Aplicação registrada", {
            description: formatLong(next),
          });
        }}
      >
        <Check size={18} /> Marcar como tomada
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        O registro não altera dose nem intervalo do seu tratamento.
      </p>
    </Card>
  );
}
