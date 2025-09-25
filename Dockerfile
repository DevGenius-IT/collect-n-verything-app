FROM node:20-alpine AS build

WORKDIR /app

ENV NUXT_API_URL="https://api.collect-n-verything.com/v1/api"
ENV NUXT_PUBLIC_BASE_URL="https://collect-n-verything.com"
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.output ./.output
COPY --from=build /app/package*.json ./

RUN npm install --omit=dev --ignore-scripts --prefer-offline

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
