const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee");

//Team member array creates a blank array to add members to. 
const TeamMemberArray = [] 

//adds a manager to the team members array by creating prompts for intputs
const managerPrompt = () => {
    
    console.log("The employee position selected is: Manager")
    // not sure if return is needed here? could be a the end or not at all... 
    return inquirer.prompt([{
        type: "input",
        message: "Please enter your name",
        name: "name",
        },
        {
        type: "input",
        message: "Please enter your ID",
        name: "id",
        },
        {
        type: "input",
        message: "Please enter your email",
        name: "email",
        },
        {
        type: "input",
        message: "Please enter your office number",
        name: "officeNumber",
        },

        //manager questions
        ]).then(response => { 
        console.log("Thanks for entering your data");
        
        // populate manager info
        
        const  {name, id, email, officeNumber} = response; 
        const manager = new Manager (name, id, email, officeNumber)
        
        TeamMemberArray.push(manager)
        // console.log(manager) 
           
        // promptForNexEmployee ()
        selectTeamMemberPrompt();
    })
}
//mamager prompt called here because it always runs first.
managerPrompt();

selectTeamMemberPrompt = () => {
    return inquirer.prompt([
        {
        type: "list",
        message: "please choose next employee to add",
        name: "employeePosition",
        choices: [
            "Engineer",
            "Intern",
            "Finish building team"
            ], 
        } 

    ]).then(response => { 
        console.log("Thanks for entering your data");
       
        const position = `${response.employeePosition}`;
        console.log("The employee position selected is: " + position);
       
        promptForNextEmployee(position);
        
     })
}; 

const promptForNextEmployee = (position) => {
if (position === "Engineer") {
    engineerPrompt();
} else if (position === "Intern") {
    internPrompt(); 
} else {
    (position === "Finish building team") 
        renderPage();
    }

}; 

const engineerPrompt = () => {
    return inquirer.prompt([{
        type: "input",
        message: "Please enter your name",
        name: "name",
        },
        {
        type: "input",
        message: "Please enter your ID",
        name: "id",
        },
        {
        type: "input",
        message: "Please enter your email",
        name: "email",
        },
        {
        type: "input",
        message: "Please enter your gitHub username",
        name: "github",
        },

        ]).then(response => { 
        console.log("Thanks for entering your data");
        
        const  {name, id, email, github} = response; 
        const engineer = new Engineer (name, id, email, github);
        
        TeamMemberArray.push(engineer);
        // console.log(engineer);
        
        selectTeamMemberPrompt();
    
    })
}

const internPrompt = () => {
    return inquirer.prompt([{
        type: "input",
        message: "Please enter your name",
        name: "name",
        },
        {
        type: "input",
        message: "Please enter your ID",
        name: "id",
        },
        {
        type: "input",
        message: "Please enter your email",
        name: "email",
        },
        {
        type: "input",
        message: "Please enter your gitHub username",
        name: "github",
        },

        ]).then(response => { 
        console.log("Thanks for entering your data");
            
        const  {name, id, email, github} = response; 
        const intern = new Intern (name, id, email, github);
        
        TeamMemberArray.push(intern);
        // console.log(intern);
        
        selectTeamMemberPrompt();
           
    });
};


function renderPage () {
    console.log(TeamMemberArray); 
    console.log(render(TeamMemberArray));
    fs.createWriteStream("team.HTML", TeamMemberArray, (err) =>
    err ? console.error(err) : console.log("Generating README...")
    ); 
    
};

// fs.createWriteStream("./output/team.HTML", TeamMemberArray, (err) =>
//     err ? console.error(err) : console.log("Generating README...")
//     ); 
    

// fs.createWriteStream("output.html", TeamMemberArray, (err) =>
// err ? console.error(err) : console.log("Generating README...")
// ); 



// fs.writeFile("README.md", TeamMemberArray, (err) =>
// err ? console.error(err) : console.log("Generating README...")
// );

// const buildPage = () => {
// // render(ArrayOfTeamMembers)
// }
// // TODO: Write Code to gather information about the development team members, and render the HTML file.


// const buildPage = () => {
//     const testArray = []
//     testArray.push(new Manager ("Dan..", "the man"));
//     console.log(render(testArray));
//     console.log(render(testArray)); 
// // render(TeamMemberArray)
// }
// buildPage(); 