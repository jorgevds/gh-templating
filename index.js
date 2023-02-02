#! /usr/bin/env node
import { use } from "./src/index.mjs";
import { Command } from "commander";

const program = new Command();

program
    .command("use")
    .description("Select a template and create a new PR")
    .argument("[path]", "Path to templates directory - string - optional", "")
    .option(
        "-t, --title <string>",
        "Title of your new PR - string - optional",
        ""
    )
    .action((path, { title }) => use(path, title));

program.parse(process.argv);
