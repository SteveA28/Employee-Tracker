import db from '../db/connection.js';

class Role {
  static async viewRoles() {
    try {
      const [roles] = await db.query('SELECT * FROM role');
      console.table(roles);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  }

  static async addRole(title, salary, departmentId) {
    try {
      const [result] = await db.query(`
        INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)
      `, [title, salary, departmentId]);
      console.log(`Role "${title}" added successfully.`);
    } catch (err) {
      console.error('Error adding role:', err);
    }
  }
}

export { Role }; 
