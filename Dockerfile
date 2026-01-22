FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json webpack.config.ts ./
COPY public ./public
COPY src ./src

RUN npm run build:prod

FROM nginx:stable-alpine AS runtime

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
