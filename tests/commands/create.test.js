import jest from "jest-mock";
import fs from "fs";
import inquirer from "inquirer";
import { initCommand } from "../../src/init.mjs";
import { create } from "../../src/create.mjs";

describe("The create command", () => {
    const originalExistsSync = fs.existsSync;
    const originalMkdirSync = fs.mkdirSync;
    const originalReaddirSync = fs.readdirSync;
    const originalReadFileSync = fs.readFileSync;
    const originalWriteFileSync = fs.writeFileSync;
    const originalConsoleInfo = console.info;
    const originalInqPrompt = inquirer.prompt;

    beforeEach(() => {
        fs.existsSync = jest.fn().mockReturnValue(false);
        fs.mkdirSync = jest.fn().mockReturnValue();
        fs.readFileSync = jest.fn().mockReturnValue("");
        fs.writeFileSync = jest.fn().mockReturnValue("");
        console.info = jest.fn();
    });

    it("should add all templates when supplied with the -a flag", async () => {
        const createMessage = await create(
            undefined,
            undefined,
            undefined,
            true
        );
        expect(createMessage).toBe(
            "Wrote backport_template.md,bugfix_template.md,empty_template.md,feature_template.md,hotfix_template.md,release_template.md to .github/templates, sourced from /Users/jorgevandesompel/Documents/gh-templating/templates"
        );
    });

    it("should create a new file with a chosen title", async () => {
        fs.readdirSync = jest.fn().mockReturnValue(["bugfix.md"]);
        inquirer.prompt = jest
            .fn()
            .mockResolvedValue({ ["Templates"]: "bugfix.md" });
        const createMessage = await create(
            undefined,
            undefined,
            "my-new-template.md"
        );
        expect(createMessage).toBe(
            "Wrote my-new-template.md to .github/templates, sourced from /Users/jorgevandesompel/Documents/gh-templating/templates"
        );
    });

    it("should look in a different folder if supplied with the -o flag", async () => {
        fs.readdirSync = jest.fn().mockReturnValue(["bugfix.md"]);
        inquirer.prompt = jest
            .fn()
            .mockResolvedValue({ ["Templates"]: "bugfix.md" });
        const createMessage = await create(
            undefined,
            "my-own-folder",
            undefined
        );
        expect(createMessage).toBe(
            "Wrote bugfix.md to .github/templates, sourced from my-own-folder"
        );
    });

    it("should call create after calling init when passed the -i flag", async () => {
        fs.readdirSync = jest.fn().mockReturnValue(["bugfix.md"]);
        inquirer.prompt = jest
            .fn()
            .mockResolvedValue({ ["Templates"]: "bugfix.md" });

        const createMessage = await initCommand(
            "rootfolder",
            "templates",
            undefined,
            true
        );
        expect(createMessage).toBe(
            "Wrote bugfix.md to rootfolder, sourced from /Users/jorgevandesompel/Documents/gh-templating/templates"
        );
    });

    afterEach(() => {
        fs.existsSync = originalExistsSync;
        fs.mkdirSync = originalMkdirSync;
        fs.readdirSync = originalReaddirSync;
        fs.readFileSync = originalReadFileSync;
        fs.writeFileSync = originalWriteFileSync;
        inquirer.prompt = originalInqPrompt;
        console.info = originalConsoleInfo;
    });
});
