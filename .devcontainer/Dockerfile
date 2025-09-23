FROM node:22-bookworm

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install git postgresql-client \
  && apt-get clean -y && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /workspace/node_modules && chown -R node:node /workspace
RUN mkdir -p /home/node/.npm && chown -R node:node /home/node/.npm
ENV npm_config_cache=/workspace/.npm-cache
ENV TMPDIR=/workspace/.tmp

WORKDIR /workspace

USER node
