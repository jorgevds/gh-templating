import inquirer from "inquirer";
import { execSync } from "child_process";
import path from "path";
import { getConfig } from "./util/template-choices.mjs";

export const use = (pathToTemplates, title) => {
    const config = getConfig(pathToTemplates);

    if (config.choices.length > 0) {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "PR Template",
                    message:
                        "Which pull request template would you like to use?",
                    choices: config.choices,
                },
            ])
            .then((answers) => {
                const template = answers["PR Template"];
                const pathToTemplate = path.join(
                    ...`${config.path}/${template}`.split("/")
                );

                const prTitle = title !== "" ? title : "PR:-Fill-in-title";

                execSync(
                    `gh pr create --title ${prTitle} --body-file ${pathToTemplate}`
                );
            })
            .catch((error) => {
                console.error(
                    `Inquirer error: something went wrong processing your answer: ${error}`
                );
            });
    } else {
        console.error(
            `Fatal error: no choices available. Expected at least one choice, but found none.`
        );
    }
};
