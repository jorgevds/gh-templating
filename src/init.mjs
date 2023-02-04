import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { DEFAULT_PATH, DEFAULT_DIRNAME } from "./util/global-constants.mjs";
import { create } from "./create.mjs";

export const initCommand = (pathToTemplates, directoryName, yes, initial) => {
    return init(pathToTemplates, directoryName, yes).then(() => {
        if (initial) {
            return create(pathToTemplates);
        }
    });
};

export const init = async (pathToTemplates, directoryName, yes) => {
    if (yes) {
        makeDirectories(DEFAULT_PATH, DEFAULT_DIRNAME);
        return path.join(DEFAULT_PATH, DEFAULT_DIRNAME);
    }

    let dirPath = pathToTemplates;
    let dirName = directoryName;

    if (!pathToTemplates && !directoryName) {
        const { dirPath, dirName } = await resolveWithoutArgs();

        makeDirectories(dirPath, dirName);
        return path.join(dirPath, dirName);
    }

    if (!pathToTemplates) {
        dirPath = await promptUserForPath();
    }

    if (!directoryName) {
        dirName = await promptUserForDirName();
    }

    makeDirectories(dirPath, dirName);
    return path.join(dirPath, dirName);
};

export const resolveWithoutArgs = async () => {
    const dirPath = await promptUserForPath();
    const dirName = await promptUserForDirName();

    return { dirPath, dirName };
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
    const joinedPath = path.join(dirPath, dirName);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    if (fs.existsSync(joinedPath)) {
        console.info(
            "Init: this directory already exists. Please re-run the 'init' command if you want to make a new one."
        );
    } else {
        fs.mkdirSync(path.join(dirPath, dirName));
    }
};
