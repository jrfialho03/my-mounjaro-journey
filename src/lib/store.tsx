import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { createInitialState, emptyDay, type AppState } from "./types";

const STORAGE_KEY = "mounjaro-tracker:v1";

function migrate(raw: unknown): AppState {
  const base = createInitialState();
  if (!raw || typeof raw !== "object") return base;
  const incoming = raw as Partial<AppState>;
  const merged: AppState = {
    ...base,
    ...incoming,
    profile: { ...base.profile, ...(incoming.profile ?? {}) },
    treatment: { ...base.treatment, ...(incoming.treatment ?? {}) },
    stock: { ...base.stock, ...(incoming.stock ?? {}) },
    weight: { ...base.weight, ...(incoming.weight ?? {}) },
    hydration: { ...base.hydration, ...(incoming.hydration ?? {}) },
    diet: {
      ...base.diet,
      ...(incoming.diet ?? {}),
      plan: { ...base.diet.plan, ...(incoming.diet?.plan ?? {}) },
      preferences: { ...base.diet.preferences, ...(incoming.diet?.preferences ?? {}) },
    },
    reminders: { ...base.reminders, ...(incoming.reminders ?? {}) },
  };
  for (let i = 0; i < 7; i++) {
    merged.diet.plan[String(i)] = { ...emptyDay(), ...(merged.diet.plan[String(i)] ?? {}) };
  }
  merged.applications = Array.isArray(merged.applications) ? merged.applications : [];
  merged.symptoms = Array.isArray(merged.symptoms) ? merged.symptoms : [];
  merged.journal = Array.isArray(merged.journal) ? merged.journal : [];
  merged.shoppingList = Array.isArray(merged.shoppingList) ? merged.shoppingList : [];
  return merged;
}

interface StoreValue {
  state: AppState;
  ready: boolean;
  update: (updater: (draft: AppState) => AppState) => void;
  replaceAll: (next: AppState) => void;
  reset: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => createInitialState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState(migrate(JSON.parse(raw)));
    } catch {
      /* corrupted storage: keep defaults */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [state, ready]);

  // Theme handling
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const apply = () => {
      const dark =
        state.appearance === "dark" ||
        (state.appearance === "auto" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      root.classList.toggle("dark", dark);
    };
    apply();
    if (state.appearance !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [state.appearance]);

  const update = useCallback((updater: (draft: AppState) => AppState) => {
    setState((prev) => updater(structuredClone(prev)));
  }, []);

  const replaceAll = useCallback((next: AppState) => setState(migrate(next)), []);
  const reset = useCallback(() => setState(createInitialState()), []);

  const value = useMemo(
    () => ({ state, ready, update, replaceAll, reset }),
    [state, ready, update, replaceAll, reset],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore precisa estar dentro de StoreProvider");
  return ctx;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
