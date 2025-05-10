const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todolistapp',
});


app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
      if (err) return res.send(err);
      
      
      const tasks = results.map(task => ({
        ...task,
        completed: task.completed === 'saved' ? 'saved' : 'pending', 
      }));
  
      res.json(tasks);
    });
  });
  
  
app.post('/tasks', (req, res) => {
  let { title, description } = req.body;

  db.query(
    'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
    [title, description, 'pending'], 
    (err, result) => {
      if (err) return res.send(err);
      res.json({ id: result.insertId, title, description, completed: 'pending' });
    }
  );
});


app.put('/tasks/:id/toggle', (req, res) => {
    const { id } = req.params;
    db.query(
      'UPDATE tasks SET completed = CASE WHEN completed = "pending" THEN "saved" ELSE "pending" END WHERE id = ?',
      [id],
      (err) => {
        if (err) return res.send(err);
        res.sendStatus(200);
      }
    );
  });
  
  
  app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    db.query(
      'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
      [title.trim(), description.trim(), id],
      (err) => {
        if (err) return res.send(err);
        res.sendStatus(200);
      }
    );
  });
  
  
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.send(err);
    res.sendStatus(200);
  });
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
