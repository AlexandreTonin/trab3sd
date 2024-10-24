# Usar a imagem oficial do Node.js
FROM node:latest

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos de dependências para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta que o aplicativo usará
EXPOSE 3000

# Comando padrão para iniciar o aplicativo
CMD ["npm", "start"]
