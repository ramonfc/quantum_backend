FROM node
WORKDIR /quantumBacken
COPY ["package.json", "package-lock.json", "./"]
RUN npm i
COPY . .
CMD ["npm", "start"]