"use client";

import { useState } from "react";
import { UploadCard, type UploadedImage } from "./UploadCard";
import { QuestionCard } from "./QuestionCard";
import { AnalyzeButton } from "./AnalyzeButton";
import { ErrorAlert } from "./ErrorAlert";
import { ThemeToggle } from "./ThemeToggle";
import { AnswerMarkDown } from "./AnswerMarkdown";

type AnalyzeResponse = { answer: string } | { error: string };

export function VisualQA() {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const canSubmit = image !== null && question.trim().length > 0 && !isLoading;

  const handleAnalyze = async () => {
    if (!canSubmit || !image) return;
    setError(null);
    setAnswer(null);
    setIsLoading(true);

    const form = new FormData();
    form.append("image", image.file);
    form.append("question", question.trim());

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: form,
      });

      const data: AnalyzeResponse = await res.json().catch(() => ({
        error: "Server returned an invalid response.",
      }));

      if (!res.ok || "error" in data) {
        const message =
          "error" in data ? data.error : `Request failed (${res.status}).`;
        console.error("[analyze] error:", message);
        setError(message);
        return;
      }

      // console.log("answer:", data.answer);
      setAnswer(data.answer);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Network request failed.";
      console.error("[analyze] error:", message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      <header className="mb-2 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
            WizyVision
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            Visual Q&amp;A
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Upload an image and ask a question about it.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <UploadCard
        value={image}
        onChange={(next) => {
          setImage(next);
          if (next) setError(null);
        }}
        onError={setError}
      />

      <QuestionCard
        value={question}
        onChange={setQuestion}
        disabled={isLoading}
      />

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      <AnalyzeButton
        onClick={handleAnalyze}
        disabled={!canSubmit}
        loading={isLoading}
      />

      {answer && <AnswerMarkDown answer={answer} />}
    </div>
  );
}
