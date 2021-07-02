# VSCode Configuration

This folder contains opt-in [Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings) and [Extension Recommendations](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions).

## Usage

To use the recommended configurations follow the steps below:

- install the recommneded extensions in `.vscode/extensions.json`
- copy (or link) `.vscode/recommended-settings.json` to `.vscode/settings.json`
- restart the editor

If you already have your custom workspace settings you should instead manually merge the file contents.

This isn't an automatic process so you will need to repeat it when settings are updated.

To see the recommended extensions select "Extensions: Show Recommended Extensions" in the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).

## Editing `.vscode/recommended-*.json` files

If you wish to add extra configuration items please keep in mind any modifications you make here will be used by many users.

Try to keep these settings/configuations to things that help facilitate the development process and avoid altering the user workflow whenever possible.
