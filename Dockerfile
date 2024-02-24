# Stage 1: Build the Angular app
FROM node:latest AS build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Stage 2: Create a lighter production image
FROM node:alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/server.js ./
COPY --from=build /usr/src/app/package.server.json ./package.json

# Install only production dependencies
RUN npm install --production

# Expose the port your server is running on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]