# Skill IT Education

A responsive React/Vite marketing site for Skill IT Education (course catalog, lead capture,
enrollment, mock interviews, brochure downloads). It uses Supabase Auth for login/signup
(email/password + Google/GitHub OAuth) and a Node.js/Express API for all application data.

## Architecture

```
Frontend (React/Vite)
   │
   ├──> Supabase Auth (GoTrue) — login, signup, OAuth session management
   │
   └──> Node.js + Express API ──> Supabase PostgreSQL
```

The frontend never talks to Supabase's database directly. Supabase Auth is the one exception —
it's Supabase's own hosted auth service, addressed with the public anon key, and is not a table
this repo owns. Every table read/write (lead capture, enrollments) goes through the Express API
in `backend/`, which holds the Supabase **service-role** key and is the only thing allowed to use it.

## Tech stack

- React 19 + Vite, React Router, Tailwind CSS, Framer Motion
- Node.js + Express, Helmet, CORS, express-rate-limit
- Supabase (PostgreSQL + Auth)

## Project structure

```
├── backend/                  Express API
│   ├── api/
│   │   └── index.js          Vercel serverless entry — exports the Express app as-is
│   ├── src/
│   │   ├── app.js             Express app (no app.listen — imported by both entry points)
│   │   ├── server.js          app.listen() entry for local dev / non-Vercel hosts
│   │   ├── config/           env loading
│   │   ├── db/                Supabase service-role client
│   │   ├── middleware/        auth, validation, rate limiting, error handling
│   │   ├── controllers/
│   │   ├── services/          Supabase table access
│   │   └── routes/
│   ├── vercel.json            rewrites every path to api/index.js
│   └── .env.example
│
├── src/                       Frontend (Vite root)
│   ├── components/            auth/, common/, course/
│   ├── contexts/               AuthContext (Supabase session), BrochureGateContext
│   ├── data/                  static course/content data (not database-backed)
│   ├── lib/
│   │   ├── supabase.js         Supabase Auth client only (no table access)
│   │   ├── apiClient.js        fetch wrapper for the backend API
│   │   ├── leads.js             POST /api/leads
│   │   └── enrollments.js       POST /api/enrollments
│   ├── pages/, sections/
│   └── App.jsx, main.jsx
│
├── supabase/
│   └── migrations/            SQL schema, run in order against your Supabase project
│
├── vercel.json                 SPA fallback rewrite for React Router (frontend project)
└── .env.example                frontend env template
```

## Supabase setup

This project needs a Supabase project you control (Project Settings live at supabase.com).

1. Create a new Supabase project.
2. Open the SQL Editor and run every file in `supabase/migrations/` **in filename order** —
   later files depend on objects created by earlier ones (e.g. the RLS hardening pass
   references a function from the first migration).
3. Under Authentication → Providers, enable Email, and optionally Google/GitHub OAuth if you
   want social login (each provider needs its own OAuth app credentials and redirect URL,
   configured per-project — these are not portable between Supabase projects).
4. Under Project Settings → API, copy the Project URL, the `anon` public key, and the
   `service_role` secret key for the environment variables below.

## Environment variables

### Backend (`backend/.env`) — private, server-side only

| Variable | Required | Notes |
|---|---|---|
| `PORT` | no (default 4001) | |
| `SUPABASE_URL` | yes | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | **Server-side only. Never send this to the frontend or commit it.** |
| `FRONTEND_URL` | yes | Origin allowed by CORS |

### Frontend (`.env.local`) — public, bundled into the client build

| Variable | Required | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | yes | Same project URL, used only for Supabase Auth |
| `VITE_SUPABASE_ANON_KEY` | yes | Public anon key — safe to expose, RLS-scoped |
| `VITE_API_URL` | yes | Where the backend is running, e.g. `http://localhost:4001` |
| `VITE_WHATSAPP_NUMBER` | no | Floating WhatsApp button |

Copy `.env.example` → `.env.local` (frontend) and `backend/.env.example` → `backend/.env`
(backend) and fill in real values. Both `.env*` patterns are gitignored — never commit them.

## Backend setup

```bash
cd backend
npm install
cp .env.example .env   # fill in SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / FRONTEND_URL
npm run dev             # development, auto-restarts on change
npm start                # production
```

## Frontend setup

```bash
npm install
cp .env.example .env.local   # fill in VITE_* values
npm run dev
```

Build for production with `npm run build`; preview it with `npm run preview`.

## Database

Tables (see `supabase/migrations/` for full DDL):

- **`leads`** — name, email, phone, course_interest. Written by every lead-capture form
  (Contact page, exit popup, brochure gate, header contact modal) via `POST /api/leads`.
