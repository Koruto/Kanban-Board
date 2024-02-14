import { openConnection, closeConnection } from '../database.js';
import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

const db = await openConnection();

router.post('/signup', (req, res) => {
  const { username, name, password, role } = req.body;
  const query = `INSERT INTO users (username, password, name, user_id, role) VALUES ('${username}', '${password}', '${name}', '${uuidv4()}', '${role}')`;
  db.run(query, (err, results) => {
    if (err) throw err;
    res.status(200).send('Successfuly signed up!');
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1`;
  db.get(query, (err, result) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .send('An error occurred while processing your request');
    }
    if (result) {
      return res.status(200).json({
        user_id: result.user_id,
        name: result.name,
        username: result.username,
        role: result.role,
      });
    } else {
      return res.send('Invalid login credentials');
    }
  });
});

router.post('/add/table/:table_id', (req, res) => {
  const { table_id } = req.params;

  if (!isNaN(table_id)) return res.status(500).send('Table cannot be a number');
  if (
    table_id === 'column_list' ||
    table_id === 'Issue' ||
    table_id === 'users'
  )
    return res.status(500).send('Cannot use this table name');

  db.serialize(() => {
    try {
      db.run(
        `CREATE TABLE IF NOT EXISTS column_list (
            id INTEGER PRIMARY KEY,
            column_name TEXT UNIQUE
            )`,
        function (err) {
          if (err) {
            console.error(err);
            return res.status(500).send('Failed to create table column_list');
          }

          db.run(
            `INSERT INTO column_list (column_name) VALUES (?)`,
            [table_id],
            function (err) {
              if (err) {
                console.error(err);
                return res
                  .status(500)

                  .send('Failed to create table. Table Name should be Unique');
              }

              res.send(`Added Table: ${table_id}`);
            }
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
});

router.post('/add/issue/', (req, res) => {
  const { task, assignee, status, due_date, user_id, username, description } =
    req.body;

  if (status == '' || task == '')
    return res.status(500).send('Task or Status cannot be empty');

  db.run(
    `INSERT INTO Issue (task, status, assignee, due_date, unique_id, user_id, username, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      task,
      status,
      assignee,
      due_date,
      uuidv4(),
      user_id,
      username,
      description,
    ],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to add into Issue.');
      }
      res.send(`Row inserted with ID: ${this.lastID}`);
    }
  );
});

export default router;
