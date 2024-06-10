const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 3000;

app.use(bodyParser.json());
const fs = require("fs");

const HTML = fs.readFileSync("index.html", "utf8");

const db = mysql.createConnection({
  host: "103.196.152.28",
  user: "pbs_teknokrat_1",
  password: "@pbs2023Teknokrat",
  database: "pbs_teknokrat_1",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to Mysql database");
});

app.get("/", (req, res) => {
  res.send(HTML);
});

app.get("/table", (req, res) => {
  const query = "SHOW TABLES";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// # MAHASISWA #

// Mendapatkan daftar semua mahasiswa
app.get("/mahasiswa", (req, res) => {
  const query = "SELECT * FROM mahasiswa";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Menambahkan mahasiswa baru
app.post("/mahasiswa", (req, res) => {
  const { nama, nim } = req.body;
  const query = "INSERT INTO mahasiswa ( nama, nim) VALUES (?, ?)";

  db.query(query, [nama, nim], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      message: "New mahasiswa added successfully",
      id: results.insertId,
    });
  });
});

// Mendapatkan detail mahasiswa berdasarkan ID
app.get("/mahasiswa/:id_mahasiswa", (req, res) => {
  const id = req.params.id_mahasiswa;
  const query = `SELECT * FROM mahasiswa where id_mahasiswa = '${id}'`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Memperbarui data mahasiswa berdasarkan ID
app.put("/mahasiswa/:id_mahasiswa", (req, res) => {
  const id = req.params.id_mahasiswa;
  const { nama, nim } = req.body;
  const query = "UPDATE mahasiswa SET nama = ?, nim =? WHERE id_mahasiswa = ?";

  db.query(query, [nama, nim, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Mahasiswa not found" });
    }
    res.json({ message: "Mahasiswa updated successfully" });
  });
});

// Menghapus mahasiswa berdasarkan ID
app.delete("/mahasiswa/:id_mahasiswa", (req, res) => {
  const id = req.params.id_mahasiswa;
  const query = "DELETE FROM mahasiswa WHERE id_mahasiswa = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Mahasiswa not found" });
    }
    res.json({ message: "Mahasiswa deleted successfully" });
  });
});

// # DOSEN #

// Mendapatkan daftar semua dosen
app.get("/dosen", (req, res) => {
  const query = "SELECT * FROM dosen";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Menambahkan dosen baru
app.post("/dosen", (req, res) => {
  const { nama, nip } = req.body;
  const query = "INSERT INTO dosen ( nama, nip) VALUES (?, ?)";

  db.query(query, [nama, nip], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      message: "New dosen added successfully",
      id: results.insertId,
    });
  });
});

// Mendapatkan detail dosen berdasarkan ID
app.get("/dosen/:id_dosen", (req, res) => {
  const id = req.params.id_dosen;
  const query = `SELECT * FROM dosen where id_dosen = '${id}'`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Memperbarui data dosen berdasarkan ID
app.put("/dosen/:id_dosen", (req, res) => {
  const id = req.params.id_dosen;
  const { nama, nip } = req.body;
  const query = "UPDATE dosen SET nama = ?, nip =? WHERE id_dosen = ?";

  db.query(query, [nama, nip, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "dosen not found" });
    }
    res.json({ message: "dosen updated successfully" });
  });
});

// Menghapus dosen berdasarkan ID
app.delete("/dosen/:id_dosen", (req, res) => {
  const id = req.params.id_dosen;
  const query = "DELETE FROM dosen WHERE id_dosen = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "dosen not found" });
    }
    res.json({ message: "dosen deleted successfully" });
  });
});

// # MATAKULIAH #

// Mendapatkan daftar semua matakuliah
app.get("/matakuliah", (req, res) => {
  const query = "SELECT * FROM matakuliah";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Menambahkan matakuliah baru
app.post("/matakuliah", (req, res) => {
  const { nama_matakuliah, kode_matakuliah } = req.body;
  const query =
    "INSERT INTO matakuliah ( nama_matakuliah, kode_matakuliah) VALUES (?, ?)";

  db.query(query, [nama_matakuliah, kode_matakuliah], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      message: "New matakuliah added successfully",
      id: results.insertId,
    });
  });
});

// Mendapatkan detail matakuliah berdasarkan ID
app.get("/matakuliah/:id_matakuliah", (req, res) => {
  const id = req.params.id_matakuliah;
  const query = `SELECT * FROM matakuliah where id_matakuliah = '${id}'`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Memperbarui data matakuliah berdasarkan ID
app.put("/matakuliah/:id_matakuliah", (req, res) => {
  const id = req.params.id_matakuliah;
  const { nama_matakuliah, kode_matakuliah } = req.body;
  const query =
    "UPDATE matakuliah SET nama_matakuliah = ?, kode_matakuliah =? WHERE id_matakuliah = ?";

  db.query(query, [nama_matakuliah, kode_matakuliah, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "matakuliah not found" });
    }
    res.json({ message: "matakuliah updated successfully" });
  });
});

// Menghapus matakuliah berdasarkan ID
app.delete("/matakuliah/:id_matakuliah", (req, res) => {
  const id = req.params.id_matakuliah;
  const query = "DELETE FROM matakuliah WHERE id_matakuliah = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "matakuliah not found" });
    }
    res.json({ message: "matakuliah deleted successfully" });
  });
});

app.get("/dosen_matakuliah", (req, res) => {
  const query = "SELECT * FROM dosen_matakuliah";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.get("/mahasiswa_matakuliah", (req, res) => {
  const query = "SELECT * FROM mahasiswa_matakuliah";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Mendapatkan daftar mahasiswa beserta mata kuliah yang diambil dan dosen pengampu
app.get("/mahasiswa-matakuliah-dosen", (req, res) => {
  const query = `
    SELECT 
      mahasiswa.id_mahasiswa,
      mahasiswa.nama AS nama_mahasiswa,
      mahasiswa.nim,
      matakuliah.id_matakuliah,
      matakuliah.nama_matakuliah,
      matakuliah.kode_matakuliah,
      dosen.id_dosen,
      dosen.nama AS nama_dosen
    FROM 
      mahasiswa
    JOIN 
      mahasiswa_matakuliah ON mahasiswa.id_mahasiswa = mahasiswa_matakuliah.id_mahasiswa
    JOIN 
      matakuliah ON mahasiswa_matakuliah.id_matakuliah = matakuliah.id_matakuliah
    JOIN 
      dosen_matakuliah ON matakuliah.id_matakuliah = dosen_matakuliah.id_matakuliah
    JOIN 
      dosen ON dosen_matakuliah.id_dosen = dosen.id_dosen
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
