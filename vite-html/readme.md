## `vite-html`


[![vite-html](https://github.com/seanghay/dockerfile/actions/workflows/vite-html.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/vite-html.yml)

#### Download via npm

```
npm init dockerfile@latest vite-html
```


#### Dockerfile

```dockerfile
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


```


---

