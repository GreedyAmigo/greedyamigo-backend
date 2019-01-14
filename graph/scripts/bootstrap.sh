#!/usr/bin/env bash
echo "Bootstraping..."

echo "Running Prisma Deploy..."
npm run prisma:deploy

echo "Starting application..."
npm start