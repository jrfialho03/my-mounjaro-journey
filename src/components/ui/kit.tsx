import { X } from "lucide-react";
import {
  useEffect,
  useId,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

/* ---------- Card ---------- */

export function Card({
  className,
  children,
  as: As = "section",
}: {
  className?: string;
  children: ReactNode;
  as?: "section" | "div" | "article";
}) {
  return <As className={cn("card-surface p-5", className)}>{children}</As>;
}

export function CardTitle({
  icon,
  children,
  action,
}: {
  icon?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <h2 className="flex min-w-0 items-center gap-2 text-sm font-semibold text-muted-foreground">
        {icon ? <span className="shrink-0 text-primary">{icon}</span> : null}
        <span className="truncate uppercase tracking-wide">{children}</span>
      </h2>
      {action}
    </div>
  );
}

/* ---------- Button ---------- */

type Variant = "primary" | "soft" | "ghost" | "outline" | "success" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:brightness-110 shadow-soft",
  soft: "bg-primary-soft text-accent-foreground hover:brightness-97",
  ghost: "text-muted-foreground hover:bg-muted",
  outline: "border border-border bg-card text-foreground hover:bg-muted",
  success: "bg-success text-success-foreground hover:brightness-110 shadow-soft",
  danger: "bg-destructive text-destructive-foreground hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-11 px-4 text-sm rounded-xl",
  lg: "h-13 px-5 text-base rounded-2xl",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.97]",
    variants[variant],
    sizes[size],
    extra,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  fullWidth,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
    />
  );
}

/* ---------- Progress ---------- */

export function Progress({
  value,
  tone = "primary",
  className,
  label,
}: {
  value: number;
  tone?: "primary" | "success" | "warning";
  className?: string;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  const bar =
    tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-primary";
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", bar)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ---------- Modal ---------- */

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 animate-fade bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 max-h-[92vh] w-full max-w-lg animate-sheet overflow-y-auto rounded-t-3xl bg-card p-5 shadow-lift sm:rounded-3xl"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-bold">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-5 space-y-5">{children}</div>
        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </div>
  );
}

/* ---------- Fields ---------- */

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: (id: string) => ReactNode;
}) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {children(id)}
      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

const fieldBase =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-shadow focus:bg-card";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, "num h-11", className)} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldBase, "min-h-24 resize-y", className)} />;
}

/* ---------- Misc ---------- */

export function Chip({
  active,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      {...props}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-secondary",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function Alert({
  tone = "warning",
  children,
  icon,
}: {
  tone?: "warning" | "danger" | "info" | "success";
  children: ReactNode;
  icon?: ReactNode;
}) {
  const tones = {
    warning: "bg-warning-soft text-warning-foreground",
    danger: "bg-destructive-soft text-destructive",
    info: "bg-primary-soft text-accent-foreground",
    success: "bg-success-soft text-success",
  } as const;
  return (
    <div
      className={cn("flex items-start gap-3 rounded-2xl px-4 py-3 text-sm", tones[tone])}
      role={tone === "danger" ? "alert" : undefined}
    >
      {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : null}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function Disclaimer({ children }: { children?: ReactNode }) {
  return (
    <p className="px-1 text-xs leading-relaxed text-muted-foreground">
      {children ??
        "Informação geral. Para orientação individualizada, consulte seu médico ou nutricionista."}
    </p>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </header>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "success" | "primary";
}) {
  return (
    <div className="card-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "num mt-1.5 text-xl font-bold",
          tone === "success" && "text-success",
          tone === "primary" && "text-primary",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
