# Learning Log

## Hours per day

| Day | Date       | Hours | Focus                                                                                                     |
| --- | ---------- | ----- | --------------------------------------------------------------------------------------------------------- |
| 1   | N/A        |
| 2   | 25/02/2026 | 1+    | prompting to AI the initial UI, summarizing and breaking down the tasks                                   |
| 3   | N/A        |
| 4   | 25/04/2026 | 2+    | documentation and youtube tutorials                                                                       |
| 5   | 26/04/2026 | 2+    | hands on practice, debugging, experimenting, trial and error, dicision making for the actual/final output |
| 6   | 26/04/2026 | 3+    | nextjs setup and AI to use (claude and chatgpt), components, output documentation/readme/learning_log     |
| 7   | N/A        |

**Total:** 8+ hours.

## What I got stuck on, and how I got unstuck

- I initially struggled with deciding whether to manually build every UI component from scratch or install a component library like ShadCN UI. Building components manually takes more time, especially for common elements like modals, cards, buttons, and dialogs, while installing a full UI library felt unnecessary for a simple project where I only needed a few custom components.
- The React 19 lint rule `react-hooks/set-state-in-effect` flagged my first
  `ThemeToggle` (which used `useState` + `useEffect` to read the DOM class on
  mount). I tried `useSyncExternalStore` first, decided it was too heavy for a
  beginner-friendly read, and ended up with a stateless toggle that just
  flips the `dark` class on `<html>` and lets Tailwind's `dark:` variant
  swap the icon in CSS. No React state, no effect, no lint warning.

## What I used AI for

- **Tool:** Claude Code and ChatGpt.
- **Tasks I delegated:**
  - Scaffolding the Next.js client UI from a screenshot mockup
    (`UploadCard`, `QuestionCard`, `AnalyzeButton`, `AnswerCard`, etc.).
  - Drafting the `/api/analyze` route handler against the `@google/genai`
    SDK sample in the brief.
  - Reviewing my own refactors of the route handler
- **Tasks I did myself:**
  - choosing the deployment platform, writing the README and LEARNING_LOG, debugging a specific error, naming the component variants, API integration

## How I validated AI-generated code

- Ran `npm run lint` and `npm run build` after every meaningful change.
  Both must pass before I move on.
- Manually tested in the browser: upload a JPG, ask a question, verify
  the answer renders correctly; submit with no image / empty question and confirm the button
  stays disabled.
- Read every line of generated code before committing. When Claude
  proposed a `Result` type with `lead`/`body`/`steps` for a mocked
  response, I noticed the real API only returns `answer` and trimmed
  the type to match.

## Decisions and trade-offs

- **Stack:** Next.js App Router with TypeScript + Tailwind. Single
  project — frontend and backend in the same repo via Route Handlers.
  Trade-off: less flexible than a separate API service, but for a
  stateless single-purpose app it removes a whole deployment surface.
- **Markdown rendering:** Used react-markdown instead of building a custom renderer manually. Trade-off: adds a small dependency, but provides a more reliable and scalable solution with support
- **No persistence:** No database, no history, no follow-up turns

## What I'd do differently with more time

- **Tier 2 (Agentic Vision / Code Execution).** I sketched a
  `ReasoningSteps` component for Think → Act → Observe early in the
  build but never wired it to a real Gemini-with-`code_execution` call.
  Reading the API docs and surfacing the Python/intermediate-image
  steps would be the next thing I'd do.
- I would implement it properly and improve the UI/UX by making the reasoning flow more visual and user-friendly through clear step separation, better spacing, smooth transitions, and subtle visual cues for each stage.

**Honesty note:** The week didn’t go in a strictly linear “plan → build → finish” way as it might appear in this log. A significant portion of time was spent experimenting and deciding between different approaches, especially around UI development—whether to manually build components or rely on a library like ShadCN, and eventually settling on a more flexible approach using AI-generated scaffolding that I could refine. I also spent more time than expected debugging small integration issues and validating AI-generated code line by line, which slowed initial progress but helped me better understand what was actually being generated and why. What stood out most was how iterative the process really was: I constantly shifted between learning, testing, and simplifying scope just to keep the project moving forward within limited time.
