const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Vijay002@',
  database: 'student_detail'
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/show', function(req, res) {
  const sqlget = 'SELECT * FROM info';
  db.query(sqlget, (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Failed to retrieve data from database' });
      return;
    }
    res.send(result);
  });
});

app.post('/save', (req, res) => {
  const data = req.body;
  const query = 'INSERT INTO info (firstname, lastname, email, location, dob, about) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [data.firstname, data.lastname, data.email, data.location, data.date, data.about];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Failed to insert data into database' });
      return;
    }
    res.json({ message: 'Data inserted successfully' });
  });
});
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM info WHERE id = ?';
    db.query(query, id, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Failed to delete data from database' });
        return;
      }
      res.json({ message: 'Data deleted successfully' });
    });
  });
  app.get('/edit/:id', (req, res) => {
     const id  = req.params.id;
     const display ='SELECT * FROM info WHERE id = ?';
     db.query(display,id,(err,rows) =>{
     
        if (err) {
            console.log(err);
     }
     else {
        res.send(rows[0]);
     }
});
  });
  app.put('/update/:id', (req, res) => {
    const display = 'SELECT * FROM info where id = ?';
    const id = req.params.id;
    const { firstname, lastname, email, location, dob, about } = req.body;
    const query =
      'UPDATE info SET firstname = ?, lastname = ?, email = ?, location = ?, dob = ?, about = ? WHERE id = ?';
    const values = [firstname, lastname, email, location, dob, about, id];
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Failed to update data in the database' });
        return;
      }
      res.json({ message: 'Data updated successfully' });
    });
  });

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});