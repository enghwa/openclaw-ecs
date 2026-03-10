ARG OPENCLAW_IMAGE=ghcr.io/openclaw/openclaw:2026.3.7
FROM ${OPENCLAW_IMAGE}

ENV OPENCLAW_STATE_DIR=/home/node/.openclaw
ENV OPENCLAW_SNAPSHOT_BUCKET=""
ENV OPENCLAW_SNAPSHOT_KEY=""

USER root
WORKDIR /opt/openclaw-bootstrap
COPY package.json /opt/openclaw-bootstrap/package.json
RUN npm install --omit=dev
COPY entrypoint.js /usr/local/bin/openclaw-entrypoint.js
USER node

ENTRYPOINT ["node", "/usr/local/bin/openclaw-entrypoint.js"]
CMD ["node", "dist/index.js", "gateway", "--bind", "lan", "--port", "18789"]
