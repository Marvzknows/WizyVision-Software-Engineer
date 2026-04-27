"use client";

// The `dark` class on <html> is the single source of truth for the theme.
// Tailwind's `dark:` classes show/hide the right icon in CSS
export function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground-muted transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MoonIcon className="block dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}
