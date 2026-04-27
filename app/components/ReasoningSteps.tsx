export type ReasoningStep =
  | { kind: "think"; text: string }
  | { kind: "act"; text: string; crops?: { label: string; src?: string }[] }
  | { kind: "observe"; text: string };

type Props = {
  steps: ReasoningStep[];
};

export function ReasoningSteps({ steps }: Props) {
  return (
    <section className="animate-fade-in-up rounded-xl border border-border bg-surface p-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">
        Reasoning steps
      </h2>
      <ol className="space-y-3">
        {steps.map((step, idx) => (
          <li key={idx} className="flex flex-col gap-2">
            <div className="flex items-start gap-2.5">
              <Badge kind={step.kind} />
              <p className="flex-1 pt-0.5 text-sm leading-relaxed text-foreground-muted">
                {step.text}
              </p>
            </div>
            {step.kind === "act" && step.crops && step.crops.length > 0 && (
              <div className="ml-17 flex flex-wrap gap-2">
                {step.crops.map((crop, i) => (
                  <CropThumb key={i} label={crop.label} src={crop.src} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Badge({ kind }: { kind: ReasoningStep["kind"] }) {
  const styles =
    kind === "think"
      ? "bg-blue-100 text-blue-900"
      : kind === "act"
        ? "bg-amber-100 text-amber-900"
        : "bg-pink-100 text-pink-900";
  const label = kind === "think" ? "Think" : kind === "act" ? "Act" : "Observe";
  return (
    <span
      className={
        "inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-xs font-semibold " +
        styles
      }
    >
      {label}
    </span>
  );
}

function CropThumb({ label, src }: { label: string; src?: string }) {
  return (
    <figure className="flex h-16 w-16 flex-col items-center justify-center overflow-hidden rounded-md border border-border-strong bg-surface-2">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} className="h-full w-full object-cover" />
      ) : (
        <span className="text-[11px] font-medium text-foreground-subtle">
          {label}
        </span>
      )}
    </figure>
  );
}
