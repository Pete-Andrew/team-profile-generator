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
        console.log(manager) 
        //   
        // promptForNexEmployee ()
        selectTeamMemberPrompt();
    })
}

managerPrompt();


selectTeamMemberPrompt = () => {
    return inquirer.prompt([
        {
        type: "list",
        message: "please choose next employee to add",
        name: "employeePosition",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
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
if (position === "Manager") {
    managerPrompt(); 
} else if (position === "Engineer") {
    engineerPrompt();
} else if (position === "Intern") {
    internPrompt(); 
} 
}; 

// else (console.log("not working"));
 

// const promptForNextEmployee = () => {
//     inquirer.prompt([{
//         // choice of 3
//     }]).then(response => {
//         // if engineer
//         //    promptForEngineer
//         // else if intern
//         //    promptForIntern
//         // else
//         //    use the functionality from page-template to generate the team
//     })
// }

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

        //manager questions
        ]).then(response => { 
        console.log("Thanks for entering your data");
        
        
        // populate engineer info
        
        const  {name, id, email, github} = response; 
        const engineer = new Engineer (name, id, email, github);
        
        TeamMemberArray.push(engineer);
        console.log(engineer);
        
        selectTeamMemberPrompt();
    
    })
}

// internPrompt();

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

        //manager questions
        ]).then(response => { 
        console.log("Thanks for entering your data");
        
        // populate engineer info
        
        const  {name, id, email, github} = response; 
        const intern = new Intern (name, id, email, github);
        
        TeamMemberArray.push(intern);
        console.log(intern);
        
        selectTeamMemberPrompt();
       //engineer questions
    
    })
}

// internPrompt();

// const promptForIntern = () => {
//     inquirer.prompt([{
        
        
        
//         //intern questions
//     }]).then(response => {
//         // add new intern to employees array
//         // promptForNextEmployee
//     })
// }

// const buildPage = () => {
// // render(ArrayOfTeamMembers)
// }
// // TODO: Write Code to gather information about the development team members, and render the HTML file.

// inquirer.prompt([{
//     //manager questions
// }]).then(response => {
//     // populate manager info
//     // promptForNexEmployee ()
// })

// const promptForNextEmployee = () => {
//     inquirer.prompt([{
//         // choice of 3
//     }]).then(response => {
//         // if engineer
//         //    promptForEngineer
//         // else if intern
//         //    promptForIntern
//         // else
//         //    use the functionality from page-template to generate the team
//     })
// }

// const promptForEngineer = () => {
//     inquirer.prompt([{
//         //engineer questions
//     }]).then(response => {
//         // add new engineer to employees array
//         // promptForNextEmployee
//     })
// }

// const promptForIntern = () => {
//     inquirer.prompt([{
//         //intern questions
//     }]).then(response => {
//         // add new intern to employees array
//         // promptForNextEmployee
//     })
// }

// const buildPage = () => {
//     const testArray = []
//     testArray.push(new Manager ("Dan..", "the man"));
//     console.log(render(testArray));
//     console.log(render(testArray)); 
// // render(TeamMemberArray)
// }
// buildPage(); 