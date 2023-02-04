import { execSync } from "child_process";

export const executeCommand = (command, location) => {
    try {
        execSync(command);
    } catch (error) {
        console.error(`${location}: Something went wrong: ${error}`);
    }
};
