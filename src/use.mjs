import inquirer from "inquirer";
import path from "path";
import { getConfig } from "./util/template-choices.mjs";
import { executeCommand } from "./util/execute-command.mjs";

export const useCommand = async (pathToTemplates, title) => {
    const command = await use(pathToTemplates, title);
    executeCommand(command, "Use");
};

export const use = (pathToTemplates, title) => {
    const config = getConfig(pathToTemplates);

    if (config && config.choices.length > 0) {
        return inquirer
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

                const prTitle = title ? title : "PR:-Fill-in-title";

                return `gh pr create --title "${prTitle}" --body-file ${pathToTemplate}`;
            })
            .catch((error) =>
                console.error(
                    `Inquirer error: something went wrong processing your answer: ${error}`
                )
            );
    } else {
        console.error(
            `Fatal error: Expected at least one choice, but found none. ${
                pathToTemplates
                    ? `Looked in ${pathToTemplates}, .github/templates, and the .github ROOT folder`
                    : "Looked in .github/templates and the .github ROOT folder."
            }`
        );
    }
};
