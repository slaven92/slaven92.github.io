FROM node

RUN yarn global add @gridsome/cli

RUN gridsome create blog

WORKDIR /blog
RUN yarn add @gridsome/source-filesystem
RUN yarn add @gridsome/transformer-remark
EXPOSE 8080
CMD [ "gridsome", "develop" ]
