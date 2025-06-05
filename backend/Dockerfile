FROM node:20.5.1 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20.5.1

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@nestjs ./node_modules/@nestjs

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/test ./test
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig*.json ./

COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
