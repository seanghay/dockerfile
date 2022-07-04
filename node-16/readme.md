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

