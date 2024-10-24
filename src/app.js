import express from "express";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "admin",
  host: "postgres",
  database: "users",
  password: "admin",
  port: 5432,
});

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM users");
    res.status(200).json({ data: query.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is running on 3000 port");
});
