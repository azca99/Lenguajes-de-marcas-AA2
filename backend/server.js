const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Aplicación Express
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "cocktails_user",
  password: "1234",
  database: "cocktails_app"
});

// Comprobar conexión
db.connect((error) => {
  if (error) {
    console.log("Error de conexión a la base de datos:", error);
    return;
  }
  console.log("Conexión correcta a MariaDB");
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Obtener todos los favoritos
app.get("/favoritos", (req, res) => {
  const sql = "SELECT * FROM favoritos ORDER BY fecha_creacion DESC";

  db.query(sql, (error, resultados) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener favoritos" });
      return;
    }

    res.json(resultados);
  });
});

// Crear un favorito
app.post("/favoritos", (req, res) => {
  const { id_cocktail, nombre, imagen, alcoholico, comentario } = req.body;

  const sql = `
    INSERT INTO favoritos (id_cocktail, nombre, imagen, alcoholico, comentario)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [id_cocktail, nombre, imagen, alcoholico, comentario],
    (error, resultado) => {
      if (error) {
        res.status(500).json({ error: "Error al crear favorito" });
        return;
      }

      res.json({
        mensaje: "Favorito añadido correctamente",
        idInsertado: resultado.insertId
      });
    }
  );
});

// Actualizar comentario de un favorito
app.put("/favoritos/:id", (req, res) => {
  const id = req.params.id;
  const { comentario } = req.body;

  const sql = "UPDATE favoritos SET comentario = ? WHERE id = ?";

  db.query(sql, [comentario, id], (error, resultado) => {
    if (error) {
      res.status(500).json({ error: "Error al actualizar favorito" });
      return;
    }

    res.json({ mensaje: "Favorito actualizado correctamente" });
  });
});

// Eliminar un favorito
app.delete("/favoritos/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM favoritos WHERE id = ?";

  db.query(sql, [id], (error, resultado) => {
    if (error) {
      res.status(500).json({ error: "Error al eliminar favorito" });
      return;
    }

    res.json({ mensaje: "Favorito eliminado correctamente" });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});