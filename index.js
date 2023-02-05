#! /usr/bin/env node
import { useCommand, create, initCommand } from "./src/index.mjs";
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
    .action((path, { title }) => useCommand(path, title));

program
    .command("init")
    .description("Initialize a directory for your templates")
    .argument("[path]", "Path to your new directory - string - optional")
    .argument("[dirName]", "Name of your new directory - string - optional")
    .option(
        "-y, --yes",
        "Skip prompts and arguments and immediately create the default directory - boolean - optional"
    )
    .option(
        "-i, --initial",
        "After initializing, segway into the create workflow to add templates - boolean - optional"
    )
    .option(
        "-o, --own <string>",
        "Path to your own templates - string - optional",
        ""
    )
    .option(
        "-t, --title <string>",
        "Title of your new PR template. Only works when selecting one template - string - optional",
        ""
    )
    .option(
        "-a, --all",
        "Skip prompts and arguments and immediately add all templates - boolean - optional"
    )
    .action((path, dirName, { yes, initial, own, title, all }) =>
        initCommand(path, dirName, yes, initial, own, title, all)
    );

program
    .command("create")
    .description("Add a template to your codebase")
    .argument("[path]", "Path to your new directory - string - optional")
    .option(
        "-o, --own <string>",
        "Path to your own templates - string - optional",
        ""
    )
    .option(
        "-t, --title <string>",
        "Title of your new PR template. Only works when selecting one template - string - optional",
        ""
    )
    .option(
        "-a, --all",
        "Skip prompts and arguments and immediately add all templates - boolean - optional"
    )
    .action((path, { own, title, all }) => create(path, own, title, all));

program.parse(process.argv);
