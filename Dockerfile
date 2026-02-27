# Usa uma imagem leve do Node.js
FROM node:18-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do seu projeto (src, public, etc)
COPY . .

# Expõe a porta que o Vite usa (5173)
EXPOSE 5173

# Comando para rodar o site liberando o acesso externo
CMD ["npm", "run", "dev", "--", "--host"]