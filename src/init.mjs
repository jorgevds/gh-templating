import inquirer from "inquirer";
import fs from "fs";
import path from "path";

const DEFAULT_PATH = ".github";
const DEFAULT_DIRNAME = "templates";

export const init = async (pathToTemplates, directoryName, yes) => {
    if (yes) {
        return makeDirectories(DEFAULT_PATH, DEFAULT_DIRNAME);
    }

    let dirPath = pathToTemplates;
    let dirName = directoryName;

    if (!pathToTemplates && !directoryName) {
        const { path, dirName } = await resolveWithoutArgs();

        return makeDirectories(path, dirName);
    }

    if (!pathToTemplates) {
        dirPath = await promptUserForPath();
    }

    if (!directoryName) {
        dirName = await promptUserForDirName();
    }

    makeDirectories(dirPath, dirName);
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
                message: `Where would you like to store your templates? Default: ${DEFAULT_PATH}`,
            },
        ])
        .then((answers) => {
            const answer = answers["Path to new directory"]
                ? answers["Path to new directory"]
                : DEFAULT_PATH;

            return answer;
        })
        .catch((error) => {
            console.error(
                `Inquirer error: something went wrong processing your path to new directory: ${error}`
            );
        });
};

const promptUserForDirName = async () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "Template directory name",
                message: `What would you like to call your new directory? Default: ${DEFAULT_DIRNAME}`,
            },
        ])
        .then((answers) => {
            const answer = answers["Template directory name"]
                ? answers["Template directory name"]
                : DEFAULT_DIRNAME;

            return answer;
        })
        .catch((error) => {
            console.error(
                `Inquirer error: something went wrong processing your template directory name: ${error}`
            );
        });
};

const makeDirectories = (dirPath, dirName) => {
    const joinedPath = path.join(...`${dirPath}/${dirName}`.split("/"));

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    if (fs.existsSync(joinedPath)) {
        console.info(
            "Init: this directory already exists. Please re-run the 'init' command if you want to make a new one."
        );
    } else {
        fs.mkdirSync(path.join(...`${dirPath}/${dirName}`.split("/")));
    }
};
