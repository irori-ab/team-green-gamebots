# Use the official Node.js image as a base
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app using Vite
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port defined in the Nginx configuration
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]