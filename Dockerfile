FROM node:18

# install python and make
RUN apt-get update && \
  apt-get install -y gnupg wget python3 build-essential && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  apt-get purge -y --auto-remove && \
  rm -rf /var/lib/apt/lists/*apt

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
