---
order: 11
title: How to Contribute
---

The following is a set of guidelines for contributing to NG ZORRO. Please spend several minutes in reading these guidelines before you create an issue or pull request.

## Code of Conduct

We have adopted a [Code of Conduct](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

## Open Development

All work on NG-ZORRO happens directly on [GitHub](https://github.com/NG-ZORRO/ng-zorro-antd). Both core team members and external contributors send pull requests which go through the same review process.

## Bugs

We are using [GitHub Issues](https://github.com/NG-ZORRO/ng-zorro-antd/issues) for bug tracing. The best way to get your bug fixed is using our [issue helper](https://ng.ant.design/issue-helper/#/en) and provide a reproduction with this [template](https://stackblitz.com/edit/ng-zorro-antd-start).

Before you reporting a bug, please make sure you've searched exists issues, and read our [FAQ](docs/faq/en).

## Proposing a Change

If you intend to change the public API or introduce new feature, we also recommend use our [issue helper](https://ng.ant.design/issue-helper/#/en) to create a feature request issue.

## Your First Pull Request

Working on your first Pull Request? You can learn how from these resources:

* [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
* [First Contributions](https://github.com/firstcontributions/first-contributions)

To help you get your feet wet and get you familiar with our contribution process, we have a list of [Good First Issue](https://github.com/NG-ZORRO/ng-zorro-antd/labels/good%20first%20issue) that contain bugs or small features that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take over it but you should still leave a comment.

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

**Before submitting a pull request**, please make sure the followings are done:

1. Run `npm install` in the repository root.
2. If you’ve fixed a bug or added code that should be tested, add tests!
3. Make sure the test suite passes (`npm run test`).
4. Make sure your code lints (`npm run lint`).
5. Make sure rebase your code to keep the history clean.
6. Make sure your commit message meet the [guidelines](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

## Development Workflow

After cloning `ng-zorro-antd` and running `npm install` to fetch its dependencies, you can run the following commands:

* `npm start` runs NG-ZORRO website locally.
* `npm run lint` checks the code style.
* `npm test` runs the complete test suite.
* `npm run test:watch [name]` run some test file and watch changes.
* `npm run build:lib` creates build of `ng-zorro-antd`.

If you running into problems while developing ng-zorro-antd, you can refer to our [developement guide](https://github.com/NG-ZORRO/ng-zorro-antd/wiki/Development-Guide) on GitHub.
