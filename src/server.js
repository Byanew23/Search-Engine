const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database("db.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS data (
      id INTEGER PRIMARY KEY,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `);
});

// Handle GET requests for all data
app.get("/data", (req, res) => {
  db.all(`SELECT * FROM data`, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.json(rows);
    }
  });
});

// Handle GET requests for search queries
app.get("/search/:searchTerm", (req, res) => {
  const { searchTerm } = req.params;
  db.all(
    `SELECT * FROM data WHERE title LIKE '${searchTerm}%' LIMIT 10`,
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        res.json(rows);
      }
    }
  );
});

// Handle POST requests to add data
app.post("/data", express.json(), (req, res) => {
  const { url, title, description } = req.body;
  db.run(
    "INSERT INTO data (url, title, description) VALUES (?, ?, ?)",
    [url, title, description],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        res.status(201).send("Data added");
      }
    }
  );
});

// Handle DELETE requests to remove data by ID
app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM data WHERE id = ?", id, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.send("Data deleted");
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
