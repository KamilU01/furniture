# FROM node:15.4 as build

# WORKDIR /app
# COPY package*.json .
# COPY angular*.json .
# RUN npm install
# RUN npm run prod

# FROM nginx:1.19

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/dist/angular-docker /usr/share/nginx/html

# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:15.4 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.19

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/furniture /usr/share/nginx/html

# Expose port 80
EXPOSE 80