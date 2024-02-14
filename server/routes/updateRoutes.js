import { openConnection, closeConnection } from '../database.js';
import express from 'express';
const router = express.Router();

const db = await openConnection();

router.put('/updateIssue', (req, res) => {
  const { uniqueId, destTitle } = req.body;

  db.run(
    `UPDATE Issue
      SET status = '${destTitle}'
      WHERE unique_id = '${uniqueId}';`,
    (err) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).send('Failed to find the column');
      }
      console.log('Updated Row');
      return res.status(200).send('Updated Row');
    }
  );
});

export default router;
