# Coctelpedia

## Descripción

Este proyecto es una aplicación web sobre cócteles desarrollada con HTML, CSS y JavaScript, conectada a la API pública **TheCocktailDB**.

La aplicación permite:

* mostrar un listado de bebidas
* buscar cócteles por nombre
* acceder a una página de detalle con más información
* gestionar una lista de favoritos mediante operaciones CRUD conectadas a una base de datos MariaDB

He usado la API para obtener la información principal de los cócteles y una base de datos propia para almacenar los favoritos.

---

## Tecnologías utilizadas

* HTML
* CSS
* JavaScript
* Node.js
* Express
* mysql2
* cors
* MariaDB
* TheCocktailDB

---

## Estructura del proyecto

* `index.html`: página principal con buscador, listado de bebidas y sección de favoritos.
* `detalle.html`: página de detalle de cada cóctel.
* `css/style.css`: estilos de la página principal.
* `css/style-detalle.css`: estilos de la página de detalle.
* `js/script.js`: lógica de la página principal, carga inicial, buscador y gestión de favoritos.
* `js/script-detalle.js`: lógica de la página de detalle y guardado en favoritos.
* `backend/server.js`: backend con Express para conectar el frontend con MariaDB.
* `backend/package.json`: archivo de configuración del backend y dependencias.
* `dump-cocktails_app-202605031323.sql`: dump de la base de datos para facilitar la instalación.

---

## Requisitos para ejecutar el proyecto

Para poder usar el proyecto en otro ordenador necesito tener instalado lo siguiente:

* Node.js
* MariaDB
* un editor como Visual Studio Code
* opcionalmente, una extensión como Live Server para abrir el frontend de forma cómoda

---

## Instalación del proyecto

### 1. Descargar o descomprimir el proyecto

Primero hay que tener la carpeta completa del proyecto en el ordenador.

### 2. Instalar las dependencias del backend

Hay que abrir una terminal dentro de la carpeta `backend` y ejecutar:

```bash
npm install
```

Si hiciera falta instalarlas manualmente, estas son las dependencias utilizadas:

```bash
npm install express mysql2 cors
```

---

## Configuración de la base de datos

He añadido un archivo `.sql` con el dump de la base de datos para facilitar la instalación.

### Opción recomendada: importar el dump

En lugar de crear la base de datos a mano, se puede importar directamente el archivo:

* `dump-cocktails_app-202605031323.sql`

Ese archivo ya incluye la base de datos y la tabla necesarias para el proyecto.

Por ejemplo, se puede ejecutar desde terminal:

```bash
mysql -u root -p < dump-cocktails_app-202605031323.sql
```

Después de importar el dump, ya debería existir la base de datos `cocktails_app` con la tabla `favoritos`.

### Opción manual: crear la base de datos con script

Si no se quiere usar el dump, se puede crear manualmente con este script:

```sql
CREATE DATABASE cocktails_app;
USE cocktails_app;

CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cocktail VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    imagen VARCHAR(255),
    alcoholico VARCHAR(50),
    comentario VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Crear usuario para la conexión

Yo recomiendo crear un usuario específico para este proyecto. Por ejemplo:

```sql
CREATE USER 'cocktails_user'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON cocktails_app.* TO 'cocktails_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## Configuración del backend

Dentro de `backend/server.js` hay que comprobar los datos de conexión a la base de datos:

```js
const db = mysql.createConnection({
  host: "localhost",
  user: "cocktails_user",
  password: "1234",
  database: "cocktails_app"
});
```

Si en otro ordenador cambian el usuario, la contraseña o el nombre de la base de datos, hay que modificar esos valores.

---

## Puerto del servidor

El backend está configurado para ejecutarse en este puerto:

```js
const PORT = 3001;
```

Lo he dejado así porque el puerto 3000 puede estar ocupado por otra aplicación.

Si se cambia el puerto, también hay que actualizar las rutas `fetch()` del frontend para que apunten al mismo.

Ejemplo:

```js
fetch("http://localhost:3001/favoritos")
```

---

## Cómo ejecutar el proyecto

### 1. Iniciar MariaDB

Primero hay que asegurarse de que MariaDB está arrancado.

### 2. Iniciar el backend

Desde la carpeta `backend`:

```bash
node server.js
```

Si todo está bien, debería aparecer un mensaje parecido a este:

```bash
Conexión correcta a MariaDB
Servidor escuchando en http://localhost:3001
```

### 3. Abrir el frontend

Después hay que abrir `index.html` en el navegador.

Yo recomiendo hacerlo con Live Server o con un servidor local sencillo, para evitar problemas con JavaScript y las peticiones.

---

## Funcionamiento general

La aplicación tiene dos fuentes de datos.

### API externa

Uso la API de TheCocktailDB para:

* cargar bebidas aleatorias al iniciar la página
* buscar cócteles por nombre
* consultar el detalle completo de una bebida

### Base de datos propia

Uso MariaDB para guardar la entidad `favoritos`, con operaciones CRUD:

* **Create**: añadir un cóctel a favoritos
* **Read**: mostrar la lista de favoritos
* **Update**: editar el comentario de un favorito
* **Delete**: eliminar un favorito

---

## Flujo básico de uso

### Página principal

* se cargan varias bebidas desde la API
* el buscador permite buscar por nombre
* también se muestra la sección de favoritos obtenida desde MariaDB

### Página de detalle

* al pulsar sobre el nombre de una bebida, se abre su detalle
* desde esa página se puede añadir el cóctel a favoritos

### Favoritos

* los favoritos se leen desde la base de datos
* se pueden editar y eliminar desde el frontend

---

## Observación final

En este proyecto he separado dos responsabilidades:

* la API externa se encarga de proporcionar la información general de los cócteles
* la base de datos propia se encarga de almacenar la selección personalizada de favoritos

De esta forma, la aplicación cumple tanto la parte dinámica con API como el requisito de CRUD sobre base de datos.