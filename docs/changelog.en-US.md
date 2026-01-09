---
order: 13
title: Change Log
toc: false
timeline: true
tag: '{{version}}'
---

`ng-zorro-antd` strictly follows [Semantic Versioning 2.0.0](https://semver.org).

### Release Schedule

- Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
- Monthly release: minor version at the end of every month for new features.
- Major version release is not included in this schedule for breaking change and new features.

---

## 21.0.0

`2026-01-09`

### Code Refactoring

- migrate to native animation API, feel free to remove the `@angular/animations` dependency

### Features

- **color-picker:** support `nzPresets` ([#9341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9341)) ([d59ec99](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d59ec995b42726470ebaea39ec7a52f5c9c5e58d))
- **core:** add `provideNzNoAnimation` ([#9555](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9555)) ([c945e81](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c945e81ce5966f34e7a96a8bccbf628a5b8d8c06))
- **date-picker:** output date range in correct order ([#9518](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9518)) ([d0b3185](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0b3185fb2ae891a164d3b4f28e4f68add8e166b))
- **float-button:** add pop animation to float button menu ([#9413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9413)) ([b40ad91](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b40ad91b26aee48fc86d92da48071751f8345ab4))
- **input-number:** supports mouse wheel control ([#9591](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9591)) ([6ce3545](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6ce354537ec59bd0c480eed61bb8f663d2429189))
- **input,input-number:** add additional options for `focus` method ([#9595](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9595)) ([c336711](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3367110ccd53c5debd74799070ac6565c13c483))
- **qrcode:** support `nzType` and `nzBoostLevel`, delete array usage of `nzPadding` ([#9535](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9535)) ([5419b51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5419b51781478369afe3c01fe24374f2f62eeffe))
- **tree-view:** upgrade tree view component ([#9003](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9003)) ([ae9ad57](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ae9ad576292671f3228361733b47e890d425e713))
- **upload:** add `nzMaxCount` feature ([#9424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9424)) ([0bf13c3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bf13c3fa5e41289315cf4d9642ed5aa7005af9e))

### Bug Fixes

- **i18n:** add missing translations to `fa_IR` ([#9615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9615)) ([1e8845d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e8845d245ce7a98850390c61e65b301fb8fcc05))
- **popconfirm:** allow null for `nzIcon` hide icon ([#9569](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9569)) ([760b587](https://github.com/NG-ZORRO/ng-zorro-antd/commit/760b58745a1b377d4008825a3d4c157d8a1bd590))
- **select:** disable `nzAutoClearSearchValue` in single mode ([#9605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9605)) ([4720c21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4720c2175dd2bc937d8ccbf66ab804c4782f23d4))
- **tree:** no `preventDefault` when right-clicking the node title ([#9532](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9532)) ([900efad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/900efad5b0a04b1a0aca2c68728f01ed8dc4ef3b))

### ⚠ BREAKING CHANGES

- **back-top:** removed, please use `float-button` instead
- **color-picker:** change DOM structure to be simpler, and remove no unnecessary payload of `nzClick` output
- **input-number-legacy:** removed, please use `input-number` instead
- **qrcode:** change the type of `nzPadding` from `number | number[]` to `number` ([#9535](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9535))
- **statistic:** rename `NzStatisticNumberComponent` to `NzStatisticContentValueComponent`
- **tabs:** remove deprecated `nz-tabset` selector ([#9613](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9613))
- **tree-view:** `nzTreeControl` has been removed, please use `nzLevelAccessor` or `nzChildrenAccessor` instead
- **watermark:** change import path from `ng-zorro-antd/water-mark` to `ng-zorro-antd/watermark`

Remove the following APIs which were marked as deprecated in the previous version:

| Module                              | API                                    |
| ----------------------------------- | -------------------------------------- |
| `ng-zorro-antd/back-top`            | `*`                                    |
| `ng-zorro-antd/dropdown`            | `NzDropdownButtonDirective`            |
| `ng-zorro-antd/input-number-legacy` | `*`                                    |
| `ng-zorro-antd/core`                | `NzHighlightModule`                    |
| `ng-zorro-antd/auto-complete`       | `NZ_AUTOCOMPLETE_VALUE_ACCESSOR`       |
| `ng-zorro-antd/checkbox`            | `nz-checkbox-wrapper`                  |
| `ng-zorro-antd/date-picker`         | `NzDatePickerComponent#nzBorderless`   |
| `ng-zorro-antd/input`               | `NzInputDirective#nzBorderless`        |
| `ng-zorro-antd/input-number`        | `NzInputNumberComponent#nzBordered`    |
| `ng-zorro-antd/mention`             | `NZ_MENTION_TRIGGER_ACCESSOR`          |
| `ng-zorro-antd/select`              | `NzSelectComponent#nzBorderless`       |
| `ng-zorro-antd/time-picker`         | `NzTimePickerComponent#nzBorderless`   |
| `ng-zorro-antd/tooltip`             | `NzToolTipModule` `NzToolTipComponent` |

Unify and standardize component naming, involving the following name changes:

| Module      | Original                      | Current                       |
| ----------- | ----------------------------- | ----------------------------- |
| `core`      | `NzConfig#backTop`            | `NzConfig#floatButton`        |
| `core`      | `NzConfig#dropDown`           | `NzConfig#dropdown`           |
| `dropdown`  | `NzDropDownModule`            | `NzDropdownModule`            |
| `dropdown`  | `NzDropDownADirective`        | `NzDropdownADirective`        |
| `menu`      | `NzIsMenuInsideDropDownToken` | `NzIsMenuInsideDropdownToken` |
| `watermark` | `NzWaterMarkModule`           | `NzWatermarkModule`           |
| `watermark` | `NzWaterMarkComponent`        | `NzWatermarkComponent`        |

### Deprecations

The following APIs are marked as **deprecated** in v20 and will be removed in the next major version.
Please refer to related documentation for better alternatives.

| Module                   | API                                                               |
| ------------------------ | ----------------------------------------------------------------- |
| `ng-zorro-antd/collapse` | `nz-collapse-panel[nzDisabled]`                                   |
| `ng-zorro-antd/input`    | `textarea[nzAutosize]`, `nz-input-group`, `[nz-input-group-slot]` |
| `ng-zorro-antd/upload`   | `nz-upload[nzTransformFile]`, `NzUploadTransformFileType`         |

## 20.4.4

`2025-12-12`

### Bug Fixes

- **icon:** include nzSpin in change detection logic ([#9597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9597)) ([46dc381](https://github.com/NG-ZORRO/ng-zorro-antd/commit/46dc3819244969963ca80eeac9f9c06482f48d29))
- **result:** show default icon based on status ([#9568](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9568)) ([#9582](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9582)) ([b652105](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b652105ac71a022f4d7343e911f04fbeb2dee8d0))

## 20.4.3

`2025-11-28`

### Bug Fixes

- **form:** animation should respect NoopAnimations ([#9562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9562)) ([5bccf96](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5bccf968ab8cbe4164fe09e691f6664ee2664a5c))
- **input:** fix dependency cycle ([#9561](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9561)) ([8d5782d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d5782d5ae35769fc73bcdb49d9d7897b9b92828))

## 20.4.2

`2025-11-21`

### Bug Fixes

- **cascader,select,date-picker,time-picker,tree-select:** add missing nzVariant global config ([#9543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9543)) ([221386b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/221386b45cc20d6bea689a5a4c10e35ff15b06b7))
- **button:** improve icon only logic in zoneless mode ([#9541](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9541)) ([9def420](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9def420d2da1a2b8a7993db814948151733ef772))

## 20.4.1

`2025-11-14`

### Bug Fixes

- **badge:** hex `nzColor` should work ([#9517](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9517)) ([47d44ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47d44ba4f826f882ee3a9de64994ad5ebd89daa5))
- **cascader:** fix zoneless `NG0100` issue ([#9504](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9504)) ([24b4e83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24b4e83e39fe3216d02857999df78cd4fbdc35fe))
- **color-picker:** fix `NG01350` error ([#9525](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9525)) ([fbcb8c3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fbcb8c3f78c293bd510994a28de7295e4349576c))
- **dropdown:** update arrow placement once the position of connected overlay changes ([#9519](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9519)) ([7ff7e09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ff7e09d4256e8b4bd54cf2e1e01f64cabadcf4d))
- **input:** render icon when enterButton is an empty string ([#9498](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9498)) ([6a40b0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a40b0db8cd23584cc4a268c16eec14cf6bbaf29))
- **result:** nz-result-icon in ng-content does not work ([#9511](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9511)) ([0e095a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e095a14e0bf6014cffcb95db007b750bfe84da7))
- **segmented:** should not block the `selected$` if no animation ([#9512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9512)) ([af8b531](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af8b53186469aa9858a9eaa883e3e597db65c598))
- **select:** correct font size in small size ([#9516](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9516)) ([6f79005](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f7900548ccd128b430f7a09ee3ef07dd6ea482c))

## 20.4.0

`2025-10-31`

### Features

- **cascader:** control the visibility of popup panel by `nzOpen` ([#9448](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9448)) ([4d5ec65](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d5ec6536f64690319e0fd219dc4b07c724764db))
- **cascader:** toggle checkbox of option by `ENTER` key in multiple mode ([#9457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9457)) ([e02f1f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e02f1f45f6ae1d5836b1b751bb23bfa55c5f1c33))
- **float-button:** support `nzBadge` ([#9489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9489)) ([12beec7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/12beec73fe3071e116788635ae17b1668d3b5ad8))
- **form:** support `nzRequiredMark` ([#9447](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9447)) ([800b6cf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/800b6cf960af7c4dfce0378eeb9fd361d21ac06b))
- **input-number:** add affix and addon inputs ([#9451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9451)) ([dbebd02](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dbebd025cc5101d879301405f0e0ce4baca4bdf5))
- **input:** add `nzAllowClear` input and `nzClear` callback ([#9452](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9452)) ([830b4b3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/830b4b3cced07ecc484375ab62a3593ac7140b39))
- **input:** introduce new component `nz-input-wrapper` ([#9408](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9408)) ([a8e56ec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a8e56ecbc5040dc36dd38881d2d3f7133c7c7991)), closes [#9403](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9403)
- **input:** add affix and addon inputs to `nz-input-wrapper` ([#9450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9450)) ([763f69e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/763f69e7e35ef3697245e9074034d17f110c5876))
- **input:** introduce `nz-input-search` directive ([#9483](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9483)) ([af6f590](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af6f590b30270205300e028287f205249b316efa))
- **input:** introduce `nz-input-password` directive ([#9460](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9460)) ([f80832a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f80832a7741a6efd9049372a8759d710dc72bde4))
- **message:** add support for custom styles and classes ([#9427](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9427)) ([2f866b3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f866b31febe4c1f6dd784537fc8ca2b68a66a93))
- **pagination:** support `nzAlign` ([#9433](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9433)) ([88d0864](https://github.com/NG-ZORRO/ng-zorro-antd/commit/88d08648570756e35b989f55e15bcb116175dbc2))
- **segmented:** add default name if `nzName` is not provided ([#9466](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9466)) ([33f8142](https://github.com/NG-ZORRO/ng-zorro-antd/commit/33f8142626e337e1cef997bc99a289effcb64dd0))

### Bug Fixes

- **badge:** should `nzStyle` work even if `nzColor` is not provided ([#9486](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9486)) ([4424eb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4424eb0a018c7d90fb74dfda6ceb5c54a080eb4d))
- **cascader:** display activated column correctly when reopen the popup panel ([#9456](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9456)) ([7802a39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7802a39167d0efaf1bca5e829fa4907f7af54650))

## 20.3.1

`2025-09-17`

### Bug Fixes

- **drawer:** fix `NG0203` ([#9418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9418)) ([7fb58ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7fb58aea2f03902ce3b0ac626bed99b5d8de0c6b))

## 20.3.0

`2025-09-16`

### Features

- **carousel:** support `nzArrows` ([#9355](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9355)) ([1b9714b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1b9714baf8d320b423f390d713af6533e0390f24))
- **check-list:** add badge and default checked ([#9343](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9343)) ([235b493](https://github.com/NG-ZORRO/ng-zorro-antd/commit/235b493705d297ccff21969f2d770b7f4eba7fb5))
- **i18n:** enhance `provideNzI18n` to support factory function ([#9393](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9393)) ([1371265](https://github.com/NG-ZORRO/ng-zorro-antd/commit/13712654d1c3b5de2eabc577c22d0f98a59a8345))
- **mention:** support `nzClear` ([#9377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9377)) ([cbecebf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbecebfda401b2fd873163638d3e2cc4dfd638c1))
- **mention:** support `nzVariant` ([#9379](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9379)) ([d92568b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d92568b781bb16bfef55e645a15022ef54583ba1))
- **segmented:** support `nzShape`([#9368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9368)) ([ffce6c3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffce6c385a3c994132e096a33a83bd77d01a6b7b))
- **segmented:** support `nzName` and keyboard interactions ([#9373](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9373)) ([ebd8bdc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ebd8bdc9d0c71fc6f691c7c900e8b43e26cc0e84))
- **upload:** support promise return type for `nzBeforeUpload` ([#9402](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9402)) ([cece107](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cece1077e5f375c225ae32973b863f8123520717))

### Bug Fixes

- **badge:** after setting `nzColor`, display incorrect ([#9376](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9376)) ([e9abf92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e9abf9250ab8c7c902933688610e0f2c731b97b1))
- **input:** variant underline style on hover ([#9400](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9400)) ([74c2173](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74c217382ed191b26990082586796f588fdd73c8))
- **segmented:** fix `NG0950` error ([#9386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9386)) ([e82fc01](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e82fc0186d2dc8061ff1db50aaa2e7b2f11beb9d))
- **select:** refactor multiple select styles ([#9409](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9409)) ([38f9065](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38f90653569b46e28e317e040040e98bee595761))
- **schematics:** add `less` as devDependencies if choosing custom theme in non-less project ([#9412](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9412)) ([a18cffd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a18cffd8e2dd6e39836f00a42c95f1f5699d1829))

## 20.2.1

`2025-08-31`

### Bug Fixes

- **segmented:** correctly render with-icon & icon-only ([#9367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9367)) ([9d42b42](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d42b42ad103e8ca498e65e7aa6ad7e72075d609))

## 20.2.0

`2025-08-29`

### Features

- **cascader:** add `nzOpen` to control visibility ([#9339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9339)) ([354c7cf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/354c7cfb9e9746fc55ccc3f5967721ab01737652))
- **collapse:** support `nzCollapsible` ([#9349](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9349)) ([1ddbcaf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ddbcaf8e8c5f47a5c2354ac61bf3da707e8a99c))
- **collapse:** support `nzSize` ([#9348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9348)) ([b5c256d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5c256da531b5b306f831c8ee05acf0139bc7ad3))
- **divider:** support `nzSize` ([#9346](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9346)) ([1f54536](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f5453639f059c9058815834500e459df4082882))
- **dropdown:** display arrow for content dropdown ([#9329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9329)) ([3686b73](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3686b7375839412b0db26f896fb810a4bdb2ae0c))
- **float-button:** `nzIcon` support string type ([#9302](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9302)) ([ce611e5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ce611e5d9096456e032db78acc886b5dde60220c))
- **segmented:** support `nzVertical` ([#9359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9359)) ([52322cd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/52322cd50c1d2883a0df7ca0aee91f803448315b))
- **select,tree-select,cascader:** support prefix and suffix icon ([#9328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9328)) ([527ffb6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/527ffb6efee5759e58c7472f1fae2a619092f246))
- **tag:** export `NzTagColor` type ([#9314](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9314)) ([1efd29e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1efd29ee1de0f77854dd75c10c9156d50013067d))

### Bug Fixes

- **carousel:** wrong dot position when placement is left or right ([#9358](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9358)) ([f117ccb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f117ccb739754e5a1b73be844679357cc807a238))
- **range-picker:** clear outline on mouse leaving ([#9352](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9352)) ([573d092](https://github.com/NG-ZORRO/ng-zorro-antd/commit/573d092f6e332acaeb33dfc03c0e370be6753df8))
- **segmented:** should render single element in item if icon-only ([#9363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9363)) ([89d2168](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89d216871b0a9127aa4adbf6a034b7e2e1febf2d))

## 20.1.3

`2025-08-22`

### Bug Fixes

- **i18n:** add missing translations to `cs_CZ` ([#9334](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9334)) ([93e486e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93e486eeb848fb3cbb2073f107ae7be4bba2457b))
- **i18n:** add missing translations to `sk_SK` ([#9335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9335)) ([ddefc7f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ddefc7f9e95cde34101896fd5bfe587ff1dd8a89))
- **cascader:** invalid value and label when binding dynamically ([#9338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9338)) ([324ab5b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/324ab5b2ad281abb77344b9ca0dd66d4ca55e794))
- **popconfirm:** correctly render icon & title ([#9322](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9322)) ([2c83788](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c837883853a77a5a8fe1c2245daa0548a7bb2d9))
- **select:** shaking when closing dropdown if use a TemplateRef as `nzNotFoundContent` ([#9336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9336)) ([366f8eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/366f8ebcd79900a4d6a512b72094af3494c55871))

## 20.1.2

`2025-08-08`

### Bug Fixes

- **input-number:** make sure the displayed value is correct ([#9312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9312)) ([7a2d3b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7a2d3b6f97bf80f2f517626f5e02625c4488be80))
- **select,tree-select,cascader:** selected item with long label displayed in ellipsis ([#9316](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9316)) ([30672d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30672d7978f0ca4b24ec04c196c967b69e614525))
- **table:** add cdkScrollable to internal scrolling element ([#9308](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9308)) ([8cb4113](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8cb411332b90b55bab3ec742c455e3aaaf4618d7))

## 20.1.1

`2025-08-05`

### Bug Fixes

- **badge:** export `NzBadgeStatusType` type ([#9298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9298)) ([91b1ad7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91b1ad7af23eda253c21530e2a01a5ac9f7c62a8))
- **layout:** fix showcases ([#9303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9303)) ([9a37ef8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a37ef8325522ee200462b75e13a72f403ec4bef))

## 20.1.0

`2025-07-21`

### Features

- add [llms.txt](https://ng.ant.design/llms.txt) and [llms-full.txt](https://ng.ant.design/llms-full.txt) ([#9281](https://github.com/NG-ZORRO/ng-zorro-antd/pull/9281)) ([165b963](https://github.com/NG-ZORRO/ng-zorro-antd/commit/165b96372e737a6dceac9404bded06041d286e2a))
- **float-button:** support `nzPlacement` ([#9267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9267)) ([9dc19f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9dc19f35c9f4d9de0c6fc1f2b58c97f2aded95c1))
- **input-number:** accepted numbers with commas ([#9256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9256)) ([7567bd8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7567bd87a7862b52c12e152b9ce0c395b5e18ff0))
- **input:** input-otp supports keyboard control positioning ([#9268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9268)) ([da97b02](https://github.com/NG-ZORRO/ng-zorro-antd/commit/da97b02a82361e23c77f14bec76add77f6c39302))
- **popconfirm:** add `nzDanger` support to cancel button ([#9270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9270)) ([f94cb31](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f94cb318b05b01d1560ddfe3a5bfb226f23a83b4))
- **space:** support array for size ([#9289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9289)) ([8809885](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8809885be2b268e38c8ba04f57f46803e92e0c28))
- **schematics:** align with the updated style guide ([#9295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9295)) ([b5f607b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5f607b874ed150fb1858eb81b19c3cc67478f37))

### Bug Fixes

- **core:** avoid using `setAttribute` to set `style` ([#9292](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9292)) ([12d58bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/12d58bde7cb8d762405728825d6261fe5fc663b8))
- **input-number:** ngModel value can be `undefined` ([#9269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9269)) ([4c5666a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c5666a90f477703dcda96ec135a6eea99d11105))
- **tooltip:** rename `ToolTip` to `Tooltip` ([#9285](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9285)) ([2ebef97](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2ebef970cb7cd2855ee725b89ab8dfef9e6e35d6))
- **schematics:** support `NzTooltipModule` migration ([#9294](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9294)) ([add21f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/add21f71d92645be9f1c7684c2f213a6864f5891))

## 20.0.0

`2025-07-01`

### Features

- **cascader,date-picker,input-number,input,select,time-picker,tree-select:** support `nzVariant` ([#9131](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9131)) ([b342bb4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b342bb464eb544a2e3fda8723cac7e550828b3f2))
- **popover:** add `nzPopoverTitleContext` and `nzPopoverContentContext` ([#9126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9126)) ([df3ead9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df3ead9af8368eb7e2374744f01cecd5ccc21440))
- **select:** add `nzOnClear` callback ([#9188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9188)) ([e047ac2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e047ac249b16b547525a0ca4d13beeef620f44c4))
- **avatar:** add `loading` and `fetchpriority` attributes ([#7347](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7347)) ([ff8419f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff8419f6614bdac8bc3c778e470da08b679889d0))
- **popconfirm:** add `nzOkButtonProps` and `nzCancelButtonProps` ([#9245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9245)) ([22e2a9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22e2a9fb148fd875c76fb339c6582d92aef62791))
- **tree-select:** render title of selected node in innerHTML ([#9259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9259)) ([8066f7b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8066f7bb082c95652a2e158a01e55382992fe8c6))

### Bug Fixes

- **flex:** fix `NzAlign` type ([#9151](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9151)) ([b271c19](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b271c19076ead71fabbe5b224072cfea975d801d))
- **segmented:** accepts disabled state from ng control ([#9166](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9166)) ([134cd59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/134cd5976220d51179118491a4b4b2e4d7cf761c))
- **space:** border radius compact mode one item ([#9165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9165)) ([d2f4541](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d2f4541a9ae01d6ea8705faf2bc4b96bf34b6945))
- **tabs:** prevent incorrect scroll offset on tab focus ([#9186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9186)) ([4f658e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f658e0834e99ea2be0ffd4ead2dd041ec88fb83))
- **schematics:** ng add failed when call twice ([#9171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9171)) ([d0a9748](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0a974848c0e31ad41ba69a5af60c002a7b251cd))
- **water-mark:** make server-side compatible ([#9250](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9250)) ([a70a682](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a70a682c8aa4d073bb150abd4b69104fbe21e2ed))
- **icon:** debounce icon rendering on animation frame ([#8579](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8579)) ([c0709d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c0709d1e01d80969a48634fe8194dbfd49f6192f))

### Code Refactoring

- **core:** cleanup animation frame polyfill ([#9243](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9243)) ([272237a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/272237a7a33d150ac9c0f6965df37a678221b074))
- migrate to `inject` pattern

### ⚠ BREAKING CHANGES

- **core:** refactoring in `ng-zorro-antd/core/polyfill`:
  - rename `cancelRequestAnimationFrame` to `cancelAnimationFrame`
  - rename `reqAnimFrame` to `requestAnimationFrame`
- **tabs:** rename `NzTabsetComponent` to `NzTabsComponent`, `nz-tabset` selector to `nz-tabs`, the original component and selector are marked as deprecated
- **table:** no longer compatible with material components

* **popconfirm:** `nzOkDisabled` and `nzOkDanger` are marked as deprecated, use `nzOkButtonProps` and `nzCancelButtonProps` instead

Remove the following APIs which were marked as deprecated in the previous version:

| Module                       | API                                                      |
| ---------------------------- | -------------------------------------------------------- |
| `ng-zorro-antd/button`       | `NzButtonGroupComponent`                                 |
| `ng-zorro-antd/core/form`    | `NzFormPatchModule`                                      |
| `ng-zorro-antd/checkbox`     | `NzCheckBoxOptionInterface`                              |
| `ng-zorro-antd/input`        | `NzInputGroupComponent#nzCompact`                        |
| `ng-zorro-antd/message`      | `NzMessageModule`                                        |
| `ng-zorro-antd/notification` | `NzNotificationModule`<br/>`NzNotificationServiceModule` |

The `exportAs` of components are updated to follow `camelCase` and start with `nz`, `exportAs` of internal components are removed. Changes can be seen as follow:

| Component                | Original               | Current                |
| ------------------------ | ---------------------- | ---------------------- |
| `calendar-footer`        | `calendarFooter`       | -                      |
| `date-helper`            | `dateHelper`           | -                      |
| `date-range-popup`       | `dateRangePopup`       | -                      |
| `date-table`             | `dateTable`            | -                      |
| `decade-helper`          | `decadeHelper`         | -                      |
| `decade-table`           | `decadeTable`          | -                      |
| `month-helper`           | `monthHelper`          | -                      |
| `month-table`            | `monthTable`           | -                      |
| `quarter-helper`         | `quarterHelper`        | -                      |
| `quarter-table`          | `quarterTable`         | -                      |
| `year-helper`            | `yearHelper`           | -                      |
| `year-table`             | `yearTable`            | -                      |
| `inner-popup`            | `innerPopup`           | -                      |
| `nz-color-block`         | `NzColorBlock`         | `nzColorBlock`         |
| `nz-color-format`        | `NzColorFormat`        | `nzColorFormat`        |
| `nz-color-picker`        | `NzColorPicker`        | `nzColorPicker`        |
| `nz-model-close`         | `NzModalCloseBuiltin`  | `nzModalCloseBuiltin`  |
| `nz-model-footer`        | `NzModalFooterBuiltin` | `nzModalFooterBuiltin` |
| `nz-model-title`         | `NzModalTitleBuiltin`  | `nzModalTitleBuiltin`  |
| `nz-tree-drop-indicator` | `NzTreeDropIndicator`  | `nzTreeDropIndicator`  |
| `nz-water-mark`          | `NzWaterMark`          | `nzWaterMark`          |
| `nz-tabs`                | `nzTabset`             | `nzTabs`               |

### Deprecations

The following APIs are marked as **deprecated** in v20 and will be removed in the next major version.
Please refer to related documentation for better alternatives.

| Module                         | API                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `ng-zorro-antd/autocomplete`   | `NZ_AUTOCOMPLETE_VALUE_ACCESSOR` <br /> `getNzAutocompleteMissingPanelError` |
| `ng-zorro-antd/button`         | `NzButtonGroupComponent`                                                     |
| `ng-zorro-antd/core/form`      | `NzFormPatchModule`                                                          |
| `ng-zorro-antd/core/highlight` | `NzHighlightModule`                                                          |
| `ng-zorro-antd/checkbox`       | `NzCheckBoxOptionInterface`                                                  |
| `ng-zorro-antd/input`          | `NzInputGroupComponent#nzCompact`                                            |
| `ng-zorro-antd/mention`        | `NZ_MENTION_TRIGGER_ACCESSOR`                                                |
| `ng-zorro-antd/message`        | `NzMessageModule`                                                            |
| `ng-zorro-antd/notification`   | `NzNotificationModule`<br/>`NzNotificationServiceModule`                     |
| `ng-zorro-antd/tabs`           | `NzTabsetComponent`                                                          |

## 19.3.1

`2025-05-29`

### Bug Fixes

- **cascader:** cannot update value when it is missing in options ([#9124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9124)) ([689fc72](https://github.com/NG-ZORRO/ng-zorro-antd/commit/689fc72e5c8175c830f995155daf1d7d4c318c25))
- **date-picker:** update input value when nzFormat changed ([#9129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9129)) ([f4c4e05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f4c4e05264dd3109a0c45018886603ddd9c45aa2))
- **tabs:** `nzLinkRouter` not work for the first time load ([#9130](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9130)) ([925a6a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/925a6a54dd477b687b3dd0b836c32cb17e6d8a0f))

## 19.3.0

`2025-05-23`

### Features

- **avatar:** support custom icon by ng-content ([#9090](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9090)) ([89d0767](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89d076775b542996c46e48d2fb6f49c5981be40b))
- **input-number:** add `nzBlur` and `nzFocus` output ([#9098](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9098)) ([1b1a013](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1b1a0130df4a86fb2abd42d95213d880fd0b14d7))
- **tabs:** support for start and end extra content ([#9097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9097)) ([2500821](https://github.com/NG-ZORRO/ng-zorro-antd/commit/250082160770d7f24404bbed86af5df96b9f3e53))
- **transfer:** support multiple row selection with `Shift` key ([#9092](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9092)) ([b78b99f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b78b99f9f4cec6298cffc915b8ab86f708dccddf))

### Bug Fixes

- **i18n:** add missing translations to `es_ES` ([#9127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9127)) ([0aadfdf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0aadfdf39682bd779eabae57e02596fd0f730624))
- **segmented:** fix emitting unnecessary value changed events ([#9125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9125)) ([fb0635b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb0635b0dc2fed0f28d60248b60b0ecd5e3294d4))
- **tabs:** `nzLinkRouter` not work for the first time ([#9118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9118)) ([0f7f94d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0f7f94dab24175b28f34720f5c98e7dc9a2c6c88))

### Performance Improvements

- **transfer:** use item.key as tracking for the list render ([#9123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9123)) ([adb91e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/adb91e4ba0cbcfc72cccb26a66580fa19dc9c8aa))

## 19.2.2

`2025-04-25`

### Bug Fixes

- **input-number:** fix `NG0600` error ([#9106](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9106)) ([9f5b525](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f5b525e5eb5e50ed4f93ed15b6831d7db3483ee))
- **checkbox:** fix `NG0600` error ([#9105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9105)) ([61b6886](https://github.com/NG-ZORRO/ng-zorro-antd/commit/61b68861a6215e40bd29e14d2fe2bc02ce112ce0))
- **checkbox:** fix type of `nzOptions` ([#9099](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9099)) ([7be2fe5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7be2fe5412aa00b9178dcae49f202b21a1b7e9e8))
- **select:** limit number of pasted item to `nzMaxMultipleCount` ([#9080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9080)) ([3714840](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3714840a8a72d4d7809a2cac339dd3891052225d))

## 19.2.1

`2025-03-29`

### Bug Fixes

- **select:** remove internal comment from select-arrow ([#9074](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9074)) ([c9b2dd9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9b2dd96db78ff257137b7a2cba79bbf70f64d3e))

## 19.2.0

`2025-03-28`

### Features

- **splitter:** add splitter component ([#8987](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8987)) ([9b3f62e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b3f62e088f3d0953f236910df00175edf07e26e))
- **page-header:** disable back button if no history ([#9041](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9041)) ([bb48232](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb482328637829b91443075dddaaaef74b85cda8))

### Documentation

- **tabs:** add draggable tabs [showcase](https://ng.ant.design/components/tabs/en#components-tabs-demo-card-draggable) via CDK `DragDropModule`

### Bug Fixes

- **input-number:** consider input value ends with 0 as incomplete ([#9051](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9051)) ([2a0c2e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a0c2e08bcec7577558bf2578adf7710a5235a38))
- **segmented:** fix error with the FormControl first change ([#9039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9039)) ([33fe53d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/33fe53de16bbafd234fa369f677355349d24860a))
- **select:** disable `nzMaxMultipleCount` in default mode ([#9068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9068)) ([dcf8a5d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcf8a5d35785d5a4b282719601c0b226e67543bc))
- **select:** ngModel change should update state of `nzMaxMultipleCount` reached ([#9056](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9056)) ([d7031da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d7031dada3f24cf9c7e48a2eb09678d44caaf9b1))
- **space:** nzSpaceItem margin in rtl ([#7801](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7801)) ([2d9ff5f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d9ff5f0735afc4f4ae03e9f85ae4a8062c21f1a))
- **tabs:** update active router tab after tabs changed ([#7649](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7649)) ([1f07121](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f07121c3c8521036b011a6f71e1859f70cfe429))
- **tree-select:** enable overflow-x for virtual scroll ([#9045](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9045)) ([e70cae3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e70cae3c7cbd47c82d575a49e1dc6a31faa5912d))

## 19.1.0

`2025-02-21`

### Features

- **check-list:** add check-list component ([#8969](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8969)) ([4cd298b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cd298bfdce3c96e47c91e689fbad16c36d72b60))
- **message,notification:** display `nzData` when content is a template ([#9001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9001)) ([5157470](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5157470dd7d890703e4b3a8db9909891da4932c0))
- **popover,popconfirm,tooltip:** `overlayClassName` supports space delimited classes string ([#8972](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8972)) ([3fcec91](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3fcec916b81a284fc8934846aab26d5b8ce99a1b))
- **popover:** add `nzPopoverOverlayClickable` to disable click on mask ([#8878](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8878)) ([5898da7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5898da718f2568cdb2a6dcc63b6e7e18ccb217aa))

### Bug Fixes

- **input-number,checkbox:** accept the disabled change from ng control ([#8979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8979)) ([2d8968d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d8968d4709aee858634274d22196ecbbfbe8764))
- **input-number:** use input event instead of change event ([#8989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8989)) ([6d8d915](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d8d91521a6d4315b6a01fc173e3ed8df8bdecf0))
- **tree-select:** fix error when judging multiple instances condition ([#9008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9008)) ([5006ea6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5006ea695430c3c0f127f04c3a9bcf6dfd6c1a29))

### Code Refactoring

- use ECMAScript standard class field ([#8718](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8718)) ([f1d8d92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1d8d926b48a798489f54d4f3da6eec0f90f9955))
- enable isolatedModules compiler option ([#8970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8970)) ([0d42aa7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d42aa7d4605c881c242e245b8127629e9657e39))

Now feel free to use `isolatedModules` compiler option in your project.

## 19.0.2

`2025-01-10`

### Bug Fixes

- **auto-complete:** should open the popover when the focused input is clicked ([#8900](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8900)) ([79cc2f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79cc2f830133dfe0ee99eaabdb7b5b5f1eca2e02))
- **progress:** fix `NG0956` error ([#8962](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8962)) ([c4d2f81](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4d2f81f125feca0ce5ad90e12997875b4465230))
- **transfer:** correctly set the transfer-list-body class ([#8960](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8960)) ([a3546a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a3546a9032dcc8fbbd72088e4a431e83b99b32f1))

## 19.0.1

`2025-01-03`

### Bug Fixes

- **date-picker:** cell title should reflect `nzFormat` ([#8744](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8744)) ([1b7ab5a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1b7ab5adb5af783e3a6a47ffc4916961993f4d6f))
- **i18n:** add missing translations to `zh_TW` ([#8950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8950)) ([9607e11](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9607e1161244b441badb2c37093c4f44a2d63695))
- **input-number:** fix `NG0600` error ([#8955](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8955)) ([8d6135e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d6135e65a6aa716678b9485e3e7790182d160b1))
- **table:** should col be wrapped within colgroup in ssr mode ([#8948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8948)) ([0a73deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a73deb053d2d9ab8d8194038355fad898b60759))

## 19.0.0

`2024-12-06`

### Bug Fixes

- **autocomplete:** remove inline style (CSP compliant) ([#8875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8875)) ([30c25f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30c25f0201130ccb00c8d2ba2e709763d7bcfd6e))
- **avatar:** calculate size at the right time ([#8754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8754)) ([3a5ba37](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a5ba37de6553c5973ac1741a250dff957ca7ec5))
- **card:** remove `nzBorderless` input ([#8741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8741)) ([22ce17c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22ce17c8a4bb7345cf026fd570bc8d3984722815))
- **carousel:** carousel not working correctly in rtl mode ([#8770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8770)) ([0202a19](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0202a191b3259e3dc454272b53feb3687a32cf0a))
- **cascader:** correct menu display level ([#8866](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8866)) ([5fec53e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5fec53e597d50a26a1083bb1e726af885ba807ae))
- **drawer:** should clear previously focused element ([#8893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8893)) ([4498af0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4498af0f1a8c700099e82f4027bec30086f6d29a))
- **i18n:** add missing translations to `vi_VN` ([#8894](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8894)) ([f08ad1c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f08ad1cb0728d19655c8143658e6a44f8843cb4a))
- **tree-view:** `nzTreeNodePadding` not works in virtual scroll ([#8920](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8920)) ([82b660a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82b660ac55539e9cb2c39b399884f8bec4d028d4))

### Code Refactoring

- cancel support for HTML string rendering ([#8831](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8831)) ([5fae01a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5fae01ad4120841390f7ebb6267a043774ea2266))
- remove `ngClass` and `ngStyle` ([#8895](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8895)) ([c3ab3ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3ab3ba6ad50dc4a8f23b43872b3f235ee316f4c))
- **image:** remove deprecated `FADE_CLASS_NAME_MAP` and `IMAGE_PREVIEW_MASK_CLASS_NAME` ([#8912](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8912)) ([65223d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65223d9a595e78f8c73347c5d1b12a807389c434))
- **transfer,tree,tree-select** rename `CheckBox` to `Checkbox` ([#8934](https://github.com/NG-ZORRO/ng-zorro-antd/pull/8934)) ([c76433d5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c76433d5533f6d5c0467ee99c61877a0ec4d35ac))

### Features

- **cascader:** support multiple selection ([#8903](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8903)) ([e5dfb49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5dfb495dc4f9e5493e425aeab3802a13a0f5e28))
- **cascader:** support `nzPlacement` ([#8935](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8935)) ([6fbd22c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fbd22c5b38b78cc991bb61446acbea635f30797))
- **checkbox:** redesign the checkbox group component ([#8932](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8932)) ([489e0de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/489e0defbfeeb03c29562d139614451575f8ed8d))
- **divider:** add `nzVariant` option ([#8827](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8827)) ([2c63c87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c63c87f557e2400224566342a0185d212055004))
- **float-button:** add float-button component ([#7884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7884)) ([dab4d66](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dab4d669b3ef746d1761fbb2199c1b0ae704cda5))
- **icon:** support `nz-icon` tag selector ([#8778](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8778)) ([1406241](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1406241f2e636bb3bf11515b0ad68cbe0535d5e1))
- **image:** close image preview when escape key pressed ([#8809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8809)) ([d587615](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d587615c7dd8d911af06551181f1bffb6eb67149))
- **input:** support one time password (OTP) ([#8715](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8715)) ([cdbaf4d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdbaf4de291f380cfcfdf6788d24da3e344175a9))
- **menu:** add `nzTriggerSubMenuAction` to support click trigger for submenu ([#8461](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8461)) ([860df87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/860df87a1be62f462ac3ea136d53948ccd69213a))
- **qrcode:** add `nzStatusRender` to support customize state rendering ([#8714](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8714)) ([6f36d75](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f36d75741e301bc3e7634a93c106c48a02c0a1b))
- **segmented:** redesign the segmented component ([#8753](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8753)) ([4dc866c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4dc866cb2fcc7afb4cc309f433c216d1b7cba2e1))
- **space:** add space compact component ([#8755](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8755)) ([b9c511d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b9c511db0b1b28521e23148a6fce5b1f169f99a2))
- **table:** add `nzSortDirections` to global config ([#6613](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6613)) ([#8721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8721)) ([eb1fdc5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb1fdc5037d9122a237e317e5b93857deb51e5d5))
- **transfer:** add `nzOneWay` to support one way style ([#8717](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8717)) ([99fd4de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/99fd4de95b2a5a44a2837af38d31ddcabf0a60bf))
- **input-number:** redesign the input-number ([#8901](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8901)) ([df55d88](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df55d8882c9f36bc6a0cd8a4d752e03070658ff7))
- **schematics:** add v19 ng update migration ([#8911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8911)) ([1a20de2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a20de223bc6e214b54f741f42ed8260611b9b67))

### BREAKING CHANGES

- **All**
  - `nzClass` / `nzStyle` input properties no longer support the following features:
    - `Set()`: use arrays instead
    - Keys which multiple styles/classes separated with keys: split a key with spaces into multiple keys
  - Cancel support for HTML string rendering
  - Migrate `@WithConfig` to standard decorator. If you're using `@WithConfig` in your library, please turn `experimentalDecorators` off in `tsconfig.json`
  - Migrate `[nz-icon]` to `nz-icon` tag. If you're using `[nz-icon]` selector in stylesheet to select icon **inside** zorro component, please use `nz-icon` instead

- **input-number:** Redesign the input-number so that it will be much simpler and more flexible.

  Now you can use affixes or addons as follows, no need for `ng-template` and `nz-input-number-group`:

  ```html
  <!-- Custom handler icons -->
  <nz-input-number>
    <nz-icon nzInputNumberUpIcon />
    <nz-icon nzInputNumberDownIcon />
  </nz-input-number>

  <!-- With affixes -->
  <nz-input-number>
    <span nzInputPrefix>Prefix</span>
    <span nzInputSuffix>Suffix</span>
  </nz-input-number>

  <!-- With addons -->
  <nz-input-number>
    <span nzInputAddonBefore>Before</span>
    <span nzInputAddonAfter>After</span>
  </nz-input-number>
  ```

  The old input-number component is marked as **deprecated**, and its entrypoint had changed to `ng-zorro-antd/input-number-legacy`.
  `NzInputNumberComponent` is now `NzInputNumberLegacyComponent`, and `NzInputNumberModule` is now `NzInputNumberLegacyModule`.

  Don't worry, `ng update ng-zorro-antd` will automatically do the migration.

- **cascader:** Cancel support for writing value with `NzCascaderOption[]` type.

  In the past, the cascader component kept a trick that if you wrote value with `NzCascaderOption[]` type, it extracted value by mapping each item to its value property, for example:

  ```ts
  @Component({
    template: `<nz-cascader [nzOptions]="options" [ngModel]="value"></nz-cascader>`
  })
  export class ExampleComponent {
    value = [{ label: 'NG ZORRO', value: 'ng-zorro-antd' }];
  }
  ```

  then the value of cascader would be `'ng-zorro-antd'`.
  It's strange that the input and output values don't match when we haven't changed the values, and it's hard to maintain. We expect that the value passed in should be the value in the list of options.

  In v19, this trick is removed and if you're already using this trick in your code, please consider the add a `map` function to pass the actual value.

- **checkbox** Redesign the checkbox group component.
  - Remove `NzCheckBoxOptionInterface['checked]` field. By the way, `NzCheckBoxOptionInterface` is marked as deprecated, use `NzCheckboxOption` instead
  - `nz-checkbox-group`: Type of `ngModel` is changed from `NzCheckBoxOptionInterface[]` to `NzCheckboxOption['value'][]`

- **card:** Remove redundant `nzBorderless` input property. Use `nzBordered` instead.
- **image:** Remove deprecated `FADE_CLASS_NAME_MAP` and `IMAGE_PREVIEW_MASK_CLASS_NAME`
- **pipes:** Remove deprecated `NzSafeNullPipe`
- **segmented:** Redesign the segmented component.
  - Value of `ngModel` is changed from `index` to option's value
  - Change emission type of `nzValueChange` from `number` to option's value type (`string | number`)
  - Remove `nzLabelTemplate`, use `nz-segmented-item` directive instead
- **space:** Rename `exportAs` of `NzSpaceComponent` from `NzSpace` to standard `nzSpace`
- **transfer:** Rename `nzTreeCheckBoxChange` to `nzTreeCheckboxChange`
- **tree,tree-select:** Rename `nzCheckBoxChange` to `nzCheckboxChange`

### Deprecations

The following APIs are marked as **deprecated** in v19 and will be removed in the next major version.
Please refer to related documentation for better alternatives.

| Module                              | API                                                      |
| ----------------------------------- | -------------------------------------------------------- |
| `ng-zorro-antd/button`              | `NzButtonGroupComponent`                                 |
| `ng-zorro-antd/core/form`           | `NzFormPatchModule`                                      |
| `ng-zorro-antd/checkbox`            | `NzCheckboxWrapperComponent`                             |
| `ng-zorro-antd/input`               | `NzInputGroupComponent#nzCompact`                        |
| `ng-zorro-antd/input-number-legacy` | `*`                                                      |
| `ng-zorro-antd/message`             | `NzMessageModule`                                        |
| `ng-zorro-antd/notification`        | `NzNotificationModule`<br/>`NzNotificationServiceModule` |

## 18.2.1

`2024-11-15`

### Bug Fixes

- **anchor:** fix `a` tag problem with `null` or `undefined` value if TemplateRef provided ([#8864](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8864)) ([41f6609](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41f66095fdaee05d8bfdae13e8ec18a63cee1f2c))
- **color-picker:** remove inline style (CSP compliant) ([#8874](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8874)) ([0264da9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0264da98babca9f14a2c69ccb019944aa4e9f88f))
- **image:** remove inline style (CSP compliant) ([#8876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8876)) ([63c8953](https://github.com/NG-ZORRO/ng-zorro-antd/commit/63c895329a78575654994b607fa822f5735166f4))
- **qrcode:** remove event listeners once settled ([#8861](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8861)) ([40d466d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40d466dab751c51b8cecb97dc974a1d17a7692e6))
- **select:** remove inline style (CSP compliant) ([#8873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8873)) ([9431d0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9431d0d9e54c76271f7dc13c9833c29bf4e7dc13))
- **transfer:** cancel selecting all should emit `nzSelectChange` event ([#8872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8872)) ([5ff9821](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ff98216002da5c9fc23a9d9c8bd4d3b68495d51))
- **watermark:** cleanup event listeners once settled ([#8862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8862)) ([decd477](https://github.com/NG-ZORRO/ng-zorro-antd/commit/decd4772bdbfeb1a1397c2b597882503ca5685ad))

## 18.2.0

`2024-11-07`

### Bug Fixes

- **i18n:** add missing translations to `nb_NO` ([#8712](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8712)) ([8c9bcd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8c9bcd18867fca3778d42b844034a4d3370ebe3b))
- **i18n:** add missing translations to `hu_HU` ([#8769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8769)) ([9e21ae8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e21ae8c3c771ff3bce98a11c37f5c81c62f3402))
- **badge:** NG0955 warning in nz-badge-sup component ([#8858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8858)) ([cc52555](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc5255587edae6731d38f39786c701679c50020b))
- **select:** multiple select cause switch size flash when init ([#8851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8851)) ([d28876c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d28876cdae5bb1b4df3fda66ebdf6248e43f5a36))
- **carousel:** correctly switch slides in rtl mode ([#8705](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8705)) ([85f23a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85f23a1b768151a35637c054c7bf42cbf656268e))
- **drawer:** emit `nzVisibleChange` when close on navigation ([#8850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8850)) ([29827df](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29827dfe2346badc5178da71884bb4c3264a695d))
- **modal,drawer:** secondary overlays not scrolling inside ([#8804](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8804)) ([ed7951d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ed7951d2e95707c93e993dbb744382e6c9c7dee8))
- **modal:** remove dark backdrop when `nzMask` is false ([#8798](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8798)) ([f2f04fe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f2f04fe8971b23aba9ec5807414afe5ab6f27fc7))
- **transfer:** correctly set transfer button disable state ([#8824](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8824)) ([195ad26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/195ad260a8259129517ee18a208853b9e32c132d))

### Features

- **datepicker:** send event emitter when panel mode change ([#8685](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8685)) ([6462a47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6462a47538a4c7f00f180d82dc3567379277e4b3))
- **tabs:** support `destroyInactiveTabPane` ([#8845](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8845)) ([0de6d62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0de6d627cb9105d97b1aca827b1f89a8f3bdcec9))

## 18.1.1

`2024-08-20`

### Bug Fixes

- fix ngtypecheck reference issue caused by [@angular/compiler-cli#56945](https://github.com/angular/angular/issues/56945) ([#8699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8699)) ([8e459c1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e459c192cf5c4b1903a744c0548df800aa64bfc))
- **date-picker:** fix the NG0956 warning when recreating entire collection ([#8658](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8658)) ([70a0817](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70a0817cd8db49234726f160d9c2ae36f5c650b7))
- **grid:** fix the NG0955 warning in showcase ([#8679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8679)) ([6414c92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6414c924cdb013c0ffb96436dd89354e275fa544))
- **tree-select:** clear selected nodes when user set value ([#8693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8693)) ([91927bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91927bcede24a89ffc5ec4c814503547c86ad09e))

## 18.1.0

`2024-07-25`

### Bug Fixes

- **cascader:** hide placeholder when trigger `compositionstart` event ([#8641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8641)) ([17b0ea3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/17b0ea362021a458c18204f73c34c08695300e2a))
- **i18n:** add missing translations to `pt_BR` ([#7790](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7790)) ([6fc1c78](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fc1c78b4ca0d37bf5eb6e9e52f0fd150ca5855d))
- **i18n:** add scanned field to QRCode for `fr_BE`, `fr_CA`, `fr_FR` and `lv_LV` ([#8614](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8614)) ([9b69410](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b69410ce8f84fbd65e2f0dc627189403888d8f1))
- **schematics:** import missing `RouterLink` in template ([#8621](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8621)) ([032a0c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/032a0c2384434fc042674a60b005a5a479f6626a))
- **transfer:** disabling selection does not affect selecting all ([#8633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8633)) ([75d8c7b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/75d8c7b93310cd54677ac75f470b2967ebd092cb))

### Features

- **breadcrumb:** add `nzRouteFn` ([#6313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6313)) ([6d805c4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d805c44073297ea17742d43066c6b95e4af5ffe))
- **i18n:** add `en_AU` ([#7919](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7919)) ([c4e6c8d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4e6c8df3fe48ced3097f0f1347ddbbfde3fda9c))
- **icon:** add `provideNzIcons` and `provideNzIconPatchs` API ([#8650](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8650)) ([b22672d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b22672db7cbce362b14a3dad1ff3b3c45abed27f))
- **popconfirm:** support popconfirm template context ([#7989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7989)) ([6d27073](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d27073a52a96d17d8625a9d5d7b820984aa5000))
- **table:** support `nzSummary` ([#8639](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8639)) ([20bb5b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/20bb5b24c7d01d87f0d50c37248ddd862d9bf341))
- **table:** support `nzFixed` for `nzSummary` ([#8642](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8642)) ([bef12e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bef12e6218c53028f8907f2e917945ddc8283db5))
- **tree-select:** support TemplateRef type for `nzNotFoundContent` ([#8638](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8638)) ([13e8a45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/13e8a452c4a96f78d6cf900830ba4b585ed36735))

## 18.0.1

`2024-06-27`

### Bug Fixes

- **graph:** fix [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track function ([#8587](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8587)) ([7687ff2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7687ff2c907ee5ab262ee08240bc932b6112b1ae))
- **icon:** fix [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track function ([#8588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8588)) ([8a27bab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8a27babf30f7726113fed5511bfbd0067c0bbd37))
- **table:** fix [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track function ([#8593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8593)) ([b275063](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b2750630a0da3f415931cdf9ba6e6a618dd5d329))
- **pagination:** fix [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track function ([#8586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8586)) ([6bb95c0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6bb95c0905de9da1493590da2c6f76cc1b2a23bc))
- **i18n:** add missing german translations `de_DE` ([#8605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8605)) ([8d75378](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d75378ea612a0ab91f03ec1a709f88c2d22af21))
- **i18n:** add scanned field to QRCode `fa_IR` ([#8597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8597)) ([9c6e4bf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9c6e4bf6b65810b0f659a366d34b54528d55cc0f))
- **table:** missing no-result in fixed header table ([#8574](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8574)) ([6cff80e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6cff80e90788ce0b84b232a0fb67516b795c88b0))

## 18.0.0

`2024-06-06`

### ⚠ BREAKING CHANGES

- **collapse:** change nzExpandIconPosition type from `left` | `right` to `start` | `end` ([#8561](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8561)) ([3ad5674](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ad56749b0c8222b37444f27f81942fba4bc53e3))
- no longer use inline JavaScript in Less ([#8552](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8552)) ([7e873c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e873c863a1c8e9c053f64aca86bf9c7c9a11a21))

No need to wrap Less functions provided by antd (including `colorEasing`, `colorPalette`, `tinycolor`) with ~\`\` anymore.

```diff
- color(~`colorPalette('@{primary-color}', 5)`)
+ color(colorPalette('@{primary-color}', 5))
```

### Bug Fixes

- **cascader,select,time-picker,tooltip,tree-select:** take in account shadow dom when getting the target of an event ([#7853](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7853)) ([843b703](https://github.com/NG-ZORRO/ng-zorro-antd/commit/843b7035225df3d3a635a5ef8926d1e80f10ae18))
- **tooltip:** fix arrow color when custom color ([#8555](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8555)) ([92c586b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92c586b8f5e5fc0ec0e4cb2cc10b73a699b1555a))
- **upload:** prevent drop event for firefox only ([#8551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8551)) ([c6e7bd7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6e7bd7682a776a7ad3f34b589c9c473430e6baa))
- **rate:** half value when allow half is false ([#8536](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8536)) ([7742fe3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7742fe30b718aa19f2988f6354d982d439ad2c7b))

### Features

- **date-picker:** support quarter selection of date picker ([#8478](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8478)) ([3513889](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3513889367ef468b9e792698f85bb6b890edec86)), closes [#7818](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7818) [#7380](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7380)
- **qrcode:** qrcode supports scanned state ([#8447](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8447)) ([0be6178](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0be617854d1493a342c9354ce1156fcf323acc97))
- **rate:** emit hover change when leave ([#8448](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8448)) ([38dcc31](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38dcc3196c62369cd8061a9ead8ab20752e56a66))
- **statistic:** support for loading state ([#8537](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8537)) ([21c8b62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21c8b621f15d642c391253ca91c3b124227ca2d9))
- **table:** support setting virtual height when having no data ([#8457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8457)) ([724d841](https://github.com/NG-ZORRO/ng-zorro-antd/commit/724d841ebd88a329c59e2cfeee3f9625393c8372))

## 17.4.1

`2024-05-24`

### Bug Fixes

- **card:** use skeleton instead to card-loading-content ([#8528](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8528)) ([a36ebd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a36ebd329d042dad19733543ce96f459e4cc09d3))
- **color-picker:** avoid emitted twice nzOnChange event ([#8530](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8530)) ([5dea059](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5dea059202947caf5ef86f802f08ba14a0867288))
- **list:** static query list-item-action template ([#8527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8527)) ([85301e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85301e0267593457560c5cdcc7fb09ed38944d45))
- **popconfirm:** fix message icon style ([#8511](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8511)) ([4f1f9bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f1f9bba03f38d9ef4ee57380d61e5ca4188648c))
- **tooltip,popover,popconfirm:** fix hydration error ([#8512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8512)) ([5009ec0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5009ec0b3a6ff770186681bd4eb61ec662d9896e))

### Features

- **popconfirm:** popconfirm support for nzOkDisabled ([#8542](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8542)) ([8c247db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8c247dbda2b633d522c53113456600315192a792))

### Performance Improvements

- **back-top:** remove the redundant changeDetectorRef ([c1e39e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1e39e7bbc1f863c3a1d26a9cc9cc359b4054dc5))
- **qr-code:** improved background drawing efficiency ([#8543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8543)) ([db09bf7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/db09bf73e45d03817c89bba97e1f340cc09ed5d0))

## 17.4.0

`2024-04-19`

### Bug Fixes

- **autocomplete:** remove `NgZone` dependency ([#8462](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8462)) ([24bb1bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24bb1bc5959c0e617090f0459c39db00fd4e2d9a))
- **button:** add `ant-btn-default` class ([#8501](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8501)) ([1588199](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15881996f0a9b1e93b0c81843132ba5d7651e528))
- **calendar:** year dropdown update issue when date is changed programmatically ([#8286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8286)) ([ee68a2c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee68a2c90370a6e3a599fe9f914af20117d2faa6))
- **date-picker:** remove unsafe style ([#8458](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8458)) ([e6b83eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e6b83eb1881ece341b68f9048e9d3e5ea438ba19))
- **drawer:** remove inline style to resolve CSP issue ([#8065](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8065)) ([5e89441](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e89441c26a7df50d0feed746d5595cde2589a7a))
- **graph:** bring back the disappeared arrows of edge ([#8493](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8493)) ([342841c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/342841ceafddb1b74f55e31bfa9ca3e7734e842e))
- **graph:** remove `NgZone` dependency ([#8460](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8460)) ([a4ec21a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a4ec21a684b5c96a64bd66670c270533926252bb))
- **icon:** missing swap icon ([#8433](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8433)) ([f1a4050](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1a405042f84fbc96ed0587ea2e748dc7d468719))
- **image:** wrong next/prev btn in rtl mode ([#8468](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8468)) ([886138d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/886138d630965b9a0a89d1727f76fed81c6f9528))
- **list:** remove `NgZone` dependency ([#8439](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8439)) ([1ec0e76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ec0e7672eaba0890b145c706fcc0a75cb5c47f8))
- **notification:** `nzMaxStack` initial value error ([#8451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8451)) ([2c09162](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c0916265c00cdc026a55b3ab9d829c5e207cf31))
- **pagination:** add accessible name for `nz-pagination-item` ([#8476](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8476)) ([47ee143](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47ee14325910c154f1541ee2d5e97539ba9a4e52))
- **slider:** fix the style of markers in vertical mode ([#8494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8494)) ([9bcce6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9bcce6c969c0bef7bdf4526407b2dfc56b7ff660))
- **tag:** borderless style is invalid in default state ([#8495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8495)) ([b35e6d6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b35e6d6ba2422eb2c4725b2029a2f9c60720b697)), closes [#8492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8492)
- **typography:** remove `NgZone` dependency ([#8440](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8440)) ([af7fb5d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af7fb5d27254d26a284faaaa5b812b105f539e3f))
- **upload:** remove inline style to resolve CSP issue ([#8064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8064)) ([1ac84a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ac84a8428fe644362e0f733c9a151fa848cedbf))

### Features

- **modal:** supports masked layer response for each click ([#8429](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8429)) ([31b90fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31b90fa52232abe7b090f60797d4335329677c4c))
- **notification:** popup order adjustment ([#8450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8450)) ([742f14a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/742f14a93472772cbdd96ce89797dc4120c55330))
- **select:** support `nzOptionHeightPx` in global config ([#8504](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8504)) ([4efc5ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4efc5ab38f74ce07a769f57453b0da375c17ce5c)), closes [#8503](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8503)
- **skeleton:** support for square shape of skeleton button ([#8481](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8481)) ([af1483a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af1483a9be544bd41b8f2a4a4c8027425f22b925))

## 17.3.0

`2024-03-11`

### Bug Fixes

- **doc:** replaced link for monaco editor options ([#8393](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8393)) ([fdfc816](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdfc816e72938fce47bbdfe274de00ad4e89b242))
- **docs:** fix progress, code-editor docs error ([#8383](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8383)) ([407e76a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/407e76a21afb4e1677fc73e89df69b26789da2fd))
- **select:** issue with nzScrollToBottom while display scaling ([#8355](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8355)) ([bb0468e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb0468e9e95c7c00efd2a5655d0266ae1ce17368))
- **avatar:** avatar not re-scaling properly ([#8365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8365)) ([e7b1fa0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e7b1fa0d36b173934bda10f796efa0c6e17d66e5))
- **carousel:** not adapting to new size when resizing ([#8374](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8374)) ([6e1decb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e1decbc7507b07dbb28897f53c6cbcc6ca2eaa6))
- **cdk:** zIndex is not used properly when creating overlay ([#8373](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8373)) ([b932d65](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b932d65a546f0b2729249713fdaad41fefebb602))
- **i18n:** add missing pt texts ([#8426](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8426)) ([d575c53](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d575c53371f34053a7cd2b6a020a3da1005b708a))
- **i18n:** added missing translations to ja_JP ([#8290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8290)) ([662b730](https://github.com/NG-ZORRO/ng-zorro-antd/commit/662b73049f8ed8ae70caea573e809016607a795a))
- **i18n:** added missing translations to vi_VN ([#8295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8295)) ([987a799](https://github.com/NG-ZORRO/ng-zorro-antd/commit/987a799ab1ca5bfdcef162d322423b65fb64dfe6))
- **tabs:** slide indicator missing in small screens ([#8372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8372)) ([a0b08be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a0b08be73a77c0a0967f5a301fe8c7ebbfca103c))
- **tabs:** wrong cursor ([#8386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8386)) ([3dc1579](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dc1579805f1a867689160fede25fd005983ddf1))

### Features

- improve schematics ([#8411](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8411)) ([921f1c1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/921f1c18266ead602c2e2c627a171608507807d4))
- **anchor:** horizontal anchors ([#8342](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8342)) ([9cc44f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9cc44f8bdb55fbf2fcf4c8ce4da4fab1120245dc))
- **calendar:** custom header ([#8418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8418)) ([ec7ec35](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec7ec35573fc46ba01af1368087b5de0b13ab7c7))
- **color-picker:** built-in color-picker package ([#8428](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8428)) ([534fe62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/534fe6277287dd64730546d3d4cc0f1be90a211a))
- **drawer:** return componentRef when nzContent is a component ([#8339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8339)) ([f71162b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f71162bbbb30c7b362774b2bc170a0ffd1c0dcf7))
- **image:** now supports horizontal and vertical flip ([#8168](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8168)) ([e856515](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e856515888102b5a3583a2223372263a4bff1c50))
- **image:** zoom using mouse wheel ([#8180](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8180)) ([4235c29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4235c293c0abf889bba0bc31d2ba18cf5d41b51d))
- **modal:** draggable ([#8419](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8419)) ([ce33294](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ce332947c49e7e6dd02d9bb80eb2fe3f7beab3af))
- **modal:** expose componentRef nzContent ([#8389](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8389)) ([e53000e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e53000e8b52972cc73070a8781d276dc26ebca0b))
- **segmented:** now supports segmented with icon only ([#8368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8368)) ([e8dea7a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e8dea7a83e6f98e2486c4e3f894f86b646025c1c))
- **select:** select max tag count ([#8371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8371)) ([18b898e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/18b898e8c5201c6785e5060850d3597601c39401))

## 17.2.0

`2024-01-29`

### Bug Fixes

- **table:** add missing import to nz-table-inner-scroll ([#8328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8328)) ([936317e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/936317e6702e790f5f8827e074fe12fd55fbf0f3))
- **tree-select:** fix search box exception when Chinese search ([#8324](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8324)) ([aacd62b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aacd62b0beeac35b18829ae4e382626b655c7e05))
- pipeline job failed ([#8367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8367)) ([6024bcc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6024bcc7a9453976d0023fe7b455dc452ced8bd4))

### Features

- **color-picker:** make color picker standalone ([#8316](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8316)) ([b050474](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b05047433311fe60ee82d100467c896f2167d925))
- **tag:** borderless mode ([#8320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8320)) ([e428083](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e428083537c8c25d463980749f63b1b8ab129057))
- **timeline:** allow custom color ([#8335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8335)) ([66a88db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/66a88dbbb1cdd26ee9411de2394fd2231a2807f0))

## 17.1.0

`2023-12-17`

### Bug Fixes

- fix logic for generating directive tags ([#8171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8171)) ([e37eab2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e37eab2be160a0db8154a2074c836782caa8cda3))
- **calendar:** style radio button not apply ([#8298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8298)) ([996e141](https://github.com/NG-ZORRO/ng-zorro-antd/commit/996e141042470e487d915d38477ad51928d3e2a0))
- **core:** warning cron parser common js dependencies ([#8277](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8277)) ([138d666](https://github.com/NG-ZORRO/ng-zorro-antd/commit/138d666e0527dba2f3f5ac43b05ce4810fffe9f7))
- **cron-expression:** output type error ([#8189](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8189)) ([ad02381](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad02381cfc4643b191caab7e056fd1a93086a45e)), closes [#8188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8188)
- **select:** input clear when nzAutoClear ([#8167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8167)) ([fefcb68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fefcb68dc9831eb2208746b3fe44346f80f8202f))
- **tabs:** aria controls have wrong value ([#8237](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8237)) ([d9a2d27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9a2d27be30e9bfc635d8ac3d0e31538f6092b1c))
- **tooltip:** color of the tooltip arrow does not change ([#8192](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8192)) ([bc344ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc344edc3dca8cdf777bf986130eeae5c3543f63))

### Features

- **alert:** support standalone component ([#8182](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8182)) ([167bed0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/167bed0350400a4a69f727c62237953b71831f26))
- **anchor:** support standalone component ([#8185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8185)) ([03cda21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/03cda216f2d0f1b31e365d6cb30a309309cbc868))
- **autocomplete:** support standalone component ([#8193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8193)) ([548e842](https://github.com/NG-ZORRO/ng-zorro-antd/commit/548e842c00d74fc4f8a8c9b69587bc14fdd9aecf))
- **avatar:** support standalone component ([#8194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8194)) ([4e2cb74](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4e2cb748b1c13ba1176b93f547fda10a188fec95))
- **back-top:** support standalone component ([#8195](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8195)) ([db5d5f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/db5d5f4d02531665e2a88dc114545ab225e61673))
- **badge:** support standalone component ([#8201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8201)) ([3d1427f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d1427f60f450c9193669a39ef632017fa33c4f6))
- **breadcrumb:** support standalone component ([#8202](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8202)) ([165f171](https://github.com/NG-ZORRO/ng-zorro-antd/commit/165f171dd51cff29ac3e02f046bf2966c4ad9aa0))
- **button:** support standalone component ([#8275](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8275)) ([3c09507](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c09507c2c50f67e4f500c4f08a15617ae8e42bc))
- **calendar:** support standalone component ([#8274](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8274)) ([80d68a3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80d68a31d65dd1d5505a1b96f3e02e6ea45e000b))
- **card:** component support standalone ([#8273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8273)) ([0902a4b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0902a4b2b3c3ad0a8bf1740c67bf94194212af7c))
- **carousel:** support standalone component ([#8272](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8272)) ([e4244fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e4244fb7891eed2f21253e922317eae3b8469a3a))
- **cascader:** support standalone component ([#8271](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8271)) ([3ab6e5b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ab6e5bafbb007a5929f347fb81ca83761e4e074))
- **cdk:** support standalone component ([#8270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8270)) ([d66bcba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d66bcbad09552c3f86401948710d417bb39fd68f))
- **checkbox:** support standalone component ([#8269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8269)) ([1491fb3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1491fb3523ab4cd4b4ff498d37669dd9407e1638))
- **code-editor:** support standalone component ([#8268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8268)) ([24547c6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24547c61858d0656a71c943a67395cffdfa05881))
- **collapse:** support standalone component ([#8267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8267)) ([dc43fa5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dc43fa5c189d8b6d09f661e52e10e955d873c264))
- **color-picker:** disable alpha ([#8178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8178)) ([0bebd6a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bebd6a696cc29c179758951f706fd276a1dae89))
- **comment:** support standalone component ([#8266](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8266)) ([5af11ea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5af11ea0232c90d74607c9e4a9ffb053d0f0950c))
- **core:** make no-animation standalone ([#8257](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8257)) ([de579bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de579bca2112bd9691429eee6144c09bb16d3b2b))
- **core:** support standalone component ([#8265](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8265)) ([c51e8da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c51e8daf1ba09646cf7c043756fd14274483c641))
- **cron-expression:** support standalone component ([#8264](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8264)) ([ae6ceeb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ae6ceeb560f86ead21d6c9ce9a53f435c52f9944))
- **date-picker:** support standalone component ([#8263](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8263)) ([ac48fba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac48fba4c6e591db03e41ab427b317c1868f8071))
- **description:** support standalone component ([#8262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8262)) ([128f4c0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/128f4c0055fd1150520509e1fa6bddbc74c65b85))
- **divider:** support standalone component ([#8258](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8258)) ([3a7cd50](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a7cd50e092ad712b66243fa5c2c582f169e658c))
- **drawer:** support standalone component ([#8256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8256)) ([2fbe4c0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2fbe4c0eb221f833fbb0d0801ce546a3c0300555))
- **dropdown:** support standalone component [#8254](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8254) ([#8255](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8255)) ([c5df26f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5df26f2ba94f00d80b66c24bf98b09e5f162081))
- **empty:** support standalone component ([#8254](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8254)) ([15636d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15636d2c530f294e3b217e4150be70a5f050bccf))
- **experimental-image:** support standalone component ([#8253](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8253)) ([7325781](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7325781367998543680af043bd19b911c3ac67e7))
- **flex:** add flex component ([#8145](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8145)) ([f8fedfc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f8fedfc88957a449de2a9960605d3528848f9caa))
- **form:** support standalone component ([#8252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8252)) ([e742e39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e742e399e2e870f7079f183f800d0d2023b8447d))
- **graph:** support standalone component ([#8251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8251)) ([d2f1d30](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d2f1d30fe7925205b79d7da4462a33a496fd94bf))
- **grid:** support standalone component ([#8250](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8250)) ([208652c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/208652c1ffd98ef8ea8e52b69d9376aaafeb390a))
- **i18n:** support standalone component ([#8249](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8249)) ([a91cac7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a91cac7e1bbd4379b9498d705a9b6fa1a00e4cd8))
- **icon:** support standalone component ([#8248](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8248)) ([b0dbfbc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b0dbfbca5452b54ed7c8c4c0b6d1aa2ae0512a34))
- **image:** support standalone component ([#8200](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8200)) ([63b8777](https://github.com/NG-ZORRO/ng-zorro-antd/commit/63b8777645fe93f587e7b09c5ea9d6efbd497b87))
- **input-number:** support standalone component ([#8246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8246)) ([6210fa0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6210fa0b571dd3d0a6b1069bcddd4ad44c3d6104))
- **input:** support standalone component ([#8247](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8247)) ([0a7028c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a7028c27c2018039b771cdfccd8cc0654e2a97a))
- **layout:** support standalone component ([#8245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8245)) ([d21f8a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d21f8a10876d222160c5e60d467283562b21f087))
- **list:** support standalone component ([#8244](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8244)) ([1f3010f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f3010fccc0c6bfe8e6b0149152794e3e2371a9a))
- **mention:** support standalone component ([#8243](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8243)) ([adc5e94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/adc5e94cdd7dfc75800808a046861bc9943dd548))
- **menu:** support standalone component ([#8242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8242)) ([4673926](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4673926a581b532470062f7cd5672a176638f111))
- **message:** support standalone component ([#8241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8241)) ([c2120b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2120b2fad4b1ce30d496c75db27cf08d648ef8c))
- **modal:** support standalone component ([#8240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8240)) ([387d664](https://github.com/NG-ZORRO/ng-zorro-antd/commit/387d66434cad9b117cf3a5f54c75bc2eeab1f69f))
- **notification:** support standalone component ([#8236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8236)) ([686b6b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/686b6b0d1183a15e69ba59b777d3d3078bacd1af))
- **page-header:** support standalone component ([#8235](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8235)) ([aa91486](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa91486c5ec9ffe26a2aef62800793c909e4349f))
- **pagination:** support standalone component ([#8234](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8234)) ([0f1690c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0f1690c89de63bc479653f4d3514a06f5d19a5f7))
- **pipes:** make the css-unit pipe support more units ([#8260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8260)) ([5e611e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e611e7d51a8cad3697a381612225b0d12879d55))
- **pipes:** support standalone component ([#8233](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8233)) ([319381a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/319381a443b7cbb64053d7d30f12d501b0221bcb))
- **pop-confirm:** support standalone component ([#8232](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8232)) ([9d656b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d656b2c9bde26bf4bb600ad5eff5fa0f3035804))
- **popover:** support standalone component ([#8231](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8231)) ([f7468e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f7468e212533d21655a7c74ab1efcf320facfc07))
- **progress:** support standalone component ([#8230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8230)) ([7022471](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7022471052e562a72e741abf5e9b9597f6437d2c))
- **qr-code:** support standalone component ([#8228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8228)) ([769f74c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/769f74c9323db91251c191151d48283be64781a8))
- **radio:** support standalone component ([#8227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8227)) ([b62ac64](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b62ac6471b7038db01ebfbb9efd597eae0b8517f))
- **rate:** support standalone component ([#8226](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8226)) ([90edba6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90edba69d11b82c5b31e91af8da34174b71c6fb8))
- **resizable:** support standalone component ([#8225](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8225)) ([ff14ed0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff14ed0e4a5ae6562a71459e407863bd9f84a1ca))
- **result:** support standalone component ([#8224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8224)) ([572965d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/572965d3b61045a01cb8fc14a132a5c0aa8574ec))
- **segmented:** support standalone component ([#8223](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8223)) ([86a49d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/86a49d277b8c8e66bd310d920c43b1e801c2d31c))
- **select:** support standalone component ([#8222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8222)) ([ed0de77](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ed0de779cfe63f1ca68b4b8dedbba40a5ad59e95))
- **skeleton:** support standalone component ([#8220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8220)) ([a2858d3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a2858d3bb10e87e472e4f917176172f283d46352))
- **slider:** support standalone component ([#8219](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8219)) ([428c53c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/428c53c6361c5f9afe79ee147a28635c010fea4c))
- **space:** support standalone component ([#8218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8218)) ([a84ddef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a84ddeff5582426a3dd608cab567245898be60c7))
- **spin:** support standalone component ([#8217](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8217)) ([cd23e33](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd23e3355d1f8828d93a7d3e331f20180ada4bef))
- **statistics:** support standalone component ([#8216](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8216)) ([186ef60](https://github.com/NG-ZORRO/ng-zorro-antd/commit/186ef6049cae90e10a2c3f66186cf856f5b9abb2))
- **steps:** support standalone component ([#8215](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8215)) ([dbb6fcb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dbb6fcb952366f200673bcec8e28097844370869))
- **switch:** support standalone component ([#8214](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8214)) ([3f6a9ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f6a9ed0a04ba93b97dedcb4b5625d3b79828c32))
- **table:** support standalone component ([#8276](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8276)) ([5765ae9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5765ae93f1adf304020697fc84a1984ef54f9a1b))
- **tab:** support standalone component ([#8213](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8213)) ([69dd31a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69dd31ac275f6251b22f7af9aef4ea78fd278adf))
- **tag:** support standalone component ([#8212](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8212)) ([15af7c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15af7c8956ed4c8f11f637446d0285b5a52339f1))
- **time-picker:** support standalone component ([#8211](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8211)) ([641ebb2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/641ebb2d8072fa343c9275222be8c4a23f8fceb4))
- **timeline:** support standalone component ([#8210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8210)) ([b7c6859](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7c685913abb14133955dfc81678207ec3e64aff))
- **tooltip:** support standalone component ([#8209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8209)) ([125768c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/125768c16f3c5030373058d120c05141208ec42c))
- **transfer:** support standalone component ([#8208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8208)) ([960144e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/960144e5f5a076fe8c7ad56a48ba97e147bc430b))
- **tree-select:** support standalone component ([#8206](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8206)) ([64ec76a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64ec76a2440c7befeaeb8409f84801fd8483af47))
- **tree-view:** support standalone component ([#8205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8205)) ([d4426fc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d4426fc6675515ddd1db54be84731d1ba44b52b8))
- **tree:** support standalone component ([#8207](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8207)) ([b9cf3b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b9cf3b03d8c51fcfd809dd8d4424aae70ff77094))
- **typography:** support standalone component ([#8204](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8204)) ([d7e387f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d7e387fa707f3a8473225187e660459498d97ca2))
- **upload:** support standalone component ([#8203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8203)) ([7cd08ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7cd08ae3b6d7ff0e252eb237a60288930f73c15d))
- **water-mark:** nzWaterMark is a block element && standalone ([#8197](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8197)) ([e4d6082](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e4d608274e0b56acf9b720cf519d757c660c125e)), closes [#8187](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8187)

## 17.0.1

`2023-11-20`

### Bug Fixes

- **schematics:** cannot generate files and add default builders ([#8176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8176)) ([de8a6b7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de8a6b782d16f906198d6d6ba512059b8dcb463c))

## 17.0.0

`2023-11-19`

### Bug Fixes

- **autocomplete:** fix the wrong value of internal nz-auto-option ([#7907](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7907)) ([0a312e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a312e3203db13cba6e4ebd6dc4c53e3c09ac206))
- **cron-expression:** exception error & cancel format prompt copy ([#8114](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8114)) ([ea69790](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ea697909231753e438b2ba07d4ec15c255f3a5dc))
- **form:** wrong element to focus when clicking label ([#8135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8135)) ([b3d135f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b3d135fc512a016430426a36330c0f527234f4e4))
- **i18n:** added missing translations to pl_PL ([#7950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7950)) ([7819426](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7819426f9ff3a110e06aa9cb47e7396edcfc18d7))
- **i18n:** update fa_IR translations ([#8143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8143)) ([4f63198](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f63198aae7441fe94de64e1740d1f2429a629c1))
- **i18n:** Update fr/be/ca translations ([#8137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8137)) ([211db31](https://github.com/NG-ZORRO/ng-zorro-antd/commit/211db31202ea7b099405aecaa5273461bbc26ef4))
- **mention:** page not loading entirely ([#8146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8146)) ([9505c7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9505c7c4aa222d36e63597b128f01ab0ba3e934a))
- **resizable:** fix pointer capture bug ([#8169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8169)) ([a0b8a0b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a0b8a0baba0259552a8d0e9eae442daa99027f24))
- **select:** do not run tick when scrolling to activated value ([#8159](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8159)) ([7ce50b3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ce50b3494d01bedbfdd8413dc8ef36ef836e377))
- **slider:** step can not click the problem ([#7820](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7820)) ([1e1c753](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e1c753b04e5c01cc61589d16048815ec9f4b9c5))
- **table:** custom column styles collapse when using nzScroll ([#8044](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8044)) ([fde48f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fde48f9c8a5e934fe32f421d627960dbeb5615ef))
- **tree-select:** 修复回显顺序问题 ([#8108](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8108)) ([eb4077d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb4077df104743fd7ccdc44307c2dc8aa5dbbbca))
- **tree:** nzCheckBoxChange never emitting ([#8038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8038)) ([a9dc205](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9dc2052930b7f6694d5933a86fc3b488b7bd786))

### Features

- **affix:** support standalone component ([#8037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8037)) ([583883c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/583883c0623d640bbea2d04b3a76896d08a68d4c))
- **hash-code:** add HashCode component ([#8111](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8111)) ([0254ee2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0254ee2e673d8ac8cff42a2aef2933367f8b0931))
- **image:** add scale step ([#8163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8163)) ([5aa4db9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5aa4db9f3b429e1f973a75f65cdd8b107586634d))
- **notification:** support for more custom templates ([#8046](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8046)) ([9689c42](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9689c4298e57d67eb340140c8924d4743f07bd04))
- **schematics:** support ng-add in standalone app ([#8095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8095)) ([c1b61f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1b61f720199ebfba0f48834b2ceaf93fed148d1))
- **slider:** add the ability to use a template ([#7505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7505)) ([7c79ab3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c79ab37a8c0b4bc47bf1873c167417f316c94a9))
- **table:** add `nzLabel` to include aria-label in checkboxes ([#7903](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7903)) ([5834e46](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5834e469291ee2a6975e4b74015468d7c1d739d2))
- **table:** nzExpand supports custom icon ([#7886](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7886)) ([1507ed0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1507ed0e2c1e869bd45925f2335ff1c4a3570430))
- **tooltip,popover,popconfirm:** make cdkConnectedOverlayPush open for tooltip ([#8166](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8166)) ([a821c62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a821c62c5a438ff24282230376b18cd0bfdbfc19))

## 16.2.2

`2023-10-23`

### Bug Fixes

- inline cdk-overlay style ([#8132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8132)) ([3209d74](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3209d744187133e518f564bfe5a2f56ac371fc22))
- **cascader:** compatible with rxjs v6 ([#8133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8133)) ([54a5c76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54a5c769a061bc07e342c1f462bf27c422df44a3))
- **drawer:** drawer not open ([#8120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8120)) ([24d0664](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24d06640a623f3ea2fd9fa459c729a103938d7fc))

## 16.2.1

`2023-10-19`

### Bug Fixes

- inline external css ([#8122](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8122)) ([42da190](https://github.com/NG-ZORRO/ng-zorro-antd/commit/42da1905a74b5a2049c045cef90d3c5cd595b8a3))
- **color-picker:** optimize demo copywriting and style ([#8088](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8088)) ([6d03099](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d03099e40364b85276db4c0163bae32c62bad73))
- **menu:** ellipsis menu title content if overflow ([#8055](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8055)) ([0674f78](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0674f785213ad914ad58fddc42e3083ff750f102))
- **tree-select:** fixed the bug that the back shortcut key can delete the bug when the node is disabled ([#8105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8105)) ([07a1f5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07a1f5e41d82ac59c9de744a3528c23e2b871624))

### Features

- **select:** support to customize `attr.title` of `nz-option-item` ([#8097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8097)) ([2ee261a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2ee261ac24f7ea0501d07ad35fcdb435714ffe9b))

## 16.2.0

`2023-09-18`

### Bug Fixes

- **list:** fix the bug that synchrone action item are not displayed in the item ([#7958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7958)) ([3b6bdec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3b6bdecef32ee4d9bb14491b617870733cfd9553))
- **tree:** fix nz-tree-node keep dragging class with nzBeforeDrop ([#8015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8015)) ([2d0b3f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d0b3f71490e38f8512285f81fcf3baa8f6eb4db))
- **button:** fix add class ant-btn-icon-only([#7631](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7631)) ([#7678](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7678)) ([7470ed6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7470ed66e1651d753fa43e197a4ab0d548744885))
- **cascader:** customize the option title to undefined ([#8011](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8011)) ([10003db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10003db77b9bda21772733c41b3c503ee85d5c81)), closes [#8006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8006)
- **core:** resolve CSP errors ([#8059](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8059)) ([295b333](https://github.com/NG-ZORRO/ng-zorro-antd/commit/295b333774990a420c39ba67912598dafd2f1842))
- **cron-expression:** clear console warnings ([#7926](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7926)) ([b358345](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b358345c14746501e47d7e73dffe41d32b9ab118))
- **date-picker:** fix code comment ([#7991](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7991)) ([8b6b653](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b6b653547d92a27079c27b3ef7e68df68a4f5fd))
- **i18n:** update zh_TW.ts ([#7901](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7901)) ([9bfce45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9bfce45a37a9c50aafbcaf96a8db9450bc2c5bf1))
- **message:** clean up DOM after usage ([#7965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7965)) ([71ead99](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71ead99aa781e50f3c896107f5b668b9a2cea767)), closes [#7772](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7772)
- **message:** fix the z-index of overlay ([#8081](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8081)) ([b1d2095](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1d20953eda23c9dcb4f74530621cf9cf1a33e45))
- **notification:** don't create new messageId for update ([#8000](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8000)) ([e240264](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e240264796dfd3a8692efcb92178688b78d0b69f))
- **qrcode:** optimize demo display and nzPadding value ([#8020](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8020)) ([078aaf9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/078aaf91335d2d9fa085d06a792ddd49c17948e0))
- **table:** remove empty space in custom columns ([#8022](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8022)) ([15e244c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15e244cc954cab1186d33006c7915f34d92e4d6d))
- **time-picker:** modelChange trigger twice ([#7902](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7902)) ([74c13a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74c13a49f92a263a05a34af63f6a2b71a554078e))
- **tree-view:** re-rendering fix ([#8035](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8035)) ([68cb4b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/68cb4b2d25d3bc149e4f8e80c030a16db75959c2))
- **tree:** remove console.log ([#8019](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8019)) ([fa0312a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa0312a4c68b26902ca28ed974754599b17b2d8a))
- **watermark:** removing the watermark fails to redraw ([#8012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8012)) ([030318e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/030318e82725d7650c98bf0ec06d2b23df16d9f0))
- **showcase:** ui bug in rtl mode inside the doc site ([#8063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8063)) ([d57b7da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d57b7dac5817cb1de9de9edda2343a6089854fff))

### Features

- add provide function ([#7952](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7952)) ([150c6ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/150c6cab4636fa9daa1e892d27b894c6b7381b35))
- **cascader:** support for load options with observable ([#8048](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8048)) ([1436f21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1436f212130041bec03d6f2d2d7f5591dff04b7a))
- **color-picker:** add color-picker component ([#8013](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8013)) ([8439704](https://github.com/NG-ZORRO/ng-zorro-antd/commit/843970459fdb18dfa0ddc861d02e6c21e87c12b4))
- **cron-expression:** add Unit Testing ([#7993](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7993)) ([605e969](https://github.com/NG-ZORRO/ng-zorro-antd/commit/605e969013cf48a29f4786765cf6c6da9f10643a))
- **cron-expression:** support nzDisabled && nzBorderless ([#7992](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7992)) ([6d31bde](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d31bde3ef1f43cc145d2009afcf90931e96a731))
- **dropdown:** close context menu on escape ([#7915](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7915)) ([6d0032e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d0032ededc140a017c01158ae76402a86c7b334))
- **dropdown:** improve `NzContextMenuService#create()` ([#7768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7768)) ([9b3e6cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b3e6cba852d4a782d15311c910b747a3bbc4d02))
- **form:** support form label wrap ([#7892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7892)) ([37391de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37391de29afdd3126dbbdcae6ca3ba2e637fd596))
- **input:** hide stepper for type number ([#8003](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8003)) ([0f3aed5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0f3aed599874e0d1c2786f2d14fec52128afbec8))
- **modal:** Remove nzComponentParams in v16 ([#7930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7930)) ([baab16c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baab16c497902f0cbf2668fb061ac8d40ffd18b2))
- **qrcode:** padding & background color for qrcode ([#8001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8001)) ([718ba29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/718ba2943c7c7e12c8526e52e8806955d3fb0504))
- **resizable:** add direction parameter in NzResizeEvent ([#7987](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7987)) ([4143473](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41434734ffe839f3ed71bd19486a5f76adc20463))
- **resizable:** support for multiple cursor types ([#8042](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8042)) ([e564714](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e56471423142d71ce9117707f7240c83f6fe44e5))
- **table:** support display and sorting of custom table columns ([#7966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7966)) ([d26870f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d26870f9ffd3f5122e95246a24587c739b04fd8a))

### Performance Improvements

- **select:** ability to pass nzKey to nz-option ([#8033](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8033)) ([e94da4e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e94da4eddd663a1e7a5e9e6e0781f1a6da59f1c7))
- **select:** remove unused types ([#7850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7850)) ([71c2138](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71c2138ce28e07539784d8fb228adf122ed13a33))
- **tabs:** need add .ant-tabs-tab class reduce css computing time consuming([#7935](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7935)) ([#7936](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7936)) ([198644a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/198644a09ac828c4e9b208799c8be1a57cd8ce86))

## 16.1.0

`2023-07-16`

### Bug Fixes

- **list:** fix the bug that synchrone action item are not displayed in the item ([#7958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7958)) ([3b6bdec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3b6bdecef32ee4d9bb14491b617870733cfd9553))
- **tree:** fix nz-tree-node keep dragging class with nzBeforeDrop ([#8015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8015)) ([2d0b3f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d0b3f71490e38f8512285f81fcf3baa8f6eb4db))
- **cascader:** customize the option title to undefined ([#8011](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8011)) ([10003db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10003db77b9bda21772733c41b3c503ee85d5c81)), closes [#8006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8006)
- **date-picker:** fix code comment ([#7991](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7991)) ([8b6b653](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b6b653547d92a27079c27b3ef7e68df68a4f5fd))
- **i18n:** update zh_TW.ts ([#7901](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7901)) ([9bfce45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9bfce45a37a9c50aafbcaf96a8db9450bc2c5bf1))
- **notification:** don't create new messageId for update ([#8000](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8000)) ([e240264](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e240264796dfd3a8692efcb92178688b78d0b69f))
- **time-picker:** modelChange trigger twice ([#7902](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7902)) ([74c13a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74c13a49f92a263a05a34af63f6a2b71a554078e))
- **watermark:** removing the watermark fails to redraw ([#8012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8012)) ([030318e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/030318e82725d7650c98bf0ec06d2b23df16d9f0))

### Features

- **cron-expression:** add Unit Testing ([#7993](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7993)) ([605e969](https://github.com/NG-ZORRO/ng-zorro-antd/commit/605e969013cf48a29f4786765cf6c6da9f10643a))
- **cron-expression:** support nzDisabled && nzBorderless ([#7992](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7992)) ([6d31bde](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d31bde3ef1f43cc145d2009afcf90931e96a731))
- **dropdown:** close context menu on escape ([#7915](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7915)) ([6d0032e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d0032ededc140a017c01158ae76402a86c7b334))
- **dropdown:** improve `NzContextMenuService#create()` ([#7768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7768)) ([9b3e6cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b3e6cba852d4a782d15311c910b747a3bbc4d02))
- **form:** support form label wrap ([#7892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7892)) ([37391de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37391de29afdd3126dbbdcae6ca3ba2e637fd596))
- **modal:** Remove nzComponentParams in v16 ([#7930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7930)) ([baab16c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baab16c497902f0cbf2668fb061ac8d40ffd18b2))
- **qrcode:** padding & background color for qrcode ([#8001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8001)) ([718ba29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/718ba2943c7c7e12c8526e52e8806955d3fb0504))
- **resizable:** add direction parameter in NzResizeEvent ([#7987](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7987)) ([4143473](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41434734ffe839f3ed71bd19486a5f76adc20463))
- **table:** support display and sorting of custom table columns ([#7966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7966)) ([d26870f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d26870f9ffd3f5122e95246a24587c739b04fd8a))

### Performance Improvements

- **select:** remove unused types ([#7850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7850)) ([71c2138](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71c2138ce28e07539784d8fb228adf122ed13a33))
- **tabs:** need add .ant-tabs-tab class reduce css computing time consuming([#7935](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7935)) ([#7936](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7936)) ([198644a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/198644a09ac828c4e9b208799c8be1a57cd8ce86))

## 16.0.0

`2023-05-31`

### Bug Fixes

- **date-picker:** ng-untouched when loose focus ([#7922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7922)) ([9ebcf72](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ebcf72bde75b735c0798bc66bb62226b7f29536))
- **date-picker:** week number error when cross years ([#7923](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7923)) ([e7f9538](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e7f953822133ce31d2523a48766dfe6572f95430))
- **datepicker:** ngModel not update ([#7948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7948)) ([100796c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/100796c74cd75de9cebbf89cb58f4bf3cc58b746))
- **slider:** the first disable is invalid ([#7947](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7947)) ([ad2faf4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad2faf4c67cb6e7bc1b12646d0ceb9153a59d75c)), closes [#7943](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7943)

## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
