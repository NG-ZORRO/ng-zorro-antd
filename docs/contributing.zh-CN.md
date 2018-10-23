---
order: 9
title: 贡献指南
---

这篇指南会指导你如何为 NG-ZORRO 贡献一份自己的力量，请在你要提 issue 或者 pull request 之前花几分钟来阅读一遍这篇指南。

## 行为准则

我们有一份 [行为准则](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CODE_OF_CONDUCT.md)，希望所有的贡献者都能遵守，请花时间阅读一遍全文以确保你能明白哪些是可以做的，哪些是不可以做的。

## 透明的开发

我们所有的工作都会放在 [GitHub](https://github.com/NG-ZORRO/ng-zorro-antd) 上。不管是核心团队的成员还是外部贡献者的 pull request 都需要进过同样流程的 review。

## Bugs

我们使用 [GitHub Issues](https://github.com/NG-ZORRO/ng-zorro-antd/issues) 来做 bug 追踪。 如果你想要你发现的 bug 被快速解决，最好的办法就是通过我们提供的 [issue 小助手](https://ng.ant.design/issue-helper/#/zh) 来提 issue。 并且能使用这个 [模板](https://stackblitz.com/edit/ng-zorro-antd-setup?file=app%2Fapp.component.ts) 来提供重现。

在你报告一个 bug 之前，请先确保已经搜索过已有的 issue 和阅读了我们的 [常见问题](docs/faq/zh)。

## 新增功能

如果你有改进我们的 API 或者新增功能的想法，我们同样推荐你使用我们提供的 [issue 小助手](https://ng.ant.design/issue-helper/#/zh) 来新建一个添加新功能的 issue。

## 第一次贡献

如果你还不清楚怎么在 GitHub 上提 Pull Request ，可以阅读下面这些文章来学习：

* [如何为开源做贡献](https://opensource.guide/zh-cn/how-to-contribute/)
* [第一次参与开源](https://github.com/firstcontributions/first-contributionshttps://github.com/firstcontributions/first-contributions/blob/master/translations/README.chs.md)

为了能帮助你开始你的第一次尝试，我们用 [good first issues](https://github.com/NG-ZORRO/ng-zorro-antd/labels/good%20first%20issue) 标记了一些比较比较容易修复的 bug 和小功能。这些 issue 可以很好地做为你的首次尝试。

如果你打算开始处理一个 issue，请先检查一下 issue 下面的留言以确保没有别人正在处理这个 issue。如果当前没有人在处理的话你可以留言告知其他人你将会处理这个 issue，以免别人重复劳动。

如果之前有人留言说会处理这个 issue 但是一两个星期都没有动静，那么你也可以接手处理这个 issue，当然还是需要留言告知其他人。

## Pull Request

NG ZORRO 团队会关注所有的 pull request，我们会 review 以及合并你的代码，也有可能要求你做一些修改或者告诉你我们为什么不能接受这样的修改。

**在你发送 Pull Request 之前**，请确认你是按照下面的步骤来做的：

1. 在项目根目录下运行了 `npm install`。
2. 如果你修复了一个 bug 或者新增了一个功能，请确保写了相应的测试，这很重要。
3. 确认所有的测试都是通过的 `npm run test`。 小贴士: Test 会在你 `git commit` 的时候自动运行。
4. 确保你的代码通过了 lint 检查 `npm run lint`. 小贴士: Lint 会在你 `git commit` 的时候自动运行。
5. 确保你的代码在提交之前经过了正确的 [Rebase](https://www.digitalocean.com/community/tutorials/how-to-rebase-and-update-a-pull-request)
6. 确保你的提交符合[规范](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

## 开发流程

在你 clone 了 `ng-zorro-antd`  的代码并且使用 `npm install` 安装完依赖后，你还可以运行下面几个常用的命令：

1. `npm run site:start` 在本地运行 `NG-ZORRO` 的网站。
2. `npm run lint` 检查代码风格。
3. `npm run test` 运行测试。
5. `npm run generate` 构建 `ng-zorro-antd` 到 `publish` 目录。
