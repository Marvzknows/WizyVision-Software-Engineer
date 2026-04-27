type Props = {
  /** Bold lead phrase rendered before the rest of the answer (e.g. "Yes."). */
  lead?: string;
  body: string;
};

export function AnswerCard({ lead, body }: Props) {
  return (
    <section className="animate-fade-in-up rounded-xl border border-border bg-surface p-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Answer</h2>
      <div className="rounded-lg border border-border-strong bg-surface-2 px-4 py-3 text-sm leading-relaxed text-foreground">
        {lead && <span className="font-semibold">{lead} </span>}
        {body}
      </div>
    </section>
  );
}
