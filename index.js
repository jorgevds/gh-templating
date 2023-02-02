#! /usr/bin/env node
import { use, init } from "./src/index.mjs";
import { Command } from "commander";

const program = new Command();

program
    .command("use")
    .description("Select a template and create a new PR")
    .argument("[path]", "Path to templates directory - string - optional")
    .argument("[title]", "Title of your new PR - string - optional")
    .action((path, title) => use(path, title));

program
    .command("init")
    .description("Initialize a directory for your templates")
    .argument("[path]", "Path to your new directory - string - optional")
    .argument("[dirName]", "Name of your new directory - string - optional")
    .action((path, dirName) => init(path, dirName));

program.parse(process.argv);
