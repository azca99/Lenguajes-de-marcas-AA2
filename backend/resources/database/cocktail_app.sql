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

<-- Crear usuario para DB -->
CREATE USER 'cocktails_user'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON cocktails_app.* TO 'cocktails_user'@'localhost';
FLUSH PRIVILEGES;