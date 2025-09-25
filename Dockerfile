FROM node:20-alpine AS build

WORKDIR /app

ARG NUXT_API_URL
ARG NUXT_PUBLIC_BASE_URL
ENV NUXT_API_URL=$NUXT_API_URL
ENV NUXT_PUBLIC_BASE_URL=$NUXT_PUBLIC_BASE_URL
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
