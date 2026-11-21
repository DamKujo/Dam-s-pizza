# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Dam's Pizza" — a pizza-ordering storefront built with Next.js 14 (App Router), Prisma + PostgreSQL, NextAuth, Zustand, Tailwind + shadcn/ui (Radix). UI text, error messages and code comments are in Russian; keep new user-facing strings in Russian.

## Commands

```bash
npm run dev            # dev server on http://localhost:3000
npm run build          # production build (also the main type-check)
npm run lint           # next lint (eslint-config-next)
npm run prisma:push    # sync schema.prisma to the DB (no migrations folder; db push is the workflow)
npm run prisma:seed    # runs prisma/seed.ts via ts-node: truncates tables, then reseeds
npm run prisma:studio
```

`postinstall` runs `prisma generate`. There is no test suite.

## Environment 
- Full list is in `.env.example`. Do not read or modify `.env`.


Environment variables used: `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, `NEXT_PUBLIC_API_URL` (axios base URL, normally `http://localhost:3000/api`), `NEXTAUTH_SECRET`, `GITHUB_ID`/`GITHUB_SECRET`, `RESEND_API_KEY`, `YOOKASSA_STORE_ID`/`YOOKASSA_API_KEY`/`YOOKASSA_CALLBACK_URL`.

## Architecture

Path alias `@/*` maps to the repo root (e.g. `@/shared/lib`, `@/prisma/prisma-client`).

- `app/` — routes only. Route groups: `(root)` storefront (with a parallel `@modal` slot + intercepting route `(.)product/[id]` so product pages open as a modal from the catalog and as a full page on direct load), `(checkout)`, `(dashboard)` (stub). `app/api/*` holds REST route handlers; `app/actions.ts` holds server actions (`createOrder`, `updateUserInfo`, `registerUser`).
- `shared/` — everything else:
  - `components/ui` — shadcn/ui primitives (config in `components.json`); `components/shared` — app components, re-exported through `index.ts` barrels (import from `@/shared/components` / `@/shared/components/shared`).
  - `services/` — client-side axios wrappers around `/api/*`, aggregated as `Api` in `api-client.ts` (`Api.cart.*`, `Api.products.*`, …). DTO types in `services/dto`.
  - `store/` — Zustand stores (`cart`, `category`). The cart store calls `Api.cart.*` and normalizes responses with `getCartDetails`.
  - `lib/` — server and pure helpers (price calculation, `findPizzas` catalog query, `createPayment`, `sendEmail`, `getUserSession`), barrel-exported from `lib/index.ts`.
  - `hooks/` — client hooks for filters/URL sync (`use-filters` + `use-query-filters` write filter state to the query string via `qs`), pizza options, cart, ingredients.
  - `constants/` — NextAuth `authOptions`, zod checkout schema, pizza size/type maps.
- `prisma/` — `schema.prisma`, singleton client (`prisma-client.ts`), seed data.
- `@types/` — module augmentation for next-auth session, Prisma-derived composite types, YooKassa payloads.
- `claude/` - permissions.


### Key flows

- **Catalog filtering**: the home page is a server component that passes `searchParams` straight into `findPizzas`, which builds the Prisma query (sizes, pizzaTypes, ingredients, price range). Filters on the client only mutate the URL.
- **Product model**: `Product` → many `Variation` (price + optional `size` 25/35/45 and `pizzaType` 1/2; non-pizza products have null size/type). Cart items reference a `Variation` plus a set of extra `Ingredient`s. Prices are integers (rubles).
- **Cart**: anonymous, identified by a `cartToken` cookie (random UUID set by `POST /api/cart`). Adding an item merges into an existing `CartItem` only if variation and the exact ingredient set match. After any mutation, `updateCartTotalAmount(token)` recomputes `Cart.totalAmount` and returns the cart.
- **Checkout**: `createOrder` server action reads the cart by cookie, creates an `Order` (items snapshotted as JSON string), clears the cart, creates a YooKassa payment, emails the payment link via Resend (React email templates in `components/shared/email-templates`), and returns the payment URL. YooKassa then calls `POST /api/checkout/callback`, which sets order status `SUCCEEDED`/`CANCELLED` and sends the result email.
- **Auth**: NextAuth with JWT sessions, GitHub + Credentials providers (`shared/constants/auth-options.ts`). Credentials login requires `User.verified`; registration creates a `VerificationCode` and emails it, and `GET /api/auth/verify` confirms it. Use `getUserSession()` on the server.
