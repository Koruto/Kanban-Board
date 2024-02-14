import { openConnection, closeConnection } from '../database.js';
import express from 'express';
const router = express.Router();

const db = await openConnection();

router.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

router.get('/getIssue/:uniqueId', (req, res) => {
  const { uniqueId } = req.params;

  db.get(
    `SELECT status, task, assignee FROM Issue WHERE unique_id = ?`,
    [uniqueId],
    (err, row) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).send('Failed to fetch issue details');
      }

      if (!row) {
        return res.status(404).send('Issue not found');
      }

      res.json(row);
    }
  );
});

router.get('/column_list', (req, res) => {
  db.all(`SELECT * FROM column_list`, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to fetch column list');
    }
    res.send(rows);
  });
});

router.get('/column/:table_id', (req, res) => {
  const { table_id } = req.params;

  db.all(`SELECT * FROM Issue WHERE status = '${table_id}'`, (err, rows) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send(`Failed to fetch data from table ${table_id}`);
    }
    res.send(rows);
  });
});

router.get('/initTable', (req, res) => {
  db.run(
    `CREATE TABLE IF NOT EXISTS Issue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT,
        status TEXT,
        assignee TEXT DEFAULT 'Unassigned',
        due_date TEXT DEFAULT '05-Jan-2021',
        unique_id TEXT,
        user_id TEXT,
        username TEXT,
        description TEXT
        )`,
    function (err) {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send('Failed to create table. Table Name cannot be a Number');
      }

      res.send(`Table Init Done`);
    }
  );
});

router.get('/initLogin', (req, res) => {
  db.run(
    `
        CREATE TABLE IF NOT EXISTS users (
          name TEXT NOT NULL,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          user_id TEXT NOT NULL,
          role TEXT NOT NULL
        );
      `,
    (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Error initializing database');
      }
      console.log('Database table initialized');
      res.send('Database table initialized');
    }
  );
});

router.get('/usersList', (req, res) => {
  db.all('SELECT username, name, user_id FROM users', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .send('An error occurred while processing your request');
    }
    res.json(rows);
  });
});

export default router;
