# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todos los archivos del proyecto
COPY . .

# Exponer el puerto 8080
EXPOSE 8080

# Comando para ejecutar el servidor
CMD ["npx", "http-server", "-p", "8080", "-c-1"]
