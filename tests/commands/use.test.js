import { use } from "../../src/use";
import inquirer from "inquirer";
import jest from "jest-mock";

describe("The use function", () => {
    const originalConsoleError = console.error;
    const originalInqPrompt = inquirer.prompt;

    beforeEach(() => {
        console.error = jest.fn();
    });

    it("should error when no choices are available", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue();

        await expect(use()).resolves;
        expect(console.error).toHaveBeenCalledWith(
            "Fatal error: Expected at least one choice, but found none. Looked in .github/templates and the .github ROOT folder."
        );
    });

    it("should error when no choices are available when directed to a directory with no templates", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue();

        await expect(use(".github/templates/no-dir")).resolves;
        expect(console.error).toHaveBeenCalledWith(
            "Fatal error: Expected at least one choice, but found none. Looked in .github/templates/no-dir, .github/templates, and the .github ROOT folder"
        );
    });

    it("should properly select a template", async () => {
        inquirer.prompt = jest
            .fn()
            .mockResolvedValue({ ["PR Template"]: "feature.md" });

        await expect(use("templates")).resolves.toBe(
            'gh pr create --title "PR:-Fill-in-title" --body-file templates/feature.md'
        );
    });

    it("should properly set a title", async () => {
        inquirer.prompt = jest
            .fn()
            .mockResolvedValue({ ["PR Template"]: "feature.md" });

        await expect(use("templates", "my_new_PR")).resolves.toBe(
            'gh pr create --title "my_new_PR" --body-file templates/feature.md'
        );
    });

    it("should properly set a title made up of multiple words", async () => {
        inquirer.prompt = jest
            .fn()
            .mockResolvedValue({ ["PR Template"]: "feature.md" });

        await expect(use("templates", "my new PR")).resolves.toBe(
            'gh pr create --title "my new PR" --body-file templates/feature.md'
        );
    });

    afterEach(() => {
        console.error = originalConsoleError;
        inquirer.prompt = originalInqPrompt;
    });
});
