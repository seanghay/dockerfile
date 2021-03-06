## `nginx`


[![nginx](https://github.com/seanghay/dockerfile/actions/workflows/nginx.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/nginx.yml)

[View](./nginx)


#### Download via npm

```
npm init dockerfile@latest nginx
```


#### Dockerfile

```dockerfile
FROM nginx

COPY ./static/index.html /usr/share/nginx/html/index.html

```


---

## `nginx-php-74`


[![nginx-php-74](https://github.com/seanghay/dockerfile/actions/workflows/nginx-php-74.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/nginx-php-74.yml)

[View](./nginx-php-74)


#### Download via npm

```
npm init dockerfile@latest nginx-php-74
```


#### Dockerfile

```dockerfile
FROM wyveo/nginx-php-fpm:php74

COPY index.php /usr/share/nginx/html/index.php

```


---

## `node-14`


[![node-14](https://github.com/seanghay/dockerfile/actions/workflows/node-14.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/node-14.yml)

[View](./node-14)


#### Download via npm

```
npm init dockerfile@latest node-14
```


#### Dockerfile

```dockerfile
FROM node:14-alpine

# Create a new directory for the project
RUN mkdir -p /opt/app

# Change current working directory
WORKDIR /opt/app

# Copy package files
COPY package*.json ./

# Set our env to be in CI
ENV CI true

ENV NODE_ENV production

RUN npm ci

# Copy our project files
COPY . .

# Change directory's owner
RUN chown -R node /opt/app

# Specify running user
USER node

# Port of the application
EXPOSE 8080

CMD [ "node", "main.js" ]

```


---

## `node-16`


[![node-16](https://github.com/seanghay/dockerfile/actions/workflows/node-16.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/node-16.yml)

[View](./node-16)


#### Download via npm

```
npm init dockerfile@latest node-16
```


#### Dockerfile

```dockerfile
FROM node:16-alpine

# Create a new directory for the project
RUN mkdir -p /opt/app

# Change current working directory
WORKDIR /opt/app

# Copy package files
COPY package*.json ./

# Set our env to be in CI
ENV CI true

ENV NODE_ENV production

RUN npm ci

# Copy our project files
COPY . .

# Change directory's owner
RUN chown -R node /opt/app

# Specify running user
USER node

# Port of the application
EXPOSE 8080

CMD [ "node", "main.js" ]

```


---

## `node-16-slim`


[![node-16-slim](https://github.com/seanghay/dockerfile/actions/workflows/node-16-slim.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/node-16-slim.yml)

[View](./node-16-slim)


#### Download via npm

```
npm init dockerfile@latest node-16-slim
```


#### Dockerfile

```dockerfile
FROM node:16-slim

# Create a new directory for the project
RUN mkdir -p /opt/app

# Change current working directory
WORKDIR /opt/app

# Copy package files
COPY package*.json ./

# Set our env to be in CI
ENV CI true

ENV NODE_ENV production

RUN npm ci

# Copy our project files
COPY . .

# Change directory's owner
RUN chown -R node /opt/app

# Specify running user
USER node

# Port of the application
EXPOSE 8080

CMD [ "node", "main.js" ]

```


---

## `node-18-slim`


[![node-18-slim](https://github.com/seanghay/dockerfile/actions/workflows/node-18-slim.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/node-18-slim.yml)

[View](./node-18-slim)


#### Download via npm

```
npm init dockerfile@latest node-18-slim
```


#### Dockerfile

```dockerfile
FROM node:18-slim

# Create a new directory for the project
RUN mkdir -p /opt/app

# Change current working directory
WORKDIR /opt/app

# Copy package files
COPY package*.json ./

# Set our env to be in CI
ENV CI true

ENV NODE_ENV production

RUN npm ci

# Copy our project files
COPY . .

# Change directory's owner
RUN chown -R node /opt/app

# Specify running user
USER node

# Port of the application
EXPOSE 8080

CMD [ "node", "main.js" ]

```


---

## `vite-html`


[![vite-html](https://github.com/seanghay/dockerfile/actions/workflows/vite-html.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/vite-html.yml)

[View](./vite-html)


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

