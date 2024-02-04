import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employee_tracker_db'
});

export default db;
