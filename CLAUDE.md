# Introduction

This file provide guidance to Claude Code when working on the Ng-Zorro project

## Project Context

The Ng-Zorro project is a Angular project that provide a set of UI components for Angular applications. It is based on the Ant Design project, but is not a fork of it.
It's a community project that rewrite the Ant Design project to be used with Angular.

## Project Structure

The project is structured as follows:

ng-zorro-antd/
├── components/ # Main NG-ZORRO components (50+ UI components)
│ ├── core/ # Core utilities and services
│ │ ├── animation/
│ │ ├── color/
│ │ ├── config/
│ │ ├── form/
│ │ ├── services/
│ │ ├── testing/
│ │ ├── util/
│ │ └── ...
│ ├── cdk/ # Component Development Kit
│ │ ├── overflow/
│ │ └── resize-observer/
│ ├── i18n/
│ │ └── languages/
│ ├── style/ # Global styles and themes
│ │ ├── color/
│ │ ├── core/
│ │ ├── mixins/
│ │ └── themes/
│ └── [50+ UI components]/ # Individual components (affix, alert, button, etc.)
├── docs/ # Documentation source files
├── node_modules/ # Dependencies (excluded from git)
├── schematics/ # Angular schematics
│ ├── ng-add/
│ │ └── setup-project/
│ ├── ng-component/
│ │ └── files/
│ ├── ng-generate/
│ │ ├── blank/
│ │ ├── side-menu/
│ │ └── topnav/
│ ├── ng-update/
│ │ ├── data/
│ │ ├── migrations/
│ │ └── upgrade-rules/
│ ├── testing/
│ └── utils/
├── scripts/ # Build and utility scripts
│ ├── build/
│ ├── code-check/
│ ├── gulp/
│ ├── prerender/
│ ├── release/
│ ├── schematics/
│ └── site/
├── site/ # Documentation site
│ └── doc/
│ ├── app/
│ ├── assets/
│ └── environments/
├── .editorconfig # Editor configuration
├── .gitignore # Git ignore rules
├── .lintstagedrc # Lint-staged configuration
├── .npmrc # npm configuration
├── .nvmrc # Node version specification
├── .prettierignore # Prettier ignore rules
├── .prettierrc.js # Prettier configuration
├── .stylelintrc.json # Stylelint configuration
├── angular.json # Angular workspace configuration
├── azure-pipelines.yml # Azure DevOps pipeline
├── build-config.js # Build configuration
├── CHANGELOG.md # Version changelog
├── CODE_OF_CONDUCT.md # Code of conduct
├── commitlint.config.js # Commit message linting
├── CONTRIBUTING.md # Contribution guidelines
├── eslint.config.mjs # ESLint configuration
├── gulpfile.js # Gulp build tasks
├── LICENSE # MIT License
├── logo.svg # Project logo
├── ngsw-config.json # Angular service worker config
├── package-lock.json # Dependency lock file
├── package.json # Project dependencies and scripts
├── README.md # Project documentation
├── README-zh_CN.md # Chinese documentation
├── tea.yaml # Tea package manager config
├── tsconfig.json # TypeScript configuration
└── tsconfig-build.json # Build-specific TypeScript config

Each component located in the components folder are composed of the following files:

- public-api.ts : The public API of the component
- index.ts : The entry point of the component
- src/ : The source code of the component
- styles/ : The styles of the component
- theme/ : The theme of the component
- demo/ : The demo of the component
- doc/ : The documentation of the component
- nz-\*.component.ts : The component file
- nz-\*.component.spec.ts : The test of the component

## Component Development

- Each component needs to include the template inside the file "\*.ts"
- The template needs to respect the structure of the ant design associate component. Documentation could be found [here](https://ant.design/components/{component_name}/)
- All the imports of ng-zorro components needs to be absolut: example

```typescript
import { NzMentionComponent } from 'ng-zorro-antd/mention';
```

- All code added in a component needs to be covered by unit test

When the development impact an existing component, the code needs to respect the current structure of the component. Example if the component used @Input to declare an input for a component keep this syntax for declare another input.

For all new component, use modern angular feature:

- signals
- ngOptimizedImageDirective
- inject pattern
- new control flow

For developing new component you can take a look at the component inputNumber

## Component testing

Test used Karma and jasmine. All the test added needs to respect the existing structure of the test and also needs to use ng-zorro helper testing. All the helper testing could be found in the folder components/core/testing.

Test added needs to respect some important rules

- Test needs to be performant
- Test needs to be easy to understand for easy debugging in the future
- Test needs to respect best practice of unit testing
- Test needs to mock the strict minimum

Ensure all the test are passing by launching only the test for the component your work, and if some test failed fix them.

To launch the test for a {specific_component} you can use the following command line

```shell
npm run test -- --include="**/{specific_component}.spec.ts"
```

Example

```shell
npm run test -- --include="**/mention.component.spec.ts"
```

## Useful commands

- npm run start: Start the development server
- npm run build: Build the project
- npm run build:lib: Build the library
- npm run build:schematics: Build the schematics
- npm run test: Run the test
- npm run lint: Run the lint
- npm run format: Run the format
