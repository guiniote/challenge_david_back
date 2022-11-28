# Challenge para David

Ejecutar **npm i** o **npm install** tras descargar el repositorio.

## Frontend🖥

### Configurar el archivo .ENV antes de iniciar la app

<pre><code>
REACT_APP_API_DOMAIN=http://localhost:3001
</code></pre>


## Backend🔩

### Configurar el archivo .ENV antes de ejecutar los comandos de Sequelize ⌨

<pre><code>
DB_NAME=Nombre de usuario para la DB
DB_USER=root
DB_PASSWORD=contraseña de la DB
DB_PORT=Puerto de conexion
DB_HOST=Ip local o Localhost

SECRET=Para que funcione JWT, puede ser cualquier palabra
</code></pre>

### Sequelize ⌨

Para que la app funcione, deberán ser ejecutados los siguientes comandos de sequelize para crear y configurar la DB. Respetar el orden para evitar inconvenientes

- <pre><code>sequelize db:create</code></pre>
- <pre><code>sequelize db:migrate</code></pre>

