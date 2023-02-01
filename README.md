# Web3Hook Nextjs

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleon-do%2Fweb3hook)

Includes:

- Landing page
- Dashboard
- API
  - `/api/zapier`: Zapier connection
  - `/api/evm`: Emit connect (gets real time transactions)
  - Database connection

## Getting Started

Create `.env` file

```
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
DATABASE_URL="mysql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

To create table

```bash
npm run create:database
```

```bash
npm run dev
http://localhost:3000
```
