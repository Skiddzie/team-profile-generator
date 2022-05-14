//node is required to run this you're gonna want to install node and then in your terminal run "npm install" and you'll get a folder called node_modules
//you also want to seperately install inquierer which is here https://www.npmjs.com/package/inquirer

//the main issue here is just that i have no idea how page-template is gathering the input from the prompts, or how it's referenced

const fs = require('fs');
const inquirer = require('inquirer');
//importing the page-template.js 
const main = require('./src/page-template');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern')
//gathers user input
//name i believe is just the name of the variable
//message is what the user is prompted with
var employees = [];
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    }
  ]);
};

//gathers user input
//name i believe is just the name of the variable
//message is what the user is prompted with
const promptProject = portfolioData => {
  console.log(`
=================
Add a New Employee
=================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What type of employee?',
        choices: ['manager', 'engineer', 'intern'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your employee? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message:"id",
      },
      {
        type: 'input',
        name: 'email',
        message: 'Provide a email',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'number',
        message:"office number (press enter if n/a)",
      },
      {
        type: 'input',
        name: 'github',
        message: 'github (press enter if n/a)',
      },
      {
        type: 'input',
        name: 'school',
        message: 'school (press enter if n/a',
      },
      {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to enter another employee?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);


      if (projectData.type == "manager"){
        employees.push(new Manager(projectData.name, projectData.id, projectData.email, projectData.number));
      } 
      else if (projectData.type == "engineer"){
        employees.push(new Engineer(projectData.name, projectData.id, projectData.email, projectData.github));
      }
      else if (projectData.type == "intern"){
        employees.push(new Intern(projectData.name, projectData.id, projectData.email, projectData.school));
      }


      if (projectData.confirmAddEmployee) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;      }
    });
};
//calls previous functions along with page-template.js to write a new html file
const printEmployee = () => {
  page = ``;
  for (let i = 0; i < employees.length; i++) {
    console.log(employees[i].getRole());
    if (employees[i].getRole() == "Manager"){
      page += `
      <div class="container text-center py-3">
      <h2>name:${employees[i].name}</h2>
      <h3>id: ${employees[i].id}</h3>
      <h3>office number: ${employees[i].officeNumber}</h3>
      <h3>email: ${employees[i].email}</h3>
      </div>
      `;
    } 
    else if (employees[i].getRole() == "Engineer"){
      page += `
      <div class="container text-center py-3">
      <h2>name:${employees[i].name}</h2>
      <h3>id: ${employees[i].id}</h3>
      <h3>github: ${employees[i].github}</h3>
      <h3>email: ${employees[i].email}</h3>
      </div>
      `;
    }
    else if (employees[i].getRole() == "Intern"){
      page += `
      <div class="container text-center py-3">
      <h2>name:${employees[i].name}</h2>
      <h3>id: ${employees[i].id}</h3>
      <h3>id: ${employees[i].school}</h3>
      <h3>email: ${employees[i].email}</h3>
      </div>
      `;
    }
    
  } 
  return page
}
const printPage = () => {
  return  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3"></h1>
        <nav class="flex-row">
        </nav>
      </div>
    </header>
    <main class="container my-5">
          ${printEmployee()}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by </h3>
    </footer>
  </body>
  </html>
  `;
}
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log("employee", employees);
    // console.log(printEmployee());
    const pageHTML = printPage();

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });
