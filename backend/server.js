const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 4001; // Choose any port you prefer

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'react_redux_crud' // Your MySQL database name
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Routes for CRUD operations
// Add your routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Fetch all users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching users' });
        return;
      }
      res.json(result);
    });
  });
  app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
      if (err) {
        console.error("Error adding user:", err);
        res.status(500).json({ error: 'Error adding user' });
        return;
      }
      res.json({ id: result.insertId, name, email });
    });
  });
  
  
  // Update a user
  app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name=?, email=? WHERE id=?';
    db.query(sql, [name, email, id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error updating user' });
        return;
      }
      res.json({ id, name, email });
    });
  });
  
  // Delete a user
  app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id=?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error deleting user' });
        return;
      }
      res.json(id);
    });
  });
  