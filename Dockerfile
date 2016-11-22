FROM node:latest

RUN mkdir -p /home/adms
ADD . /home/adms
WORKDIR /home/adms
RUN npm install
EXPOSE 4200

CMD [ ".\node_modules\.bin\ng", "serve", "--proxy-config", "--prod", "proxy.config.dev.json"]