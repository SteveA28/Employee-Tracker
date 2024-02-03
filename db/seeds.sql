-- Insert into department
INSERT INTO department (name)
VALUES 
    ('Engineering'),
    ('Human Resources'),
    ('Marketing'),
    ('Finance');

-- Insert into role
INSERT INTO role (title, salary, department_id)
VALUES 
    ('Software Engineer', 85000.00, 1),
    ('Senior Software Engineer', 105000.00, 1),
    ('HR Manager', 75000.00, 2),
    ('HR Assistant', 45000.00, 2),
    ('Marketing Coordinator', 60000.00, 3),
    ('Finance Analyst', 65000.00, 4),
    ('Chief Financial Officer', 150000.00, 4);

-- Insert into employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Jim', 'Beam', 3, NULL),
    ('Jill', 'Valentine', 4, 3),
    ('Jake', 'Long', 5, NULL),
    ('Jessica', 'Jones', 6, NULL),
    ('Jeff', 'Bezos', 7, NULL);

-- Additional employee where an employee has a manager within the company
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Sarah', 'Connor', 1, 1),
    ('John', 'Smith', 2, 1),
    ('Clara', 'Oswald', 4, 3),
    ('Bruce', 'Wayne', 6, 7);
