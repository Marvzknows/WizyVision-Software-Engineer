"use client";

type Props = {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
};

export function QuestionCard({ value, onChange, disabled }: Props) {
  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">
        2. Ask a question
      </h2>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={3}
        placeholder="e.g. Is the operator wearing a hard hat?"
        className="block w-full resize-none rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-subtle focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-foreground-muted/20 disabled:opacity-60"
      />
    </section>
  );
}
