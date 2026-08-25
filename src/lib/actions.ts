import { useCallback } from "react";

import { todayISO } from "./dates";
import { useStore, uid } from "./store";
import type { AppState, MealKey, SymptomEntry } from "./types";

export function useTracker() {
  const { state, update } = useStore();

  /** Registers an application and consumes one dose from stock. */
  const markTaken = useCallback(
    (date: string, note?: string) => {
      update((draft) => {
        const existing = draft.applications.find((a) => a.date === date);
        if (existing) {
          if (existing.status !== "done") {
            existing.status = "done";
            if (draft.stock.available > 0) {
              draft.stock.available -= 1;
              draft.stock.used += 1;
            }
          }
          if (note !== undefined) existing.note = note;
          return draft;
        }
        draft.applications.push({ id: uid(), date, status: "done", note });
        if (draft.stock.available > 0) {
          draft.stock.available -= 1;
          draft.stock.used += 1;
        }
        draft.treatment.cancelledDates = draft.treatment.cancelledDates.filter(
          (d) => d !== date,
        );
        return draft;
      });
    },
    [update],
  );

  const markMissed = useCallback(
    (date: string, note?: string) => {
      update((draft) => {
        const existing = draft.applications.find((a) => a.date === date);
        if (existing) {
          if (existing.status === "done") {
            draft.stock.available += 1;
            draft.stock.used = Math.max(0, draft.stock.used - 1);
          }
          existing.status = "missed";
          if (note !== undefined) existing.note = note;
          return draft;
        }
        draft.applications.push({ id: uid(), date, status: "missed", note });
        return draft;
      });
    },
    [update],
  );

  const cancelApplication = useCallback(
    (date: string) => {
      update((draft) => {
        const existing = draft.applications.find((a) => a.date === date);
        if (existing?.status === "done") {
          draft.stock.available += 1;
          draft.stock.used = Math.max(0, draft.stock.used - 1);
        }
        draft.applications = draft.applications.filter((a) => a.date !== date);
        if (!draft.treatment.cancelledDates.includes(date)) {
          draft.treatment.cancelledDates.push(date);
        }
        return draft;
      });
    },
    [update],
  );

  const removeApplication = useCallback(
    (id: string) => {
      update((draft) => {
        const existing = draft.applications.find((a) => a.id === id);
        if (existing?.status === "done") {
          draft.stock.available += 1;
          draft.stock.used = Math.max(0, draft.stock.used - 1);
        }
        draft.applications = draft.applications.filter((a) => a.id !== id);
        return draft;
      });
    },
    [update],
  );

  const editApplication = useCallback(
    (id: string, patch: { date?: string; note?: string }) => {
      update((draft) => {
        const existing = draft.applications.find((a) => a.id === id);
        if (!existing) return draft;
        if (patch.date) existing.date = patch.date;
        if (patch.note !== undefined) existing.note = patch.note;
        return draft;
      });
    },
    [update],
  );

  const saveStock = useCallback(
    (used: number, available: number) => {
      update((draft) => {
        draft.stock.used = Math.max(0, Math.round(used));
        draft.stock.available = Math.max(0, Math.round(available));
        return draft;
      });
    },
    [update],
  );

  const addStock = useCallback(
    (quantity: number) => {
      update((draft) => {
        draft.stock.available += Math.max(0, Math.round(quantity));
        return draft;
      });
    },
    [update],
  );

  /** Adds a weight record. Returns the milestone message when one is newly reached. */
  const addWeight = useCallback(
    (kg: number, date: string, note?: string): string | null => {
      let achievedMessage: string | null = null;
      update((draft) => {
        draft.weight.records = draft.weight.records.filter((r) => r.date !== date);
        draft.weight.records.push({ id: uid(), date, kg, note });
        if (draft.weight.startWeight == null) draft.weight.startWeight = kg;

        const targets = [
          ...draft.weight.milestones.map((m) => ({ key: `m:${m.id}`, kg: m.kg, label: `${formatKg(m.kg)} kg` })),
          ...(draft.weight.targetWeight != null
            ? [
                {
                  key: "final",
                  kg: draft.weight.targetWeight,
                  label: `Meta final de ${formatKg(draft.weight.targetWeight)} kg`,
                },
              ]
            : []),
        ];
        for (const t of targets) {
          if (kg <= t.kg && !draft.weight.achieved.includes(t.key)) {
            draft.weight.achieved.push(t.key);
            achievedMessage = t.label;
          }
        }
        return draft;
      });
      return achievedMessage;
    },
    [update],
  );

  const removeWeight = useCallback(
    (id: string) => {
      update((draft) => {
        draft.weight.records = draft.weight.records.filter((r) => r.id !== id);
        return draft;
      });
    },
    [update],
  );

  const addWater = useCallback(
    (ml: number, date = todayISO()) => {
      update((draft) => {
        const next = (draft.hydration.log[date] ?? 0) + ml;
        draft.hydration.log[date] = Math.max(0, next);
        return draft;
      });
    },
    [update],
  );

  const setWaterGoal = useCallback(
    (ml: number) => {
      update((draft) => {
        draft.hydration.goalMl = Math.max(250, Math.round(ml));
        return draft;
      });
    },
    [update],
  );

  const setMeal = useCallback(
    (weekday: number, meal: MealKey, items: string[]) => {
      update((draft) => {
        draft.diet.plan[String(weekday)][meal] = items;
        return draft;
      });
    },
    [update],
  );

  const clearDay = useCallback(
    (weekday: number) => {
      update((draft) => {
        draft.diet.plan[String(weekday)] = {
          breakfast: [],
          lunch: [],
          snack: [],
          dinner: [],
        };
        return draft;
      });
    },
    [update],
  );

  const addSymptom = useCallback(
    (entry: Omit<SymptomEntry, "id">) => {
      update((draft) => {
        draft.symptoms.push({ ...entry, id: uid() });
        return draft;
      });
    },
    [update],
  );

  const removeSymptom = useCallback(
    (id: string) => {
      update((draft) => {
        draft.symptoms = draft.symptoms.filter((s) => s.id !== id);
        return draft;
      });
    },
    [update],
  );

  const addJournal = useCallback(
    (date: string, text: string, weight?: number) => {
      update((draft) => {
        draft.journal.push({ id: uid(), date, text, weight });
        return draft;
      });
    },
    [update],
  );

  const removeJournal = useCallback(
    (id: string) => {
      update((draft) => {
        draft.journal = draft.journal.filter((j) => j.id !== id);
        return draft;
      });
    },
    [update],
  );

  const patch = useCallback(
    (fn: (draft: AppState) => void) => {
      update((draft) => {
        fn(draft);
        return draft;
      });
    },
    [update],
  );

  return {
    state,
    markTaken,
    markMissed,
    cancelApplication,
    removeApplication,
    editApplication,
    saveStock,
    addStock,
    addWeight,
    removeWeight,
    addWater,
    setWaterGoal,
    setMeal,
    clearDay,
    addSymptom,
    removeSymptom,
    addJournal,
    removeJournal,
    patch,
  };
}

export function formatKg(kg: number): string {
  return kg.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function formatLiters(ml: number): string {
  return (ml / 1000).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
