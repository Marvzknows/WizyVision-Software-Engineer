import ReactMarkdown from "react-markdown";

type Props = {
  answer: string;
};

export function AnswerMarkDown({ answer }: Props) {
  return (
    <section className="animate-fade-in-up rounded-xl border border-border bg-surface p-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Answer</h2>
      <div className="rounded-lg border border-border-strong bg-surface-2 px-4 py-3">
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="whitespace-pre-wrap">{children}</p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            ol: ({ children }) => (
              <ol className="ml-5 list-decimal space-y-1">{children}</ol>
            ),
            ul: ({ children }) => (
              <ul className="ml-5 list-disc space-y-1">{children}</ul>
            ),
            li: ({ children }) => <li>{children}</li>,
            a: ({ href, children }) => (
              <a
                href={href}
                className="underline text-blue-500 hover:text-blue-700"
                target="_blank"
                rel="noreferrer"
              >
                {children}
              </a>
            ),
          }}
        >
          {answer}
        </ReactMarkdown>
      </div>
    </section>
  );
}
