FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Crea el directorio para subir archivos
RUN mkdir -p /app/excel/uploads

# Verifica el contenido de /app/build antes de ejecutar el archivo
RUN ls -la /app/build

CMD ["node", "build/index.js"]
