# 🔋 Fullstack Challenge – Participation Form & Dashboard

This is a fullstack web application implemented entirely with Next.js, using the App Router for front-end and API routes for back-end.
The app provides a form to collect participation data, displays entries in a responsive table with percentage calculations, and visualizes the data using Recharts.

---

## Tech Stack

**Frontend & Backend:**

- ⚛️ Next.js (App Router + API Routes)
- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 📝 Formik + Zod (form handling & validation)
- 📊 Recharts (chart visualization)
- 🔢 TanStack Table (advanced tables)

**Database & ORM:**

- 🐘 PostgreSQL
- 🗂️ Prisma ORM

**Dev Tools:**

- 📦 Yarn
- 🐳 Docker + docker-compose
- ✨ ESLint + Prettier

---

## Features

- 🔐 **Form Submission:** Users submit participation data via a Formik form with Zod validation
- 📋 **Dynamic Table:** Responsive table using TanStack Table with styled cells and percentage formatting
- 📈 **Charts:** Interactive bar and pie charts with Recharts for visual representation of participation data
- 🚦 **Validation:** Form validations show user-friendly messages
- 🧪 **Unit Testing:** Fully unit-testable API and UI components

---

## 📁 Project Structure

```
USER-PARTICIPATION/
├── .next/                # Build output
├── node_modules/
├── prisma/               # Prisma schema/migrations
├── public/               # Static assets, favicon, global CSS
├── src/
│   ├── app/              # Next.js app router (API + pages)
│   │   ├── api/          # Route handlers (backend logic)
│   │   ├── components/   # UI components (Chart, Form, Table)
│   │   ├── constants/    # Static/config data (types, status, colors, etc)
│   │   ├── lib/          # Reusable client/server modules
│   │   └── validation/   # Schema validation modules
├── docker-compose.yml    # Docker multi-service setup
├── package.json
├── tsconfig.json
└── README.md

```

---

🧪 Development Environment Used

| Tool    | Version      |
| ------- | ------------ |
| Node.js | v20.19.0     |
| PNPM    | v10.14.0     |
| Docker  | v28.1.1      |
| OS      | Ubuntu 23.04 |

---

## ⚙️ Environment Variables

Create a .env file at the root of the project:

```env
# Database
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
POSTGRES_HOST=localhost
POSTGRES_PORT=5433

# Prisma
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"
```

---

## We can directly generate the .env file using the below command

```bash
cp .env.example .env
```

## 🚀 Running the App

### 1 Run with Docker

```bash
docker-compose up
```

### 2 Install dependencies

At the root of the project:

```bash
yarn install
npx prisma generate
npx prisma migrate dev --name init
```

### 3 Run Next.js dev server

```bash
yarn dev
```

App will be running at:  
👉 `http://localhost:3000`

---

## 🧪 Testing

This project uses Jest with support for both frontend (client) and backend (api) tests.
Tests can be run individually or all at once from the monorepo root.

Run all tests

```bash
yarn test
```

---

## 📝 Developer Notes

## Fullstack with Next.js API Routes

### Backend with Express.js instead of Next.js API routes

- API endpoints live inside /pages/api or /app/api

- Form submission, user CRUD, and data fetching all handled through these Next.js routes

- No separate Node.js/Express service needed

## Server Components & Client Interactivity

- Non-interactive UI (table) rendered as server components for faster initial render

- Interactive components like charts and form inputs marked "use client"

- Reduces JavaScript bundle size and improves performance

## Testing Strategy

- API routes tested via mocked apiClient

- UI components tested using React Testing Library

- Prisma calls are mocked in unit tests to avoid hitting real database

## Screenshot

![alt text](/public/app-screenshot.png)

## GIF

![alt text](/public/user-participation.gif)
