import inquirer from "inquirer";
import fs from "fs";
import { execSync } from "child_process";
import path from "path";

const main = (pathToTemplates) => {
  let choices = [];

  try {
    choices = fs.readdirSync(pathToTemplates);
  } catch (error) {
    console.error(
      `Fatal error: no path provided or found to templates directory. Received ${pathToTemplates}`
    );
  }

  if (choices.length > 0) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "PR Template",
          message: "Which pull request template would you like to use?",
          choices,
        },
      ])
      .then((answers) => {
        const template = answers["PR Template"];
        const pathToTemplate = path.join(
          process.cwd(),
          ...`${pathToTemplates}/${template}`.split("/")
        );

        console.log | "--------------------------------------";
        console.log(
          execSync(
            `gh pr create --title "My new pr" --body-file ${pathToTemplate}`
          )
        );
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  } else {
    console.error(
      `Fatal error: no choices available. Expected any choice, but found none.`
    );
  }
};

main(process.argv[2]);
