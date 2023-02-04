import jest from "jest-mock";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import {
    DEFAULT_PATH,
    DEFAULT_DIRNAME,
} from "../../src/util/global-constants.mjs";
import { initCommand } from "../../src/init.mjs";
import { create } from "../../src/create.mjs";

describe("The create command", () => {
    const originalExistsSync = fs.existsSync;
    const originalMkdirSync = fs.mkdirSync;
    const originalReaddirSync = fs.readdirSync;
    const originalReadFileSync = fs.readFileSync;
    const originalWriteFileSync = fs.writeFileSync;
    const originalInqPrompt = inquirer.prompt;

    beforeEach(() => {
        fs.existsSync = jest.fn().mockReturnValue(false);
        fs.mkdirSync = jest.fn().mockReturnValue();
        fs.readFileSync = jest.fn().mockReturnValue("");
        fs.writeFileSync = jest.fn().mockReturnValue("");
    });

    it("should create a new file with a chosen title", async () => {
        const createMessage = await create(
            undefined,
            undefined,
            undefined,
            true
        );
        expect(createMessage).toBe("Wrote to 6 locations");
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
            "Wrote to one location with title: my-new-template.md"
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
        expect(createMessage).toBe("Wrote to 1 locations");
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
        expect(createMessage).toBe("Wrote to 1 locations");
    });

    afterEach(() => {
        fs.existsSync = originalExistsSync;
        fs.mkdirSync = originalMkdirSync;
        fs.readdirSync = originalReaddirSync;
        fs.readFileSync = originalReadFileSync;
        fs.writeFileSync = originalWriteFileSync;
        inquirer.prompt = originalInqPrompt;
    });
});
