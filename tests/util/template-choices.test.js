import { getConfig } from "../../src/util/template-choices.mjs";
import { TEMPLATES } from "../../templates/index.mjs";
import jest from "jest-mock";
import fs from "fs";
import { executeCommand } from "../../src/util/execute-command.mjs";

describe("template-choices helpers", () => {
    describe("getConfig", () => {
        const originalConsoleError = console.error;
        const originalExistsSync = fs.existsSync;
        const originalReaddirSync = fs.readdirSync;

        beforeEach(() => {
            console.error = jest.fn();
        });

        it("should correctly set all template files in the choices array when looking inside the templates folder", () => {
            const path = "templates";
            const expectedConfig = { path, choices: TEMPLATES };
            const config = getConfig(path);
            expect(config).toEqual(expectedConfig);
        });

        it("should set choices as empty if it finds nothing inside .github folder", () => {
            const expectedConfig = { path: ".github", choices: [] };

            const config = getConfig();
            expect(config).toEqual(expectedConfig);
        });

        it("should find templates when looking in existing .github/templates directory", () => {
            fs.existsSync = jest.fn().mockReturnValue(true);
            fs.readdirSync = jest.fn().mockReturnValue(["bugfix.md"]);

            const expectedConfig = {
                path: ".github/templates",
                choices: ["bugfix.md"],
            };

            const config = getConfig();
            expect(config).toEqual(expectedConfig);
        });

        it("should log error when looking for templates in existing .github/templates directory", () => {
            fs.existsSync = jest.fn().mockReturnValue(true);

            const config = getConfig();
            expect(console.error).toHaveBeenCalledWith(
                "No templates found in: ROOT:.github/templates. Looking in ROOT:.github/templates"
            );
        });

        afterEach(() => {
            console.error = originalConsoleError;
            fs.existsSync = originalExistsSync;
            fs.readdirSync = originalReaddirSync;
        });
    });
});
