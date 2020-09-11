DROP DATABASE IF EXISTS employee_management_db;

CREATE DATABASE employee_management_db;
USE employee_management_db;

CREATE TABLE employees (
  id INT(10) AUTO_INCREMENT NOT NULL ,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT(10) NULL,
  manager_id INT(10),
  PRIMARY KEY (id)
);
CREATE TABLE departments (
  id INT(10) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT(10) AUTO_INCREMENT NOT NULL,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT(10) NULL,
  PRIMARY KEY (id)
);


INSERT INTO employees (first_name, last_name, role_id,manager_id)
VALUES ("Paul", "Elliott","1", null);

INSERT INTO departments (department_name)
VALUES ("Example");

INSERT INTO roles (title, salary, department_id)
VALUES ("example", 0.00, "1");