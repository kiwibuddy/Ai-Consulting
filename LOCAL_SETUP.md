# Local Development Setup Guide

## Quick Start

This is a **full-stack application** that requires a local server. You cannot open it as a static HTML file.

### Prerequisites

1. **Node.js** (v20.19.0 or v22.12.0+) - Check with `node --version`
2. **PostgreSQL Database** - You'll need a local PostgreSQL instance or a remote database URL
3. **npm** - Comes with Node.js

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and set at minimum:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/holger_coaching
SESSION_SECRET=your-random-secret-key-here
PORT=5000
```

**To generate a random SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Set Up Database

1. **Create a PostgreSQL database:**
   ```bash
   createdb holger_coaching
   ```
   Or use your preferred PostgreSQL client.

2. **Push the database schema:**
   ```bash
   npm run db:push
   ```
   This will create all the necessary tables.

### Step 4: Start the Development Server

```bash
npm run dev
```

The server will start on **http://localhost:5000** (or whatever PORT you set).

### Step 5: Open in Browser

Navigate to: **http://localhost:5000**

You should see the landing page!

## Demo accounts (recommended for local testing)

Seed two ready-made accounts with sample data (one session, action item, notifications, resource):

```bash
npm run db:seed
```

Then sign in on the landing page with:

| Role   | Email              | Password |
|--------|--------------------|----------|
| Coach  | coach@example.com  | demo123  |
| Client | client@example.com | demo123  |

After login you’ll be redirected to the coach or client dashboard. You can also **Sign up** in the dialog to create additional accounts.

## Using the login dialog

1. Go to the landing page
2. Click the sign-in button or navigate to `/intake`
3. **Sign in**: use the demo accounts above or your own email/password
4. **Sign up**: create a new account (choose role: client or coach)

## Optional: Email Setup (for testing emails)

To test email functionality locally, add to your `.env`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=Holger Coaching <noreply@holgercoaching.com>
APP_URL=http://localhost:5000
```

Without this, emails will be logged to console but not sent.

## Optional: File Upload Setup (for testing file uploads)

To test file uploads, you'll need Google Cloud Storage credentials:

```env
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
```

Or use base64-encoded credentials:

```env
GOOGLE_CLOUD_KEY=base64-encoded-json
```

Without this, file uploads will fail but the rest of the app will work.

## Troubleshooting

### "DATABASE_URL must be set"
- Make sure you created a `.env` file with `DATABASE_URL`

### "Port already in use"
- Change `PORT` in `.env` to a different port (e.g., 5001)
- Or stop whatever is using port 5000

### Database connection errors
- Make sure PostgreSQL is running: `pg_isready`
- Check your `DATABASE_URL` is correct
- Make sure the database exists: `psql -l` to list databases

### Module not found errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

## Development vs Production

- **Development** (`npm run dev`): Uses Vite dev server with hot reload
- **Production** (`npm run build` then `npm start`): Serves pre-built static files

## What Gets Served

- **Frontend**: React app (client/) - served via Vite in dev, static files in production
- **Backend**: Express API (server/) - handles all `/api/*` routes
- **Both run on the same port** (default: 5000)
