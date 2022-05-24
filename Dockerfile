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
FROM node:15.4

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build:ssr

EXPOSE 4000

CMD [ "node", "dist/furniture/server/main.js"]
