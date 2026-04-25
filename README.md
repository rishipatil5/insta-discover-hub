# Handmade Sellers Directory

A directory of handmade Instagram sellers built with TanStack Start, React 19, Tailwind CSS v4, and Lovable Cloud (Supabase) for the backend.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (v1) + [Vite 7](https://vitejs.dev/)
- **UI**: React 19, Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Backend**: Supabase (Lovable Cloud) — auth, database, edge functions
- **Forms / Validation**: react-hook-form + zod
- **Data fetching**: TanStack Query
- **Email**: Resend

## Prerequisites

Install one of the following package managers / runtimes:

- **Node.js** ≥ 20 (LTS recommended) — <https://nodejs.org>
- **npm** (ships with Node) **or** **bun** ≥ 1.1 (recommended) — <https://bun.sh>

Check versions:

```bash
node -v
npm -v
# or
bun -v
```

## 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

## 2. Install dependencies

Using **bun** (recommended, fastest):

```bash
bun install
```

Using **npm**:

```bash
npm install
```

Using **pnpm** or **yarn** also works:

```bash
pnpm install
# or
yarn install
```

## 3. Environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Required variables (provided by Lovable Cloud / Supabase):

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-ref>
```

Optional (for email notifications via Resend — see `EMAIL_SETUP.md`):

```env
RESEND_API_KEY=<your-resend-key>
```

> If you opened this project from Lovable, the `.env` file is auto-generated and these values are already filled in for you.

## 4. Run the dev server

```bash
bun run dev
# or
npm run dev
```

The app will be available at <http://localhost:8080> (or the next free port).

## 5. Build for production

```bash
bun run build
# or
npm run build
```

Preview the production build locally:

```bash
bun run preview
```

## Available scripts

| Script        | Description                            |
| ------------- | -------------------------------------- |
| `dev`         | Start the Vite dev server              |
| `build`       | Production build                       |
| `build:dev`   | Development-mode build                 |
| `preview`     | Preview the production build locally   |
| `lint`        | Run ESLint                             |
| `format`      | Format the codebase with Prettier      |

## Project structure

```
src/
├── components/        # Reusable UI components (incl. shadcn/ui)
├── routes/            # File-based routes (TanStack Router)
├── integrations/
│   └── supabase/      # Supabase client + generated types (auto-managed)
├── lib/               # Utilities and helpers
├── data/              # Static seller data
└── styles.css         # Tailwind v4 theme tokens
supabase/
├── config.toml        # Supabase project config
└── migrations/        # SQL migrations
```

## Backend (Supabase)

This project uses Supabase via Lovable Cloud. Tables, RLS policies and edge functions live under `supabase/`. The `src/integrations/supabase/client.ts` and `types.ts` files are auto-generated — **do not edit them by hand**.

To run against your own Supabase project outside Lovable:

1. Create a project at <https://supabase.com>.
2. Run the SQL files in `supabase/migrations/` in order via the Supabase SQL editor.
3. Update `.env` with your project's URL, anon key and project ref.

## Admin access

The admin panel lives at `/admin`. You'll need a Supabase auth user with the `admin` role in the `user_roles` table. See the migration files for the role schema.

## Troubleshooting

- **Port already in use** — set a different port: `PORT=3000 bun run dev`
- **`Failed to resolve import`** — re-run `bun install`
- **Supabase auth/database errors** — verify your `.env` values match the Supabase project

## License

MIT
