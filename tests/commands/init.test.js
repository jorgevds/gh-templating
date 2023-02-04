import jest from "jest-mock";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import {
    DEFAULT_PATH,
    DEFAULT_DIRNAME,
} from "../../src/util/global-constants.mjs";
import { init } from "../../src/init.mjs";

describe("The init command", () => {
    const originalExistsSync = fs.existsSync;
    const originalMkdirSync = fs.mkdirSync;
    const originalInqPrompt = inquirer.prompt;

    beforeEach(() => {
        fs.existsSync = jest.fn().mockReturnValue(false);
        fs.mkdirSync = jest.fn().mockReturnValue();
    });

    it("should resolve properly without any args or flags", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue({
            ["Path to new directory"]: "rootfolder",
            ["Template directory name"]: "templating",
        });

        const pathAndDirname = await init();
        expect(pathAndDirname).toBe("rootfolder/templating");
    });

    it("should resolve properly without a path argument", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue({
            ["Path to new directory"]: "rootfolder",
        });

        const pathAndDirname = await init(undefined, "dir_templates");
        expect(pathAndDirname).toBe("rootfolder/dir_templates");
    });

    it("should resolve properly without a dirname argument", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue({
            ["Template directory name"]: "template_directory",
        });

        const pathAndDirname = await init("organization");
        expect(pathAndDirname).toBe("organization/template_directory");
    });

    it("should skip prompts and set the default path when triggered with the -y option", async () => {
        const pathAndDirname = init(undefined, undefined, true);
        await expect(pathAndDirname).resolves.toBe(
            path.join(DEFAULT_PATH, DEFAULT_DIRNAME)
        );
    });

    afterEach(() => {
        fs.existsSync = originalExistsSync;
        fs.mkdirSync = originalMkdirSync;
        inquirer.prompt = originalInqPrompt;
    });
});
