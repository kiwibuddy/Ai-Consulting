# Database Setup Options

## ✅ Option 1: Local PostgreSQL (Recommended for Development)

### Quick Setup Script
I've created a script for you. Just run:

```bash
./setup_database.sh
```

This will:
1. Install PostgreSQL via Homebrew
2. Start the PostgreSQL service
3. Create the `holger_coaching` database

Then update your `.env` file:
```env
DATABASE_URL=postgresql://nathanielb@localhost:5432/holger_coaching
```

(Replace `nathanielb` with your macOS username if different)

Then run:
```bash
npm run db:push
```

---

## ✅ Option 2: Free Cloud Database (Easiest - No Installation)

### Using Supabase (Free Tier)

1. Go to https://supabase.com and sign up (free)
2. Create a new project
3. Go to Project Settings → Database
4. Copy the "Connection string" (URI format)
5. Update your `.env`:
   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. Run: `npm run db:push`

### Using Neon (Free Tier)

1. Go to https://neon.tech and sign up (free)
2. Create a new project
3. Copy the connection string
4. Update your `.env` with the connection string
5. Run: `npm run db:push`

---

## After Database Setup

Once your database is set up, run:

```bash
npm run db:push
```

This creates all the necessary tables. Then you can start the app:

```bash
npm run dev
```

Open http://localhost:5000 in your browser!
