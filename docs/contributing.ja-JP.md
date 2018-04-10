---
order: 9
title: NG-ZORROへの貢献
---

以下は、NG-ZORROに貢献する為の一連のガイドラインです。Issueやプルリクエストを作成する前にこれらに目を通してください。

## 行動規範

私たちは、プロジェクトの参加者が遵守するであろう[行動規範](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CODE_OF_CONDUCT.md)を採用しています。
どのような行動が容認されるのか、また容認されないのか理解する為に全文を読んでください。

## オープンな開発

NG-ZORROに関する全ての仕事は[GitHub](https://github.com/NG-ZORRO/ng-zorro-antd)で直接行われます。
コアチームのメンバーと外部の貢献者のどちらもが同じレビューのプロセスをたどるPull-Requestを送信します。

## バグ

バグの追跡には[GitHub Issues](https://github.com/NG-ZORRO/ng-zorro-antd/issues)を使用しています。
あなたのバグを修正する最善の方法は私たちの[Issueヘルパー](https://ng.ant.design/issue-helper/#/new-issue)を使用してこの[テンプレート](https://stackblitz.com/edit/ng-zorro-antd-setup?file=app%2Fapp.component.ts)の複製を再利用することです。
バグを報告する前に、既存のIssueがないか確認し、[よくある質問](docs/faq/en)を読んでください。

## 変更の提案

もし、公開APIを変更したり新しい機能を導入する場合は、[Issueヘルパー](https://ng.ant.design/issue-helper/#/new-issue)を使用して機能リクエストのIssueを作成することを推奨します。

## 初めてのプルリクエスト

初めてのプルリクエストですか？どのようにするのかこの無料の動画のシリーズで学ぶことができます。

[How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

手始めにやってみて貢献のプロセスに慣れる為に、比較的限られた範囲でのバグや小さな機能を含む良いIssueのリスト「[はじめてのissues](https://github.com/NG-ZORRO/ng-zorro-antd/labels/good%20first%20issue)」があります。

Issueに取り組むことを決めたとき、既に誰かが作業していないか、必ずIssueのコメントを確認してください。

現時点で誰も作業していない場合は、他の誰かが間違ってあなたの努力と重複しないように、作業するつもりであるとコメントを残してください。

もし、Issueが２週間以上放置されている場合は引き継ぐことができますが、コメントは残しておくべきです。

## プルリクエストの送信

コアチームはプルリクエストを監視しています。
私たちはあなたのプルリクエストをマージするか、変更をお願いするか、または理由を説明してから閉じます。

**プルリクエストを送信する前に**、以下のことを確認してください。

1. リポジトリのルートディレクトリで `npm install` が実行されているかどうか確認してください。
2. テストが必要なバグやコードを修正したのなら、テストコードを追加してください!
3. テストスイートが合格していることを確認してください (`npm run test`)。 
4. Lintを確認する (`npm run lint`)。 ポイント: Lintは `git commit` を実行すると自動的に実行されます。
5. 履歴を綺麗に保つ為にrebaseしてください。
6. あなたのコミットメッセージが[ガイドライン](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md#-commit-message-guidelines)を満たしているかどうか確認してください。

## 開発の流れ

`ng-zorro-antd` をクローンした後、依存モジュールを取得する為に `npm install` を実行してください。
次に、いくつかのコマンドを実行できます。

1. `npm run site:start` は、NG-ZORROのWebサイトをローカルで起動できます。
2. `npm run lint` は、コードスタイルをチェックできます。
3. `npm test` は、完全なテストスイートを実行できます。
5. `npm run generate` は、 `ng-zorro-antd` のビルドを作成します。
