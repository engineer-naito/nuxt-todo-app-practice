FROM node:20.18.1

RUN apt update; apt install -y wget software-properties-common apt-transport-https git

# pnpm をグローバルにインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /workspace
