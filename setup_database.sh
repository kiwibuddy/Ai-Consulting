#!/bin/bash
echo "📦 Installing PostgreSQL via Homebrew..."
brew install postgresql@16

echo ""
echo "🚀 Starting PostgreSQL service..."
brew services start postgresql@16

echo ""
echo "⏳ Waiting for PostgreSQL to start..."
sleep 3

echo ""
echo "📊 Creating database 'holger_coaching'..."
createdb holger_coaching

echo ""
echo "✅ Database created! Now run: npm run db:push"
