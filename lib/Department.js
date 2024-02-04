import db from '../db/connection.js';

class Department {
  static async viewDepartments() {
    try {
      const [departments] = await db.query('SELECT * FROM department');
      console.table(departments);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  }

  static async addDepartment(name) {
    try {
      const [result] = await db.query('INSERT INTO department (name) VALUES (?)', [name]);
      console.log(`${name} department added successfully.`);
    } catch (err) {
      console.error('Error adding department:', err);
    }
  }
}

export { Department }; 
