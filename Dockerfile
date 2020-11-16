# pull official base image
FROM node:15-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY . /app/

RUN npm install
RUN npm install react-scripts@latest -g
RUN npm run build

EXPOSE 3000

# start app
CMD ["npm", "start"]

# Save if we want to use this later.

#FROM node:15-alpine as build

#WORKDIR /app

#COPY . /app/

#RUN npm install
#RUN npm install react-scripts@latest -g
#RUN npm run build

#FROM nginx:1.16.0-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx/nginx.conf /etc/nginx/conf.d

#EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]