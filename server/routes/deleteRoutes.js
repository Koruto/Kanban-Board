import { openConnection, closeConnection } from '../database.js';
import express from 'express';
const router = express.Router();
const db = await openConnection();

router.delete('/delete/issue/:uniqueId', (req, res) => {
  const uniqueIdToDelete = req.params.uniqueId;

  db.run(
    `DELETE FROM Issue WHERE unique_id = ?`,
    [uniqueIdToDelete],
    function (err) {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to delete row from Issue table');
        return;
      }
      console.log(`Row(s) deleted: ${this.changes}`);
      res.send(`Row(s) deleted: ${this.changes}`);
    }
  );
});

router.delete('/delete/board/:columnName', async (req, res) => {
  const { columnName } = req.params;

  try {
    db.run(`DELETE FROM Issue WHERE status = '${columnName}'`, function (err) {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to delete row from Issue table');
        return;
      }
      console.log(`Row(s) deleted from Issue: ${this.changes}`);

      db.run(
        `DELETE FROM column_list WHERE column_name = '${columnName}'`,
        function (err) {
          if (err) {
            console.error('Error:', err);
            res.status(500).send('Failed to delete row from Column_Name table');
            return;
          }
          console.log(`Row(s) deleted from Column_List: ${this.changes}`);
          res.send(`Row(s) deleted: ${this.changes}`);
        }
      );
    });
  } catch (error) {
    console.error('Error deleting rows:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
