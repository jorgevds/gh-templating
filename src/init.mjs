import inquirer from "inquirer";
import fs from "fs";
import path from "path";

export const init = async (pathToTemplates, directoryName) => {
    // TODO: foolproof/insulate
    // mkdirAsync, chain?
    let path = pathToTemplates;
    let dirName = directoryName;

    if (!pathToTemplates && !directoryName) {
        const { path, dirName } = await resolveWithoutArgs();

        fs.mkdirSync(path);
        fs.mkdirSync(`${path}/${dirName}`);
        return;
    }

    if (!pathToTemplates) {
        path = await promptUserForPath();
    }

    if (!directoryName) {
        dirName = await promptUserForDirName();
    }

    fs.mkdirSync(path);
    fs.mkdirSync(`${path}/${dirName}`);
};

const resolveWithoutArgs = async () => {
    const path = await promptUserForPath();
    const dirName = await promptUserForDirName();

    return { path, dirName };
};

const promptUserForPath = async () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "Path to new directory",
                message: "Where would you like to store your templates?",
            },
        ])
        .then((answers) => answers["Path to new directory"])
        .catch((error) => {
            console.error(
                `Inquirer error: something went wrong processing your answer: ${error}`
            );
        });
};

const promptUserForDirName = async () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "Template directory name",
                message: "What would you like to call your new directory?",
            },
        ])
        .then((answers) => answers["Template directory name"])
        .catch((error) => {
            console.error(
                `Inquirer error: something went wrong processing your answer: ${error}`
            );
        });
};
