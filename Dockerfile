FROM node:18


RUN groupadd -r runner && \
  useradd --create-home --home /home/runner -r -g runner runner

USER runner
WORKDIR /home/runner

COPY --chown=runner:runner package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

ENV NODE_ENV=production

COPY --chown=runner:runner  . .

RUN yarn run build

ENTRYPOINT [ "yarn", "run", "start" ]
