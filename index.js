import inquirer from "inquirer";
import fs from "fs";
import { execSync } from "child_process";
import path from "path";

export const main = (pathToTemplates) => {
    let config = { path: pathToTemplates, choices: [] };

    if (pathToTemplates) {
        try {
            const templates = fs
                .readdirSync(pathToTemplates)
                .filter((file) => file.includes(".md"));

            choices = templates;
        } catch (error) {
            console.error(
                `Fatal error: no path provided or found to templates directory. Received ${pathToTemplates}`
            );
        }
    } else if (
        fs.existsSync(
            path.join(process.cwd(), ...`.github/templates`.split("/"))
        )
    ) {
        {
            try {
                config.path = path.join(...`.github/templates`.split("/"));
                const githubTemplates = fs
                    .readdirSync(
                        path.join(
                            process.cwd(),
                            ...`.github/templates`.split("/")
                        )
                    )
                    .filter((file) => file.includes(".md"));

                config.choices = githubTemplates;
            } catch (error) {
                console.error(
                    `No templates found in: ROOT:.github/templates. Looking in ROOT:.github/`
                );
            }
        }
    } else {
        try {
            config.path = path.join(...`.github/`.split("/"));

            const githubTemplates = fs
                .readdirSync(path.join(process.cwd(), ...`.github/`.split("/")))
                .filter((file) => file.includes(".md"));

            config.choices = githubTemplates;
        } catch (error) {
            console.error(
                `Fatal error: no templates found in codebase. Please specify a path to your templates.`
            );
        }
    }

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

                execSync(
                    `gh pr create --title "My new pr" --body-file ${pathToTemplate}`
                );
            })
            .catch((error) => {
                console.error(
                    `Inquirer error: something went wrong processing your answer: ${error}`
                );
            });
    } else {
        console.error(
            `Fatal error: no choices available. Expected any choice, but found none.`
        );
    }
};

main(process.argv[2]);
