FROM node:16-slim as builder

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN chown -R node /opt/app

RUN npm run build

FROM nginx

COPY --from=builder /opt/app/dist/* /usr/share/nginx/html/

RUN chown -R nginx /usr/share/nginx/html/
