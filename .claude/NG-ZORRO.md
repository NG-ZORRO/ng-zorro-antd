# Introduction

This file provides guidance to Claude Code when working on the NG-ZORRO project.

## Project Context

The NG-ZORRO project is an Angular project that provides a set of UI components for Angular applications. It is based on the Ant Design project but is not a fork of it.
It's a community project that rewrites the Ant Design project to be used with Angular.

## Project Structure

ng-zorro-antd/
├── components/ # Main NG-ZORRO components (70+ UI components)
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
│ └── [70+ UI components]/ # Individual components (affix, alert, button, etc.)
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
│ ├── gulp/
│ ├── prerender/
│ ├── release/
│ ├── schematics/
│ └── site/
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

Each component located in the `components/` folder is composed of the following files:

- `public-api.ts`: The public API of the component
- `index.ts`: The entry point of the component
- `src/`: The source code of the component
- `style/`: The styles of the component
- `demo/`: The demos of the component
- `doc/`: The main documentation of the component
- `*\.component.ts`: The component file
- `*\.component.spec.ts`: The component tests

## Installation and Setup

### Development environment requirements

- Node.js v22.22.3 or higher
- npm recommended

### Install dependencies

- Run `npm install` to install dependencies

### Development commands

- Run `npm run start` to start the development server
- Run `npm run build` to build the project
- Run `npm run build:lib` to build the library
- Run `npm run build:schematics` to build the schematics
- Run `npm run test:schematics` to test the schematics
- Run `npm run test` to run tests

## Coding Style Guide

More information can be found [here](./DEVELOPMENT.md).
