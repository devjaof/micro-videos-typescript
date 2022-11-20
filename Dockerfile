FROM node:14.15.4-slim

RUN apt update && apt install -y --no-install-recommends \
    git 

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssh-client 

WORKDIR /home/node/app

CMD ["sh", "-c", "npm install && tail -f /dev/null"]
