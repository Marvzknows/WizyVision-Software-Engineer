"use client";

import { useState } from "react";
import { UploadCard, type UploadedImage } from "./UploadCard";
import { QuestionCard } from "./QuestionCard";
import { AnalyzeButton } from "./AnalyzeButton";
import { AnswerCard } from "./AnswerCard";
import { ReasoningSteps, type ReasoningStep } from "./ReasoningSteps";
import { ErrorAlert } from "./ErrorAlert";

type Result = {
  lead: string;
  body: string;
  steps: ReasoningStep[];
};

export function VisualQA() {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const canSubmit = image !== null && question.trim().length > 0;

  const handleAnalyze = () => {
    if (!canSubmit) return;
    setError(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      <header className="mb-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
          WizyVision
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          Visual Q&amp;A
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Upload an image and ask a question about it.
        </p>
      </header>

      <UploadCard
        value={image}
        onChange={(next) => {
          setImage(next);
          if (next) setError(null);
        }}
        onError={setError}
      />

      <QuestionCard value={question} onChange={setQuestion} disabled={false} />

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      <AnalyzeButton
        onClick={handleAnalyze}
        disabled={!canSubmit}
        loading={false}
      />

      {/* {status === "ready" && result && */}
      {result && (
        <>
          <AnswerCard lead={result.lead} body={result.body} />
          <ReasoningSteps steps={result.steps} />
        </>
      )}
    </div>
  );
}
