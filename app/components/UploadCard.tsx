"use client";

import { useRef, useState } from "react";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png"];

export type UploadedImage = {
  file: File;
  previewUrl: string;
};

type Props = {
  value: UploadedImage | null;
  onChange: (image: UploadedImage | null) => void;
  onError: (message: string | null) => void;
};

export function UploadCard({ value, onChange, onError }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined | null) => {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      onError("Unsupported file type. Use JPG, or PNG.");
      return;
    }
    if (file.size > MAX_BYTES) {
      onError(
        `Image is ${(file.size / 1024 / 1024).toFixed(1)} MB. Limit is 5 MB.`,
      );
      return;
    }
    onError(null);
    onChange({ file, previewUrl: URL.createObjectURL(file) });
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">
        1. Upload image
      </h2>

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-border bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.previewUrl}
            alt={value.file.name}
            className="h-56 w-full object-contain"
          />
          <button
            type="button"
            onClick={() => {
              URL.revokeObjectURL(value.previewUrl);
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            aria-label="Remove image"
            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-black"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={
            "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors " +
            (isDragging
              ? "border-foreground-muted bg-surface-2"
              : "border-border-strong")
          }
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border-strong text-foreground-muted">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p className="text-sm text-foreground-muted">
            Drag &amp; drop or click to upload
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-md border border-border-strong bg-surface-2 px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-border"
          >
            Choose file
          </button>
          <p className="text-xs text-foreground-subtle">
            Max 5 MB &mdash; JPG, PNG
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </section>
  );
}
