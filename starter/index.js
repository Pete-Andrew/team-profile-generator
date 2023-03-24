const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");
const {
  managerQuestions,
  engineerQuestions,
  internQuestions,
} = require("./lib/questions.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee");

//Team member array creates a blank array to add members to.
const teamMemberArray = [];

//adds a manager to the team members array by creating prompts for intputs
const managerPrompt = () => {
  console.log("The employee position selected is: Manager");
  //sets questions for response data
  prompt(managerQuestions).then(({ name, id, email, officeNumber }) => {
    console.log("Thanks for entering your data");

    // populate manager info:

    //below is an ES6 destructuring assignment: In ES6 you no longer have to get the object itself and assign variables for each property you want on separate lines.
    //this const stamemnt therefore creates an object with parameters and fills those parameters with data created by the prompt response.

    //creates a variable from a new constructor with the parameters given.
    const manager = new Manager(name, id, email, officeNumber);

    // pushes the manager to the team member array.
    teamMemberArray.push(manager);

    // calls the function that allows for team member selection.
    selectTeamMemberPrompt();
  });
};
//mamager prompt called here because it always runs first.
managerPrompt();
//THEN extra team members can be selected OR finish build team.
selectTeamMemberPrompt = () => {
  prompt([
    {
      type: "list",
      message: "please choose next employee to add",
      name: "employeePosition",
      choices: ["Engineer", "Intern", "Finish building team"],
    },
  ]).then((response) => {
    console.log("Thanks for entering your data");

    const position = `${response.employeePosition}`;
    // console.log("The employee position selected is: " + position);

    promptForNextEmployee(position);
  });
};

//calls functions based on the above response for team member
const promptForNextEmployee = (position) => {
  if (position === "Engineer") {
    engineerPrompt();
  } else if (position === "Intern") {
    internPrompt();
  } else {
    position === "Finish building team";
    renderPage();
  }
};

// engineer prompt.
const engineerPrompt = () => {
  prompt(engineerQuestions).then(({ name, id, email, github }) => {
    console.log("Thanks for entering your data");

    const engineer = new Engineer(name, id, email, github);

    teamMemberArray.push(engineer);
    // console.log(engineer);

    selectTeamMemberPrompt();
  });
};

// intern prompt
const internPrompt = () => {
  prompt(internQuestions).then(({ name, id, email, github }) => {
    console.log("Thanks for entering your data");

    const intern = new Intern(name, id, email, github);

    teamMemberArray.push(intern);
    // console.log(intern);

    selectTeamMemberPrompt();
  });
};

//renders the page to an HTML document
function renderPage() {
  // console.log(teamMemberArray);
  // console.log(render(teamMemberArray));

  //in order for the build page fs.writesync to work, render(teamMemberArray) needs to be turned into a const or the build page function returns an error (needs to be a TypedArray)
  const constTeamMemberArray = render(teamMemberArray);

  const buildPage = () => {
    fs.writeFileSync("./output/team.HTML", constTeamMemberArray, (err) =>
      err ? console.error(err) : console.log("Generating HTML...")
    );
  };

  buildPage();
}

//With thanks to Dan Mueller for hints on the overall layout of the code.
