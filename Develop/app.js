const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArr = [];

// create an object to store user answers
function main() {
  const employeeConfigObj = {};
  askForName(employeeConfigObj);
}

// ask for the name
// store the name in the config object
function askForName(employeeConfigObj) {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the employee's name?",
      },
    ])
    .then((answer) => {
      employeeConfigObj.name = answer.name;
      askForId(employeeConfigObj);
    });
}

// ask for the ID
// store the ID in the config object
function askForId(employeeConfigObj) {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee's ID?",
      },
    ])
    .then((answer) => {
      employeeConfigObj.id = answer.id;
      askForEmail(employeeConfigObj);
    });
}

// ask for the email
// store the email in the config object
function askForEmail(employeeConfigObj) {
  inquirer
    .prompt([
      {
        name: "email",
        type: "input",
        message: "What is the employee's email address?",
      },
    ])
    .then((answer) => {
      employeeConfigObj.email = answer.email;
      askForRole(employeeConfigObj);
    });
}

//Ask for specific employee role
function askForRole(employeeConfigObj) {
  inquirer
    .prompt([
      {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then((answer) => {
      employeeConfigObj.role = answer.role;
      evaluateRole(employeeConfigObj);
    });
}

// Determine which additional question to ask
function evaluateRole(employeeConfigObj) {
  //   console.log(employeeConfigObj);
  if (employeeConfigObj.role === "Manager") {
    askForOfficeNumber(employeeConfigObj);
  } else if (employeeConfigObj.role === "Engineer") {
    askForGithub(employeeConfigObj);
  } else {
    askForSchool(employeeConfigObj);
  }
}

// Manager question
function askForOfficeNumber(employeeConfigObj) {
  inquirer
    .prompt([
      {
        name: "officeNumber",
        type: "input",
        message: "What is the manager's office phone number?",
      },
    ])
    .then((answer) => {
      employeeConfigObj.officeNumber = answer.officeNumber;
      createNewManager(employeeConfigObj);
    });
}
// create new Manager object with config object
function createNewManager(employeeConfigObj) {
  const newManager = new Manager(employeeConfigObj);
  employeeArr.push(newManager);
  askForNextEntry();
  //   console.log(newManager);
}

// Engineer question
function askForGithub(employeeConfigObj) {
  inquirer
    .prompt([
      {
        name: "github",
        type: "input",
        message: "What is the engineer's GitHub username?",
      },
    ])
    .then((answer) => {
      employeeConfigObj.github = answer.github;
      createNewEngineer(employeeConfigObj);
    });
}

// create Engineer object with config object
function createNewEngineer(employeeConfigObj) {
  const newEngineer = new Engineer(employeeConfigObj);
  employeeArr.push(newEngineer);
  askForNextEntry();
  // console.log(newEngineer);
}

// Intern question
function askForSchool(employeeConfigObj) {
  inquirer
    .prompt([
      {
        name: "school",
        type: "input",
        message: "What school does the intern attend?",
      },
    ])
    .then((answer) => {
      employeeConfigObj.school = answer.school;
      createNewIntern(employeeConfigObj);
    });
}
// create Intern object with config object
function createNewIntern(employeeConfigObj) {
  const newIntern = new Intern(employeeConfigObj);
  employeeArr.push(newIntern);
  askForNextEntry();
  // console.log(newIntern);
}

function askForNextEntry() {
  inquirer
    .prompt([
      {
        name: "prompt",
        type: "list",
        message: "Would you like to add another employee?",
        choices: [
          "Yes, add another employee.",
          "No, I'm ready to view my page.",
        ],
      },
    ])
    .then((answer) => {
      if (answer.prompt === "Yes, add another employee.") {
        main();
      } else {
        const html = render(employeeArr);
      }
    });
}
// add the new employee to employeeArray
// ask if there is another employee to add
// if yes - call the top function again
// if no - call the render function
main();

// _____________________________________________________________________________

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
