# Domus Pacis — Frontend

Next.js 15 frontend for the Domus Pacis hospitality platform.
Catholic Archdiocese of Kigali.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.local` and adjust:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Structure

```
src/
  app/
    (public)/        Public website (home, rooms, conferences, weddings, retreats, booking, contact)
    (admin)/         Admin dashboard (dashboard, bookings, customers, staff, inventory, finance, tax, analytics)
    login/           Authentication
  components/
    layout/          PublicHeader, PublicFooter, AdminSidebar, AdminHeader
    ui/              Shared UI components (KpiTile, Modal, Pagination, StatusBadge, etc.)
  lib/
    api/             Typed API clients (authApi, bookingApi, customerApi, staffApi, inventoryApi, financeApi, analyticsApi)
    types/           TypeScript types from domain model
    validation/      Zod schemas
    utils/           Helpers (formatCurrency, formatDate, cn, etc.)
  stores/            Zustand stores (auth, UI)
  hooks/             Custom React hooks
```

## Tech Stack

- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom brand palette — gold, burgundy, ivory)
- **State**: TanStack Query v5 (server), Zustand (client)
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios with JWT interceptors
- **Charts**: Recharts
- **Fonts**: Cormorant Garamond, DM Sans, Playfair Display

## Admin Routes

| Path           | Description           |
|----------------|-----------------------|
| `/dashboard`   | KPI overview          |
| `/bookings`    | Booking management    |
| `/customers`   | Customer management   |
| `/staff`       | Staff & schedules     |
| `/inventory`   | Stock management      |
| `/finance`     | Revenue & expenses    |
| `/tax`         | Tax & compliance      |
| `/analytics`   | Charts & reports      |
| `/login`       | Admin sign-in         |

## Public Routes

| Path           | Description           |
|----------------|-----------------------|
| `/home`        | Landing page          |
| `/services`    | All services          |
| `/rooms`       | Room catalogue        |
| `/conference`  | Conference halls      |
| `/weddings`    | Wedding gardens       |
| `/retreats`    | Retreat centres       |
| `/booking`     | Multi-step booking    |
| `/contact`     | Contact form          |
