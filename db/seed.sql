USE employee_db;

INSERT INTO department (name)
VALUES
  ("HR"),
  ("IT"),
  ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES
  ("HR Manager", 70000, 1),
  ("Software Engineer", 80000, 2),
  ("Financial Analyst", 60000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
  ("John", "Doe", 1),
  ("Jane", "Smith", 2),
  ("Bob", "Johnson", 3);

  UPDATE employee SET manager_id = 1 WHERE id = 2;
  UPDATE employee SET manager_id = 1 WHERE id = 3;