FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

# Limpa o cache do npm
RUN npm cache clean --force
# Expõe a porta 5050 do container
EXPOSE 5050

RUN npm run build
# Comando para rodar o servidor de desenvolvimento do Angular em modo de produção
CMD ["npm", "run", "serve:ssr"]
