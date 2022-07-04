## `nginx`


[![nginx](https://github.com/seanghay/dockerfile/actions/workflows/nginx.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/nginx.yml)
```dockerfile
FROM nginx

COPY ./static/index.html /usr/share/nginx/html/index.html

```


---

## `node-16`


[![node-16](https://github.com/seanghay/dockerfile/actions/workflows/node-16.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/node-16.yml)
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

## `node-14`


[![node-14](https://github.com/seanghay/dockerfile/actions/workflows/node-14.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/node-14.yml)
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

## `node-16-slim`


[![node-16-slim](https://github.com/seanghay/dockerfile/actions/workflows/node-16-slim.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/node-16-slim.yml)
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

