const express = require("express");
const db = require("./db");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>¡Bienvenido al CRM SENATI!</h1>");
});

app.get("/api/clients", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM clients ORDER BY business_name"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/api/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM clients WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Cliente no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el cliente", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/api/clients", async (req, res) => {
  try {
    const { business_name, industry, phone, website } = req.body;
    if (!business_name) {
      return res.status(400).json({ error: "El campo nombre es obligatorio" });
    }

    const [result] = await db.query(
      "INSERT INTO clients (business_name, industry, phone, website) VALUES (?, ?, ?, ?)",
      [business_name, industry, phone, website]
    );

    res
      .status(201)
      .json({ id: result.insertId, business_name, industry, phone, website });
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ error: "Ya existe un cliente con ese nombre de negocio" });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.put("/api/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { business_name, industry, phone, website } = req.body;

    if (!business_name) {
      return res.status(400).json({ error: "El campo nombre es obligatorio" });
    }

    const [existingClient] = await db.query(
      "SELECT id FROM clients WHERE business_name = ? AND id != ?",
      [business_name, id]
    );

    if (existingClient.length > 0) {
      return res
        .status(409)
        .json({ error: "Ya existe un cliente con ese nombre de negocio" });
    }

    const [result] = await db.query(
      "UPDATE clients SET business_name = ?, industry = ?, phone = ?, website = ? WHERE id = ?",
      [business_name, industry, phone, website, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ id, business_name, industry, phone, website });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ error: "Ya existe un cliente con ese nombre de negocio" });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.delete("/api/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM clients WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor de los mejores senatinos en http://localhost:${port}`);
});
