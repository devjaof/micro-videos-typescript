FROM node:14.15.4-slim

RUN apt update && apt install -y --no-install-recommends \
    git \
    zsh \
    curl \
    wget

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssh-client 

WORKDIR /home/node/app

# TODO: configurar zsh

# RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.3/zsh-in-docker.sh)" -- \
#     -t https://github.com/denysdovhan/spaceship-prompt \
#     -a 'SPACESHIP_PROMPT_ADD_NEWLINE="false"' \
#     -a 'SPACESHIP_PROMPT_SEPARATE_LINE="false"' \
#     -p git \
#     -p ssh-agent \
#     -p https://github.com/zsh-users/zsh-autosuggestions \
#     -p https://github.com/zsh-users/zsh-completions

CMD ["sh", "-c", "npm install && tail -f /dev/null"]
