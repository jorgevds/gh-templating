# gh-templating

## A CLI tool to make choosing GitHub PR templates easier

This tool finds your PR templates, prompts a selection menu, remembers your selection, and runs a simple command through the official GitHub CLI with your answer.

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Use](#use)
4. [Init](#init)
5. [Create](#create)

## Prerequisites

In order to use this package, you must have the official GitHub CLI installed. Additionally, in order to actually use the GitHub CLI, you must be logged in.

Please refer to their [official documentation](https://cli.github.com/) for help installing this tool.

## Installation

To install, simply run:

`npm install gh-templating --save-dev`

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

If you wish to segway immediately into adding templates from the package, you can add the `-i` flag to specify initial templates immediately after creating your directory:

`gh-templating init -i`

All options that apply to the `create` command will also work when combined with this flag! This way you can e.g. figure out the final destination for your templates by answering the prompts in `init` and quickly add all the available templates to your directory:

`gh-templating init -y -a`

## Create

This package can also help you get started by generating new template files for you. These templates are generic versions set up by the package. These templates are a nice jumping off point for you to adjust to your project's needs. Alternatively, they might just be complete enough for you not to have to worry about making your own!

To create a new template, run the `create` command:

`gh-templating create`

A prompt will... prompt you for all the templates you wish to add. This list of options is a multiselect list, meaning you can add more than just one at a time.

You can specify the directory you wish these templates to be in as well:

`gh-templating create .github/internal/other/long-path/how-far-does-this-go/templates`

By default, gh-templating will look inside the `.github/templates` directory.

This list is provided by the package internally, as the template bodies are too. If you wish to continue on from your own templates, you can do so! Specify the path of template files you wish to have as possible options by supplying it to the command:

`gh-templating create -o .github/internal/other/long-path/how-far-does-this-go/templates/not-yet/maybe-here/no/ok/templates`

You can also set the filename for a chosen template. Note: this currently only works if you've selected one template. To provide a filename for a template, specify the filename value by setting the -t (or --title) flag:

`gh-templating create -t this_is_my_new_cool_template`

Finally, if you'd rather not choose, you can skip all prompts and arguments by passing the -a (or --all) flag to the `create` command:

`gh-templating create -a`

Doing so will immediately add all the package's templates to your template directory.

<br>
<hr>
<br>

[Back to top](#gh-templating)
