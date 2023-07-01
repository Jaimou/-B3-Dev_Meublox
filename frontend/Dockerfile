# build step
FROM node:16.13.0-alpine3.11 as build
WORKDIR /app
COPY package.json ./
COPY .env ./
RUN npm install
COPY . ./
RUN npm run build

# release step
FROM nginx:stable-alpine3.17-slim as release
COPY --from=build /app/build /usr/share/nginx/html/
# Copy the default nginx.conf 
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]