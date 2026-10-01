# D2 Savings Circle API

Express + MySQL implementation of the supplied D2 database assignment.

## Architecture

The project uses a three-tier structure:

- **Presentation/API tier:** `src/routes`, `src/controllers`, `src/middleware`
- **Business tier:** `src/services`
- **Data tier:** `src/repositories`, `src/config/db.js`

The supplied SQL schema, seed data, queries, and design memo are preserved under `sql/`.

## Requirements

- Node.js 18+
- MySQL 8+ (the supplied schema uses MySQL/InnoDB/ENUM/DELIMITER syntax)

## Setup

1. Create the database:

```sql
CREATE DATABASE d2;
```

2. Run the supplied schema and seed scripts:

```bash
mysql -u root -p d2 < sql/schema.sql
mysql -u root -p d2 < sql/seed.sql
```

3. Install dependencies:

```bash
npm install
```

4. Copy `.env.example` to `.env` and set your MySQL credentials.

5. Start the API:

```bash
npm start
```

For development:

```bash
npm run dev
```

## Endpoints

### `GET /circles/:id/members`

Returns the circle information and its members ordered by rotation position.

Example:

```bash
curl http://localhost:3000/circles/1/members
```

### `GET /circles/:id/cycles`

Returns the circle's cycles, contribution count, collected pool, and payout information where available.

Example:

```bash
curl http://localhost:3000/circles/1/cycles
```

### `GET /health`

Basic server health check.

```bash
curl http://localhost:3000/health
```

## Expected seeded data

The seed contains one circle, 10 members, 10 memberships, and 6 cycles. Each seeded cycle has ten contributions of `100.00`, for a `1000.00` pool. Cycles 1–6 pay rotation positions 1–6 respectively.
