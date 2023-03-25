#
# Stage 1: build
#
FROM node:18.15.0-alpine@sha256:ffc770cdc09c9e83cccd99d663bb6ed56cfaa1bab94baf1b12b626aebeca9c10 AS build

USER node

ARG CI=true
ARG DATABASE_URL=${DATABASE_URL}

WORKDIR /home/node

COPY --chown=node:node ["package.json", "package-lock.json", "prisma", "./"]

RUN npm ci && npx prisma generate

COPY --chown=node:node . .

RUN npm run build

RUN npx prisma db seed

#
# Stage 2: clean
#
FROM node:18.15.0-alpine@sha256:ffc770cdc09c9e83cccd99d663bb6ed56cfaa1bab94baf1b12b626aebeca9c10 AS clean

USER node

ARG CI=true

WORKDIR /home/node

COPY --chown=node:node ["package.json", "package-lock.json", "./"]

RUN npm ci --omit=dev

COPY --from=build --chown=node:node /home/node/node_modules/.prisma ./node_modules/.prisma

#
# Stage 3: production
#
FROM node:18.15.0-alpine@sha256:ffc770cdc09c9e83cccd99d663bb6ed56cfaa1bab94baf1b12b626aebeca9c10

ARG USERNAME=nonroot
ARG USERHOME=/home/${USERNAME}

ENV NODE_ENV=production

RUN deluser --remove-home node && \
  addgroup \
    --gid 1000 \
    ${USERNAME} \
  && \
  adduser \
    --disabled-password \
    --home ${USERHOME} \
    --ingroup ${USERNAME} \
    --uid 1000 \
    ${USERNAME}

RUN apk update && apk add --no-cache tini

COPY --from=build --chown=${USERNAME}:${USERNAME} /home/node/dist ${USERHOME}/src

COPY --from=clean --chown=${USERNAME}:${USERNAME} /home/node/node_modules ${USERHOME}/node_modules

WORKDIR ${USERHOME}

USER ${USERNAME}

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "src/index"]
