# FinanceTracker — Frontend

A modern React web application for the Personal Finance & Budget Tracking Application.

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI)
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **Date Utility:** date-fns

## Project Structure
frontend/client/
├── public/
├── src/
│   ├── assets/
│   │   └── herogirl.jpg         # Splash screen hero image
│   ├── components/
│   │   ├── layout/              # App shell components
│   │   │   ├── Layout.jsx       # Main layout wrapper
│   │   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   │   └── Header.jsx       # Top header with clock
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── dialog.jsx
│   │   │   └── select.jsx
│   │   └── shared/              # Reusable shared components
│   ├── context/
│   │   └── AuthContext.jsx      # Global auth state
│   ├── hooks/                   # Custom React hooks
│   ├── lib/
│   │   ├── api/                 # API service layer
│   │   │   ├── axios.js         # Axios instance + interceptors
│   │   │   ├── auth.js
│   │   │   ├── transactions.js
│   │   │   ├── budgets.js
│   │   │   └── categories.js
│   │   └── utils.js             # Utility functions (cn)
│   ├── pages/
│   │   ├── Splash.jsx           # Landing/splash page
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Transactions.jsx     # Transaction management
│   │   ├── Budgets.jsx          # Budget management
│   │   └── Categories.jsx       # Category management
│   ├── App.jsx                  # Routes + auth guards
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── jsconfig.json
├── vite.config.js
└── package.json

## Prerequisites

- Node.js v18+
- npm v9+
- Backend server running on `http://localhost:5000`

## Setup Instructions

### 1. Navigate to frontend

```bash
cd finance-tracker/frontend/client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will start at: `http://localhost:5173`

### 4. Build for production

```bash
npm run build
```

## Pages & Features

| Page         | Route           | Description                    |
|--------------|-----------------|--------------------------------|
| Splash       | `/splash`       | Landing page with hero section |
| Login        | `/login`        | User authentication            |
| Register     | `/register`     | New user registration          |
| Dashboard    | `/`             | Financial overview + charts    |
| Transactions | `/transactions` | CRUD + filter transactions     |
| Budgets      | `/budgets`      | Budget tracking with progress  |
| Categories   | `/categories`   | Income & expense categories    |

## Key Features

- **JWT Authentication** with auto token refresh
- **Protected Routes** — redirects unauthenticated users
- **Real-time Clock** in header
- **Interactive Charts** — Bar chart, Pie chart (Recharts)
- **Budget Progress Bars** with exceeded alerts
- **Transaction Filters** — by type, category, date range
- **Responsive Layout** with sidebar navigation
- **Mouse-parallax Splash Screen** with animated counters

## Environment

The API base URL is configured in `src/lib/api/axios.js`:

```js
baseURL: 'http://localhost:5000/api'
```