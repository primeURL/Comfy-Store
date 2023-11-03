FROM node:alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g npx
COPY . .
RUN npm run build


FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=base /app/dist /usr/share/nginx/html
EXPOSE 80
CMD nginx -g 'daemon off;'