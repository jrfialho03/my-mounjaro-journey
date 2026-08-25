import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button, Chip, Field, Input } from "@/components/ui/kit";
import { WEEKDAYS_LONG, todayISO } from "@/lib/dates";
import { useStore, uid } from "@/lib/store";
import type { Weekday } from "@/lib/types";

const STEPS = 6;

export function Onboarding() {
  const { update } = useStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [weekday, setWeekday] = useState<Weekday>(1);
  const [doses, setDoses] = useState("");
  const [error, setError] = useState<string>();

  const finish = (skip = false) => {
    update((draft) => {
      draft.onboarded = true;
      draft.treatment.anchorDate = todayISO();
      if (skip) return draft;
      draft.profile.name = name.trim();
      draft.treatment.weekday = weekday;
      const c = Number(current.replace(",", "."));
      const t = Number(target.replace(",", "."));
      if (Number.isFinite(c) && c > 0) {
        draft.weight.startWeight = c;
        draft.weight.records = [{ id: uid(), date: todayISO(), kg: c }];
      }
      if (Number.isFinite(t) && t > 0) draft.weight.targetWeight = t;
      const d = Number(doses);
      if (Number.isFinite(d) && d >= 0) draft.stock.available = Math.round(d);
      return draft;
    });
  };

  const next = () => {
    setError(undefined);
    if (step === 1) {
      const c = Number(current.replace(",", "."));
      if (!Number.isFinite(c) || c <= 20 || c > 400) {
        setError("Informe um peso válido em kg.");
        return;
      }
    }
    if (step === 2) {
      const t = Number(target.replace(",", "."));
      if (!Number.isFinite(t) || t <= 20 || t > 400) {
        setError("Informe uma meta válida em kg.");
        return;
      }
    }
    if (step === 4) {
      const d = Number(doses);
      if (!Number.isFinite(d) || d < 0) {
        setError("Informe um número igual ou maior que zero.");
        return;
      }
    }
    if (step === STEPS - 1) {
      finish();
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-5 py-8">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <div className="flex items-center gap-1.5" aria-hidden>
          {Array.from({ length: STEPS }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="mt-10 flex-1 animate-rise" key={step}>
          {step === 0 ? (
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Sparkles size={22} />
              </span>
              <h1 className="mt-6 text-3xl font-extrabold leading-tight">
                Vamos configurar seu acompanhamento.
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Leva menos de um minuto. Seus dados ficam salvos apenas neste navegador.
              </p>
              <div className="mt-8">
                <Field label="Como podemos te chamar? (opcional)">
                  {(id) => (
                    <Input
                      id={id}
                      value={name}
                      placeholder="Seu nome"
                      className="num-0"
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                </Field>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <h1 className="text-2xl font-extrabold">Qual é seu peso atual?</h1>
              <div className="mt-6">
                <Field label="Peso atual (kg)" error={error}>
                  {(id) => (
                    <Input
                      id={id}
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      min={20}
                      placeholder="0,0"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                    />
                  )}
                </Field>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <h1 className="text-2xl font-extrabold">Qual é sua meta de peso?</h1>
              <div className="mt-6">
                <Field label="Meta (kg)" error={error}>
                  {(id) => (
                    <Input
                      id={id}
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      min={20}
                      placeholder="0,0"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                    />
                  )}
                </Field>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <h1 className="text-2xl font-extrabold">
                Qual é o dia habitual da sua aplicação?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Usamos apenas para organizar seu calendário semanal.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {WEEKDAYS_LONG.map((label, index) => (
                  <Chip
                    key={label}
                    active={weekday === index}
                    onClick={() => setWeekday(index as Weekday)}
                  >
                    {label.replace("-feira", "")}
                  </Chip>
                ))}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <h1 className="text-2xl font-extrabold">
                Quantas doses você possui atualmente?
              </h1>
              <div className="mt-6">
                <Field label="Doses em estoque" error={error}>
                  {(id) => (
                    <Input
                      id={id}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      placeholder="0"
                      value={doses}
                      onChange={(e) => setDoses(e.target.value)}
                    />
                  )}
                </Field>
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-success-soft text-success">
                <Check size={22} />
              </span>
              <h1 className="mt-6 text-3xl font-extrabold leading-tight">Pronto!</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Seu acompanhamento está configurado. Você pode ajustar tudo nas configurações
                quando quiser.
              </p>
              <p className="mt-6 rounded-2xl bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
                Este aplicativo serve para organização e acompanhamento pessoal. Siga sempre a
                orientação do seu médico e as instruções oficiais do medicamento.
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex gap-3">
            {step > 0 ? (
              <Button variant="outline" size="lg" onClick={() => setStep((s) => s - 1)}>
                <ArrowLeft size={18} />
                <span className="sr-only">Voltar</span>
              </Button>
            ) : null}
            <Button size="lg" className="flex-1" onClick={next}>
              {step === STEPS - 1 ? "Começar" : "Continuar"}
              {step === STEPS - 1 ? null : <ArrowRight size={18} />}
            </Button>
          </div>
          {step < STEPS - 1 ? (
            <Button variant="ghost" fullWidth onClick={() => finish(true)}>
              Pular configuração
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
