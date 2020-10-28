FROM node:12

ENV PORT 3000

ENV APP_ROOT /usr/src/app
RUN mkdir -p $APP_ROOT

WORKDIR $APP_ROOT

COPY ./package.json ./yarn.lock $APP_ROOT/
RUN yarn install

CMD ["yarn", "dev"]
