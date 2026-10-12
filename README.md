# Precision Grading

Web frontend for a trading card grading service. Customers submit cards for grading, pay, and track status. Admins review submissions and publish grades.

## Features

**Public**
- Landing page, About Us, Grading info, Services & Pricing, Portfolio, Contact Us, Terms & Policy

**Auth**
- Sign up, email verification code, login, forgot/reset password

**User dashboard** (`/user-dashboard`)
- Post cards (single and bulk), image upload with crop
- Submission status tracking
- Subscription / checkout (payment page includes delivery charges)
- Profile management
- Download grading labels / reports (PDF)

**Admin dashboard** (`/dashboard`)
- Submission status management
- Grading review and analysis
- Order history
- Delete submissions
- Profile

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- Tailwind CSS, shadcn/ui (Radix UI primitives), lucide-react
- TanStack Query for server state, Zustand for client state
- Axios for HTTP, Formik + Yup for forms
- `@react-pdf/renderer` for PDF labels
- Recharts, Swiper, react-easy-crop, react-dropzone, notistack

## Getting Started

### Prerequisites
- Node.js 18+
- Running backend API

### Install

```bash
npm install
```

### Environment

Create `.env` in project root:

```env
NEXT_PUBLIC_API_URL=<backend api url, used in browser>
API_URL=<backend api url, used server-side>
```

### Run

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build
npm start       # serve production build
npm run lint    # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── (public)/    # marketing pages
│   ├── (auth)/      # login, sign-up, verification, password reset
│   ├── (user)/      # user-dashboard
│   └── (admin)/     # admin dashboard
├── components/      # shared UI components
├── hooks/           # React Query hooks per API action
├── lib/             # axios client, constants, helpers
├── modals/          # modal dialogs
├── providers/       # app-wide providers
├── stores/          # Zustand stores (user, submission)
├── types/           # shared TypeScript types
├── utils/           # helpers, PDF generator
└── middleware.ts    # route protection
```

## Auth & Routing

[src/middleware.ts](src/middleware.ts) guards routes using cookies:
- `token` — user session, grants `/user-dashboard`
- `adminToken` — admin session, grants `/dashboard`
- Public routes stay accessible regardless of login state.
