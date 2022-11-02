# Actividad9
Actividad 9 en el Máster en Full Stack Developer de la UNIR. Diseño de API con Expressjs y base de datos MySQL.

Este proyecto se ha generado con [Express](https://github.com/expressjs/express) version 4.16.1.

## Implementación en el servidor

Deberá crear el fichero .env en la carpeta donde coloque el proyecto. Este fichero tiene las entradas:

| Entrada del fichero | Descripción |
| --- | --- |
| PORT=3000 | Puerto donde escuchará el servidor (esta entrada es opcional - valor por defecto 3000 -) |
| DB_HOST="db_host" | Host donde está la base de datos |
| DB_USER="db_user" | Usuario de conexión a la base de datos |
| DB_PASSWORD="db_password" | Clave del usuario para conectar a la base de datos |
| DB_PORT=3306 | Puerto en el que escucha el servidor de base de datos |
| DB_DATABASE="db_name" | Nombre de la base de datos |

Ejecute `ng start` para arrancar el servidor. Una vez arrancado el servidor, puede consultar la documentación del API en http://localhost:3000/api-docs/.

Junto al código fuente tiene el fichero Actividad9_Dump20221102.sql con una copia de la base de datos con la que empezar a probar.