const fs = require('fs');
const inquirer = require('inquirer');

const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const render = require('./lib/htmlRenderer');

const ui = new inquirer.ui.BottomBar();

const getEmployee = async () => {
  return await inquirer.prompt([
    {
      name: 'name',
      message: 'What is their name?'
    },
    {
      name: 'email',
      message: 'What is their email?'
    },
    {
      name: 'role',
      message: 'What role do they have on the team?',
      type: 'list',
      choices: [
        'Intern',
        'Engineer',
        'Manager',
        'Other'
      ]
    },
    {
      name: 'school',
      message: 'What school do they currently attend?',
      when: answers => answers.role === 'Intern'
    },
    {
      name: 'github',
      message: 'What is their Github username?',
      when: answers => answers.role === 'Engineer'
    },
    {
      name: 'officeNumber',
      message: 'What is their office number?',
      when: answers => answers.role === 'Manager',
      type: 'number'
    }
  ]);
}

const main = async () => {
  console.clear();
  console.log('');
  const { employeeCount } = await inquirer.prompt([
    {
      message: 'How many employees are part of your team?',
      type: 'number',
      name: 'employeeCount',
      default: '',
      validate: input => {
        if (input && typeof input === 'number') {
          return true;
        }
        return `Please enter valid number`
      }
    }
  ]);
  console.clear();
  const employees = [];
  for (let i = 1; i <= employeeCount; i++) {
    if (i > 1) {
      ui.log.write(`Employees remaining: ${employeeCount + 1 - i}\n\n`);
    }
    ui.log.write(`Employee #${i}\n${'-'.repeat(25)}`);
    let employee;
    const { name, email, role, school, github, officeNumber } = await getEmployee();
    switch (role) {
      case 'Intern':
        employee = new Intern(name, i, email, school);
        break;
      case 'Engineer':
        employee = new Engineer(name, i, email, github);
        break;
      case 'Manager':
        employee = new Manager(name, i, email, officeNumber);
        break;
      default: 
        employee = new Employee(name, i, email);
        break;
      }
    employees.push(employee);
    console.log('-'.repeat(25))
  }

  fs.writeFile('./output/team.html', render(employees), 'utf8', () => {
    console.log('Done!')
  });
}

main();


