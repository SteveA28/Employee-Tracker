const inquirer = require('inquirer');
const db = require('./db/connection');

function mainMenu() {
  inquirer.prompt({
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
      'Exit'
    ],
  }).then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        db.end();
        break;
    }
  });
}

function viewDepartments() {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
}

function viewRoles() {
  db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id', (err, results) => {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
}

function viewEmployees() {
  db.query('SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id', (err, results) => {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the name of the department?'
    }
  ]).then((answer) => {
    db.query('INSERT INTO department SET ?', {
      name: answer.name
    }, (err, result) => {
      if (err) throw err;
      console.log('Added ' + answer.name + ' to departments');
      mainMenu();
    });
  });
}

function addRole() {
  db.query('SELECT * FROM department', async (err, departments) => {
    if (err) throw err;

    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    const role = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the title of the role?'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of the role?',
        validate: value => {
          if (isNaN(value) === false) {
            return true;
          }
          return 'Please enter a valid number.';
        }
      },
      {
        name: 'department_id',
        type: 'list',
        message: 'Which department does the role belong to?',
        choices: departmentChoices
      }
    ]);

    db.query('INSERT INTO role SET ?', role, (err, result) => {
      if (err) throw err;
      console.log('Added ' + role.title + ' to roles');
      mainMenu();
    });
  });
}

function addEmployee() {
  db.query('SELECT * FROM role', async (err, roles) => {
    if (err) throw err;

    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    db.query('SELECT * FROM employee', async (err, employees) => {
      if (err) throw err;

      const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      managerChoices.unshift({ name: 'None', value: null });

      const employee = await inquirer.prompt([
        {
          name: 'first_name',
          type: 'input',
          message: 'What is the employee\'s first name?'
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'What is the employee\'s last name?'
        },
        {
          name: 'role_id',
          type: 'list',
          message: 'What is the employee\'s role?',
          choices: roleChoices
        },
        {
          name: 'manager_id',
          type: 'list',
          message: 'Who is the employee\'s manager?',
          choices: managerChoices
        }
      ]);

      db.query('INSERT INTO employee SET ?', employee, (err, result) => {
        if (err) throw err;
        console.log('Added ' + employee.first_name + ' ' + employee.last_name + ' to employees');
        mainMenu();
      });
    });
  });
}

function updateEmployeeRole() {
  db.query('SELECT * FROM employee', async (err, employees) => {
    if (err) throw err;

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    const { employeeId } = await inquirer.prompt([
      {
        name: 'employeeId',
        type: 'list',
        message: 'Which employee\'s role do you want to update?',
        choices: employeeChoices
      }
    ]);

    db.query('SELECT * FROM role', async (err, roles) => {
      if (err) throw err;

      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      const { roleId } = await inquirer.prompt([
        {
          name: 'roleId',
          type: 'list',
          message: 'What is the new role of the employee?',
          choices: roleChoices
        }
      ]);

      db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId], (err, result) => {
        if (err) throw err;
        console.log('Updated employee\'s role');
        mainMenu();
      });
    });
  });
}

// Connect to the database and start the application
db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
  mainMenu();
});
