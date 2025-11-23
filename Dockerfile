# Usar nginx para servir archivos estáticos
FROM nginx:alpine

# Copiar archivos estáticos al directorio de nginx
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY vue-styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY *.json /usr/share/nginx/html/
COPY src/ /usr/share/nginx/html/src/

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Nginx se ejecuta automáticamente
CMD ["nginx", "-g", "daemon off;"]
