import { CalendarDays, Check } from "lucide-react";

import { Card, CardTitle } from "@/components/ui/kit";
import { WEEKDAYS_SHORT, fromISO, todayISO } from "@/lib/dates";
import { dayStatus, weekDates } from "@/lib/selectors";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function WeekStrip() {
  const { state } = useStore();
  const today = todayISO();
  const dates = weekDates(today);

  return (
    <Card>
      <CardTitle icon={<CalendarDays size={15} />}>Esta semana</CardTitle>
      <ul className="mt-4 grid grid-cols-7 gap-1.5">
        {dates.map((iso) => {
          const status = dayStatus(state, iso, today);
          const d = fromISO(iso);
          const isToday = iso === today;
          return (
            <li key={iso} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-medium text-muted-foreground">
                {WEEKDAYS_SHORT[d.getDay()]}
              </span>
              <span
                className={cn(
                  "num grid h-9 w-full max-w-11 place-items-center rounded-xl text-sm font-semibold transition-colors",
                  status === "done" && "bg-success text-success-foreground",
                  status === "scheduled" && "bg-primary text-primary-foreground",
                  status === "late" && "bg-warning text-warning-foreground",
                  status === "cancelled" && "bg-muted text-muted-foreground line-through",
                  status === "none" && "bg-muted text-muted-foreground",
                  isToday && status === "none" && "ring-2 ring-primary/40",
                )}
                aria-label={`${d.getDate()} — ${statusLabel(status)}`}
              >
                {status === "done" ? <Check size={15} /> : d.getDate()}
              </span>
            </li>
          );
        })}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <li>🟣 Programada</li>
        <li>🟢 Realizada</li>
        <li>🟠 Atenção</li>
        <li>⚪ Sem aplicação</li>
      </ul>
    </Card>
  );
}

function statusLabel(status: string) {
  if (status === "done") return "aplicação realizada";
  if (status === "scheduled") return "aplicação programada";
  if (status === "late") return "aplicação em atenção";
  if (status === "cancelled") return "aplicação cancelada";
  return "sem aplicação";
}
