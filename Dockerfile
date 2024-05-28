FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

# Limpa o cache do npm
RUN npm cache clean --force

EXPOSE 5050

CMD ["ng", "serve", "--host=0.0.0.0", "--port=5050", "--configuration=production"]
