# 1. Punto de partida: una imagen de Node.js versión 18, súper ligera.
FROM node:18-alpine

# 2. Creo una carpeta de trabajo dentro del contenedor para no dejar las cosas tiradas.
WORKDIR /usr/src/app

# 3. Copio solo los package.json. Docker es listo: si estos archivos no cambian,
# no volverá a instalar todo en el siguiente paso, ahorrando mucho tiempo.
COPY package*.json ./

# 4. Instalo las dependencias que dice el package.json.
RUN npm install

# 5. Ahora sí, copio el resto de mi código fuente (los archivos .ts, etc.).
COPY . .

# 6. Ejecuto el comando para "compilar" mi código de TypeScript a JavaScript.
# Esto crea la carpeta 'dist' que es lo que se usa en producción.
RUN npm run build

# 7. El comando final. Esto es lo que se ejecutará cuando arranque el contenedor.
# Le digo que use node para ejecutar el archivo principal de mi app ya compilada.
CMD ["node", "dist/main"]