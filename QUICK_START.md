# 🚀 Quick Start - View Your App Locally

## You need to run a local server (can't open as static HTML)

### 1. Install dependencies (if not done)
```bash
npm install
```

### 2. Create `.env` file
```bash
# Copy the example
cp .env.example .env

# Edit .env and set at minimum:
# DATABASE_URL=postgresql://user:password@localhost:5432/holger_coaching
# SESSION_SECRET=any-random-string-here
```

### 3. Set up database
```bash
# Create database (if using local PostgreSQL)
createdb holger_coaching

# Push schema
npm run db:push
```

### 4. Start the server
```bash
npm run dev
```

### 5. Open in browser
👉 **http://localhost:5000**

---

**Note**: The app runs both frontend (React) and backend (Express) on the same port.
See `LOCAL_SETUP.md` for detailed instructions.
