# D2 Savings Circle API

## Architecture

The project uses a three-tier structure:

- **Presentation/API tier:** `src/routes`, `src/controllers`, `src/middleware`
- **Business tier:** `src/services`
- **Data tier:** `src/repositories`, `src/config/db.js`

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
