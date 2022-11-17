FROM node:14.15.4-slim
WORKDIR /home/node/app
RUN sudo chmod -R 777 /home/node
COPY package*.json ./
CMD ["sh", "-c", "npm install && tail -f /dev/null"]
COPY . .
RUN addgroup node && adduser -S -G node node
USER node
