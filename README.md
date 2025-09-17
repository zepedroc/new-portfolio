## José Mota — Portfolio

Minimal, black-and-white portfolio built with Next.js App Router, React, and Tailwind CSS. It features a chat assistant powered by Groq via the AI SDK, a contact form (Formspree), and an experience timeline.

### Tech stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Runtime**: React 19
- **Styling**: Tailwind CSS v4, custom utilities in `src/index.css`
- **UI**: Radix primitives, custom UI components in `src/components/ui`, Sonner toasts, lucide-react icons
- **AI**: `ai` (Vercel AI SDK) + `@ai-sdk/groq` (server route at `/api/chat`)
- **Analytics**: `@vercel/analytics`

### Key features

- **Home**: Hero with minimalist aesthetic
- **Experience**: Work history with technologies and achievements
- **Chat**: Conversational assistant about José (`/chat` → `/api/chat`)
- **Contact**: Formspree-powered contact form with toasts
- **Global navigation** and glass-style UI

## Getting started

### Prerequisites

- Node.js 18.18+ (or 20+ recommended)
- npm (or your preferred package manager)

### Installation

```bash
npm install
```

### Environment variables

Create a `.env.local` file at the project root:

```bash
# Required for the chat assistant (server-side)
GROQ_API_KEY=your_groq_api_key

# Required for the contact form (client-side)
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_formspree_form_id
```

Notes:

- The chat route uses Groq via `@ai-sdk/groq` with model `openai/gpt-oss-120b`. An active `GROQ_API_KEY` is required.
- The contact page posts to `https://formspree.io/f/<id>` using `NEXT_PUBLIC_FORMSPREE_FORM_ID`.

### Development

```bash
npm run dev
```

Runs the Next.js dev server with Turbo mode.

### Build & start

```bash
npm run build
npm start
```

### Lint & typecheck

```bash
npm run lint
npm run tsc
```

## Scripts

- **dev**: `next dev --turbo`
- **build**: `next build`
- **start**: `next start`
- **lint**: `eslint .`
- **tsc**: `tsc`
- **knip**: `knip`

## Project structure (selected)

```
src/
  app/
    page.tsx              # Home
    experience/page.tsx   # Experience & projects
    chat/page.tsx         # Chat UI
    api/chat/route.ts     # Chat API (Groq via AI SDK)
    contact/page.tsx      # Contact form (Formspree)
    layout.tsx            # Global layout, navigation, analytics, toasters
  components/
    Navigation.tsx
    ui/                   # Button, Card, Input, etc.
  index.css               # Tailwind v4 theme and utilities
```

## Deployment

Works out of the box on platforms that support Next.js (e.g., Vercel). Ensure `GROQ_API_KEY` and `NEXT_PUBLIC_FORMSPREE_FORM_ID` are set in your environment.
