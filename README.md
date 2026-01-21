# LifeFlow

Full-stack portfolio project (Monorepo) built with:
- Backend: NestJS, Prisma, PostgreSQL (Docker)
- Frontend: Next.js App Router, React, TypeScript
- Validation: class-validator (backend), zod (frontend)

## Architecture
- Monorepo: `api/` (backend) + `web/` (frontend)
- REST API
- DTO validation at API boundary (NestJS ValidationPipe)
- Prisma ORM + migrations
- Dockerized Postgres

## BPM Concepts
### Expense lifecycle
CREATED → SUBMITTED → APPROVED → PAID → ARCHIVED

### BPM mapping
- Process Instance: Expense
- Activities: Create / Submit / Approve / Pay
- State: `expense.status` (enum)
- Events: Expense created, submitted, approved...
- KPIs: Monthly spend, category totals, approval time (future)

## Endpoints (core)
- GET /categories
- GET /expenses
- POST /expenses
- PATCH /expenses/:id/submit
- PATCH /expenses/:id/approve
- PATCH /expenses/:id/pay
- GET /analytics/expenses/monthly?year=2026&month=1

## Run locally
### Backend
cd api
npm install
npx prisma migrate dev
npm run start:dev

### Frontend
cd web
npm install
npm run dev
