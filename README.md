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

When both this package and the official GitHub CLI installed, running this tool is as easy as running:

`gh-templating`

or

`npx gh-templating`

This package will attempt to find your PR templates within your codebase. Currently, this package will search within your `.github/` folder. This package looks for a `.github/templates` folder first, so I recommend organizing your templates as such.

If you wish to use a different directory, you can supply it to this package. Simply add the path to your directory to the command. For example:

`gh-templating other/version-control/pull-requests/templates`

<br>
<hr>
<br>

[Back to top](#gh-templating)
