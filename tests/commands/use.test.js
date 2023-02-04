import { use } from "../../src/use";
import inquirer from "inquirer";
import jest from "jest-mock";
import child_process from "child_process";

describe("The use function", () => {
    const original = console.error;
    const origExec = child_process.execSync;

    beforeEach(() => {
        console.error = jest.fn();
        child_process.execSync = jest.fn();
    });

    it("should error when no choices are available", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue();

        await expect(use()).resolves;
        expect(console.error).toHaveBeenCalledWith(
            "Fatal error: no choices available. Expected at least one choice, but found none."
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
        console.error = original;
        child_process.execSync = origExec;
    });
});
