FROM node:15.13-alpine

WORKDIR /mykloud-registration

COPY package.json ./

COPY . .

RUN npm install


EXPOSE 3000

CMD ["npm" , "start"]