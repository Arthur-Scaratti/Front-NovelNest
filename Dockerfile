# Stage 1: Build the Angular application
FROM node:20-alpine as builder

WORKDIR /app

# Copia todos os arquivos do diretório atual para o container
COPY . .

# Instala as dependências
RUN npm install

# Instala o Angular CLI globalmente
RUN npm install -g @angular/cli

# Limpa o cache do npm
RUN npm cache clean --force
# Expõe a porta 5050 do container
EXPOSE 5050

# Comando para rodar o servidor de desenvolvimento do Angular em modo de produção
CMD ["npm run build && npm run serve:ssr",]
