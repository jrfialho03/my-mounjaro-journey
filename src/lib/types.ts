export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ApplicationStatus = "done" | "missed";

export interface ApplicationRecord {
  id: string;
  /** ISO date yyyy-mm-dd */
  date: string;
  status: ApplicationStatus;
  note?: string;
}

export interface WeightRecord {
  id: string;
  date: string;
  kg: number;
  note?: string;
}

export interface Milestone {
  id: string;
  kg: number;
}

export interface MealPlanDay {
  breakfast: string[];
  lunch: string[];
  snack: string[];
  dinner: string[];
}

export type MealKey = keyof MealPlanDay;

export interface SymptomEntry {
  id: string;
  date: string;
  items: { name: string; severity: "leve" | "moderado" | "forte" }[];
  note?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  weight?: number;
}

export interface Reminders {
  application: boolean;
  weight: boolean;
  water: boolean;
  diet: boolean;
}

export interface AppState {
  version: number;
  onboarded: boolean;
  profile: {
    name: string;
  };
  treatment: {
    weekday: Weekday;
    /** ISO date used as schedule anchor */
    anchorDate: string;
    cancelledDates: string[];
  };
  stock: {
    available: number;
    used: number;
    alertThreshold: number;
  };
  applications: ApplicationRecord[];
  weight: {
    startWeight: number | null;
    targetWeight: number | null;
    records: WeightRecord[];
    milestones: Milestone[];
    achieved: string[];
  };
  hydration: {
    goalMl: number;
    /** date -> ml */
    log: Record<string, number>;
  };
  diet: {
    plan: Record<string, MealPlanDay>;
    customFoods: string[];
    preferences: { likes: string; dislikes: string; restrictions: string };
  };
  shoppingList: { id: string; label: string; category: string; checked: boolean }[];
  symptoms: SymptomEntry[];
  journal: JournalEntry[];
  appearance: "light" | "dark" | "auto";
  reminders: Reminders;
}

export const emptyDay = (): MealPlanDay => ({
  breakfast: [],
  lunch: [],
  snack: [],
  dinner: [],
});

export const createInitialState = (): AppState => ({
  version: 1,
  onboarded: false,
  profile: { name: "" },
  treatment: {
    weekday: 1,
    anchorDate: new Date().toISOString().slice(0, 10),
    cancelledDates: [],
  },
  stock: { available: 0, used: 0, alertThreshold: 2 },
  applications: [],
  weight: {
    startWeight: null,
    targetWeight: null,
    records: [],
    milestones: [],
    achieved: [],
  },
  hydration: { goalMl: 2500, log: {} },
  diet: {
    plan: {
      "0": emptyDay(),
      "1": emptyDay(),
      "2": emptyDay(),
      "3": emptyDay(),
      "4": emptyDay(),
      "5": emptyDay(),
      "6": emptyDay(),
    },
    customFoods: [],
    preferences: { likes: "", dislikes: "", restrictions: "" },
  },
  shoppingList: [],
  symptoms: [],
  journal: [],
  appearance: "light",
  reminders: { application: false, weight: false, water: false, diet: false },
});
