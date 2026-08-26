import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/kit";
import { MONTHS_LONG, WEEKDAYS_SHORT, toISO, todayISO } from "@/lib/dates";
import { dayStatus, type DayStatus } from "@/lib/selectors";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const DOT: Record<DayStatus, string> = {
  none: "",
  scheduled: "bg-primary",
  done: "bg-success",
  late: "bg-warning",
  cancelled: "bg-muted-foreground/40",
};

export function MonthCalendar({ onSelect }: { onSelect: (iso: string) => void }) {
  const { state } = useStore();
  const today = todayISO();
  const now = new Date();
  const [cursor, setCursor] = useState({ y: now.getFullYear(), m: now.getMonth() });

  const first = new Date(cursor.y, cursor.m, 1);
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const leading = (first.getDay() + 6) % 7; // Monday-first
  const cells: (string | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => toISO(new Date(cursor.y, cursor.m, i + 1))),
  ];

  const move = (delta: number) => {
    const d = new Date(cursor.y, cursor.m + delta, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  };

  return (
    <Card>
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
        <button
          onClick={() => move(-1)}
          aria-label="Mês anterior"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft size={18} />
        </button>
        <p className="truncate text-center text-sm font-bold capitalize">
          {MONTHS_LONG[cursor.m]} de {cursor.y}
        </p>
        <button
          onClick={() => move(1)}
          aria-label="Próximo mês"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {[1, 2, 3, 4, 5, 6, 0].map((wd) => (
          <span key={wd} className="py-1 text-[11px] font-semibold text-muted-foreground">
            {WEEKDAYS_SHORT[wd]}
          </span>
        ))}
        {cells.map((iso, i) => {
          if (!iso) return <span key={`e${i}`} />;
          const status = dayStatus(state, iso, today);
          const day = Number(iso.slice(8));
          const isToday = iso === today;
          const clickable = status !== "none";
          return (
            <button
              key={iso}
              onClick={() => onSelect(iso)}
              aria-label={`${day} de ${MONTHS_LONG[cursor.m]}`}
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition-colors",
                clickable ? "hover:bg-muted" : "text-muted-foreground hover:bg-muted/60",
                isToday && "bg-primary-soft font-bold text-accent-foreground",
              )}
            >
              <span className="num">{day}</span>
              {status !== "none" ? (
                <span className={cn("mt-1 h-1.5 w-1.5 rounded-full", DOT[status])} />
              ) : (
                <span className="mt-1 h-1.5 w-1.5" />
              )}
            </button>
          );
        })}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary" /> Programada
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success" /> Realizada
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-warning" /> Atenção
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40" /> Cancelada
        </li>
      </ul>
    </Card>
  );
}
