import sqlite3 from 'sqlite3';

//Retrieving A Single Row
// db.get('SELECT EmployeeId, FirstName FROM employees', (error, row) => {

// });

export async function openConnection(filename = './kanban_data.db') {
  try {
    const db = new sqlite3.Database(filename);

    return db;
  } catch (e) {
    console.log(e, 'Error in database.js');
  }
}

export async function closeConnection(db) {
  try {
    await db.close();
  } catch (e) {
    console.log(e);
  }
}
