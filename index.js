const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "hobbit901",
    database: "employee_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("server listening on port 3302");
    startApplication();
});

function startApplication() {
    console.log("EMPLOYEE MANAGER");
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
      ]
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
          connection.end();
          break;
      }
    });
  }
  
  function viewDepartments() {
    connection.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
      console.table(results);
      startApplication();
    });
  }
  
  function viewRoles() {
    connection.query('SELECT * FROM role', (err, results) => {
      if (err) throw err;
      console.table(results);
      startApplication();
    });
  }
  
  function viewEmployees() {
    connection.query('SELECT * FROM employee', (err, results) => {
      if (err) throw err;
      console.table(results);
      startApplication();
    });
  }
  
  function addDepartment() {
    inquirer.prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:'
    }).then((answer) => {
      connection.query('INSERT INTO department SET ?', { name: answer.name }, (err) => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApplication();
      });
    });
  }
  
  function addRole() {
    inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the role:'
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID for the role:'
      }
    ]).then((answer) => {
      connection.query('INSERT INTO role SET ?', {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department_id
      }, (err) => {
        if (err) throw err;
        console.log('Role added successfully!');
        startApplication();
      });
    });
  }
  
  // Function to add an employee
  function addEmployee() {
    inquirer.prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Enter the first name of the employee:'
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Enter the last name of the employee:'
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the role ID for the employee:'
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Enter the manager ID for the employee (if applicable):'
      }
    ]).then((answer) => {
      connection.query('INSERT INTO employee SET ?', {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
        manager_id: answer.manager_id || null
      }, (err) => {
        if (err) throw err;
        console.log('Employee added successfully!');
        startApplication();
      });
    });
  }
  
  function updateEmployeeRole() {
    inquirer.prompt([
      {
        type: "input",
        name: "employeeId",
        message: "What is the employee ID of the employee you want to update?",
      },
      {
        type: "input",
        name: "newRoleId",
        message: "What is the employee's new role ID?",
      },
    ]).then((answers) => {
      const { employeeId, newRoleId } = answers;
  
      connection.query('SELECT * FROM employee WHERE id = ?', [employeeId], (err, results) => {
        if (err) throw err;
  
        if (results.length === 0) {
          console.log(`Employee with ID ${employeeId} not found.`);
          startApplication();
        } else {
          connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId], (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            startApplication();
          });
        }
      });
    });
  }