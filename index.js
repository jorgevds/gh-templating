#! /usr/bin/env node
import { use } from "./src/index.mjs";
import { Command } from "commander";

const program = new Command();

program
    .command("use")
    .description("Select a template and create a new PR")
    .argument("[title]", "Title of your new PR - string - optional")
    .argument("[path]", "Path to templates directory - string - optional")
    .action(use);

program.parse(process.argv);
