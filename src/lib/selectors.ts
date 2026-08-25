import { addDays, diffDays, fromISO, startOfWeek, todayISO, toISO } from "./dates";
import type { AppState, MealPlanDay } from "./types";

export type DayStatus = "none" | "scheduled" | "done" | "late" | "cancelled";

export function isScheduledDay(state: AppState, iso: string): boolean {
  const d = fromISO(iso);
  if (d.getDay() !== state.treatment.weekday) return false;
  return iso >= state.treatment.anchorDate || hasApplication(state, iso);
}

export function hasApplication(state: AppState, iso: string) {
  return state.applications.some((a) => a.date === iso);
}

export function dayStatus(state: AppState, iso: string, today = todayISO()): DayStatus {
  const record = state.applications.find((a) => a.date === iso);
  if (record) return record.status === "done" ? "done" : "late";
  if (!isScheduledDay(state, iso)) return "none";
  if (state.treatment.cancelledDates.includes(iso)) return "cancelled";
  if (iso < today) return "late";
  return "scheduled";
}

/** Next scheduled (not done, not cancelled) application date from today onward. */
export function nextApplicationDate(state: AppState, today = todayISO()): string | null {
  const weekday = state.treatment.weekday;
  const start = fromISO(today);
  const shift = (weekday - start.getDay() + 7) % 7;
  let iso = addDays(today, shift);
  for (let i = 0; i < 60; i++) {
    if (
      !state.treatment.cancelledDates.includes(iso) &&
      !state.applications.some((a) => a.date === iso && a.status === "done")
    ) {
      return iso;
    }
    iso = addDays(iso, 7);
  }
  return null;
}

/** Past scheduled dates without a record — pending/late. */
export function lateApplications(state: AppState, today = todayISO()): string[] {
  const out: string[] = [];
  let iso = state.treatment.anchorDate;
  const weekday = state.treatment.weekday;
  const anchor = fromISO(iso);
  iso = addDays(iso, (weekday - anchor.getDay() + 7) % 7);
  let guard = 0;
  while (iso < today && guard++ < 400) {
    if (
      !state.treatment.cancelledDates.includes(iso) &&
      !state.applications.some((a) => a.date === iso)
    ) {
      out.push(iso);
    }
    iso = addDays(iso, 7);
  }
  return out;
}

export function scheduledDatesInMonth(state: AppState, year: number, month: number): string[] {
  const out: string[] = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    const iso = toISO(d);
    if (isScheduledDay(state, iso) || hasApplication(state, iso)) out.push(iso);
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export function currentWeight(state: AppState): number | null {
  const sorted = sortedWeights(state);
  return sorted.length ? sorted[sorted.length - 1].kg : state.weight.startWeight;
}

export function sortedWeights(state: AppState) {
  return [...state.weight.records].sort((a, b) => a.date.localeCompare(b.date));
}

export interface WeightProgress {
  start: number | null;
  current: number | null;
  target: number | null;
  lost: number;
  needed: number;
  remaining: number;
  percent: number;
  lastDate: string | null;
}

export function weightProgress(state: AppState): WeightProgress {
  const start = state.weight.startWeight;
  const target = state.weight.targetWeight;
  const current = currentWeight(state);
  const sorted = sortedWeights(state);
  const lastDate = sorted.length ? sorted[sorted.length - 1].date : null;

  if (start == null || target == null || current == null) {
    return {
      start,
      current,
      target,
      lost: 0,
      needed: 0,
      remaining: 0,
      percent: 0,
      lastDate,
    };
  }
  const needed = Math.abs(start - target);
  const lost = start - current;
  const remaining = Math.max(current - target, 0);
  const percent = needed === 0 ? 100 : Math.max(0, Math.min(100, (lost / needed) * 100));
  return { start, current, target, lost, needed, remaining, percent, lastDate };
}

export function hydrationToday(state: AppState, today = todayISO()): number {
  return state.hydration.log[today] ?? 0;
}

export function weekDates(today = todayISO()): string[] {
  const start = startOfWeek(today);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function plannedMealsCount(state: AppState): number {
  return Object.values(state.diet.plan).reduce((total, day) => {
    return (
      total +
      (["breakfast", "lunch", "snack", "dinner"] as (keyof MealPlanDay)[]).filter(
        (k) => (day[k] ?? []).length > 0,
      ).length
    );
  }, 0);
}

export interface WeeklySummaryData {
  applications: number;
  weightDelta: number | null;
  avgHydrationMl: number;
  plannedMeals: number;
  progressDelta: number;
}

export function weeklySummary(state: AppState, today = todayISO()): WeeklySummaryData {
  const dates = weekDates(today);
  const from = dates[0];
  const applications = state.applications.filter(
    (a) => a.status === "done" && a.date >= from && a.date <= dates[6],
  ).length;

  const sorted = sortedWeights(state);
  const before = sorted.filter((r) => r.date < from);
  const during = sorted.filter((r) => r.date >= from && r.date <= dates[6]);
  let weightDelta: number | null = null;
  if (during.length && (before.length || during.length > 1)) {
    const startKg = before.length ? before[before.length - 1].kg : during[0].kg;
    weightDelta = during[during.length - 1].kg - startKg;
  }

  const logged = dates.map((d) => state.hydration.log[d]).filter((v): v is number => v != null);
  const avgHydrationMl = logged.length
    ? Math.round(logged.reduce((a, b) => a + b, 0) / logged.length)
    : 0;

  const { needed } = weightProgress(state);
  const progressDelta =
    weightDelta != null && needed > 0 ? (-weightDelta / needed) * 100 : 0;

  return {
    applications,
    weightDelta,
    avgHydrationMl,
    plannedMeals: plannedMealsCount(state),
    progressDelta,
  };
}

export function daysSince(iso: string | null, today = todayISO()): number | null {
  if (!iso) return null;
  return diffDays(today, iso);
}
