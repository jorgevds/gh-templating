# gh-templating

## A CLI tool to make choosing GitHub PR templates easier

This tool finds your PR templates, prompts a selection menu, remembers your selection, and runs a simple command through the official GitHub CLI with your answer.

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Use](#use)

## Prerequisites

In order to use this package, you must have the official GitHub CLI installed. Additionally, in order to actually use the GitHub CLI, you must be logged in.

Please refer to their [official documentation](https://cli.github.com/) for help installing this tool.

## Installation

To install, simply run:

`npm install gh-templating`

You can also install this package globally by adding the `-g` flag. Note: `sudo` rights may be required.

## Use

When both this package and the official GitHub CLI installed, you can select one of your own templates by running the `use` command:

`gh-templating use`

or

`npx gh-templating use`

This package will attempt to find your PR templates within your codebase. Currently, this package will search within your `.github/` folder. This package looks for a `.github/templates` folder first, so I recommend organizing your templates as such.

If you wish to specify a different templates directory, you can supply it to this package. For example:

`gh-templating use other/version-control/pull-requests/templates`

You can also tell the `use` command to create a PR with a specific title:

`gh-templating use -t bugfix/stop-app-from-exploding`

Both of these options can be combined to a create a more complete command:

`gh-templating use -t bugfix/stop-app-from-exploding other/version-control/pull-requests/templates`

## Init

This package can also help you get started on your magical PR templating journey! To get the ball rolling, run the init command in your project:

`gh-templating init`

With no arguments provided, gh-templating will prompt you for both the path to the directory and the directory name. Once you pass those in, a new directory will be created where you can begin creating your PR templates.

You can skip these prompts by providing both arguments at the start:

`gh-templating init .github templates`

This package also provides defaults. If you leave each prompt blank, gh-templating will create a default directory called templates in your .github folder. Alternatively, you can pass the optional argument `-y` to short-circuit and immediately create the default directory.

`gh-templating init -y`

<br>
<hr>
<br>

[Back to top](#gh-templating)
