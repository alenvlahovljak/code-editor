# Base image
FROM node:15.5.1-alpine3.10

# Create app directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and yarn.lock files
COPY package.json /app
COPY yarn.lock /app

# Install app dependencies
RUN yarn

# Bundle app
COPY . /app

## Expose port
EXPOSE 4000

# Run app
CMD ["yarn", "start"]
