#!/bin/sh

echo "Waiting 5 sec Postgres warm-up..."
sleep 5

echo "Running Prisma Migrate..."
npx prisma migrate deploy

echo "Starting app..."
npm run start:prod