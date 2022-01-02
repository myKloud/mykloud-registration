FROM node:15.13-alpine
WORKDIR /process.env.WORKDIR
COPY process.env.PACKAGE ./
COPY . .
RUN npm install
# Port Number
EXPOSE 3000
CMD ["npm" , "start"]