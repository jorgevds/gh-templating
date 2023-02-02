import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { TEMPLATES, pathToModuleTemplatesFolder } from "../templates/index.mjs";
import { DEFAULT_DIRNAME, DEFAULT_PATH } from "./util/global-constants.mjs";
import { getMarkdownFilenames } from "./util/template-choices.mjs";

const createPrompt = (pathToReadTemplates) => {
    return [
        {
            type: "checkbox",
            name: "Templates",
            message: `Which templates would you like to create?`,
            choices: pathToReadTemplates
                ? getMarkdownFilenames(pathToReadTemplates)
                : TEMPLATES,
        },
    ];
};

const writeSelectionToTemplatesFolder = (
    pathToTemplates,
    pathToReadTemplates,
    chosenTemplates,
    title
) => {
    const finalPath = pathToTemplates
        ? pathToTemplates
        : path.join(DEFAULT_PATH, DEFAULT_DIRNAME);

    const pathToOwnTemplates = pathToReadTemplates
        ? pathToReadTemplates
        : pathToModuleTemplatesFolder;

    if (!fs.existsSync(finalPath)) {
        fs.mkdirSync(finalPath);
    }

    if (chosenTemplates.length == 1 && title) {
        const templateData = fs.readFileSync(
            path.join(pathToOwnTemplates, chosenTemplates[0])
        );

        const finalTitle =
            title.slice(title.length - 3) == ".md" ? title : `${title}.md`;

        const fileName = path.join(finalPath, finalTitle);

        return fs.writeFileSync(fileName, templateData);
    }

    for (let index = 0; index < chosenTemplates.length; index++) {
        const template = chosenTemplates[index];

        const templateData = fs.readFileSync(
            path.join(pathToOwnTemplates, template)
        );

        const fileName = path.join(finalPath, template);

        fs.writeFileSync(fileName, templateData);
    }
};

export const create = (pathToTemplates, pathToReadTemplates, title, all) => {
    if (all) {
        return writeSelectionToTemplatesFolder(
            pathToTemplates,
            pathToReadTemplates,
            TEMPLATES
        );
    }

    inquirer
        .prompt(createPrompt(pathToReadTemplates))
        .then((answers) =>
            writeSelectionToTemplatesFolder(
                pathToTemplates,
                pathToReadTemplates,
                answers["Templates"],
                title
            )
        )
        .catch((error) =>
            console.error(
                `Inquirer error: something went wrong processing your selected templates: ${error}`
            )
        );
};
