# Web3Hook Nextjs

Includes:

- Landing page
- Dashboard
- API
  - `/api/zapier`: Zapier connection
  - `/api/evm`: Emit connect (gets real time transactions)
  - Database connection

## Getting Started

Set up Tigris database: https://www.tigrisdata.com/docs/quickstarts/

Create `.env` file

```
# ADMIN_KEY to allow database CRUD operations
ADMIN_KEY=321

# https://www.tigrisdata.com/docs/sdkstools/cli/configuration/#example-environment-configuration
TIGRIS_URI=api.preview.tigrisdata.cloud
TIGRIS_PROJECT=MyProject
TIGRIS_CLIENT_ID=00000000000000000000000000000000
TIGRIS_CLIENT_SECRET=0000000000000000000000000000000000000000000000000000000000000000
TIGRIS_DB_BRANCH=main
```

To create and test a database collection

```bash
npm run create:database
npm run test:database
```

```bash
npm run dev
http://localhost:3000
```
