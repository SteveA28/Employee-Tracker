import inquirer from 'inquirer';
import { Department } from './lib/Department.js';
import { Role } from './lib/Role.js';
import { Employee } from './lib/Employee.js';

async function mainMenu() {
  try {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ]);

    switch (action) {
      case 'View all departments':
        await Department.viewDepartments();
        break;
      case 'View all roles':
        await Role.viewRoles();
        break;
      case 'View all employees':
        await Employee.viewEmployees();
        break;
      case 'Add a department':
        const departmentPrompt = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: 'Enter the department name:',
          },
        ]);
        await Department.addDepartment(departmentPrompt.name);
        break;
      case 'Add a role':
        const rolePrompt = await inquirer.prompt([
          {
            name: 'title',
            type: 'input',
            message: 'Enter the role title:',
          },
          {
            name: 'salary',
            type: 'number',
            message: 'Enter the role salary:',
          },
          {
            name: 'departmentId',
            type: 'number',
            message: 'Enter the department ID for the role:',
          },
        ]);
        await Role.addRole(rolePrompt.title, rolePrompt.salary, rolePrompt.departmentId);
        break;
      case 'Add an employee':
        const employeePrompt = await inquirer.prompt([
          {
            name: 'firstName',
            type: 'input',
            message: 'Enter the employee first name:',
          },
          {
            name: 'lastName',
            type: 'input',
            message: 'Enter the employee last name:',
          },
          {
            name: 'roleId',
            type: 'number',
            message: 'Enter the employee role ID:',
          },
          {
            name: 'managerId',
            type: 'number',
            message: 'Enter the employee manager ID (optional):',
          },
        ]);
        await Employee.addEmployee(
          employeePrompt.firstName,
          employeePrompt.lastName,
          employeePrompt.roleId,
          employeePrompt.managerId
        );
        break;
      case 'Update an employee role':
        // Placeholder implementation - you will need to collect the necessary details
        // await Employee.updateEmployeeRole(/* employeeId, newRoleId */);
        console.log('Update an employee role is a placeholder and not implemented yet.');
        break;
      case 'Exit':
        console.log('Exiting application...');
        process.exit();
    }

    await mainMenu(); // Re-call mainMenu for subsequent actions
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

mainMenu();