- **`enrollments`** — `user_id` (FK → `auth.users`), `course_slug`, `status`, unique on
  `(user_id, course_slug)`. Written by the course enrollment flow via `POST /api/enrollments`.
- **`profiles`** — one row per `auth.users` row, auto-created by the `handle_new_user` trigger
  on signup.
- **`courses`**, **`company_questions`** — schema exists with RLS policies for future use; the
  current frontend reads course/question content from local data files, not these tables.

RLS is enabled on every table; the backend uses the service-role key, which bypasses RLS by
design — the backend's own input validation is the trust boundary for writes.

To recreate the database from scratch: create a Supabase project and run every file in
`supabase/migrations/` in filename order.

## API documentation

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | none | Liveness check |
| POST | `/api/leads` | none, rate-limited | Create a lead (Contact page, exit popup, brochure modal) |
| POST | `/api/enrollments` | Bearer Supabase session token | Upsert an enrollment for the signed-in user |

### `POST /api/leads`

```json
{ "fullName": "Asha Rao", "email": "asha@example.com", "phoneNumber": "+919876543210", "courseInterest": "Data Science" }
```

`201` on success with `{ "data": { ...row } }`. `400` on invalid input.

### `POST /api/enrollments`

Requires `Authorization: Bearer <supabase-access-token>` (the frontend already holds this from
its Supabase Auth session).

```json
{ "courseSlug": "data-science" }
```

`201` on success. `401` if not signed in / token invalid. `400` on invalid slug.

All Supabase table access goes through the service-role client in `backend/src/db/supabaseClient.js`,
so table-level RLS policies are bypassed here by design — the backend is the trust boundary, and
does its own validation (`backend/src/middleware/validate.js`) before writing. Errors are
centralized in `backend/src/middleware/errorHandler.js`; 5xx responses never leak internals (DB
errors, stack traces) to the client — only logged server-side.

## Deployment (Vercel, two separate projects)

The frontend and backend deploy as two independent Vercel projects from this one repo — each
project points at a different **Root Directory** and gets its own env vars and domain.

### Backend project

1. New Vercel project → same Git repo → **Root Directory: `backend`**.
2. Vercel auto-detects `backend/api/index.js` as a serverless function and `backend/vercel.json`
   rewrites every path (`/api/leads`, `/api/health`, ...) to it — no build command needed.
3. Set env vars (Project Settings → Environment Variables): `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY`, `FRONTEND_URL` (the frontend's production domain,
   `https://skilliteducation.com` — no trailing slash). `PORT` is not needed; Vercel invokes the
   function directly rather than listening on a port.
4. Deploy. Note the resulting backend domain (e.g. `https://skill-it-education-api.vercel.app`,
   or attach a custom subdomain like `https://api.skilliteducation.com`).

### Frontend project

1. New Vercel project → same Git repo → **Root Directory: `.`** (repo root). Vercel auto-detects
   the Vite framework preset (`npm run build`, output `dist`); `vercel.json` at the root adds the
   SPA fallback rewrite so client-side routes (React Router) work on direct load/refresh.
2. Set env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL` (the backend
   project's domain from above), `VITE_WHATSAPP_NUMBER`.
3. Deploy.

### After both are live

- Re-check `FRONTEND_URL` on the backend project matches the frontend's **final** production
  domain (custom domain if you attach one) — CORS in `backend/src/app.js` does an exact-origin
  match in production, so a mismatch here (including a trailing slash) blocks every request.
- Vercel preview deployments (per-branch/PR URLs) get a different origin each time and will be
  rejected by that same CORS check — expected for preview builds hitting a production API; point
  preview env vars at a separate backend deployment if you need previews to work end-to-end.
- `express-rate-limit`'s in-memory store (`backend/src/middleware/rateLimiter.js`) resets between
  serverless invocations/instances and isn't shared across regions, so the 20-requests/15-min
  limit is best-effort on Vercel, not a hard guarantee — fine for blunting casual spam, not a
  substitute for a shared store (e.g. Upstash Redis) if abuse becomes a real problem.

## Security notes

- Never commit `.env`, `.env.local`, or any file containing real credentials — `.gitignore`
  excludes `.env`, `.env.local`, and `.env.*.local` in both the root and `backend/`.
- `SUPABASE_SERVICE_ROLE_KEY` is **server-side only**. It must never appear in frontend code,
  frontend env vars (anything prefixed `VITE_`), logs, or commits — it bypasses all RLS policies.
- All privileged database writes happen in the Express backend, never in the browser.
- The backend validates every request body itself and never forwards raw database or stack
  trace details to clients (see `backend/src/middleware/errorHandler.js`).
