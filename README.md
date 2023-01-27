# Web3Hook Nextjs

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
# ADMIN_KEY to allow database CRUD operations
ADMIN_KEY=321

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
