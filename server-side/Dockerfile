FROM node:18-alpine

WORKDIR /app

# Add build dependencies for bcrypt
RUN apk add --no-cache make gcc g++ python3

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]