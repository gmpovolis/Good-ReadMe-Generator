const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
    },
    {
        type: "input",
        name: "description",
        message: "Please write a short description of your project."
    },
    {
        type: "list",
        name: "license",
        message: "What kind of license should your project have?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "none"]
    },
    {
        type: 'input',
        name: "install",
        message: "What command should be run to install dependencies?"
    },
    {
        type: "input",
        name: "test",
        message: "What command should be run to run tests?"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?"
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repo?"
    }
  ]);
}

async function init() {
  try {
    const answers = await promptUser();
    const badge = function(answers){
        switch (answers.license){
            case "MIT":
                return `![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)\n`;
                break;
            case "APACHE 2.0":
                return `![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n`;
                break;
            case "GPL 3.0":
                return `![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)\n`;
                break;
            case "BSD 3":
                return `![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)\n`;
                break;
            default:
                return ``;
                break;
        }
    }
    const readMe = badge(answers)+generateMarkdown(answers);

    await writeFileAsync("generatedREADME.md", readMe);

    console.log("Successfully wrote to generatedREADME.md");
  } catch(err) {
    console.log(err);
  }
}

init();
