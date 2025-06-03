#FROM nginx
#COPY ./dist/angular-test/browser /usr/share/nginx/html

# Stage 1: Build the Angular application
FROM node:20 AS build
# Note: Use a Node version compatible with your Angular version.
# Node 18 is generally a good choice for recent Angular versions.

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Generate the build artifacts.
# The output will be in /app/dist/my-angular-app/browser/
# (Adjust 'my-angular-app' if your project name in angular.json's outputPath is different,
# or if your outputPath is simply 'dist/browser')
RUN npm run build -- --configuration production
# Or, if you don't have a specific build script for production:
# RUN node_modules/.bin/ng build --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output from the 'build' stage to Nginx's webroot
# IMPORTANT: Adjust the source path '/app/dist/my-angular-app/browser/' if your build output path is different.
# Check your 'angular.json' file for the 'outputPath' property (e.g., "dist/my-angular-app/browser" or "dist/browser").
COPY --from=build /app/dist/angular-test/browser/ /usr/share/nginx/html

# Optional: Copy a custom Nginx configuration file (see step 2 below)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx default port)
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
