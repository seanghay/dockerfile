FROM node:14-alpine

# Create a new directory for the project
RUN mkdir -p /opt/app

# Change current working directory
WORKDIR /opt/app

# Add a new user called `node` 
RUN adduser -S app

# Copy package files
COPY package*.json ./

# Set our env to be in CI
ENV CI true

ENV NODE_ENV production

RUN npm ci

# Copy our project files
COPY . .

# Change directory's owner
RUN chown -R app /opt/app

# Specify running user
USER app

# Port of the application
EXPOSE 8080

CMD [ "node", "main.js" ]