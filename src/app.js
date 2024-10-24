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
app.use(express.urlencoded({ extended: true }));

app.get("/user", (req, res) => {
  const html = `
    <form method="POST" action="/user">
      <label for="name">Nome:</label>
      <input type="text" id="name" name="name" required>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <label for="password">Senha:</label>
      <input type="password" id="password" name="password" required>
      <button type="submit">Criar usuário</button>
    </form>
  `;
  res.send(html);
});

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await pool.query(
      `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`
    );
    return res.redirect("/users");
  } catch (error) {
    return res.send(`<p>Erro ao criar usuário (${error.message})</p>`);
  }
});

app.get("/users", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM users");
    const html = `
      <p style="font-size: 24px; font-weight: 600;"> Dados do banco Postgres (tabela: users)</p>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr style="height: 40px; font-size: 18px; text-align: left">
          <th style="padding: 0 4px 0 4px;">Nome</th>
          <th style="padding: 0 4px 0 4px;">Email</th>
          <th style="padding: 0 4px 0 4px;">Senha</th>
        </tr>
        ${query.rows
          .map(
            (row) => `
          <tr style="height: 40px; font-size: 18px;">
            <td style="padding: 0 4px 0 4px;">${row.name}</td>
            <td style="padding: 0 4px 0 4px;">${row.email}</td>
            <td style="padding: 0 4px 0 4px;">${row.password}</td>
          </tr>
        `
          )
          .join("")}
      </table>
  `;
    return res.send(html);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is running on 3000 port");
});
