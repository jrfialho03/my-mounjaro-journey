import { WEEKDAYS_LONG } from "./dates";
import { categoryOf } from "./foods";
import type { AppState, MealKey, MealPlanDay } from "./types";

export const MEAL_ORDER: MealKey[] = ["breakfast", "lunch", "snack", "dinner"];

export const MEAL_LABEL: Record<MealKey, string> = {
  breakfast: "Café da manhã",
  lunch: "Almoço",
  snack: "Lanche",
  dinner: "Jantar",
};

export const MEAL_EMOJI: Record<MealKey, string> = {
  breakfast: "☕",
  lunch: "🍽️",
  snack: "🍏",
  dinner: "🌙",
};

/** Monday-first weekday order (1..6,0) */
export const PLAN_DAYS = [1, 2, 3, 4, 5, 6, 0];

export function dietToText(plan: Record<string, MealPlanDay>): string {
  const lines: string[] = ["MINHA DIETA DA SEMANA", ""];
  for (const day of PLAN_DAYS) {
    const dayPlan = plan[String(day)];
    const hasAny = MEAL_ORDER.some((m) => (dayPlan?.[m] ?? []).length > 0);
    if (!hasAny) continue;
    lines.push(WEEKDAYS_LONG[day].toUpperCase());
    for (const meal of MEAL_ORDER) {
      const items = dayPlan?.[meal] ?? [];
      if (!items.length) continue;
      lines.push(`${MEAL_LABEL[meal]}:`);
      for (const item of items) lines.push(`- ${item}`);
      lines.push("");
    }
    lines.push("");
  }
  if (lines.length <= 2) lines.push("Nenhuma refeição planejada ainda.");
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export interface ShoppingItem {
  id: string;
  label: string;
  category: string;
  checked: boolean;
}

/** Counts how many times each food appears in the week and turns it into a list. */
export function buildShoppingList(state: AppState): ShoppingItem[] {
  const counts = new Map<string, number>();
  for (const day of Object.values(state.diet.plan)) {
    for (const meal of MEAL_ORDER) {
      for (const item of day[meal] ?? []) {
        counts.set(item, (counts.get(item) ?? 0) + 1);
      }
    }
  }
  const items: ShoppingItem[] = [];
  for (const [food, count] of counts) {
    items.push({
      id: `${food}`,
      label: count > 1 ? `${food} (${count}x na semana)` : food,
      category: categoryOf(food),
      checked: false,
    });
  }
  return items.sort(
    (a, b) => a.category.localeCompare(b.category) || a.label.localeCompare(b.label),
  );
}

export function shoppingListToText(items: ShoppingItem[]): string {
  const groups = new Map<string, ShoppingItem[]>();
  for (const item of items) {
    const arr = groups.get(item.category) ?? [];
    arr.push(item);
    groups.set(item.category, arr);
  }
  const lines: string[] = ["LISTA DE COMPRAS", ""];
  for (const [cat, arr] of groups) {
    lines.push(cat.toUpperCase());
    for (const item of arr) lines.push(`- ${item.label}`);
    lines.push("");
  }
  if (!items.length) lines.push("Nenhum alimento planejado ainda.");
  return lines.join("\n").trim();
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}
