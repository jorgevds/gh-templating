#! /usr/bin/env node
import { use, init } from "./src/index.mjs";
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

program
    .command("init")
    .description("Initialize a directory for your templates")
    .argument("[path]", "Path to your new directory - string - optional")
    .argument("[dirName]", "Name of your new directory - string - optional")
    .option(
        "-y, --yes",
        "Skip prompts and arguments and immediately create the default directory - boolean - optional"
    )
    .action((path, dirName, { yes }) => init(path, dirName, yes));

program.parse(process.argv);
