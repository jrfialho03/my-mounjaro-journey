import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Home, Salad, Scale, Settings } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Início", icon: Home },
  { to: "/aplicacoes", label: "Aplicações", icon: CalendarDays },
  { to: "/peso", label: "Peso", icon: Scale },
  { to: "/alimentacao", label: "Alimentação", icon: Salad },
  { to: "/configuracoes", label: "Ajustes", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-card/60 px-4 py-7 lg:flex">
        <div className="flex items-center gap-2.5 px-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-sm font-bold">MT</span>
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Mounjaro</p>
            <p className="truncate text-xs text-muted-foreground">Tracker</p>
          </div>
        </div>
        <nav className="mt-8 flex flex-col gap-1" aria-label="Navegação principal">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-soft text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </nav>
        <p className="mt-auto px-3 text-xs leading-relaxed text-muted-foreground">
          Organização pessoal. Siga sempre a orientação do seu médico.
        </p>
      </aside>

      <main className="mx-auto w-full max-w-2xl px-4 pt-6 pb-28 lg:max-w-3xl lg:pb-12 lg:pl-8 xl:max-w-4xl">
        <div className="lg:pl-56">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className="flex min-h-14 flex-col items-center justify-center gap-1 py-2"
                >
                  <span
                    className={cn(
                      "grid h-8 w-12 place-items-center rounded-full transition-colors",
                      active ? "bg-primary-soft text-primary" : "text-muted-foreground",
                    )}
                  >
                    <Icon size={19} />
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-medium",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
