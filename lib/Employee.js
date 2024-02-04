import db from '../db/connection.js';

class Employee {
  static async viewEmployees() {
    try {
      const [employees] = await db.query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
      `);
      console.table(employees);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  }

  static async addEmployee(firstName, lastName, roleId, managerId = null) {
    try {
      const [result] = await db.query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
      `, [firstName, lastName, roleId, managerId]);
      console.log(`Employee ${firstName} ${lastName} added successfully.`);
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  }  

  static async updateEmployeeRole(employeeId, newRoleId) {
    try {
      const [result] = await db.query(`
        UPDATE employee
        SET role_id = ?
        WHERE id = ?
      `, [newRoleId, employeeId]);
      console.log(`Employee role updated for employee ID ${employeeId} to role ID ${newRoleId}`);
    } catch (err) {
      console.error('Error updating employee role:', err);
    }
  }
}

export { Employee }; 
