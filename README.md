# 📊 Participation Dashboard

This is a fullstack web application implemented entirely with Next.js, using the App Router for front-end and API routes for back-end.
The app provides a form to collect participation data, displays entries in a responsive table with percentage calculations, and visualizes the data using Recharts.

---

## 🚀 Running the App

### 1. Clone the Repository

```bash
git clone https://github.com/Gourav0304/participation-overview
```

### 2. Navigate to the Project Directory

```bash
cd participation-overview
```

### 3. Run with Docker

```bash
docker-compose up
```

### 4. Install dependencies

At the root of the project:

```bash
yarn install
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run Next.js dev server

```bash
yarn dev
```

App will be running at:  
👉 `http://localhost:3000`

---

## 🧪 Testing

This project uses Jest with support for both frontend (client) and backend (api) tests.
Tests can be run individually or all at once from the root.

Run all tests

```bash
yarn test
```

---

## 🛠️ Tech Stack

**Frontend & Backend:**

- 🪄 **Next.js** (App Router + API Routes)
- ⚛️ **React + TypeScript**
- 🎨 **Tailwind CSS**
- 📝 **Formik + Zod** (form handling & validation)
- 📊 **Recharts** (chart visualization)
- 📑 **TanStack Table** (advanced tables)

**Database & ORM:**

- 🐘 **PostgreSQL**
- 🪢 **Prisma ORM**

**Dev Tools:**

- 📦 **Yarn**
- 🐳 **Docker + docker-compose**
- 🧹 **ESLint + Prettier**

---

## 🚀 Features

- 📝 **Form Submission** → Submit participation data with validation (Formik + Zod)
- 📑 **Dynamic Table** → Responsive table powered by TanStack with percentage formatting
- 📊 **Charts** → Interactive Pie & Bar charts using Recharts
- ⚠️ **Validation** → Friendly error messages and structured validation
- 🧪 **Unit Testing** → Fully unit-tested API routes and UI components

---

## 📝 Project Structure

```
PARTICIPATION-DASHBOARD/
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

## 🌱 Environment Variables

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

---

## ⚙️ Development Environment Used

| Tool    | Version      |
| ------- | ------------ |
| Node.js | v20.19.0     |
| PNPM    | v10.14.0     |
| Docker  | v28.1.1      |
| OS      | Ubuntu 23.04 |

---

## 🔧 Implementation Highlights

### Fullstack with Next.js API Routes

- API endpoints live inside /app/api

- Form submission, user creation and data fetching all handled through these Next.js routes

- No separate Node.js/Express service needed

### Data Handling with TanStack Table

- Participation records are rendered using **TanStack Table**.

- Supports custom cell styling via `meta` configs (e.g., alignment, conditional colors).

- Ensures a responsive, accessible table layout with server-side data updates.

### Server Components & Client Interactivity

- Non-interactive UI (table) rendered as server components for faster initial render

- Interactive components like charts and form inputs marked "use client"

- Reduces JavaScript bundle size and improves performance

### Testing Strategy

- API routes tested via mocked apiClient

- UI components tested using React Testing Library

- Prisma calls are mocked in unit tests to avoid hitting real database

## Screenshot

![alt text](/public/app-screenshot.png)

## GIF

![alt text](/public/user-participation.gif)
