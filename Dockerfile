# Create image based on the official Node 6 image from dockerhub
FROM node:6 as portal-estudiante-build
#Install angular cli
RUN npm install -g @angular/cli@latest
# Create a directory where our app will be placed
RUN mkdir -p /opt/portal-estudiante
# Copy application
COPY ./ /opt/portal-estudiante
# Change directory so that our commands run inside this new directory
WORKDIR /opt/portal-estudiante
# Install dependencies
RUN npm install
#Compile the angular 4 application
RUN ng build --prod --aot
#Create image based on the official nginx image from dockerhub
FROM nginx
#Copy compiled application to nginx folder
COPY --from=portal-estudiante-build /opt/portal-estudiante/dist /usr/share/nginx/html
