# Web3Hook Nextjs

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleon-do%2Fweb3hook)

Includes:

- Landing page (index.tsx)
- Dashboard (dashboard.tsx)
- API
  - `/api/admin`: Edit multiple rows in database
  - `/api/auth`: Sign in and update user info
  - `/api/moralis`: Relay webhook
  - `/api/zapier`: Zapier connection
  - Database connection

## Getting Started

Create `.env` file

```
cp .env.example
vi .env
```

To create table

```bash
npm run create:database
```

```bash
npm run dev
http://localhost:3000
```
