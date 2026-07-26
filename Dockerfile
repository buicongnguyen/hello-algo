FROM node:24-alpine AS build

WORKDIR /hello-algo

COPY . .
RUN npm run build

FROM node:24-alpine

WORKDIR /hello-algo

COPY --from=build /hello-algo/dist ./dist
COPY --from=build /hello-algo/scripts/serve-site.mjs ./scripts/serve-site.mjs
COPY --from=build /hello-algo/scripts/server-path.mjs ./scripts/server-path.mjs

ENV HELLO_ALGO_HOST=0.0.0.0
ENV PORT=8000

EXPOSE 8000

CMD ["node", "scripts/serve-site.mjs"]
