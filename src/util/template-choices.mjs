import path from "path";
import fs from "fs";

export const getMarkdownFilenames = (dirName) => {
    return fs
        .readdirSync(dirName)
        .filter((file) => file.slice(file.length - 3) == ".md");
};

export const getConfig = (pathToTemplates) => {
    let config = { path: pathToTemplates, choices: [] };

    if (pathToTemplates) {
        try {
            config = setConfig(pathToTemplates);
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
                const pathToSet = path.join(...`.github/templates`.split("/"));
                config = setConfig(pathToSet);
            } catch (error) {
                console.error(
                    `No templates found in: ROOT:.github/templates. Looking in ROOT:.github/`
                );
            }
        }
    } else {
        try {
            const pathToSet = ".github";
            config = setConfig(pathToSet);
        } catch (error) {
            console.error(
                `Fatal error: no templates found in codebase. Please specify a path to your templates.`
            );
        }
    }

    return config;
};

const setConfig = (pathToJoin) => {
    return {
        path: pathToJoin,
        choices: getMarkdownFilenames(path.join(process.cwd(), pathToJoin)),
    };
};
