## [21.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/21.0.0...21.0.1) (2026-01-16)

### Bug Fixes

- bundle keyframes of animation into base style files ([#9653](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9653)) ([49ec060](https://github.com/NG-ZORRO/ng-zorro-antd/commit/49ec0605b31eef0a3d790319d55d9f44492b4c0b))
- **collapse:** no ghost zone if collapsed ([#9649](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9649)) ([5378f8b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5378f8beec14f7b47e0a54b6c81583592825ffa1))

## [21.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.4.4...21.0.0) (2026-01-09)

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

## [20.4.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.4.3...20.4.4) (2025-12-12)

### Bug Fixes

- **icon:** include nzSpin in change detection logic ([#9597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9597)) ([46dc381](https://github.com/NG-ZORRO/ng-zorro-antd/commit/46dc3819244969963ca80eeac9f9c06482f48d29))
- **result:** show default icon based on status ([#9568](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9568)) ([#9582](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9582)) ([b652105](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b652105ac71a022f4d7343e911f04fbeb2dee8d0))

## [20.4.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.4.2...20.4.3) (2025-11-28)

### Bug Fixes

- **form:** animation should respect NoopAnimations ([#9562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9562)) ([5bccf96](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5bccf968ab8cbe4164fe09e691f6664ee2664a5c))
- **input:** fix dependency cycle ([#9561](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9561)) ([8d5782d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d5782d5ae35769fc73bcdb49d9d7897b9b92828))

## [20.4.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.4.1...20.4.2) (2025-11-21)

### Bug Fixes

- **cascader,select,date-picker,time-picker,tree-select:** add missing nzVariant global config ([#9543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9543)) ([221386b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/221386b45cc20d6bea689a5a4c10e35ff15b06b7))
- **button:** improve icon only logic in zoneless mode ([#9541](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9541)) ([9def420](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9def420d2da1a2b8a7993db814948151733ef772))

## [20.4.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.4.0...20.4.1) (2025-11-14)

### Bug Fixes

- **badge:** hex `nzColor` should work ([#9517](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9517)) ([47d44ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47d44ba4f826f882ee3a9de64994ad5ebd89daa5))
- **cascader:** fix zoneless `NG0100` issue ([#9504](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9504)) ([24b4e83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24b4e83e39fe3216d02857999df78cd4fbdc35fe))
- **color-picker:** fix `NG01350` error ([#9525](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9525)) ([fbcb8c3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fbcb8c3f78c293bd510994a28de7295e4349576c))
- **dropdown:** update arrow placement once the position of connected overlay changes ([#9519](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9519)) ([7ff7e09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ff7e09d4256e8b4bd54cf2e1e01f64cabadcf4d))
- **input:** render icon when enterButton is an empty string ([#9498](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9498)) ([6a40b0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a40b0db8cd23584cc4a268c16eec14cf6bbaf29))
- **result:** nz-result-icon in ng-content does not work ([#9511](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9511)) ([0e095a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e095a14e0bf6014cffcb95db007b750bfe84da7))
- **segmented:** should not block the `selected$` if no animation ([#9512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9512)) ([af8b531](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af8b53186469aa9858a9eaa883e3e597db65c598))
- **select:** correct font size in small size ([#9516](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9516)) ([6f79005](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f7900548ccd128b430f7a09ee3ef07dd6ea482c))

## [20.4.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.3.1...20.4.0) (2025-10-31)

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

## [20.3.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.3.0...20.3.1) (2025-09-17)

### Bug Fixes

- **drawer:** fix `NG0203` ([#9418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9418)) ([7fb58ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7fb58aea2f03902ce3b0ac626bed99b5d8de0c6b))

## [20.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.2.1...20.3.0) (2025-09-16)

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

## [20.2.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.2.0...20.2.1) (2025-08-31)

### Bug Fixes

- **segmented:** correctly render with-icon & icon-only ([#9367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9367)) ([9d42b42](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d42b42ad103e8ca498e65e7aa6ad7e72075d609))

## [20.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.1.3...20.2.0) (2025-08-29)

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

## [20.1.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.1.2...20.1.3) (2025-08-21)

### Bug Fixes

- **i18n:** add missing translations to `cs_CZ` ([#9334](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9334)) ([93e486e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93e486eeb848fb3cbb2073f107ae7be4bba2457b))
- **i18n:** add missing translations to `sk_SK` ([#9335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9335)) ([ddefc7f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ddefc7f9e95cde34101896fd5bfe587ff1dd8a89))
- **cascader:** invalid value and label when binding dynamically ([#9338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9338)) ([324ab5b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/324ab5b2ad281abb77344b9ca0dd66d4ca55e794))
- **popconfirm:** correctly render icon & title ([#9322](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9322)) ([2c83788](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c837883853a77a5a8fe1c2245daa0548a7bb2d9))
- **select:** shaking when closing dropdown if use a TemplateRef as `nzNotFoundContent` ([#9336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9336)) ([366f8eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/366f8ebcd79900a4d6a512b72094af3494c55871))

## [20.1.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.1.1...20.1.2) (2025-08-08)

### Bug Fixes

- **input-number:** make sure the displayed value is correct ([#9312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9312)) ([7a2d3b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7a2d3b6f97bf80f2f517626f5e02625c4488be80))
- **select,tree-select,cascader:** selected item with long label displayed in ellipsis ([#9316](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9316)) ([30672d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30672d7978f0ca4b24ec04c196c967b69e614525))
- **table:** add cdkScrollable to internal scrolling element ([#9308](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9308)) ([8cb4113](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8cb411332b90b55bab3ec742c455e3aaaf4618d7))

## [20.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.1.0...20.1.1) (2025-08-05)

### Bug Fixes

- **badge:** export `NzBadgeStatusType` type ([#9298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9298)) ([91b1ad7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91b1ad7af23eda253c21530e2a01a5ac9f7c62a8))
- **layout:** fix showcases ([#9303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9303)) ([9a37ef8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a37ef8325522ee200462b75e13a72f403ec4bef))

## [20.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.0.0...20.1.0) (2025-07-21)

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

## [20.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/20.0.0-next.1...20.0.0) (2025-06-27)

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

## [19.3.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/19.3.0...19.3.1) (2025-05-29)

### Bug Fixes

- **cascader:** cannot update value when it is missing in options ([#9124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9124)) ([689fc72](https://github.com/NG-ZORRO/ng-zorro-antd/commit/689fc72e5c8175c830f995155daf1d7d4c318c25))
- **date-picker:** update input value when nzFormat changed ([#9129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9129)) ([f4c4e05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f4c4e05264dd3109a0c45018886603ddd9c45aa2))
- **tabs:** `nzLinkRouter` not work for the first time load ([#9130](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9130)) ([925a6a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/925a6a54dd477b687b3dd0b836c32cb17e6d8a0f))

## [19.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/19.2.2...19.3.0) (2025-05-23)

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

## [19.2.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/19.2.1...19.2.2) (2025-04-25)

### Bug Fixes

- **input-number:** fix `NG0600` error ([#9106](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9106)) ([9f5b525](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f5b525e5eb5e50ed4f93ed15b6831d7db3483ee))
- **checkbox:** fix `NG0600` error ([#9105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9105)) ([61b6886](https://github.com/NG-ZORRO/ng-zorro-antd/commit/61b68861a6215e40bd29e14d2fe2bc02ce112ce0))
- **checkbox:** fix type of `nzOptions` ([#9099](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9099)) ([7be2fe5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7be2fe5412aa00b9178dcae49f202b21a1b7e9e8))
- **select:** limit number of pasted item to `nzMaxMultipleCount` ([#9080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9080)) ([3714840](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3714840a8a72d4d7809a2cac339dd3891052225d))

## [19.2.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/19.2.0...19.2.1) (2025-03-29)

### Bug Fixes

- **select:** remove internal comment from select-arrow ([#9074](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9074)) ([c9b2dd9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9b2dd96db78ff257137b7a2cba79bbf70f64d3e))

## [19.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/19.1.0...19.2.0) (2025-03-28)

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

## [19.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/19.0.2...19.1.0) (2025-02-21)

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
- enable `isolatedModules` compiler option ([#8970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8970)) ([0d42aa7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d42aa7d4605c881c242e245b8127629e9657e39))

Now feel free to use `isolatedModules` compiler option in your project.

## [19.0.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/19.0.1...19.0.2) (2025-01-10)

### Bug Fixes

- **auto-complete:** should open the popover when the focused input is clicked ([#8900](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8900)) ([79cc2f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79cc2f830133dfe0ee99eaabdb7b5b5f1eca2e02))
- **progress:** fix `NG0956` error ([#8962](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8962)) ([c4d2f81](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4d2f81f125feca0ce5ad90e12997875b4465230))
- **transfer:** correctly set the transfer-list-body class ([#8960](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8960)) ([a3546a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a3546a9032dcc8fbbd72088e4a431e83b99b32f1))

## [19.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/19.0.0-beta.1...19.0.1) (2025-01-03)

### Bug Fixes

- **date-picker:** cell title should reflect `nzFormat` ([#8744](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8744)) ([1b7ab5a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1b7ab5adb5af783e3a6a47ffc4916961993f4d6f))
- **i18n:** add missing translations to `zh_TW` ([#8950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8950)) ([9607e11](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9607e1161244b441badb2c37093c4f44a2d63695))
- **input-number:** fix `NG0600` error ([#8955](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8955)) ([8d6135e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d6135e65a6aa716678b9485e3e7790182d160b1))
- **table:** should col be wrapped within colgroup in ssr mode ([#8948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8948)) ([0a73deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a73deb053d2d9ab8d8194038355fad898b60759))

## [19.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/18.2.1...19.0.0) (2024-12-06)

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
- **checkbox:** redesign the `nz-checkbox-group` component ([#8932](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8932)) ([489e0de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/489e0defbfeeb03c29562d139614451575f8ed8d))
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

## [18.2.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/18.2.0...18.2.1) (2024-11-15)

### Bug Fixes

- **anchor:** fix `a` tag problem with `null` or `undefined` value if TemplateRef provided ([#8864](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8864)) ([41f6609](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41f66095fdaee05d8bfdae13e8ec18a63cee1f2c))
- **color-picker:** remove inline style (CSP compliant) ([#8874](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8874)) ([0264da9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0264da98babca9f14a2c69ccb019944aa4e9f88f))
- **image:** remove inline style (CSP compliant) ([#8876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8876)) ([63c8953](https://github.com/NG-ZORRO/ng-zorro-antd/commit/63c895329a78575654994b607fa822f5735166f4))
- **qrcode:** remove event listeners once settled ([#8861](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8861)) ([40d466d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40d466dab751c51b8cecb97dc974a1d17a7692e6))
- **select:** remove inline style (CSP compliant) ([#8873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8873)) ([9431d0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9431d0d9e54c76271f7dc13c9833c29bf4e7dc13))
- **transfer:** cancel selecting all should emit `nzSelectChange` event ([#8872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8872)) ([5ff9821](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ff98216002da5c9fc23a9d9c8bd4d3b68495d51))
- **watermark:** cleanup event listeners once settled ([#8862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8862)) ([decd477](https://github.com/NG-ZORRO/ng-zorro-antd/commit/decd4772bdbfeb1a1397c2b597882503ca5685ad))

## [18.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/18.1.1...18.2.0) (2024-11-07)

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

## [18.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/18.1.0...18.1.1) (2024-08-20)

### Bug Fixes

- fix ngtypecheck reference issue caused by [@angular/compiler-cli#56945](https://github.com/angular/angular/issues/56945) ([#8699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8699)) ([8e459c1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e459c192cf5c4b1903a744c0548df800aa64bfc))
- **date-picker:** fix the NG0956 warning when recreating entire collection ([#8658](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8658)) ([70a0817](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70a0817cd8db49234726f160d9c2ae36f5c650b7))
- **grid:** fix the NG0955 warning in showcase ([#8679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8679)) ([6414c92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6414c924cdb013c0ffb96436dd89354e275fa544))
- **tree-select:** clear selected nodes when user set value ([#8693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8693)) ([91927bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91927bcede24a89ffc5ec4c814503547c86ad09e))

## [18.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/18.0.1...18.1.0) (2024-07-25)

### Bug Fixes

- **cascader:** hide placeholder when trigger `compositionstart` event ([#8641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8641)) ([17b0ea3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/17b0ea362021a458c18204f73c34c08695300e2a))
- **i18n:** add missing translations to `pt_BR` ([#7790](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7790)) ([6fc1c78](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fc1c78b4ca0d37bf5eb6e9e52f0fd150ca5855d))
- **i18n:** add scanned field to QRCode for `fr_BE`, `fr_CA`, `fr_FR` and `lv_LV` ([#8614](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8614)) ([9b69410](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b69410ce8f84fbd65e2f0dc627189403888d8f1))
- **schematics:** import missing `RouterLink` in template ([#8621](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8621)) ([032a0c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/032a0c2384434fc042674a60b005a5a479f6626a))
- **transfer:** disabling selection does not affect selecting all ([#8633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8633)) ([75d8c7b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/75d8c7b93310cd54677ac75f470b2967ebd092cb))

### Features

- **breadcrumb:** add `nzRouteFn` ([#6313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6313)) ([6d805c4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d805c44073297ea17742d43066c6b95e4af5ffe))
- **i18n:** add `en_AU` ([#7919](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7919)) ([c4e6c8d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4e6c8df3fe48ced3097f0f1347ddbbfde3fda9c))
- **icon:** add `provideNzIcons` and `provideNzIconsPatch` API ([#8650](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8650)) ([b22672d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b22672db7cbce362b14a3dad1ff3b3c45abed27f))
- **popconfirm:** support popconfirm template context ([#7989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7989)) ([6d27073](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d27073a52a96d17d8625a9d5d7b820984aa5000))
- **table:** support `nzSummary` ([#8639](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8639)) ([20bb5b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/20bb5b24c7d01d87f0d50c37248ddd862d9bf341))
- **table:** support `nzFixed` for `nzSummary` ([#8642](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8642)) ([bef12e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bef12e6218c53028f8907f2e917945ddc8283db5))
- **tree-select:** support TemplateRef type for `nzNotFoundContent` ([#8638](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8638)) ([13e8a45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/13e8a452c4a96f78d6cf900830ba4b585ed36735)), closes [#8631](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8631)

## [18.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/18.0.0...18.0.1) (2024-06-27)

### Bug Fixes

- **graph:** fix [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track function ([#8587](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8587)) ([7687ff2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7687ff2c907ee5ab262ee08240bc932b6112b1ae))
- **icon:** fix [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track function ([#8588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8588)) ([8a27bab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8a27babf30f7726113fed5511bfbd0067c0bbd37))
- **table:** fix [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track function ([#8593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8593)) ([b275063](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b2750630a0da3f415931cdf9ba6e6a618dd5d329))
- **pagination:** fix [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track function ([#8586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8586)) ([6bb95c0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6bb95c0905de9da1493590da2c6f76cc1b2a23bc))
- **i18n:** add missing german translations `de_DE` ([#8605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8605)) ([8d75378](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d75378ea612a0ab91f03ec1a709f88c2d22af21))
- **i18n:** add scanned field to QRCode `fa_IR` ([#8597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8597)) ([9c6e4bf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9c6e4bf6b65810b0f659a366d34b54528d55cc0f))
- **table:** missing no-result in fixed header table ([#8574](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8574)) ([6cff80e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6cff80e90788ce0b84b232a0fb67516b795c88b0))

## [18.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/17.4.1...18.0.0) (2024-06-06)

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

## [17.4.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/17.4.0...17.4.1) (2024-05-24)

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

## [17.4.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/17.3.0...17.4.0) (2024-04-19)

### Bug Fixes

- **autocomplete:** remove NgZone dependency ([#8462](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8462)) ([24bb1bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24bb1bc5959c0e617090f0459c39db00fd4e2d9a))
- **button:** add ant-btn-default class ([#8501](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8501)) ([1588199](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15881996f0a9b1e93b0c81843132ba5d7651e528))
- **calendar:** year dropdown update issue when date is changed programmatically ([#8286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8286)) ([ee68a2c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee68a2c90370a6e3a599fe9f914af20117d2faa6))
- **date-picker:** remove unsafe style ([#8458](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8458)) ([e6b83eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e6b83eb1881ece341b68f9048e9d3e5ea438ba19))
- **drawer:** remove inline style to resolve CSP issue ([#8065](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8065)) ([5e89441](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e89441c26a7df50d0feed746d5595cde2589a7a))
- **graph:** bring back the disappered arrows of edge ([#8493](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8493)) ([342841c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/342841ceafddb1b74f55e31bfa9ca3e7734e842e))
- **graph:** remove NgZone dependency ([#8460](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8460)) ([a4ec21a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a4ec21a684b5c96a64bd66670c270533926252bb))
- **image:** missing swip icon ([#8433](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8433)) ([f1a4050](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1a405042f84fbc96ed0587ea2e748dc7d468719))
- **image:** wrong next/prev btn in rtl mode ([#8468](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8468)) ([886138d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/886138d630965b9a0a89d1727f76fed81c6f9528))
- **list:** remove NgZone dependency ([#8439](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8439)) ([1ec0e76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ec0e7672eaba0890b145c706fcc0a75cb5c47f8))
- **notification:** nzMaxStack initial value error ([#8451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8451)) ([2c09162](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c0916265c00cdc026a55b3ab9d829c5e207cf31))
- **pagination:** add accessible name for nz-pagination-item ([#8476](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8476)) ([47ee143](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47ee14325910c154f1541ee2d5e97539ba9a4e52))
- **slider:** fix the style of markers in vertical mode ([#8494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8494)) ([9bcce6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9bcce6c969c0bef7bdf4526407b2dfc56b7ff660))
- **tag:** borderless style is invalid in default state ([#8495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8495)) ([b35e6d6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b35e6d6ba2422eb2c4725b2029a2f9c60720b697)), closes [#8492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8492)
- **typography:** remove NgZone dependency ([#8440](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8440)) ([af7fb5d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af7fb5d27254d26a284faaaa5b812b105f539e3f))
- **upload:** remove inline style to resolve CSP issue ([#8064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8064)) ([1ac84a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ac84a8428fe644362e0f733c9a151fa848cedbf))

### Features

- **modal:** supports masked layer response for each click ([#8429](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8429)) ([31b90fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31b90fa52232abe7b090f60797d4335329677c4c))
- **notification:** popup order adjustment ([#8450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8450)) ([742f14a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/742f14a93472772cbdd96ce89797dc4120c55330))
- **select:** support nzOptionHeightPx in global config ([#8504](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8504)) ([4efc5ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4efc5ab38f74ce07a769f57453b0da375c17ce5c)), closes [#8503](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8503)
- **skeleton:** support for square shape of skeleton button ([#8481](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8481)) ([af1483a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af1483a9be544bd41b8f2a4a4c8027425f22b925))

## [17.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/17.1.0...17.3.0) (2024-03-11)

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

## [17.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/17.1.0...17.2.0) (2024-01-29)

### Bug Fixes

- **table:** add missing import to nz-table-inner-scroll ([#8328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8328)) ([936317e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/936317e6702e790f5f8827e074fe12fd55fbf0f3))
- **tree-select:** fix search box exception when Chinese search ([#8324](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8324)) ([aacd62b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aacd62b0beeac35b18829ae4e382626b655c7e05))
- pipeline job failed ([#8367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8367)) ([6024bcc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6024bcc7a9453976d0023fe7b455dc452ced8bd4))

### Features

- **color-picker:** make color picker standalone ([#8316](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8316)) ([b050474](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b05047433311fe60ee82d100467c896f2167d925))
- **tag:** borderless mode ([#8320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8320)) ([e428083](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e428083537c8c25d463980749f63b1b8ab129057))
- **timeline:** allow custom color ([#8335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8335)) ([66a88db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/66a88dbbb1cdd26ee9411de2394fd2231a2807f0))

## [17.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/17.0.1...17.1.0) (2023-12-17)

### Bug Fixes

- fix logic for generating directive tags ([#8171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8171)) ([e37eab2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e37eab2be160a0db8154a2074c836782caa8cda3))
- **calendar:** style radio button not apply ([#8298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8298)) ([996e141](https://github.com/NG-ZORRO/ng-zorro-antd/commit/996e141042470e487d915d38477ad51928d3e2a0))
- **core:** warning cron parser common js dependencies ([#8277](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8277)) ([138d666](https://github.com/NG-ZORRO/ng-zorro-antd/commit/138d666e0527dba2f3f5ac43b05ce4810fffe9f7))
- **cron-expression:** output type error ([#8189](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8189)) ([ad02381](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad02381cfc4643b191caab7e056fd1a93086a45e)), closes [#8188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8188)
- **select:** input clear when nzAutoClear ([#8167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8167)) ([fefcb68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fefcb68dc9831eb2208746b3fe44346f80f8202f))
- **tabs:** aria controls have wrong value ([#8237](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8237)) ([d9a2d27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9a2d27be30e9bfc635d8ac3d0e31538f6092b1c))
- **tooltip:** color of the tooltip arrow does not change ([#8192](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8192)) ([bc344ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc344edc3dca8cdf777bf986130eeae5c3543f63))
- **water-mark:** nzWaterMark is a block element && standalone ([#8197](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8197)) ([e4d6082](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e4d608274e0b56acf9b720cf519d757c660c125e)), closes [#8187](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8187)

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

## [17.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/17.0.0...17.0.1) (2023-11-20)

### Bug Fixes

- **schematics:** cannot generate files and add default builders ([#8176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8176)) ([de8a6b7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de8a6b782d16f906198d6d6ba512059b8dcb463c))

## [17.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/16.2.2...17.0.0) (2023-11-18)

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

## [16.2.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/16.2.1...16.2.2) (2023-10-23)

### Bug Fixes

- inline cdk-overlay style ([#8132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8132)) ([3209d74](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3209d744187133e518f564bfe5a2f56ac371fc22))
- **cascader:** compatible with rxjs v6 ([#8133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8133)) ([54a5c76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54a5c769a061bc07e342c1f462bf27c422df44a3))
- **drawer:** drawer not open ([#8120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8120)) ([24d0664](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24d06640a623f3ea2fd9fa459c729a103938d7fc))

## [16.2.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/16.2.0...16.2.1) (2023-10-19)

### Bug Fixes

- inline external css ([#8122](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8122)) ([42da190](https://github.com/NG-ZORRO/ng-zorro-antd/commit/42da1905a74b5a2049c045cef90d3c5cd595b8a3))
- **color-picker:** optimize demo copywriting and style ([#8088](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8088)) ([6d03099](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d03099e40364b85276db4c0163bae32c62bad73))
- **menu:** ellipsis menu title content if overflow ([#8055](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8055)) ([0674f78](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0674f785213ad914ad58fddc42e3083ff750f102))
- **tree-select:** 修复节点为禁用状态时，back快捷键能删除bug ([#8105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8105)) ([07a1f5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07a1f5e41d82ac59c9de744a3528c23e2b871624))

### Features

- **select:** support to customize attr.title of nz-option-item ([#8097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8097)) ([2ee261a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2ee261ac24f7ea0501d07ad35fcdb435714ffe9b))

## [16.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/16.0.0...16.2.0) (2023-09-18)

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

## [16.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/16.0.0...16.1.0) (2023-07-16)

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

## [16.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/15.1.0...16.0.0) (2023-05-31)

### Bug Fixes

- **date-picker:** ng-untouched when loose focus ([#7922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7922)) ([9ebcf72](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ebcf72bde75b735c0798bc66bb62226b7f29536))
- **date-picker:** week number error when cross years ([#7923](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7923)) ([e7f9538](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e7f953822133ce31d2523a48766dfe6572f95430))
- **datepicker:** ngModel not update ([#7948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7948)) ([100796c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/100796c74cd75de9cebbf89cb58f4bf3cc58b746))
- **slider:** the first disable is invalid ([#7947](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7947)) ([ad2faf4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad2faf4c67cb6e7bc1b12646d0ceb9153a59d75c)), closes [#7943](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7943)

## [15.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/15.0.2...15.1.0) (2023-04-02)

### Bug Fixes

- migration description ([#7890](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7890)) ([78541e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/78541e104184998551d198ce6a4d980895d1688a))
- **datepicker:** send OnChange event for same value ([#7815](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7815)) ([3602abc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3602abc4b36232076734d63cde125553926119a9))
- **radio:** update `touch` status when `focus` and `blur` events ([#7885](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7885)) ([39f0cea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39f0cea785cf124abc7ddd2ccd4dd46bd9f6c30b)), closes [#7877](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7877)
- **time-picker:** fix AM/PM selector hide ([#7701](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7701)) ([129e944](https://github.com/NG-ZORRO/ng-zorro-antd/commit/129e9446c3937dea954c7e98c25c5222a4879468))
- **tooltip:** fix tooltip.spec.ts ([#7893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7893)) ([3dfa655](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dfa655127480bca2df46fc98cd946967ee05797))

### Features

- **form:** support form label align ([#7870](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7870)) ([d54b3b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d54b3b4cc44b6e9404a2de1e75ece5c3928ec453))
- **modal:** pass data to modal component through injection token ([#7849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7849)) ([ea9969d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ea9969d840855a2ba1385f2fd3b51889a6b15258))
- **qrcode:** add QRCode component ([#7803](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7803)) ([ff36981](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff36981aa5289eb4d9e267d6a9a3b01770bba456))
- **watermark:** add watermark component ([#7857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7857)) ([11b85a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/11b85a4e0321fea3dd8581bb191ba2ca907ef29b))

### Performance Improvements

- **avatar:** do not run change detection on timer and update styles directly ([#7862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7862)) ([1c48745](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c4874592b402f526518be03e831634e1c9e9341))
- **date-picker:** do not trigger change detection on `mousedown` ([#7860](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7860)) ([1171460](https://github.com/NG-ZORRO/ng-zorro-antd/commit/11714605466f910b24d450f6b7e1e4b7459bbca7))

## [15.0.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.3.0...15.0.3) (2023-01-17)

### Bug Fixes

- **radio:** invalid disable state ([#7812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7812)) ([2b4df9a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b4df9a833849c481346194c817196bc2697a1ff))

## [15.0.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.3.0...15.0.2) (2023-01-15)

### Bug Fixes

- **checkbox:** checkbox group can't be disable initially ([#7806](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7806)) ([eb2cb04](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb2cb046e122eab654a2e721b51f397d2790019e))

## [15.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.3.0...15.0.1) (2023-01-09)

### Bug Fixes

- **components:** some forms component can't be disable ([#7786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7786)) ([bc673e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc673e7deef219de82e5dc23e1318f76a1ef98f6))

## [15.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.3.0...15.0.0) (2022-12-21)

### Bug Fixes

- **drawer:** fix `nzContentParams` definition error ([#7668](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7668)) ([0074013](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0074013f585ba23ed7b9156e379b7c81be445bf1)), closes [#7620](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7620)

### Performance Improvements

- **date-picker:** remove unused variable ([#7767](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7767)) ([1572da5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1572da58cdd9629e1aeab3d4c0262dcc91bd597c))
- **form:** remove a unused variable ([#7766](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7766)) ([162d290](https://github.com/NG-ZORRO/ng-zorro-antd/commit/162d290305a0bee6678c066eddc74e5e919f280c))

## [14.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.2.1...14.3.0) (2022-12-11)

### Bug Fixes

- **tree:** nz-tree-drop-indicator for custom tree node templates ([#7579](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7579)) ([5996019](https://github.com/NG-ZORRO/ng-zorro-antd/commit/59960194773a0c1036c2142e199b9b7633383fea))
- **input:** textarea-count combined with nzHasFeedback location ([#7709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7709)) ([ddd44d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ddd44d2478621370493b154ca39411552b934290)), closes [#7574](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7574)
- **list:** specify template ref context to match instantiation ([#7756](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7756)) ([4eb32fd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4eb32fdb3411f1ebd98d2120f4ea585816263bac))
- **select:** disabled option can be selected by Enter ([#7686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7686)) ([5bdf244](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5bdf2440bc48547bc76a6646cce49fd8b036beb3))
- **tree:** tree select search slow in virtual mode ([#7385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7385)) ([21208f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21208f0c990db36864138a228fb5f065c4fcdb92))

### Features

- **cron-expression:** Optimize cron result display & support custom rendering cron time ([#7750](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7750)) ([1820da5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1820da520178e6d8ba7cecd2b039e1836f500969))
- **date-picker:** add ElementRef type to nzSeparator ([#7721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7721)) ([3771512](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37715122bc103d9a74395fc746d39f26ffa82bd8))
- **select:** select on Tab support ([#7728](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7728)) ([d9f9092](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9f9092dd50beea81b48d775c5de6df507a44b90))
- **tree-select:** support to set placement ([#7551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7551)) ([325971e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/325971e83710271470bbd085d252b8e1eb2d838c))

## [14.2.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.2.0...14.2.1) (2022-11-27)

### Bug Fixes

- **animation:** fix animation.disabled triggering condition ([#7739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7739)) ([2df4860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2df48601854ee8a383d3a02044f8a3bcbf7f18db))
- **i18n:** add missing hu texts ([#7733](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7733)) ([de71300](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de71300188e154a43f9abe928153f19aa8e2862f))
- **select:** activated value resetting during load on scroll ([#7725](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7725)) ([9e08be9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e08be9e2c0eb15e76da44df7e17d153b3b1339d))

## [14.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.1.1...14.2.0) (2022-11-20)

### Bug Fixes

- **cron-expression:** clear ul & li default style ([#7715](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7715)) ([726ded3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/726ded31a8a8d9ad46a5095ece21e31c321cd10c))
- **date-picker:** arrow in wrong position for RTL direction ([#7690](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7690)) ([41b56e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41b56e4072b6d5832c1f9e31196dcce4fe8632aa))
- **date-picker:** fix datePicker show multi panel ([#7680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7680)) ([ee4872e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee4872e1c93f3439bbafe56f430aca4e0eca085c)), closes [#7450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7450)
- **descriptions:** nzStringTemplateOutlet title style error ([#7704](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7704)) ([bec3b42](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bec3b42bdbdad31dcb66000376e40b9528f68ba5)), closes [#7698](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7698)
- **icon:** re-enter Angular zone after icons have been loaded ([#7719](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7719)) ([754ded6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/754ded61fe41d523c2bf216a7ea49cc2a5a6fa61))
- **image:** preview the local upload image error ([#7615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7615)) ([616f59f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/616f59ffe80b2f5a6d6e41787eec29de240901d4))

### Features

- **alert:** support custom icon ([#7691](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7691)) ([cc014a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc014a12099c09ae016a400c4f0a5bb3208d2503))
- **carousel:** `nzLoop` to prevent the carousel to go in a loop ([#7693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7693)) ([e3103f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e3103f07860b6d57ebf32155fd3ae416afd3e386))
- **cron-expression:** add cron-expression component ([#7677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7677)) ([3a638af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a638af6f67e93cc6a029e4d96033ad9dabf555b))
- **popconfirm:** make nzOkDanger coerce to boolean ([#7720](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7720)) ([f6a8044](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f6a804408e21f0ae7dc7385da202acd54e76cdd7))

## [14.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.0.0-beta.0...14.1.1) (2022-10-15)

### Bug Fixes

- **code-editor:** fix declaration of Window as monaco-editor ([#7676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7676)) ([bdf6507](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bdf65077f174512efa2ed2dcf65c87734cfe4255))
- **date-picker:** fix datePicker can't clear ([#7671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7671)) ([ba90876](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba90876690e462e18da0126d8e90d682b62ebb70)), closes [#7534](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7534)

## [14.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.0.0-beta.0...14.1.0) (2022-10-09)

### Bug Fixes

- **cascader:** fix wrong format of docs ([#7604](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7604)) ([8b92c63](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b92c6362e9702a79ff23f3605d8a3ab84c4b9ca))
- **i18n:** update it_IT.ts ([#7646](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7646)) ([aecb788](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aecb78846138249e50dce48de9cfed29d777d6ac))
- **pagination:** add ul tag ([#7500](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7500)) ([becdd68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/becdd682514e36b188be93667a03ac74f224dcf7))
- **segmented:** fix index.less not imported in entry.less ([#7624](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7624)) ([1d6a646](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1d6a6464e5d0fccc6f78e16af3c32d48efe95fc7))
- **select:** fix broken cdk virtual scroll integration ([#7642](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7642)) ([1f10a9c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f10a9cfa9e16d64737325b57cc29f3c8e8a84c9))
- **select:** input field length restricted to 82px ([#7626](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7626)) ([82159e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82159e34e53c95eeff4886c03f70b2978110cc00))
- **statistic:** remove top-level redundant `div` element ([#7659](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7659)) ([07df410](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07df41046e595078d37cef3f3419db12d48b33d8))
- **steps:** remove top-level redundant `div` element ([#7582](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7582)) ([60beabc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60beabccd2459adcb973133fc139008b31abfca0))
- **typography:** focus the element and set the value even if the zone is already stable ([#7320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7320)) ([2d2fe33](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d2fe33b135168a515abe3d41a86a0f2ba9ddfcf))

### Features

- **popconfirm:** support async close ([#7533](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7533)) ([797b261](https://github.com/NG-ZORRO/ng-zorro-antd/commit/797b2617f08394b56fe0a7903dc69e2d75984219))
- **select:** support placement ([#7537](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7537)) ([dda0e6d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dda0e6d6b8e0abba46946a6ba04142500ba38328))
- **date-picker:** add nzShowWeekNumber property ([#7621](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7621)) ([2cb80fc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2cb80fc1253322e5b02aba38f50b2f37784d0aa7))
- **menu:** add support nzPlacement for nz-submenu ([#7420](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7420)) ([b1223bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1223bdda6cfd4870adbaa2fbd800e3c3aa4a0d4)), closes [#4743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4743)
- **select:** add string array support for nzDropdownClassName ([#7643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7643)) ([966dc8f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/966dc8f2b39b9cc7f46e4a1c5fba157c78173a52))
- **time-picker:** support input readonly ([#7660](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7660)) ([2dcefe2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2dcefe2c197e6438736f326206229b0287400cc3))

## [14.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/14.0.0-beta.0...14.0.0) (2022-08-25)

### Bug Fixes

- **cascader:** fix wrong format of docs ([#7604](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7604)) ([8b92c63](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b92c6362e9702a79ff23f3605d8a3ab84c4b9ca))
- **steps:** remove top-level redundant `div` element ([#7582](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7582)) ([60beabc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60beabccd2459adcb973133fc139008b31abfca0))

### Features

- **icon:** change tag of nz-icon from `<i>` to `<span>` ([#7586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7586)) ([7242111](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7242111c8bc2523df9d13e19521473502a4f6cf1))
- **popconfirm:** support async close ([#7533](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7533)) ([797b261](https://github.com/NG-ZORRO/ng-zorro-antd/commit/797b2617f08394b56fe0a7903dc69e2d75984219))

### BREAKING CHANGES

- **pagination:** add ul tag ([#7500](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7500)) ([becdd68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/becdd682514e36b188be93667a03ac74f224dcf7))

## [13.4.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.3.2...13.4.0) (2022-07-25)

### Bug Fixes

- **datepicker:** focus input when opened programmatically ([#7512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7512)) ([b3a27d8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b3a27d82900b455c32226100a7dbad87f20fd18a))
- **transfer:** uncheck "Select all" checkbox when filtered items are moved ([#7419](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7419)) ([1e9c11e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e9c11e2b60dafd4320da1a3d852c17fcce1dafa))

### Features

- **notification:** support top and bottom placement ([#7540](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7540)) ([d8b26dd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d8b26dd6377d9546121122bd1c0498be7eaf4aa8))
- **anchor:** sync new properties ([#7494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7494)) ([254b429](https://github.com/NG-ZORRO/ng-zorro-antd/commit/254b4294473fdcb495ea5e7a81a81e4331e50fc2))
- **badge:** support size ([#7405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7405)) ([f40dd38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f40dd38702bec197742b38afc075af8ec4bc6170))
- **date-picker:** support date-picker placement ([#7527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7527)) ([a652470](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a65247012bce98a891e6f46242e95cecfbbc0641))
- **input-number:** add borderless support ([#7539](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7539)) ([ea1138b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ea1138b9a47a9c3678ce60babea5cd59b2278002))
- **switch:** add nzId input ([#6815](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6815)) ([4c71bdb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c71bdb6a46d4e590ab6cc1f3eb9dd3d05b49eee))
- **time-picker:** support borderless ([#7547](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7547)) ([a8c3f95](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a8c3f957cb66315350d50b4b8d164c8e6de19d76))

### Performance Improvements

- **transfer:** add `trackBy` to the list and track by the `hide` property ([#7424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7424)) ([0587236](https://github.com/NG-ZORRO/ng-zorro-antd/commit/058723643e7b52b0a470cbbc42de91be3b2275e6))

## [13.3.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.3.0...13.3.2) (2022-06-25)

### Bug Fixes

- **input-number:** fix errors before initialization ([#7531](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7531)) ([800e6f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/800e6f4f1495d63edcb0f992836a75a40e3ca5b6))

## [13.3.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.3.0...13.3.1) (2022-06-20)

### Bug Fixes

- **input, input-number, steps:** fix styles in components ([#7522](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7522)) ([222b225](https://github.com/NG-ZORRO/ng-zorro-antd/commit/222b225ed4d4e56de049b08d7e6e8a77d476d481))

## [13.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.2.2...13.3.0) (2022-06-15)

### Bug Fixes

- **icon:** add missing zorro used icon: deleteOutline ([#7499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7499)) ([ba6bade](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba6badee1fff04eeb811ef50ac03cf9ccfeaebf7))
- **tooltip:** is not aligned on first display ([#7457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7457)) ([23a2fd5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/23a2fd567af598625267187dea2db487e570b9b7)), closes [#7453](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7453)
- **transfer:** `submit` behavior for button inside form ([#7413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7413)) ([0cfebca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cfebca5ebe4f7239212f99753cbbfd1d2790f63)), closes [#7410](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7410)

### Features

- **cascader:** support setting status ([#7452](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7452)) ([e10908e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e10908e505b93f2e2d76f24c3f0dc7972fda266c))
- **date-picker:** support setting status ([#7479](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7479)) ([c3d0874](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3d08742247a2f2e12d070e352aa7932f9a0d326))
- **form:** make form work with status ([#7489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7489)) ([98ac620](https://github.com/NG-ZORRO/ng-zorro-antd/commit/98ac620a1eac4e307505450fbf7890f5b3da20ff))
- **input-number:** support input number group ([#7488](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7488)) ([b038fa2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b038fa26703ab010dab1b03946986e6f5c6ee66c))
- **input-number:** support setting status ([#7462](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7462)) ([0c9287a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0c9287a2005149f2ecd1b6b3ad58d7374013bb6b))
- **input:** support setting status ([#7472](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7472)) ([999215e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/999215e6ba45f1e3e32f561052ce8a902af895d7))
- **mentions:** support setting status ([#7467](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7467)) ([ac38b2d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac38b2d64697f307e79720a691fbdf60c32fb8d0))
- **segmented:** implement new component ([#7404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7404)) ([95a31da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/95a31dab42dce3895d012bd2458ef51ec90ef33f))
- **select:** support setting status ([#7478](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7478)) ([44b7fe0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44b7fe0e1f8892a2da9e9950da40081bab767d4d))
- **time-picker:** support setting status ([#7473](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7473)) ([0d8249b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d8249b31e70c28ea47f37b818ff1c5fe0ac8239))
- **transfer:** support setting status ([#7475](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7475)) ([9b98fe1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b98fe11f4832c774067b10e50f6b981b9147dbe))
- **tree-select:** add status ([#7477](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7477)) ([40815ad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40815ad90d4160be4a6a9dd29ee7b072ecde5f75))

## [13.2.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.2.1...13.2.2) (2022-05-12)

### Bug Fixes

- **tree-view:** trigger markforcheck after nodes changed ([#7426](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7426)) ([a702674](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a702674d76974bcc8fa854394bd6681d8dfe8347))

## [13.2.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.2.0...13.2.1) (2022-04-27)

### Bug Fixes

- **code-editor:** remove monaco-editor dependency in config.ts ([#7392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7392)) ([929084d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/929084d5ba65c4e9661ccaea300c58e85e39bed6))

## [13.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.1.1...13.2.0) (2022-04-26)

### Bug Fixes

- **carousel:** fix nzAfterChange callback value not correctly ([#7326](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7326)) ([b517bd4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b517bd442fa36f4cfc5e4a37d587b4f26cfb940c)), closes [#7323](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7323)
- **cascader:** fix the problem of disappearing drop-down menu ([#7381](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7381)) ([3d41ce0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d41ce08769bcbf337590169ded3559b092bc5cd))
- **cascader:** update position when click menu item ([#7306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7306)) ([4c669a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c669a58f0bf02bc835e2d68402b5ea0c98511c5))
- **i18n:** update fr translations ([#7364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7364)) ([64e1c7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64e1c7cf2bd3b094a0124ed8ddb51edab284b927))
- **list:** re-enter the Angular zone when the `NgZone.onStable` emits ([#7314](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7314)) ([425f8df](https://github.com/NG-ZORRO/ng-zorro-antd/commit/425f8dff39f29ba620cdeb6f4a6f45471845b819))
- **modal:** no longer trigger any action when closing ([#7336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7336)) ([d169452](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d16945249a28338ba480af46ff037d69b67b4af4))
- **popconfirm:** reverting missing nzPopconfirmVisibleChange ([#7338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7338)) ([561041c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/561041c3e7ce643cc57cfd2c18c22dd36da389c8))
- **upload:** fix upload drag drop will open new tab in firefox 91 and 92 ([#7190](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7190)) ([9b51874](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b518742e3be8c85c0b2e2e66d4ffe108e43a2d0))

### Features

- **code-editor:** add global configuration to support monaco require config ([#7121](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7121)) ([21ec517](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21ec517ba55cd20aa78298cd1050069308a9f98b))
- **code-editor:** support MonacoEnvironment config in NZ_CONFIG ([#7359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7359)) ([4dfd9cd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4dfd9cd21507fcf4382d5f28f03fd969d8fc425c)), closes [#6502](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6502)
- **image:** nz-image add press `left` or `right` to switch image ([#7321](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7321)) ([b5f82b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5f82b51eed45f9bc7f7418c90185693887b202a))
- **input-number:** add `nzReadOnly` property ([#7372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7372)) ([0da7496](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0da7496ba4dcc03be2827b6783a977382e487da1)), closes [#7369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7369)

### Performance Improvements

- **anchor:** mark `scroll` listener as passive ([#7330](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7330)) ([aab060f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aab060ffcebae479954355bf02804882935ef8d2))
- **back-top:** mark `scroll` listener as passive ([#7329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7329)) ([7f3c4e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f3c4e1c5e8330597b5b0024c7b9075bccf93f44))
- **cascader:** do not run change detection on `change` event ([#7312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7312)) ([cb803f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb803f9a8c040157d83e095ce9ab0bd28a161b64))
- **image:** do not run change detection when the image preview is clicked ([#7309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7309)) ([752a5b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/752a5b6f3e76d467a839a39aa587deaed953ed72))
- **input-number:** do not run change detection when `mouseup` and `mouseleave` events are dispatched on handlers ([#7313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7313)) ([54386ef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54386efaac97982675c8c1e1b3504cfed9671248))
- **modal:** call `focus()` on the next rendering frame to prevent frame drop ([#7293](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7293)) ([106d346](https://github.com/NG-ZORRO/ng-zorro-antd/commit/106d346d72568f8256a942478d808d002f5421c7))
- **resizable:** mark `mousedown` and `touchstart` listeners as passive ([#7331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7331)) ([518997b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/518997bcf193a59510a0dfc1db4ef306475eb990))
- **tree-view:** do not run change detection when the `nz-tree-node-checkbox` is clicked ([#7307](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7307)) ([1e0872b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e0872b30873644032917f6242f585ba9bd1db30))

## [13.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.1.0...13.1.1) (2022-03-03)

### Bug Fixes

- **collapse:** markForCheck after collapse title clicked ([#7284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7284)) ([b7433a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7433a9d22e82a21d1557c026ba78e07b9541bec))
- **icon:** do not try to load SVG on the Node.js side since it will throw an error ([#7290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7290)) ([fe0484f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe0484f348c73fc85bf721167f6d4e6f278b98f1)), closes [#7240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7240)
- **select:** exact match while searching should be active ([#6816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6816)) ([48d2a25](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d2a2538c9ddef5f77804cbecbf4c157f4e9f22)), closes [#6812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6812)
- **upload:** fix the problem that the transformed file is lost ([#7206](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7206)) ([b82d2f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b82d2f3a3f74c3f915f17a650dd86b51f22ae922))

## [13.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.0.1...13.1.0) (2022-02-25)

### Bug Fixes

- **button:** prevent default event fire ([#7267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7267)) ([2306e0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2306e0d61a232e79249e31357f3cbdc769312f2c))
- **date-picker:** fix `z-index` to `auto` in inline mode ([#7172](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7172)) ([26006f6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/26006f60f9b9bdf860adef8dbfc98a5f6922899d))
- **date-picker:** fix disable time when date changes ([#7236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7236)) ([ae67952](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ae6795238146833d7813e3882bb2593df155ea1b))
- **i18n:** update fa-IR.ts translations ([#7249](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7249)) ([a7a0b41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a7a0b413c9539cb801058c1956242f50a3923972))
- **i18n:** update pt_BR.ts translations ([#7218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7218)) ([95c7816](https://github.com/NG-ZORRO/ng-zorro-antd/commit/95c7816b369ed8efbd89b5bb3ba67d133b1ad71d))
- **input:** do not set box-sizing when measuring ([#7214](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7214)) ([035dc94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/035dc94b58766e8565e8f4d400b9dc67c3673a08)), closes [#7203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7203)
- **input:** incorrect background color in disabled state ([#7250](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7250)) ([7acb8db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7acb8db6ff858a4daec20173fde3535b024f6d89))
- **radio:** emit `false` to the `ngModel` whenever the radio button is deselected ([#7270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7270)) ([2704237](https://github.com/NG-ZORRO/ng-zorro-antd/commit/270423707363514112bd75ed0384c5e70d7d3755))
- **select:** fix keyboard event error when option data is empty ([#7222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7222)) ([4bd86ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4bd86ca0a72baf653fdb93d311159d97f3d36b84)), closes [#7242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7242)
- **slider:** fix keydown not trigger nzOnAfterChange ([#7252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7252)) ([f419c07](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f419c07644f6fe0148a4a9990ad3f85aec590359)), closes [#7251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7251)

### Features

- **alert:** support nzAction for customizing actions ([#7246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7246)) ([eb3b1ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb3b1bafaedaff09d8f547a1cb7ecd4eb9aea67f))
- **drawer:** support new apis nzSize and nzExtra ([#7227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7227)) ([d2e5b76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d2e5b76d176c9574dfe4a79c285e9d09e6edcc28))
- **i18n:** add kk_KZ to i18n ([#7261](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7261)) ([3580fb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3580fb038c5d4c88bf2efe845b8b86fb47df7ee3))
- **i18n:** add km_KH ([#7220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7220)) ([f972391](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f9723918ea7a4646cb282a4254054bc3b3fd5564))

### Performance Improvements

- **auto-complete:** do not run change detection when the promise resolves ([#7138](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7138)) ([e95d941](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e95d941c17c31504438fef770ff5dd9f7e157534))
- **back-top:** do not run change detection if there are no `nzClick` listeners ([#7179](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7179)) ([7d091bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d091bba409ee9321215696568928d5684032ccf))
- **carousel:** do not run change detection when the timer fires ([#7136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7136)) ([fc991d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc991d180c1c8f006b294b3ab18950ed06e181e8))
- **collapse:** do not run change detection if the panel is disabled ([#7181](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7181)) ([3c3eac9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c3eac9875556134118c60c3bcdf10dc7136beea))
- **dropdown:** do not run change detection if the dropdown has been clicked inside ([#7135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7135)) ([4679592](https://github.com/NG-ZORRO/ng-zorro-antd/commit/467959298f57c81574ac7b25f3714e734026ac12))
- **image:** do not run change detection if there are no `containerClick` listeners ([#7147](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7147)) ([f0f52a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0f52a4765da8ae26fd2fe36fe9024b8f574d204))
- **mention:** do not run change detection when the dropdown cannot be closed ([#7146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7146)) ([b72bd27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b72bd2735da5d07713b6895db2842d132f62e131))
- **mention:** do not trigger change detections if there are no event listeners ([#7130](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7130)) ([73af728](https://github.com/NG-ZORRO/ng-zorro-antd/commit/73af728527bb38ced9941e5ce29760bbae5b4a68))
- **resizable:** do not run change detection on `mousedown` and `touchstart` events ([#7170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7170)) ([9a8d794](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a8d79476be545be181e11a92d849e7e543d38c6))
- **select:** do not run change detection on events if the `nz-option-item` is disabled ([#7133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7133)) ([a1bbdab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a1bbdabca53bd61423564448298892c54260d48e))
- **select:** do not run change detection unnecessarily on click events ([#7175](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7175)) ([fd63d22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd63d225e5ebdd800eae0be80685537746bfeb61))
- **table:** do not run change detection if the sorting is not shown ([#7174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7174)) ([e541761](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5417611976bdcdde43f202bacd8b031bd8d0fab))
- **table:** do not unnecessarily re-enter the Angular zone ([#7142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7142)) ([5a5df13](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5a5df13bbdfe8575ef6b1fdd6df73d6100b82407))
- **table:** spawn timers and add listener outside of the zone ([#7140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7140)) ([ec248c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec248c95162bdb7c23dda1926d156ae9cb7c7ace))
- **tabs:** do not run change detection when the promise resolves ([#7144](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7144)) ([148f84d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/148f84d11b6bf234544cfe06d1506519496e0628))
- **time-picker:** do not run change detection when the timer fires ([#7143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7143)) ([72da774](https://github.com/NG-ZORRO/ng-zorro-antd/commit/72da774dfd0927699c9c5f8613086a1e5d0e53c0))
- **tree-view:** do not run change detection on click events if the `nz-tree-node-option` is disabled or there are no `nzClick` listeners ([#7178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7178)) ([0054f59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0054f59a383f937f6e0f71435da41c74264be6ae))
- **typography:** do not run change detection on `input` and `keydown` events ([#7185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7185)) ([ad547fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad547fb7193999735396d12c07124c70d9941daa))

## [13.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/13.0.0...13.0.1) (2022-01-18)

### Bug Fixes

- **back-top:** fix more reliable scrolling listener ([#7208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7208)) ([3bcd343](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bcd343e38aefc35af1c2386a539d19a1d0ca279)), closes [#7199](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7199)
- **drawer:** fix close icon position without `nzTitle` property ([#7176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7176)) ([a6195b9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6195b991a531e914faef2237dadf7226b8d6390)), closes [#7164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7164)
- **icon:** fix old icon element not removed ([#7188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7188)) ([67ac573](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67ac573d2e0a9b19263c600f020842532844566a)), closes [#7186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7186)
- **statistic:** re-enter the Angular zone when the `nzCountdownFinish` emits ([#7137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7137)) ([6835544](https://github.com/NG-ZORRO/ng-zorro-antd/commit/68355448198b31d9a064710cfc4d790739909616))
- **tree-view:** fix innerTrackBy function ([#7150](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7150)) ([4484674](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4484674e212f67dea3aad8b56f27e9de61e6d21e)), closes [#7118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7118)

### Performance Improvements

- **auto-complete:** memory leak ([#7112](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7112)) ([3806250](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38062508fb7e0df13e528e1c9d5bf3720bd76200))
- **cdk:** resolve leak ([#7139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7139)) ([2a93d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a93d05c48ebba1a1f6a3add74b71f4049907337))
- **checkbox:** reduce change detection cycles ([#7127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7127)) ([15abe33](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15abe33053ee888e31c1ad629fd5a5ecae79db43))
- **code-editor:** always initialize outside of the Angular zone ([#7151](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7151)) ([f73be80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f73be80ca8e55604a683827f0693455c20978214))
- **core:** remove `resize` listener when the app is destroyed ([#7125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7125)) ([8437111](https://github.com/NG-ZORRO/ng-zorro-antd/commit/843711117a8bd7b6feb6410b4b824bd9741147a7))
- **image:** unsubscribe old src ([#7102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7102)) ([87a3e27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87a3e276fc1f1a50ecc6da9edc28dd4f77ac8482))
- **input-number:** reduce change detection cycles ([#7129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7129)) ([9971faa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9971faa7d9c54db40c19fa6333dce8a65d38ccd4))
- **modal:** do not run change detection on mouse events ([#7169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7169)) ([c20bb80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c20bb8076b9d0e5e63880921cdfc738de12fc5a0))
- **modal:** resolve memory leaks ([#7123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7123)) ([3664efe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3664efe1d6e9f5a93ed85e958652f8a898c0b987))
- **graph:** do not run change detection on animation frame ([#7132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7132)) ([1ceaf70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ceaf70e215ab854a94897aebbf6acb4bd5c2006))
- **rate:** do not run change detection on `focus` and `blur` events if there are no output listeners ([#7182](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7182)) ([3e9e035](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e9e035d0273427f47eb4c0200930e549711d5d4))
- **steps:** do not run change detection if there are no `nzIndexChange` listeners ([#7183](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7183)) ([cbfc558](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbfc558c255e7f70e2b931f751c800501474a791))
- **transfer:** do not trigger change detection when the checkbox is clicked ([#7124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7124)) ([b12f43a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b12f43afe78d03687000471f164ff1f5d2631d3b))

## [13.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/12.1.0...13.0.0) (2021-12-29)

### BREAKING CHANGES

**dropdown**

- `[nzHasBackdrop]` input value are no longer supported, please use `[nzBackdrop]` instead.

## [12.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/12.1.0...12.1.1) (2021-12-18)

### Bug Fixes

- **date-picker,time-picker:** disable autocomplete completely ([#7088](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7088)) ([bddc537](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bddc537f6f64b6697f95ef421c634045656e4903)), closes [#6718](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6718)
- **date-picker:** resolve memory leaks ([#7113](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7113)) ([fe9070a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe9070aaf486b50b231b19ee55bfc0b4907a98a2))
- **popconfirm:** missing arrow ([#7086](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7086)) ([3f4a704](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f4a704fc126a3c1ccfe92ae0f045062f00fd1e8))
- **timeline:** when the data clear. reset items ([#7109](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7109)) ([0ece612](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0ece6123a586c96a6178e2ba939b9451c031bc14))

### Performance Improvements

- **carousel:** do not run change detection on non-handled `keydown` events ([#7097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7097)) ([ca3299e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca3299ea5b00c7075d93871ec418e1527d390f8b))
- **cascader:** do not run change detections on non-handled `keydown` events ([#7060](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7060)) ([9a37718](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a37718d42ac05288393d7c7d9db4204ba7e640e))
- **date-picker:** do not run change detection when the `date-range-popup` is clicked ([#7096](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7096)) ([8f8c71b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8f8c71b1aedd10ecd50c48d802835bd235f0f2ee))
- **icon:** do not run change detection when changing icon ([#7071](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7071)) ([e998e4a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e998e4abef73f34783aa63e88e9f0adadc8301e7))
- **mention:** do not run change detections on `mousedown` events ([#7094](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7094)) ([0d4ad23](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d4ad23a1722a01974c29c4b9f13eeff70c40df5))
- **switch:** reduce change detection cycles ([#7105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7105)) ([6d9b1ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d9b1fff55bcb3d8a6c5ef2b9250cfcee6ce6039))
- **table:** do not run change detections on click events for the `nz-filter-trigger` ([#7095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7095)) ([346c50d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/346c50d0a5b19160d51c8c6a3e61a389b4b92a52))
- **time-picker:** do not run change detection when scrolling ([#7063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7063)) ([baf7f0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baf7f0a85ef386a4ebe9bef553e532e501129f6e))
- **time-picker:** do not run change detection when the time picker panel is clicked ([#7126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7126)) ([76da3ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/76da3ff9f6a64fb854999f3ef30c45980c3b6b7b))
- **tree:** do not run change detection when the tree node is clicked ([#7128](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7128)) ([55f1e04](https://github.com/NG-ZORRO/ng-zorro-antd/commit/55f1e047b32597397c42c779409beff7ab13b1f7))

## [12.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/12.0.2...12.1.0) (2021-11-29)

### Bug Fixes

- **tabs:** tabs add btn disappear after all tab closed ([#7076](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7076)) ([3709b73](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3709b735094edf2960b5bec8f2a565619d6f5361)), closes [#7077](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7077)
- **tree-view:** incorrect type of `trackBy` ([#7085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7085)) ([891a622](https://github.com/NG-ZORRO/ng-zorro-antd/commit/891a622ef54b52bdffad894258824926ce25d28d))
- **tree-view:** not updates when datasource data changes [#7040](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7040) ([#7083](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7083)) ([cad8ca0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cad8ca038067b9c2874a8c3c6e351f46e13c4609))

### Features

- **core,dropdown,table:** add config for backdrop ([#6783](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6783)) ([2f7c44d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f7c44dc1445d9a88c501e6e114507ed28ae33ae))
- **tooltip:** add arrow point at center ([#7010](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7010)) ([7fac8eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7fac8eb5b1e1c17dbfbf940827f1ca53dae8d5e4))
- **tooltip:** support tooltip template context ([#6948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6948)) ([fec40a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fec40a8a1bba792e5722f4facda56412f200f6b2)), closes [#6607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6607)

### Performance Improvements

- **auto-complete:** do not run change detection on `mousedown` and `mouseenter` for `nz-auto-option` ([#7048](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7048)) ([d6ca43e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6ca43e4f78b5b4f6b1407a0012cd806865e9e4d))
- **core:** do not run change detection when scrolling ([#7062](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7062)) ([a972d7b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a972d7b3986dae613e35dda13667c672878d75b4))
- **graph:** reduce change detections on click events ([#7056](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7056)) ([1e2960a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e2960a855991a380e44a52c31255781830c7043))
- **graph:** resolve minimap memory leaks ([#7052](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7052)) ([f93960c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f93960c62cd5598882a98a4e6c6b78f6dbf9f77b))
- **modal:** do not run change detection when focusing element ([#7070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7070)) ([ffcb709](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffcb7095873a87243ff44edd3719ce2c04c6957e))
- **radio:** reduce change detection cycles ([#7068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7068)) ([b8cc94f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b8cc94feeb8517337d4df12f4bf737a7848aa04a))
- **resizable:** reduce change detection cycles ([#7036](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7036)) ([5cad154](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cad154496851e390296830dce7d2321092fd2fc))
- **select:** reduce change detections for `nz-select-top-control` ([#7038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7038)) ([d45f0ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d45f0abc4993002f1058c3f8753930591d886c9b))
- **upload:** do not trigger change detection for `nz-upload-btn` ([#7037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7037)) ([7e587d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e587d13b382150f8f98c5f58dead14dc3ba24a7))
- **upload:** previewing images should be cancellable when the component gets destroyed ([#7067](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7067)) ([8f21ef1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8f21ef1d79e3545d01ebb877f9e1a094f06f1a01))

## [12.0.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/12.0.1...12.0.2) (2021-11-04)

### Bug Fixes

- **core:** correct hidden behavior ([#6919](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6919)) ([987b1ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/987b1ca675282febb274991f4d8d52f58c623e8d)), closes [#6918](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6918)
- **pagination:** pre-ellipsis show in the wrong position ([#6793](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6793)) ([9700e89](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9700e89690f2a2a28e84a35f3e800f60d5d72ab1))
- **affix:** fix update position when target resize ([#6896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6896)) ([d18a8ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d18a8ae24a0a088de06101b1d0d060e84df29b15)), closes [#6764](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6764)
- **date-picker:** added missing type attributes for buttons ([#7013](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7013)) ([d69d374](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d69d37469bb260b1375d6005acb217ca4ec4215f)), closes [#7012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7012)
- **datepicker:** fixed opacity 0 on inline datepicker reopen ([#6910](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6910)) ([d392b2e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d392b2e95365a0ffec0fa5dcef39ba7f611b2432))
- **i18n:** update en_GB.ts translations ([#6982](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6982)) ([f89cb38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f89cb38a1c2a5b99460b837f001a39005212352d)), closes [#6979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6979)
- **modal:** footer `onClick` re-throw error in promise catch ([#6928](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6928)) ([3277d22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3277d22ec3368d7f28a5143a5cec44357dedcdb3))
- **popconfirm:** add nzOkDanger option for nz-popconfirm ([#6866](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6866)) ([d889e98](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d889e98e935f7e7c66e10068fd2665181a9e9975))
- **table:** show empty state regardless of loading value ([#6934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6934)) ([013beda](https://github.com/NG-ZORRO/ng-zorro-antd/commit/013bedaf9856931b37c01e9aa24cf63cdb1be9b8))
- **timepicker:** fix ok button + selection of default open value ([#6941](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6941)) ([daf9f57](https://github.com/NG-ZORRO/ng-zorro-antd/commit/daf9f5712c11a4b4fdbb1da1eab23c2667398e96))
- **timepicker:** fixed auto positioning picker ([#6939](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6939)) ([65fdbc8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65fdbc8a5442fed0d4b131ff8147b5b8f10f9f38))
- **tooltip:** fix tooltip for deeply wrapped focusable elements ([#6965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6965)) ([78c16a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/78c16a2794f5e5c2f5098c83ea540c88dd9d6d98)), closes [#6955](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6955)

### Performance Improvements

- **autocomplete:** resolve memory leak ([#6851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6851)) ([e61e350](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e61e350874d380cdc68bd6c8dee0f5de358c4c79))
- **breadcrumb:** do not re-enter the Angular zone when calling `navigate` ([#6850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6850)) ([830a1f2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/830a1f259e4b51ffcfb82f98974fc9ae52dbfef7))
- **button:** do not trigger change detections on click events ([#6849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6849)) ([85c79f6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85c79f652a022dee5c6f57042c856280cc6f23db))
- **core:** resolve memory leak ([#6852](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6852)) ([25eb0fe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/25eb0fe90cf981c0ddddceac8f98dfcef6f60f8f))
- **code-editor:** load Monaco only once ([#7033](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7033)) ([e1eafec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e1eafecaba7235faa8819cae2ab5607c41572b3c))
- **image:** resolve memory leak ([#6856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6856)) ([6744eb1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6744eb1ac836637563c8ffea1b864502721711d6))
- **select:** do not run change detection if the `triggerWidth` has not been changed ([#6858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6858)) ([055f4a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/055f4a12679a1538ada58d7d9460694f67b156f5))
- **table:** resolve leak within the `nz-table-fixed-row` ([#7034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7034)) ([cfa1ecd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cfa1ecdb419ec619a196f69cca50fbc92aa61134))
- **upload:** do not trigger change detection for `nz-upload-btn` ([#7032](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7032)) ([47f91c7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47f91c77a79ad85e36eb318617b12f548bb56b1f))

## [12.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/12.0.0...12.0.1) (2021-07-12)

### Bug Fixes

- **code-editor:** dispose the event listener when the component is destroyed ([#6847](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6847)) ([503c6f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/503c6f90b81aed268ec08ce301b8c71f3a479617))
- **code-editor:** resolve memory leak ([#6846](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6846)) ([6d43b6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d43b6c5a9ccf8603106716285a1c032608912d6))
- **code-editor:** re-enter the Angular zone only if the value has been changed ([##6845](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6845)) ([5c09948](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c09948ca5e0e70bf7e4d1b4246225999060a930))
- **drawer:** trigger change detection only if there are `nzOnViewInit` listeners ([#6841](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6841)) ([c5b5741](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5b5741a0ffaaf50b4e558faf99691977c967426))
- **icon:** resolve memory leak ([#6839](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6839)) ([bdc2a55](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bdc2a55e8421b49d80245d3a5a714adf38f58140))
- remove the default resize observer polyfill ([#6843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6843)) ([29d44af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29d44afb058cb5d78f236cdfa57be5018b49dc02)), closes [#6696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6696)

If you want to support older browsers, you can provide polyfill in the following way.

```ts
import { NzResizeObserverFactory } from 'ng-zorro-antd/cdk/resize-observer';
import ResizeObserver from 'resize-observer-polyfill';

@NgModule({
  providers: [
    {
      provide: NzResizeObserverFactory,
      useValue: {
        create(callback: ResizeObserverCallback): ResizeObserver | null {
          return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
        }
      }
    }
  ]
})
export class AppModule {}
```

## [12.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/11.4.2...12.0.0) (2021-07-11)

### Bug Fixes

- **pagination:** mark for check when the total number of pages changes ([#6780](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6780)) ([2f1f8dc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f1f8dcb1c7eb4f89b1ff21bf8c64d7f8a75f344))
- **pagination:** pagination in form will trigger submit ([#6744](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6744)) ([f77ab28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f77ab28341489e9df7f757294a6a5ad6030700f4))
- **cascader:** add nzClear functionality to cascader ([#6761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6761)) ([3dd9534](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dd9534d8059985dba3389fc52ea463bbf3381c5)), closes [#6751](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6751)
- **select:** focus input when selector is clicked ([#6786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6786)) ([1c9331a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c9331a4f8a32a91eaaf6128bdb335f26bd6fcab))
- **time-picker:** close time-picker after tabbing out ([#6602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6602)) ([0e53053](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e530538ee954ce6ccc5891c0556cfb338f00b56))
- **tree:** stop change url in firefox ([#6771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6771)) ([be20114](https://github.com/NG-ZORRO/ng-zorro-antd/commit/be20114f6b83f326045dd98b5ad3aa9fab61af03))
- **typography:** single line ellipsis style ([#6776](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6776)) ([e192a70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e192a70aa034913d87b00f863e27e0f6acc280de))

### Features

- **checkbox:** add nzId input ([#6813](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6813)) ([52235c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/52235c97aaf75802cca9e81c9071fa2bdfe0208e))
- **core:** support reset NZ_CONFIG inside component & overflow component ([#6601](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6601)) ([edd410a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/edd410ac8426c2fde490192125a66b0074227a87))
- **date-picker:** nz-range-picker support nzId ([#6814](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6814)) ([28074e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28074e1749a38a19cc64bd52aefc85d3e6f1a53b))
- **experimental/image:** add experimental image component ([#6590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6590)) ([7e2fba3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e2fba39354de78219be1237eea8edf19b5799e7))
- **popconfirm:** support `nzAutoFocus` ([#6256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6256)) ([91e5d49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91e5d49f83c8e833e70400c65b69a2e4787fc91d)), closes [#6249](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6249)
- **rate:** support customize character ([#6787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6787)) ([7163e36](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7163e360fc97d48cd718c65ffa301c0253801851))
- **steps:** steps support circular progress bar ([#6132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6132)) ([466a093](https://github.com/NG-ZORRO/ng-zorro-antd/commit/466a093d10da6d8996adc636447be3531c5d1d76)), closes [#5684](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5684)
- **timeline:** support `nzLabel` ([#6687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6687)) ([86c587d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/86c587d7be4b7b6e936cf50e2cafa4499d735407)), closes [#6682](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6682)

### BREAKING CHANGES

**button**

- `[nz-button][nzType="danger"]` input value are no longer supported, please use `[nz-button][nzDanger]` instead.

**modal**

- usage of `ng-content` has been removed, please use `<ng-template nzModalContent></ng-template>` instead.

**drawer**

- usage of `ng-content` has been removed, please use `<ng-template nzDrawerContent></ng-template>` instead.

**tree-view**

- `[nzNodeWidth]` has been removed, please use `[nzItemSize]` instead.

**nz-space-item**

- `nz-space-item, [nz-space-item]` has been removed, please use `<ng-template nzSpaceItem></ng-template>` instead.

## [11.4.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/11.4.1...11.4.2) (2021-06-08)

### Bug Fixes

- **\*:** arabic translations 'copied' & 'expand' ([#6675](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6675)) ([f9e7d23](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f9e7d2356c6841a7e7431d56fdf1b215f2620ac6))
- **autocomplete:** no reset status when no matching inputs ([#6685](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6685)) ([7199ad5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7199ad507fffa9af138be75a7ba61bb47b5fd13f)), closes [#6286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6286)
- **badge:** enable nzNoAnimation support ([#6717](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6717)) ([36c03e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c03e3453d80f36029d21b7ec611217411194b3))
- **modal:** `nzVisible` not updated when implicitly closed ([#6649](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6649)) ([5faac2c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5faac2c8146d14096f2181c912baa6050d10e21b)), closes [#6647](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6647) [#6320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6320)
- **slider:** processing value zero correctly ([#6729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6729)) ([62a86c0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62a86c05dec6e58435ed5375a0da00891519284c))
- **tabs:** fix `nzCentered` not working ([#6706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6706)) ([439ff0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/439ff0aae4147a1cb067a1c6b60013baa8142434))
- **tag:** missing styles on view engine ([#6738](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6738)) ([29c316b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29c316b6b2154b94b9faaf61036da5b07f2aef98)), closes [#6732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6732)
- **tree-view:** node indent line without mark change check ([#6736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6736)) ([215a278](https://github.com/NG-ZORRO/ng-zorro-antd/commit/215a2788bc2a0402a19f33c7052d87ceb81cb6c7)), closes [#6714](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6714)
- focus monitor cleanup ([#6562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6562)) ([32b3254](https://github.com/NG-ZORRO/ng-zorro-antd/commit/32b3254c298787685c5152fa26cb27d59cc91407))

## [11.4.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/11.4.0...11.4.1) (2021-04-22)

### Bug Fixes

- **\*:** create image using `document` method to avoid ReferenceError in SSR ([#6569](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6569)) ([d7b9291](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d7b9291dfd5f99cd3775245fd0e7cbef4f7141d0))
- **date-picker:** click outside not change value ([#6596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6596)) ([62e4bb6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62e4bb6a349def081492a7d59dccc75db4622de0)), closes [#6595](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6595)
- **date-picker:** not switch month panel when range is same month ([#6616](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6616)) ([bf4ae4d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bf4ae4dab34edcb616a1f085f1504e7333580a47))
- **date-picker:** time picker panel not scroll at first time ([#6604](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6604)) ([b97dfbe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b97dfbedaf6b0bc422ff895394e5d5a9343e51d8))
- **graph:** fix edge default style and wrong toggling group nodes ([#6615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6615)) ([c434ea9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c434ea9ce9a9299bf12a823c5bda1f5fe32ee82d))
- **i18n:** added property missing in ka_GE ([#6589](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6589)) ([825925c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/825925ce8189b8b343b9a4f441956f47e376ae49))
- **slider:** fix range slider not working for arrow keys ([#6612](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6612)) ([51f33e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51f33e6b4e4e71e3ac09cf5a77a255cb082924d8)), closes [#6586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6586)
- **typography:** add type="button" attribute to button element in nz-text-copy component ([#6606](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6606)) ([48a9714](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48a97147ed78d87a69b745b060b176a9e57e314f)), closes [#6605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6605)

## [11.4.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/11.3.0...11.4.0) (2021-04-08)

### Bug Fixes

- **table:** fix sort and filter when nzFrontPagination is false ([#6547](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6547)) ([097cb6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/097cb6c56b33358e9ef843dfe6a7ce4bd06daab5)), closes [#5457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5457)
- **date-picker:** close date-picker after tabbing out ([#6571](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6571)) ([21ded3f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21ded3fa94689d52e01a008ee2eb7c0c541b886b)), closes [#5844](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5844)
- **drawer:** content is attached before the drawer is opened ([#6581](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6581)) ([ac50a7b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac50a7bc2c4866dddefe4f79459fd2d677b8528c)), closes [#6381](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6381) [#6534](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6534)
- **space:** fix deprecated warning for nz-space-item ([#6549](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6549)) ([#6561](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6561)) ([f80a5bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f80a5bbd5755477c63c5d73929bcdfd0d07f2dfd))
- **tabs:** make remove icon of nz-tab-link clickable ([#6563](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6563)) ([3a68c10](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a68c106971270982280dd0d43a387cd1b016eb5))
- **tabs:** not scrolling to the selected tab after init ([#6580](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6580)) ([4ddd8fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4ddd8fb878641e603f9d79a79a9a7fde21b36e1a)), closes [#6579](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6579)

### Features

- **select:** support number as label ([#6538](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6538)) ([1f6ce76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f6ce7635fa1b20370620615e77fe5165f55fae6)), closes [#6535](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6535)

## [11.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/11.2.0...11.3.0) (2021-03-23)

### Bug Fixes

- **mention:** preserve white spaces when insert suggestions ([#6505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6505)) ([d5ed97e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d5ed97e4aeeeb0635487652b7f1ecceed7caa4f0)), closes [#6175](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6175)
- **tooltip:** detect trigger change ([#6470](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6470)) ([e8e7dc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e8e7dc35b75b67b2621ea690a93b20b5da755d8a)), closes [#6469](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6469)
- dropdown and autocomplete animations ([#6143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6143)) ([70da5a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70da5a2f078fc864d309089421349b32b4d46649)), closes [#6018](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6018)
- **pagination:** fix class name in NzPaginationItemComponent ([#6485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6485)) ([0e326e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e326e7c214b49d838ae071641d1b0f8c4e67840))
- **date-picker,core,i18n:** import date-fns by esm ([#6524](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6524)) ([fb4eeae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb4eeae9e6c3919d8c14c94f6225ace3510a0f64))
- **descriptions:** fix dom structure under vertical layout ([#6513](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6513)) ([ef0f3a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ef0f3a567f3feb135f21cf9c4e9e56468dcfc2d2))
- **modal:** fix incorrect assignment of 'nzFooter' ([#6468](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6468)) ([85ea273](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85ea2732e48d1de1e452be2176995a07c3ae8260)), closes [#6467](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6467)
- **rate:** fix invalid type of `nzCount` in `strictTemplates` ([#6457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6457)) ([4d28a60](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d28a60740740df79341d0c05c79debd9cce835e))
- **space:** add missing exports ([#6521](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6521)) ([e0073e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e0073e488969c97abd04f233b5cf8ab454c79604))
- **table:** virtual scroll bordered style ([#6493](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6493)) ([c2f44be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2f44bef7d07069dcb32f6b7f7cff8432ee621b5))
- **tooltip:** keep tooltip visibility when trigger is null ([#6489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6489)) ([0de0e6f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0de0e6f2424adde62e6869c9587602999cd534aa))

### Features

- **all:** global config for backdrop ([#6380](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6380)) ([ba80ec3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba80ec3695f92b658fb4b40dbc26fd56bea2f7fb)), closes [#6029](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6029) [#6177](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6177)
- **modal:** add nzModalTitle directive ([#6396](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6396)) ([25f6c27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/25f6c273179195c4db4e1a066bad610286a6620c)), closes [#4343](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4343) [#6337](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6337)
- **space:** add `nzSplit` support ([#6487](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6487)) ([c535f06](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c535f06369b2aba7cf55fc2b5300c0cccc6eae1d))

_Deprecated_

- space: `nz-space-item` in `nz-space` will be removed in 12.0.0, please use `*nzSpaceItem` instead.

## [11.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/11.1.0...11.2.0) (2021-02-26)

### Bug Fixes

- **18n:** adding new translations de_DE ([#6434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6434)) ([1c09fe1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c09fe15522c4d22691a7f30a66970c5cbbe67b6))
- **18n:** adding new translations es_ES ([#6421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6421)) ([6b878b9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b878b9ac3519ea669b8e010ebef960b392721ef))
- **docs:** fix dependabot alert ([#6428](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6428)) ([2fbbe94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2fbbe94cfa5923565ce61ad8f29326209ba84ab1))
- **dropdown:** close menu when click again ([#6353](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6353)) ([#6354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6354)) ([cd90349](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd90349ff60db343b35dd1e2f47b134aeb16948d))
- **grid:** `nzGutter` support string type ([#6450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6450)) ([ec03c7f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec03c7fb09845d5d8320801b26df549046ca447c))
- **grid,menu,radio,table:** fix memory leak problem ([#6408](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6408)) ([94607a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/94607a0afacafdeccd942a525b3c5fce6491df7a))
- **input:** fix [nzAutosize]="true" ([#6409](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6409)) ([8ca1e5a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8ca1e5aa6c5f02bdc308e60a9b5d2c9b602406ea))
- **message:** avoid flicker when window close ([#6296](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6296)) ([#6370](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6370)) ([772e76c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/772e76cc23506cb368e7c717f409e3c6ef5351c6))
- **table:** fix table filter ([#6384](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6384)) ([#6385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6385)) ([ad01c8f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad01c8f9deb263330389bc8b9b9f4c84b6ecbf2b))
- **tree-view:** correct API typo ([#6386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6386)) ([27a1c4e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/27a1c4e620e8342594f152fba65c5105e991c369))
- **schematics:** fix `add-icon-assets` schema path ([#6404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6404)) ([340670d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/340670d8f1d2277c6da64866dfe16f94d3fdac80))

### Features

- **date-picker:** add `nzInline` property ([#6436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6436)) ([4d80873](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d808734343178abfc8e1baac90a1539b05b4c60))
- **time-picker:** support updating OK and Now button text ([#6410](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6410)) ([ef3af58](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ef3af58e23d1e12a1b3cccf547e990550a54fcde))
- **time-picker,select,tree-select:** support `nzId` ([#6379](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6379)) ([85d423d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85d423d77468e493c71220374bfac676dfc9505c))

### Performance Improvements

- **select:** avoid reflow when select init ([#6452](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6452)) ([342d2d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/342d2d15bb1fb58b0fbd36c7a2bb8af183ef84c9))

## [11.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/11.0.2...11.1.0) (2021-01-22)

### Bug Fixes

- **table:** fix table `nzBordered` ([#6367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6367)) ([d6ca800](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6ca8002ff1bc1482312f9a6340a453466627c01)), closes [#6135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6135) [#6254](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6254)
- **typography:** edit area cannot get the content ([#6369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6369)) ([814ef92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/814ef925f3b2c046309c388bc1b98506779a3eaf))

### Features

- **date-picker:** support nzId ([#6242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6242)) ([#6246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6246)) ([1e9f8bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e9f8bd9d661ad00cfde7642118127e93247000b))
- **modal:** add nzCentered for modal ([#6333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6333)) ([8fd4df6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8fd4df66d858066dfafd3854dba339124fca866c)), closes [#6327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6327)
- **table:** add support for ReadonlyArray ([#6156](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6156)) ([9d67d0b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d67d0beac80032d07a56cd57829f3bd41da9b05))
- **table:** support nzPaginationType property ([#5986](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5986)) ([61ca6e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/61ca6e232a8a9625cd658abfe184ac45f2729ddf))
- **upload:** support `NzUploadFile` parameter of `nzIconRender` ([#6283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6283)) ([a949470](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a949470af22b9c212f96bef43ad1ef47b42b75e0)), closes [#6279](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6279)

## [11.0.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/11.0.1...11.0.2) (2021-01-18)

### Bug Fixes

- **carousel:** fix carousel under rtl ([#6336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6336)) ([f6a844b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f6a844b468d24ffcccb2c93e39367276778416a3)); ([#6318](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6318)) ([bef7e29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bef7e29a3f994074abbea10512b8ec1ce213110e)), closes [#6301](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6301)
- **date-picker:** remove wrong warning message ([#6335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6335)) ([cf10a03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf10a03a7eb161b96ca01f47abfe926b1033854f)), closes [#6310](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6310)
- **date-picker:** start and end month displays unreasonable ([#6339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6339)) ([7f47698](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f476984a59fe4b5097d13a4ef6768dd63b6881e)), closes [#6308](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6308) [#6142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6142) [#5992](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5992)
- **descriptions:** fix `nzBordered` in the global config ([#6348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6348)) ([eb20970](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb2097036f16c66ae351d2a099eb12e869ede5b6)), closes [#6331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6331)
- **image:** add missing entry components ([#6300](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6300)) ([caad718](https://github.com/NG-ZORRO/ng-zorro-antd/commit/caad718e23f7617fc99aa4aa29928a9db55a1e76)), closes [#6299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6299)
- **table:** memory leak ([#6325](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6325)) ([7f267b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f267b6ebc9c3259e6824702cad36382cc7df63e))

## [11.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/11.0.0...11.0.1) (2020-12-31)

### Bug Fixes

- **carousel:** remove unused patch style ([#6269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6269)) ([3a70a2d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a70a2dcf98ec13946e388649d4901a13dd5a1ba))
- **collapse:** animation cannot be disabled ([#6280](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6280)) ([16fa890](https://github.com/NG-ZORRO/ng-zorro-antd/commit/16fa890bf18d8a7f7d3bb9f63ae8e0cace057226))
- **image:** add missing imported modules ([#6273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6273)) ([20db5d4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/20db5d4ab1bae943539386559d8188e94cc49127)), closes [#6271](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6271)
- **image:** image fit content when drag released ([#6262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6262)) ([07ae66a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07ae66a60285f9debf7176684ff66335f97c5a31))
- **modal:** mask is not set with the `nzZindex` property ([#6294](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6294)) ([54d294a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54d294a6bec56494992fefe6b2898f7af957df3b)), closes [#6288](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6288)
- **select:** change order for clear and arrow ([#6245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6245)) ([c822073](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c8220737c25bf4670a697729eaadc8e762e2404f)), closes [#5989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5989)
- **slider:** fix slider style + reverse marks if reversed slider ([#6006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6006)) ([fa06415](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa064156ef59673556a62d741ae640494eefae32))
- **table:** data is not updated when pagination exists ([#6298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6298)) ([1f2ab41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f2ab41fae89d0e674102c12b3960bfc7bddebab)), closes [#6272](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6272)
- **tabs:** fix clickable area of the anchor element ([#6278](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6278)) ([0694079](https://github.com/NG-ZORRO/ng-zorro-antd/commit/069407959850995f1a5ecbef0d71fa00c69b99a5))
- **tabs:** index only changed by router event when nzLinkRouter ([#6293](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6293)) ([ca1b861](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca1b861b410f92a60f214f34b39c2c5d3ae9ea63))

## [11.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/10.2.1...11.0.0) (2020-12-21)

## Highlights

### RTL Support

Set the dir attribute on the document body or html tag.

```html
<html dir="rtl"></html>
```

Or use Angular CDK bidi module for bi-directional.

```typescript
import { BidiModule } from '@angular/cdk/bidi';
```

Super thanks to [@saeedrahimi](https://github.com/saeedrahimi) [@hdm91](https://github.com/hdm91) [@HDaghash](https://github.com/HDaghash) [@hmdnikoo](https://github.com/hmdnikoo) for contributing this!

### New Image component

Used to handle progressive loading of images; failure fallback, and preview of image(s).

Super thanks to [@stygian-desolator](https://github.com/stygian-desolator) for contributing this!

### New Graph experimental component

Support customized multi-level graph rendering.

### New Tree View component

The previous Tree already contains many common features, and to handle more customizable scenarios we developed a more basic Tree View component with higher ability of customization and better control over performance.

### New built-in Aliyun theme

```less
@import '~ng-zorro-antd/ng-zorro-antd.aliyun.less';
```

### Bug Fixes

- **tree:** fix tree styles ([#6198](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6198)) ([a481a15](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a481a156278047472e1324b87df896b37246a0ed))
- **button:** only warn about deprecated value when used ([#6193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6193)) ([40c644a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40c644aa8fe92ccfaf26220a872b0995874b2569)), closes [#6191](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6191) [#6187](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6187)
- **i18n:** fix Ukrainian i18n file ([#6236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6236)) ([551c7a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/551c7a24c1ae0cec9f15f61bcaa12b9057de4bd0))
- **image:** fix RTL direction and props ([#6227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6227)) ([3978e0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3978e0f48c3924fdbfda54e69438ea794b29a8ec))
- **list:** fix template rendering order ([#6232](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6232)) ([4324011](https://github.com/NG-ZORRO/ng-zorro-antd/commit/43240113c66c583e806f87b84b669a6ddb1faffe)), closes [#6229](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6229)
- **modal:** fix `nzOkDanger` in confirm mode ([#6214](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6214)) ([ebe2869](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ebe2869d1b9459a8e02e3993d8a93483fa531f62))
- **select:** fix XSS vulnerabilities ([#6222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6222)) ([a393b89](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a393b89bf82eece5b0586592d709629865b27b3a)), closes [#6209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6209)
- **table:** false nzFrontPagination hides pagination ([#6201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6201)) ([8029ef4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8029ef47d6eeaf43aa5875f8a8034205dc9c69bb)), closes [#6196](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6196)
- **time-picker:** placeholder not update with i18n changes ([#6069](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6069)) ([f34840b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f34840bf2a4c5eb2d2facba0fa00068f6fa2bd5e))

### Features

- **all:** add RTL support to all ng-zorro-antd ([#4703](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4703)) ([860dfed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/860dfeddcf02fc7e775615244827cb224d1aa8be)), closes [#4704](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4704) [#1762](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1762) [#5261](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5261)
- **date-picker:** add `nzShowNow` ([#6160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6160)) ([99e3117](https://github.com/NG-ZORRO/ng-zorro-antd/commit/99e3117b70853c0aa4f6b4f475b031734840f10f)), closes [#6146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6146)
- **graph:** add graph component ([#6053](https://github.com/NG-ZORRO/ng-zorro-antd/pull/6053)) ([e69303f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e69303f828132cb62263867abe8afefc600f15f6))
- **image:** add image component ([#6154](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6154)) ([83dfdf9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/83dfdf97b5a716e1cc9424d645dfc6713fe4ba64))
- **tree-view:** add tree-view component ([#6161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6161)) ([05d58de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/05d58de21f8a3e4d3e2bf4d4333de95a2c71e1ed)), closes [#5976](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5976) [#5809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5809) [#5739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5739) [#5736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5736) [#5519](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5519) [#5446](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5446) [#5152](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5152) [#4694](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4694) [#4472](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4472) [#3832](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3832) [#2785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2785) [#2744](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2744) [#6199](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6199)
- **schematics:** make ng-add schematics chainable ([#6203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6203)) ([d1e76f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d1e76f3d8d41b0e3b9f01887e4805ff43f48d0fa))

### BREAKING CHANGES

**date-picker**

- `[nzMode]` does not support `NzDateMode[]` type any more, please adjust it manually.

**modal**

- `[nzGetContainer]` has been removed, please remove it manually.
- `open` method in `NzModalRef` has been removed, please remove it manually.

**tabs**

- `[nzShowPagination]` input has been removed, please remove it manually.
- `(nzOnPrevClick)` output has been removed, please remove it manually.
- `(nzOnNextClick)` output has been removed, please remove it manually.
- `a[nz-tab-link]` selector has been removed, please use `ng-template[nzTabLink] > a[nz-tab-link]` instead.

## [10.2.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/10.1.2...10.2.1) (2020-12-11)

### Bug Fixes

- **date-picker,time-picker:** prevent losing input focus ([#6171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6171)) ([a055905](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a055905)), closes [#6170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6170)
- **description:** fix label colon not working ([#6155](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6155)) ([47065f6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47065f6)), closes [#6151](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6151)
- **mention:** scroll to focus when arrow up or down ([#6137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6137)) ([13f2281](https://github.com/NG-ZORRO/ng-zorro-antd/commit/13f2281)), closes [#5995](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5995)
- **modal:** add nzOkDanger to avoid old button style ([#6157](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6157)) ([f22024e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f22024e)), closes [#6111](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6111)
- **select:** activate first item or first selected item ([#6148](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6148)) ([a456c93](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a456c93)), closes [#6041](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6041)
- **table:** showPagination in ngIf when nzHideOnSinglePage ([#6133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6133)) ([fbe13c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fbe13c2)), closes [#6080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6080)
- **tabs:** keyboard events in extra areas trigger navigation ([#6173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6173)) ([375366f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/375366f)), closes [#6139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6139)
- **transfer:** fix only filtered data in `nzRenderList` ([#6169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6169)) ([17d43fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/17d43fb)), closes [#5641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5641)

## [10.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/10.1.2...10.2.0) (2020-12-01)

### Bug Fixes

- **cascader:** restore its value after cancel search ([#6088](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6088)) ([22ddc60](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22ddc60))
- **cascader:** scroll active options into view ([#6082](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6082)) ([b42b51f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b42b51f)), closes [#6037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6037)
- **date-picker:** clear wrong date input after closing panel ([#6079](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6079)) ([edffdee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/edffdee)), closes [#6070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6070)
- **date-picker:** display error in dynamic switching `nzMode` ([#6125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6125)) ([220a590](https://github.com/NG-ZORRO/ng-zorro-antd/commit/220a590)), closes [#6052](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6052)
- **descriptions:** fix DOM structure ([#6112](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6112)) ([5e42d71](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e42d71))
- **tree:** fix indent line styles ([#6123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6123)) ([2f8edbc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f8edbc))
- **tree-select:** selector cannot focus ([#6073](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6073)) ([032bd01](https://github.com/NG-ZORRO/ng-zorro-antd/commit/032bd01)), closes [#6063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6063)
- **upload:** fix prevent trigger submit when click list button ([#6096](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6096)) ([123982f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/123982f)), closes [#6095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6095)

### Features

- **drawer:** add `nzDrawerContent` directive ([#6085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6085)) ([6fc0683](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fc0683))
- **drawer:** support nzVisible two-way binding ([#6013](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6013)) ([caab8be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/caab8be)), closes [#5999](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5999)
- **input:** textarea supports character count ([#6104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6104)) ([601ab50](https://github.com/NG-ZORRO/ng-zorro-antd/commit/601ab50)), closes [#5907](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5907)
- **modal:** add `nzModalContent` directive ([#6081](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6081)) ([6594414](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6594414))
- **pagination:** support global config ([#6043](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6043)) ([3c55b7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c55b7c)), closes [#6042](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6042)
- **steps:** supports enable and disable ([#6101](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6101)) ([b87e72d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b87e72d)), closes [#5579](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5579)

_Deprecated_

- modal
  - Usage `<ng-content></ng-content>` is deprecated, which will be removed in 12.0.0. Please instead use `<ng-template nzModalContent></ng-template>` to declare the content of the modal.
- drawer
  - Usage `<ng-content></ng-content>` is deprecated, which will be removed in 12.0.0. Please instead use `<ng-template nzDrawerContent></ng-template>` to declare the content of the drawer.

## [10.1.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/10.1.1...10.1.2) (2020-11-16)

### Bug Fixes

- **i18n:** include missing language exports ([#6061](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6061)) ([6543a80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6543a80))
- **cascader:** fix broken nzChangeOnSelect ([#6049](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6049)) ([1575bae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1575bae)), closes [#6048](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6048)
- **code-editor:** memorize cursor position and selections ([#6044](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6044)) ([84f520d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84f520d)), closes [#6038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6038)
- **typography:** ellipsis does not work with copy action ([#6058](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6058)) ([858fff9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/858fff9)), closes [#6057](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6057)

## [10.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/10.1.0...10.1.1) (2020-11-09)

### Bug Fixes

- **breadcrumb:** patch last-child's style indule a is included ([#5994](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5994)) ([50f0744](https://github.com/NG-ZORRO/ng-zorro-antd/commit/50f0744)), closes [#5942](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5942)
- **cascader:** menu closing behavoir ([#6023](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6023)) ([22aea7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22aea7e)), closes [#6022](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6022)
- **cascader:** search bar styles error ([#6030](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6030)) ([9c4424f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9c4424f)), closes [#6020](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6020)
- **select:** dropdown can be opened when disabled ([#6008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6008)) ([79c52ea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79c52ea)), closes [#6005](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6005) [#6007](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6007)
- **tabs:** `nzTabBarGutter` is not work in vertical position ([#5998](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5998)) ([516bf97](https://github.com/NG-ZORRO/ng-zorro-antd/commit/516bf97)), closes [#5396](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5396)
- **tabs:** ink-bar does not render correctly in some cases ([#6016](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6016)) ([8af418b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8af418b)), closes [#6009](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6009) [#4802](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4802) [#3999](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3999)

## [10.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/10.0.2...10.1.0) (2020-10-30)

### Bug Fixes

- **form:** remove @Host so child components recieve autotips ([#5962](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5962)) ([705d6d8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/705d6d8))
- **select:** input search not work in IE11 ([#5953](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5953)) ([5dc1ff3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5dc1ff3)), closes [#5645](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5645) [#4296](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4296)
- **select:** the ESC keydown event not handled correctly ([#5973](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5973)) ([d898cce](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d898cce)), closes [#5965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5965)
- **select:** title not display ([#5978](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5978)) ([fd77cd4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd77cd4)), closes [#5281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5281)
- **tabs:** link is not active on the whole tab ([#5954](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5954)) ([5c661c5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c661c5)), closes [#5857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5857)
- **time-picker:** hidden clear icon when disabled ([#5990](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5990)) ([761cf40](https://github.com/NG-ZORRO/ng-zorro-antd/commit/761cf40))
- **upload:** ensure i18n$ is defined on unsubscribe ([#5971](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5971)) ([b067e7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b067e7e))

### Features

- **avatar:** add avatar group component ([#5916](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5916)) ([2dc8d98](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2dc8d98)), closes [#5882](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5882)
- **avatar:** support for set gap ([#5920](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5920)) ([f3f1aa9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f3f1aa9)), closes [#5883](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5883)
- **back-top:** add `nzDuration` property ([#5892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5892)) ([b256461](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b256461)), closes [#5887](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5887)
- **cascader:** support suffix icon & expand icon ([#5899](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5899)) ([d235589](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d235589)), closes [#5885](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5885)
- **date-picker:** add `nzBorderless` ([#5975](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5975)) ([25e41fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/25e41fa)), closes [#5680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5680) [#4967](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4967)
- **descriptions:** add extra property ([#5859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5859)) ([846331e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/846331e)), closes [#5855](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5855)
- **form:** `nz-form-label` support `nzFormTooltip` ([#5957](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5957)) ([4a00b69](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4a00b69)), closes [#5905](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5905)
- **form:** support a fallback locale for validation tips ([#5967](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5967)) ([c01e20b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c01e20b)), closes [#5917](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5917)
- **menu:** add danger style ([#5932](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5932)) ([5c19bbd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c19bbd)), closes [#5881](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5881)
- **tooltip:** add nzTooltipColor ([#5896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5896)) ([643bd03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/643bd03)), closes [#5884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5884)
- **tooltip:** enable custom placements ([#5861](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5861)) ([0fce47e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0fce47e)), closes [#5733](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5733)
- **typography:** support custom icons and tooltips ([#5911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5911)) ([2d4cbb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d4cbb0)), closes [#5888](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5888)
- **typography:** support success type ([#5915](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5915)) ([93c0d46](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93c0d46)), closes [#5906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5906)

## [10.0.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/10.0.1...10.0.2) (2020-10-16)

### Bug Fixes

- **code-editor:** only emit update if value changed ([#5933](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5933)) ([d8c9b4d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d8c9b4d)), closes [#5869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5869)
- **pagination:** fix shoule be only allowed number ([#5895](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5895)) ([69a1205](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69a1205)), closes [#5668](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5668)
- **select:** accept 0 value on enter ([#5904](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5904)) ([574fdf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/574fdf0))
- **slider:** fix slider precision when step is decimal ([#5862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5862)) ([dcc743a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcc743a)), closes [#5699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5699)
- **spin:** make delay behave more accurately ([#5930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5930)) ([5c901a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c901a0)), closes [#5926](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5926) [#5928](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5928)
- **tooltip:** fix mouse leave overlay not obey delaying ([#5868](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5868)) ([6b5fdee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b5fdee)), closes [#5713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5713)

## [10.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/10.0.0...10.0.1) (2020-10-09)

### Bug Fixes

- **breadcrumb:** fix breadcrumbs not returned ([#5863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5863)) ([1e3fea2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e3fea2)), closes [#4751](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4751)
- **code-editor:** run value changes in Angular zone ([#5872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5872)) ([3bbed21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bbed21))
- **date-picker:** years which contain disabled date can be selected now ([#5804](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5804)) ([3ba0366](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ba0366)), closes [#5633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5633) [#3425](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3425) [#5655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5655)
- **date-picker,time-picker:** open the panel wrongly in IE11 ([#5841](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5841)) ([89aaa79](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89aaa79)), closes [#5562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5562)
- **modal:** no error stacks when `nzOnOk/nzOnCancel` is rejected ([#5561](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5561)) ([6a4bddd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a4bddd)), closes [#5321](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5321)
- **upload:** fix upload list style of picture card type ([#5851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5851)) ([9fda318](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9fda318)), closes [#5850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5850)

## [10.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.3.0...10.0.0) (2020-09-28)

### Bug Fixes

- **tree:** fix nzBlockNode not work ([#5507](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5507)) ([5337652](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5337652))
- **breadcrumb:** fix auto-generated with lazy modules ([#5670](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5670)) ([932d92f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/932d92f)), closes [#5613](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5613) [#5615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5615)
- **carousel:** support SSR ([#5671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5671)) ([65b44aa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65b44aa)), closes [#4292](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4292)
- **code-editor:** init event never emit when using static loading ([#5677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5677)) ([b946742](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b946742))
- **date-picker:** modify date-fns week-year format ([#5753](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5753)) ([4911e36](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4911e36)), closes [#5327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5327)
- **date-picker:** nzCalendarChange not work when clicking ok ([#5790](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5790)) ([c9426f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9426f0)), closes [#5782](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5782)
- **date-picker:** open the panel wrongly in IE11 ([#5643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5643)) ([0649ceb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0649ceb)), closes [#5562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5562)
- **date-picker:** window is not defined ([#5640](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5640)) ([f5899ad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f5899ad)), closes [#5630](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5630)
- **form:** optimize code to increase robustness ([#5550](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5550)) ([fdf085b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdf085b))
- **mention:** not emit nzOnSearchChange when value is empty ([#5729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5729)) ([4cc14ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cc14ba)), closes [#5722](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5722)
- **modal:** change back to FocusTrapFactory ([#5596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5596)) ([9805620](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9805620)), closes [#5591](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5591)
- **progress:** fix value not updated when is steps ([#5676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5676)) ([3eecc44](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3eecc44)), closes [#5585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5585)
- **select:** arrow icon can be used when not using single-select ([#5785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5785)) ([bb8677c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb8677c)), closes [#5575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5575)
- **select:** cursor abnormal in nz-select with nzDisabled ([#5716](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5716)) ([0d1f027](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d1f027)), closes [#5709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5709)
- **select:** display IME input completely ([#5657](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5657)) ([111721a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/111721a))
- **select:** fix click arrow open ([#5784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5784)) ([2d3a49c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d3a49c))
- **slider:** fix reverse slider value with min and max ([#5814](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5814)) ([fa46a79](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa46a79))
- **style:** fix 4.6.1 sync style ([#5727](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5727)) ([b5f96ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5f96ca))
- **tabs:** fix clickable area of tab-link ([#5708](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5708)) ([57962e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/57962e1)), closes [#5696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5696)
- **tabs:** fix dropdown style ([#5659](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5659)) ([8415a70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8415a70))
- **tabs:** not emit click event from dropdown menu ([#5639](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5639)) ([201ef52](https://github.com/NG-ZORRO/ng-zorro-antd/commit/201ef52))
- **tabs:** router link content projection error ([#5663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5663)) ([47050b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47050b0))
- **tabs:** tab-link cannot be disabled ([#5759](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5759)) ([1afabd4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1afabd4)), closes [#5549](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5549) [#5543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5543)
- **time-picker:** input value change not work ([#5770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5770)) ([31ca2da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31ca2da)), closes [#5678](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5678) [#5741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5741) [#4934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4934)
- **tooltip:** enable cdk push ([#5542](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5542)) ([55ec1cd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/55ec1cd)), closes [#1825](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1825)
- **tree-select:** not clear search value when dropdown close ([#5761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5761)) ([602ea93](https://github.com/NG-ZORRO/ng-zorro-antd/commit/602ea93)), closes [#5664](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5664)
- **tree-select:** should be not clearable when disabled or unselected ([#5769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5769)) ([baede4a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baede4a)), closes [#5603](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5603)

### Code Refactoring

- **anchor:** remove deprecated APIs for v10 ([#5776](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5776)) ([e50d530](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e50d530))
- **cascader:** remove deprecated APIs for v10 ([#5778](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5778)) ([7e64e4c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e64e4c))
- **code-editor:** remove deprecated APIs for v10 ([#5798](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5798)) ([353e657](https://github.com/NG-ZORRO/ng-zorro-antd/commit/353e657))
- **date-picker:** remove deprecated APIs for v10 ([#5793](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5793)) ([5159900](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5159900))
- **form,grid:** remove deprecated APIs for v10 ([#5788](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5788)) ([b215efa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b215efa))
- **notification:** remove deprecated APIs for v10 ([#5779](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5779)) ([e5ed4d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5ed4d2))
- **table:** remove deprecated APIs for v10 ([#5792](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5792)) ([132e425](https://github.com/NG-ZORRO/ng-zorro-antd/commit/132e425))
- **tooltip, popover, popconfirm:** change deprecated APIs for v10 ([#5817](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5817)) ([dc3088c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dc3088c))
- **tree:** remove deprecated APIs for v10 ([#5789](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5789)) ([b378cb7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b378cb7))
- **upload:** remove deprecated APIs for v10 ([#5774](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5774)) ([9f5baae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f5baae))

### Features

- **modal:** support params and modelRef when footer is template ([#5551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5551)) ([07d91a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07d91a1)), closes [#5506](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5506)
- **breadcrumb:** add `nzRouteLabelFn` property ([#5523](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5523)) ([#5545](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5545)) ([81ef791](https://github.com/NG-ZORRO/ng-zorro-antd/commit/81ef791))
- **button:** support text type ([3f5d10b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f5d10b))
- **card:** support nzBorderless ([#5796](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5796)) ([6e4419c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e4419c))
- **collapse:** support nzGhost property ([1a408ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a408ee))
- **date-picker:** add `open` and `close` methods ([#5777](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5777)) ([be6eda4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/be6eda4)), closes [#3352](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3352) [#5771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5771)
- **date-picker:** add week month year range ([#5832](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5832)) ([0725d88](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0725d88)), closes [#5742](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5742)
- **divider:** support nzPlain property ([d5232ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d5232ac))
- **drawer:** add `nzFooter` property ([#4618](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4618)) ([#5553](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5553)) ([2cd9e12](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2cd9e12))
- **drawer:** support `[nzCloseIcon]` ([#5546](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5546)) ([aa984f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa984f7))
- **input:** support borderless ([#5781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5781)) ([6e7877b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e7877b))
- **pipes:** add pipes ([#4812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4812)) ([e03e65b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e03e65b))
- **skeleton:** add nzRound prop and skeleton-element image ([#5710](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5710)) ([aa2ea54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa2ea54))
- **space:** support `nzAlign` ([#5299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5299)) ([2febb92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2febb92))
- **table:** fix scroll bar displays always even unnecessary ([#5794](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5794)) ([71be33a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71be33a)), closes [#5405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5405)
- **table:** support nzOuterBordered ([#5795](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5795)) ([471b0bf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/471b0bf))
- **tabs:** support (nzContextmenu) event ([#5749](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5749)) ([76931ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/76931ac)), closes [#5712](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5712)
- **tag:** support icon in tag ([#5801](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5801)) ([b909354](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b909354)), closes [#5628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5628) [#4581](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4581)
- **tree-select:** support virtual scroll ([#5760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5760)) ([1f2d816](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f2d816)), closes [#5589](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5589)
- **typography:** support keyboard and link types ([#5355](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5355)) ([2d6fa62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d6fa62))

### BREAKING CHANGES

**tooltip, popover, popconfirm:**

- nz-tooltip
  - `[nzOverlayStyle]` has been removed, use `[nzTooltipOverlayStyle]` instead.
  - `[nzOverlayClassName]` has been removed, use `[nzTooltipOverlayClassName]` instead.
  - `[nzMouseLeaveDelay]` has been removed, use `[nzTooltipMouseLeaveDelay]` instead.
  - `[nzMouseEnterDelay]` has been removed, use `[nzTooltipMouseEnterDelay]` instead.
  - `(nzVisibleChange)` has been removed, use `(nzTooltipVisibleChange)` instead.
- nz-popover
  - `[nzOverlayStyle]` has been removed, use `[nzPopoverOverlayStyle]` instead.
  - `[nzOverlayClassName]` has been removed, use `[nzPopoverOverlayClassName]` instead.
  - `[nzMouseLeaveDelay]` has been removed, use `[nzPopoverMouseLeaveDelay]` instead.
  - `[nzMouseEnterDelay]` has been removed, use `[nzPopoverMouseEnterDelay]` instead.
  - `(nzVisibleChange)` has been removed, use `(nzPopoverVisibleChange)` instead.
- nz-popconfirm
  - `[nzOverlayStyle]` has been removed, use `[nzPopconfirmOverlayStyle]` instead.
  - `[nzOverlayClassName]` has been removed, use `[nzPopconfirmOverlayClassName]` instead.
  - `[nzMouseLeaveDelay]` has been removed, use `[nzPopconfirmMouseLeaveDelay]` instead.
  - `[nzMouseEnterDelay]` has been removed, use `[nzPopconfirmMouseEnterDelay]` instead.
  - `(nzVisibleChange)` has been removed, use `(nzPopconfirmVisibleChange)` instead.

**code-editor:**

- `NzCodeEditorService.updateDefaultOption` has been removed, use `NzConfigService.set` instead.
- Inject token `NZ_CODE_EDITOR_CONFIG` has been removed, use `NZ_CONFIG` instead.

**date-picker:**

- `NZ_DATE_FNS_COMPATIBLE` has been removed. Please migrate to date-fns v2 manually.
- nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker
  - `[nzClassName]` has been removed, use `ngClass` instead.
  - `[nzStyle]` has been removed, use `ngStyle` instead.

**table:**

- `th[nzSort]` has been removed, use `th[nzSortOrder]` instead.
- `th(nzSortChange)` has been removed, use `th(nzSortOrderChange)` instead.
- `th(nzSortChangeWithKey)` has been removed. Please manually remove it.
- `thead(nzSortChange)` has been removed, use `thead(nzSortOrderChange)` instead.
- `thead[nzSingleSort]` and `th[nzSortKey]` has been removed. Please manually change to `th[nzSortFn]`.

**form,grid:**

- `nz-form-item[nzFlex]` has been removed. Please manually remove this input.
- `nz-form-item[nzType]` has been removed. Please manually remove this input.
- `nz-row[nzType]` has been removed. Please manually remove this input.

**tree:**

- `NzTreeNode.isAllChecked` has been removed, use `NzTreeNode.isChecked` instead.
- `NzTreeNode.setSelected(boolean)` has been removed, use `NzTreeNode.isSelected = boolean` instead.

**notification:**

- `NzNotificationDataFilled` has been removed, use `NzNotificationRef` instead.
- `NzNotificationDataOptions.nzPosition` has been removed, use `NzNotificationDataOptions.nzPlacement` instead.

**anchor:**

- `nzTarget` has been removed, use `nzContainer` instead.

**cascader:**

- `CascaderOption` has been removed, use `NzCascaderOption` instead.
- `CascaderSearchOption` has been removed, use `NzCascaderSearchOption` instead.

**upload:**

- `UploadType` has been removed, use `NzUploadType` instead.
- `UploadListType` has been removed, use `NzUploadListType` instead.
- `UploadFile` has been removed, use `NzUploadFile` instead.
- `UploadChangeParam` has been removed, use `NzUploadChangeParam` instead.
- `ShowUploadListInterface` has been removed, use `NzShowUploadList` instead.
- `UploadTransformFileType` has been removed, use `NzUploadTransformFileType` instead.
- `UploadXHRArgs` has been removed, use `NzUploadXHRArgs` instead.

## [9.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.2.2...9.3.0) (2020-07-09)

### Bug Fixes

- **config:** fix empty check ([#5537](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5537)) ([fd979f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd979f7))
- **date-picker:** nzDateRender render incorrectly ([#5529](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5529)) ([fa7c7b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa7c7b4))
- **i18n:** export missing languages from public-api ([#5515](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5515)) ([57b1180](https://github.com/NG-ZORRO/ng-zorro-antd/commit/57b1180)), closes [#5510](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5510)
- **list:** nz-list-item-actions rendered nothing ([#5465](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5465)) ([c126035](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c126035)), closes [#5393](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5393)
- **select:** fix select scroll render buffer ([#5536](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5536)) ([089421c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/089421c)), closes [#5456](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5456)
- **table:** fix table filter false or 0 error ([#5535](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5535)) ([56f052c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/56f052c)), closes [#5505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5505)
- **table:** fix table no data colSpan ([#5533](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5533)) ([7f133af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f133af)), closes [#5509](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5509) [#5481](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5481)
- **tooltip:** replace public api with more specific ones ([#5449](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5449)) ([a165eda](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a165eda)), closes [#5365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5365)
- **upload:** fix `uploadError` of undefined ([#5476](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5476)) ([71218d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71218d1)), closes [#5472](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5472)

### Features

- **datapicker:** add [nzInputReadOnly] ([#4534](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4534)) ([#5488](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5488)) ([13875cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/13875cb))
- **drawer:** support get component instance for content ([#5498](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5498)) ([bf160b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bf160b6)), closes [#5489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5489) [#3283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3283)
- **popconfirm:** add `nzPopconfirmShowArrow` property ([#5361](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5361)) ([#5483](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5483)) ([516e02d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/516e02d))
- **resizable:** add `nzDisabled` property ([#5475](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5475)) ([4d44d2e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d44d2e))
- **timeline:** support custom position ([#5478](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5478)) ([12e6b6f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/12e6b6f)), closes [#5470](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5470)
- **tooltip:** add more specific api ([#5449](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5449)) ([#5512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5512)) ([352e5e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/352e5e7))
- **upload:** add `nzPreviewIsImage` property ([#5525](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5525)) ([e55a586](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e55a586)), closes [#5520](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5520) [#4990](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4990)

## [9.2.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.2.1...9.2.2) (2020-06-23)

### Bug Fixes

- **datepicker:** not open panel when input change([#5466](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5466)) ([aca104c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aca104c)), closes [#5284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5284) [#5411](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5411)
- **modal:** throw an error when autofocus on the confirm-mode ([#5462](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5462)) ([6a26143](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a26143)), closes [#5454](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5454)

## [9.2.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.2.0...9.2.1) (2020-06-17)

### Bug Fixes

- **i18n:** some locales compiles error ([#5445](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5445)) ([e9ef9f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e9ef9f3))

## [9.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.1.2...9.2.0) (2020-06-16)

### Bug Fixes

- **affix,anchor:** wrong value is set when the initial value is non-number ([#5277](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5277)) ([1c72939](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c72939))
- **tree:** fix nzCheckStrictly and selected keys bug ([#5431](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5431)) ([67d9dd0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67d9dd0)), closes [#5385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5385) [#5195](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5195) [#5068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5068)
- **badge:** fix parent component use onpush nzCount not show ([#5275](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5275)) ([d1f0321](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d1f0321))
- **button:** fix button init loading status ([#5404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5404)) ([c764c67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c764c67)), closes [#5392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5392)
- **date-picker:** get input width before panel open ([#5357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5357)) ([39a6c28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39a6c28))
- **drawer:** don't prevent events when nzMask is false ([#5438](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5438)) ([abe9e53](https://github.com/NG-ZORRO/ng-zorro-antd/commit/abe9e53)), closes [#5350](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5350)
- **dropdown:** fix dropdown disabled button ([#5429](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5429)) ([797c65d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/797c65d)), closes [#5258](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5258)
- **grid:** fix gutter zero ([#5436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5436)) ([80a4709](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a4709)), closes [#5435](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5435)
- **input:** fix input missing attr disabled ([#5315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5315)) ([2b17df2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b17df2))
- **input:** fix reactive form disabled input-group style ([#5428](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5428)) ([6d403e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d403e3)), closes [#5137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5137)
- **input:** support reactive form disabled ([#5316](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5316)) ([8270009](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8270009))
- **menu:** fix menu group ng-template error ([#5409](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5409)) ([d0c36d6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0c36d6)), closes [#5363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5363)
- **message:** fix style not changed when property changes ([#5323](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5323)) ([896f283](https://github.com/NG-ZORRO/ng-zorro-antd/commit/896f283)), closes [#5301](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5301)
- **modal:** modal will close when clicking the scrollbar ([#5377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5377)) ([e95d404](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e95d404)), closes [#5376](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5376)
- **modal:** nzAutofocus doesn't work correctly ([#5313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5313)) ([7ad64b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ad64b8))
- **modal:** some cases there is no changes detected ([#5332](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5332)) ([ade6198](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ade6198)), closes [#5328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5328) [#5287](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5287) [#5259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5259) [#3743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3743)
- **notification:** fix notification template not updated ([#5382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5382)) ([7217097](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7217097)), closes [#4787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4787)
- **page-header:** add compact style ([#5241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5241)) ([74fa3d6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74fa3d6))
- **radio:** fix radio focus ([#5424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5424)) ([6e0f47b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e0f47b)), closes [#5285](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5285)
- **select:** fix group label search ([#5407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5407)) ([7e1b5a7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e1b5a7)), closes [#5276](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5276)
- **select:** fix select autofocus behavior ([#5420](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5420)) ([8617e58](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8617e58)), closes [#5381](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5381)
- **select:** fix select nzCustomContent render ([#5425](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5425)) ([f99d7ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f99d7ff)), closes [#5178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5178)
- **select:** fix tag mode wrong value with keydown ([#5432](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5432)) ([fe5419b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe5419b)), closes [#5220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5220)
- **table:** fix ExpressionChangedAfterError of nzRight and nzLeft ([#5240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5240)) ([dc8c7e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dc8c7e7)), closes [#5238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5238)
- **table:** fix table colspan & empty data style ([#5417](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5417)) ([2eda6d3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2eda6d3)), closes [#5410](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5410)
- **table:** fix table nzWidth not work with scroll ([#5437](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5437)) ([c1e7e9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1e7e9f)), closes [#5370](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5370) [#5324](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5324) [#5318](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5318) [#5309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5309) [#5167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5167) [#5160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5160)
- **table:** fix table sort default value change ([#5433](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5433)) ([26469c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/26469c8)), closes [#5262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5262)
- **table:** fix th nzChecked supersedes nzShowCheckbox ([#5419](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5419)) ([6f5b935](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f5b935)), closes [#5388](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5388)

### Features

- **calendar:** support nzDisabledDate of calendar ([#5295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5295)) ([aabd17e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aabd17e))
- **code-editor:** update the instance types ([#5422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5422)) ([eac9b08](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eac9b08))
- **input-number:** support inputmode ([#5423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5423)) ([cdca7bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdca7bc)), closes [#5341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5341)
- **select:** support nzBorderless in global config ([#5434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5434)) ([459bdb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/459bdb0)), closes [#5224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5224)
- **slider:** add nzReverse property ([#5268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5268)) ([67275d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67275d2)), closes [#4937](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4937)
- **table:** support the generic type of data ([#5369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5369)) ([182e790](https://github.com/NG-ZORRO/ng-zorro-antd/commit/182e790))
- **typography:** support `nzOnEllipsis` output ([#5297](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5297)) ([2200063](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2200063))
- **upload:** add `nzFileListRender` property ([#5204](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5204)) ([ce5574a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ce5574a)), closes [#4875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4875)

## [9.1.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.1.1...9.1.2) (2020-05-13)

### Bug Fixes

- **all** type errors with strictTemplates ([#5265](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5265)) ([2982766](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2982766)), closes [#5171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5171)
- **list:** empty content is always rendered ([#5266](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5266)) ([ca7314c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca7314c)), closes [#5260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5260)
- **select:** option item not selected with falsy value ([#5264](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5264)) ([1c4d7d8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c4d7d8))

## [9.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.1.0...9.1.1) (2020-05-11)

### Bug Fixes

- **auto-complete, drawer:** cannot reopen when reuse route snapshots([#5165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5165)) ([7101782](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7101782)), closes [#5142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5142)
- **alert:** `nzNoAnimation` not work with the alert component ([#5211](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5211)) ([de9ef6b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de9ef6b))
- **breadcrumb:** fix breadcrumb when Routes path='' ([#4966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4966)) ([5ffa45c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ffa45c))
- **button:** disabled not work with anchor ([#5233](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5233)) ([36ab993](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36ab993)), closes [#5226](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5226)
- **dropdown:** fix dropdown break SSR ([#5244](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5244)) ([016cca1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/016cca1)), closes [#5186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5186)
- **modal:** global config cannot work with service mode ([#5228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5228)) ([95aab9a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/95aab9a)), closes [#5223](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5223)
- **modal:** modal cannot close after the host view destroyed ([#5161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5161)) ([5cb618e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cb618e)), closes [#5128](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5128)
- **modal:** rollback to component types can be the content of confirm-mode ([#5177](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5177)) ([5fa4c1e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5fa4c1e)), closes [#5172](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5172)
- **schematics:** invalid version will be added when the package already exists ([#5210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5210)) ([f406803](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f406803)), closes [#5209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5209)
- **table:** fix table expand in multiple thead tr ([#5246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5246)) ([cbaeb38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbaeb38)), closes [#5207](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5207)
- **timeline:** fix timeline check error ([#5245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5245)) ([ee2859f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee2859f)), closes [#5230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5230)
- **typography:** ellipsis line measurement error ([#5175](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5175)) ([93676c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93676c9))
- **upload:** fix invalid preview image in picture card ([#5205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5205)) ([cbe8225](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbe8225)), closes [#5201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5201)

## [9.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.0.2...9.1.0) (2020-04-26)

### Bug Fixes

- **auto-complete:** dropdown position error with group-input ([#5157](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5157)) ([5b26479](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5b26479))
- **cascader:** fix cascader position ([#5148](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5148)) ([7870e67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7870e67)), closes [#5102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5102)
- **date-picker:** set formControl disabled not work ([#5126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5126)) ([b83e7b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b83e7b5)), closes [#5118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5118)
- **date-picker,time-picker:** clicking host to open panel ([#5105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5105)) ([7c938b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c938b4)), closes [#5073](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5073)
- **description:** fix description not accept TemplateRef ([#5139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5139)) ([90d2ec5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90d2ec5)), closes [#5127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5127)
- **form:** the setStatus needs to call again on tips changes ([#5144](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5144)) ([a08d4da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a08d4da)), closes [#5129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5129)
- **menu:** fix menu matchRouter not work ([#5095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5095)) ([2724b9b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2724b9b))
- **menu:** fix submenu scrollable ([#5155](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5155)) ([fb52f21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb52f21)), closes [#4837](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4837)
- **message:** fix message remove error when no container ([#5123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5123)) ([1eca795](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1eca795)), closes [#5121](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5121)
- **modal:** `NoopAnimations` do not work with modal mask ([#5103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5103)) ([d7625db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d7625db)), closes [#5093](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5093)
- **notification:** fix global config nzPlacement not working ([#5140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5140)) ([1ce1634](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ce1634)), closes [#5135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5135)
- **progress:** fix nzFormat not shown status is exception ([#5136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5136)) ([654411e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/654411e)), closes [#5130](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5130)
- **select:** fix ie11 select search input ([#5117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5117)) ([83cdc84](https://github.com/NG-ZORRO/ng-zorro-antd/commit/83cdc84)), closes [#5110](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5110)
- **select:** fix virtual scroll hover bug ([#5131](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5131)) ([d69415a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d69415a)), closes [#5120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5120) [#5116](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5116)
- **space:** fix config name ([#5147](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5147)) ([64f772d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64f772d))
- **table:** remove table nzQueryParams debounceTime ([#5132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5132)) ([07a9d34](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07a9d34)), closes [#5113](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5113)
- **time-picker:** allow undefined or null input ([#5104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5104)) ([d0b40ce](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0b40ce)), closes [#5100](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5100)
- **tooltip:** fix title not updated to component ([#5097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5097)) ([1123281](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1123281)), closes [#5087](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5087)
- backward-compatible with the previous rendering engine ([#5090](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5090)) ([b61a914](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b61a914)), closes [#5088](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5088)

### Features

- **date-picker, time-picker:** support custom suffix icon ([#5072](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5072)) ([8b660bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b660bd))
- **autocomplete:** support values whit object type ([#4996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4996)) ([4bfbbf7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4bfbbf7)), closes [#4981](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4981)
- **select:** support global config nzSuffixIcon ([#5092](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5092)) ([ad847e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad847e7))
- **select:** support input nzOptions in select ([#5109](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5109)) ([251a064](https://github.com/NG-ZORRO/ng-zorro-antd/commit/251a064)), closes [#5106](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5106)
- **select:** support option height and opiton overflow size ([#5133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5133)) ([7b3937e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7b3937e)), closes [#5112](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5112)

## [9.0.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.0.0...9.0.2) (2020-04-20)

### Bug Fixes

- **all:** fix enableIvy:false with ng-zorro-antd ([#5081](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5081)) ([83b554e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/83b554e)), closes [#5070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5070)
- **button:** fix button type definition ([#5085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5085)) ([62584de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62584de)), closes [#5026](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5026)
- **form:** modify to subscribe to the parent component input ([#4524](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4524)) ([565b530](https://github.com/NG-ZORRO/ng-zorro-antd/commit/565b530)), closes [#4554](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4554)
- **input:** fix input group missing focus and disabled ([#5082](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5082)) ([5ff38be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ff38be)), closes [#5064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5064)
- **popover:** fix programmatically changing not trigger ngModelChange ([#5053](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5053)) ([dbc2cd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dbc2cd3))
- **select:** fix nzDropdownMatchSelectWidth not work ([#5066](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5066)) ([d210f4d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d210f4d)), closes [#5058](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5058)
- **select:** options overflow content cannot be hidden ([#5057](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5057)) ([867dc87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/867dc87)), closes [#5047](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5047)
- **select:** wrong sort in group option ([#5063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5063)) ([af39d5f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af39d5f))
- ngcc errors caused by overlapping entry-points ([#5055](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5055)) ([7bc8279](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7bc8279)), closes [#5045](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5045)

## [9.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.0.0-beta.4...9.0.0) (2020-04-15)

### Intro

Welcome to the `9.0.0` version of `ng-zorro-antd`,some APIs were deprecated in version 8.x, and warning message was given under dev mode. All deprecated APIs is removed in 9.0.0, if you have fixed all warnings in the 8.x version, you can follow these steps to upgrade your version.

#### Environmental Requirement

1. Make sure `Node.js` >= `10.13`
2. Create a new branch, or use other methods to back up the current project
3. delete the package-lock.json file

#### Upgrade dependencies

- Upgrade Angular to 9.x version, ref https://update.angular.io/
- Run `ng update @angular/cdk`, if you have used `@angular/cdk`.
- if you have used `date-fns` in your project, upgrade it to `2.x` version, ref https://github.com/date-fns/date-fns-upgrade.
- if you have used `monaco-editor` please upgrade it to `0.2.x`, don't forget to upgrade `monaco-editor-webpack-plugin` to `1.9.x` if you have used it.

#### Upgrade NG-ZORRO

- Run `ng update ng-zorro-antd`
- If a warning message appears in the console, follow the prompts to modify the corresponding code

#### date-fns update

We have upgraded `date-fns` to v2. When you switch to` date-fns`, some date formats will have a breaking change. Such as:

```html
<!-- datefns v1 -->
<nz-date-picker nzFormat="YYYY-MM-DD"></nz-date-picker>

<!-- datefns v2 -->
<nz-date-picker nzFormat="yyyy-MM-dd"></nz-date-picker>
```

**We recommend using `date-fns` v2 date format**. If you don't want to use the new date format, you can use `NZ_DATE_FNS_COMPATIBLE`. When set to` true`, `ng-zorro-antd` will convert the format of v1 to v2. See the comparison of the old and new formats [here](https://github.com/date-fns/date-fns/blob/master/CHANGELOG.md#200---2019-08-20).

```js
providers: [{ provide: NZ_DATE_FNS_COMPATIBLE, useValue: true }];
```

**`NZ_DATE_FNS_COMPATIBLE` won't be kept for too long, we will remove the support for `date-fns` v1 format until ` ng-zorro-antd` v10**, we hope you can update the `date-fns` date format in time. For `date-fns` upgrade guide, see [here](https://github.com/date-fns/date-fns-upgrade).

#### Angular Ivy Supported

We have upgraded the `@angular/*` and `@angular/cdk` versions to v9, and now you can use the Ivy rendering engine to run your project, and enable the `strictTemplates` option to use more strict template type checking.

More help go to [Angular Ivy](https://angular.io/guide/ivy) and [Template type](https://angular.io/guide/template-typecheck) checking.

#### Ant Design 4 Spec

We have synced the Ant Design 4 design specification and support the Dark and Compact themes.

#### Enhanced Performance and Usability

- In previous versions, the Table component has integrated virtual scrolling, also now supported for Select and Tree components.
- Form and Table simplify usage and now allow for writing fewer templates and configurations.
- Allow adding icons in sub-modules to reduce the first screen load time.
- Now, the pop-up menu is automatically closed when the route is changed, and corresponding options have been added for components such as Modal.

## [9.0.0-beta.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.0.0-beta.3...9.0.0-beta.4) (2020-04-14)

### Bug Fixes

- **slider:** fix handle transform in vertical mode ([#4939](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4939)) ([6fba78d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fba78d))
- add theme bundle files ([#5012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5012)) ([dc8fe9d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dc8fe9d)), closes [#5007](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5007)
- **badge:** allow `nzTitle` set to null ([#4965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4965)) ([a35fb5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a35fb5e)), closes [#4776](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4776)
- **date-picker:** click date cell not work when changing month or year ([#4876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4876)) ([3aebe7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3aebe7c)), closes [#3499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3499)
- **list:** fix the avatar part old API ([#4952](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4952)) ([d8a2594](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d8a2594)), closes [#4912](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4912)
- **modal:** `nzModalFooter` not work when the modal open on init ([#4954](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4954)) ([2f400e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f400e8)), closes [#4948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4948)
- **modal:** fix close button style ([#5014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5014)) ([174099e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/174099e))
- **page-header:** location inject error ([#5013](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5013)) ([9073fa5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9073fa5)), closes [#4945](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4945)
- **table:** fix 4.1.0 style error ([#4953](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4953)) ([44f606c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44f606c))
- **table:** fix table no data ([#4947](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4947)) ([7f7989e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f7989e))
- **time-picker:** allow inputting string type ([#4949](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4949)) ([3b45a22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3b45a22)), closes [#4775](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4775) [#4777](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4777) [#4871](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4871) [#1679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1679)
- **time-picker:** ngModelChange not work ([#4944](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4944)) ([a6ecdb9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6ecdb9))
- **time-picker:** scroll to wrong position in datepicker ([#4961](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4961)) ([cdf387f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdf387f))
- **tree:** fix search case sensitivity ([#4766](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4766)) ([828b13e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/828b13e)), closes [#1996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1996) [#4765](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4765)
- **tree:** fix tree animation ([#4973](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4973)) ([70b2fc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70b2fc3))

### Features

- **code-editor:** upgrade monaco to 0.20.0 and update interfaces ([#4984](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4984)) ([3963ad1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3963ad1))
- **notification:** add onClick observable ([#4989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4989)) ([9224240](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9224240)), closes [#4986](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4986)
- **space:** add new component ([#4928](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4928)) ([df01bd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df01bd1)), closes [#4913](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4913)
- **table:** support new nzQueryParams ([#4970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4970)) ([79ea999](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79ea999))
- **tooltip,etc:** support custom origin ([#4849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4849)) ([863fd4b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/863fd4b))
- **tree:** support virtual scroll ([#4979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4979)) ([6803a92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6803a92)), closes [#4426](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4426) [#3808](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3808) [#3436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3436) [#2680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2680) [#1771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1771)
- **schematics:** add v9 migration rules for carousel and inject tokens ([#4469](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4469)) ([704cb9b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/704cb9b))
- **schematics:** add v9 migration rules for tree ([#4602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4602)) ([87b8e55](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87b8e55))
- support compact theme ([#4972](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4972)) ([2cf34d0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2cf34d0))

### BREAKING CHANGES

- **notification:**

* NzMessageDataFilled is replaced by NzMessageRef
* NzNotificationDataFilled is replaced by NzNotificationRef

## [9.0.0-beta.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.0.0-beta.2...9.0.0-beta.3) (2020-03-24)

### Bug Fixes

- **empty:** fix empty image style in dark mode ([#4924](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4924)) ([bae59d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bae59d7)), closes [#4921](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4921)
- **table:** fix nzTotal in frontend pagination false ([#4922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4922)) ([9ddc060](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ddc060)), closes [#4919](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4919)

### Features

- **pagination:** add auto resize ([#4863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4863)) ([1bb01b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1bb01b5))

## [9.0.0-beta.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/9.0.0-beta.1...9.0.0-beta.2) (2020-03-19)

### Bug Fixes

- **grid:** fix grid responsive bug ([#4906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4906)) ([d6828ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6828ed))
- **select:** fix select empty status ([#4907](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4907)) ([f295c10](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f295c10))

## [9.0.0-beta.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.5.1...9.0.0-beta.1) (2020-03-15)

### Bug Fixes

- **code-editor:** fix wrong initialization with diff mode ([#4485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4485)) ([#4532](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4532)) ([021cf22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/021cf22))
- **auto-complete:** close the panel when tapping scrollb… ([#4551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4551)) ([387ebc1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/387ebc1)), closes [#4333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4333)
- **breadcrumb:** fix breadcrumb link style ([#4880](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4880)) ([2553328](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2553328))
- **button:** fix button animation bug caused by angular ([9e0df2a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e0df2a)), closes [#2697](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2697)
- **cascader:** fix not showing empty when there's no options ([#4565](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4565)) ([9d8d7e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d8d7e6)), closes [#4562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4562)
- **date-picker:** select date but nzDefaultOpenValue not work ([#4490](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4490)) ([2397819](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2397819))
- **drawer:** disable transition animation when placement change ([#4609](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4609)) ([e539096](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e539096)), closes [#4224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4224)
- **dropdown:** fix ghost menu with contextmenu ([39487f1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39487f1)), closes [#3971](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3971) [#4684](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4684)
- **dropdown:** fix menu group style in dropdown ([d928a8c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d928a8c)), closes [#4505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4505)
- **layout:** fix layout demo height style ([bed60ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bed60ff)), closes [#4676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4676)
- **layout:** fix responsive sider not work ([9f951f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f951f8))
- **menu:** fix menu overflow detection & replace ul with div ([4c8032b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c8032b)), closes [#3412](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3412) [#4227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4227) [#3687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3687)
- **message:** fix message and notification error in prod ([#4884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4884)) ([3e2f85d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e2f85d))
- **table:** `nzFilters` can is not null ([#4595](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4595)) ([2c26e9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c26e9f))
- **table:** fix table data type ([#4608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4608)) ([70b1440](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70b1440)), closes [#4593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4593)
- **timeline:** fix reverse bug ([#4690](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4690)) ([09bf8f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09bf8f4)), closes [#4509](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4509)
- **transfer:** fix transfer nzTargetKeys property ([#4670](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4670)) ([31089a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31089a1)), closes [#4641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4641) [#4360](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4360) [#4210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4210)
- fix github workflow action ([10a772f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10a772f))

### Chores

- **calendar:** delete deprecated input nzCard ([#4464](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4464)) ([aed2e7d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aed2e7d))
- **carousel:** remove vertical api ([#4376](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4376)) ([37aa921](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37aa921))
- **empty:** remove injection token ([#4465](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4465)) ([cc8018a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc8018a))
- **icon:** remove old api ([#4375](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4375)) ([91e52ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91e52ab))
- **message,notification:** remove old injection tokens ([#4404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4404)) ([f9b0e75](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f9b0e75))
- **tooltip,popover,popconfirm:** remove component API ([#4390](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4390)) ([f82e8a6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f82e8a6))
- **tree, tree-select:** remove deprecated API ([#4601](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4601)) ([1ec18e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ec18e4))
- deprecate `NgZorroAntdModule` ([#4519](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4519)) ([1a60f27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a60f27))

### Code Refactoring

- **form:** refactor and sync antd v4.0 ([#4679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4679)) ([a5eda6f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a5eda6f)), closes [#4526](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4526) [#4526](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4526)

### Features

- **breadcrumb:** support indenpendent separator ([#4713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4713)) ([1f490e9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f490e9))
- **collapse:** support nzExpandIconPosition ([#4781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4781)) ([760512a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/760512a))
- **date-picker:** add some inputs ([#4843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4843)) ([af4051e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af4051e))
- **date-picker:** support parse input value ([#4833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4833)) ([6a523ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a523ba)), closes [#4028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4028) [#3976](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3976) [#2492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2492) [#4101](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4101)
- **grid:** support nzFlex and nzGutter array, deprecated nzType ([c4d2694](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4d2694))
- **i18n:** support for Armenian ([#4611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4611)) ([038691f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/038691f))
- **i18n:** support for Georgian locale ([#4491](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4491)) ([d96ebe0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d96ebe0))
- **icon:** support add icon in feat modules ([#4711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4711)) ([0bcd2a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bcd2a9))
- **input:** support textarea with clear icon ([0af9242](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0af9242)), closes [#4623](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4623)
- **input-number:** support nzPrecisionMode mode ([#4185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4185)) ([bfe089f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bfe089f)), closes [#4173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4173)
- **input-number:** trigger ngModelChange at once ([#4769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4769)) ([299ba6d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/299ba6d)), closes [#3039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3039) [#3773](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3773)
- **menu:** auto nzInlineCollapsed when sider collapsed ([51fbf5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51fbf5e)), closes [#4680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4680)
- **menu:** menu with nzMatchRouter work with CanDeactivate ([7560563](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7560563)), closes [#4407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4407)
- **notification:** add close icon prop ([#4495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4495)) ([80a0b26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a0b26)), closes [#4494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4494)
- **pagination:** nzItemRender support prev_5 and next_5 ([#4754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4754)) ([41c4860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41c4860))
- **progress:** support steps ([#4637](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4637)) ([fe8b469](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe8b469)), closes [#4635](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4635)
- **progress:** support TemplateRef for nzFormat ([#4598](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4598)) ([edf0e9c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/edf0e9c)), closes [#4596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4596)
- **select:** refactor the select to support virutal scroll ([40daee9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40daee9)), closes [#4585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4585) [#3497](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3497)
- **skeleton:** add nz-skeleton-element ([#4859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4859)) ([8dc2ff3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8dc2ff3))
- **tabs:** add nzCanDeactivate hook ([#4476](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4476)) ([a533980](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a533980)), closes [#4432](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4432)
- **tag:** support status colors ([#4628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4628)) ([aa22c0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa22c0f)), closes [#4622](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4622) [#4413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4413)
- **tree-select:** support `nzDropdownClassName` property ([#4552](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4552)) ([df8c125](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df8c125)), closes [#4508](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4508)
- **typography:** support `nzSuffix` property ([#4629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4629)) ([ca02a07](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca02a07)), closes [#4620](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4620)
- **schematics:** add locale option in 'ng-add' ([#4786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4786)) ([dcd01cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcd01cb))
- **schematics:** add v9 migration rules for dropdown ([#4466](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4466)) ([aebad87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aebad87))
- **schematics:** add v9 migration rules for icon and calendar ([#4467](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4467)) ([3c5d24e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c5d24e))
- **schematics:** add v9 migration rules for tooltip-like ([#4402](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4402)) ([313f7b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/313f7b8))

### Performance Improvements

- **checkbox:** use css empty selector instead of observeContent ([#4761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4761)) ([da8821a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/da8821a))
- **input:** improve input-group perf ([7af643b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7af643b)), closes [#3950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3950)
- **radio:** refactor radio group data flow ([#4770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4770)) ([423a382](https://github.com/NG-ZORRO/ng-zorro-antd/commit/423a382))

### BREAKING CHANGES

- **icon:** - `NZ_ICON_DEFAULT_TWOTONE_COLOR` is removed. Use `NzGlobalConfigService` instead.

chore: remove strange file

test: fix test

feat: add forRoot

docs: change doc

docs: fix icon English doc

- **form:** - `nz-form-extra` is removed. Please use `nzExtra` is `nz-form-control` instead.

* `nz-form-explain` is removed. Please use `nzSuccessTip | nzWarningTip | nzErrorTip | nzValidatingTip` is `nz-form-control` instead.

- refactor(module:form): refactor and sync antd v4.0

- refactor(module:form): refactor test

- refactor(module:form): fix test

- refactor(module:form): refactor form control and remove useless styles
- **form:** - `nz-form-extra` is removed. Please use `nzExtra` is `nz-form-control` instead.

* `nz-form-explain` is removed. Please use `nzSuccessTip | nzWarningTip | nzErrorTip | nzValidatingTip` is `nz-form-control` instead.

- chore: merge code

- refactor(module:form): sync antd and fix test
- **input-number:** ngModelChange trigger at once when user typing
- **pagination:** prev_5 and next_5 is needed when use nzItemRender
  'pre' typo was corrected to 'prev'
- **tree, tree-select:** \* tree

* Removed `[nzDefaultExpandAll]` use `[nzExpandAll]` instead.
* Removed `[nzDefaultExpandedKeys]` use `[nzExpandedKeys]` instead.
* Removed `[nzDefaultSelectedKeys]` use `[nzSelectedKeys]` instead.
* Removed `[nzDefaultCheckedKeys]` use `[nzCheckedKeys]` instead.
* Removed `(nzOnSearchNode)` use `(nzSearchValueChange)` instead.

- tree-select

* Removed `[nzDefaultExpandedKeys]` use `[nzExpandedKeys]` instead.

- **message,notification:** - `NZ_MESSAGE_CONFIG` is removed. Please use `NzGlobalConfigService` instead.

* `NZ_NOTIFICATION_CONFIG` is removed. Please use `NzGlobalConfigService` instead.
* `config` method of `NzMessageService` and `NzNotificationService` is removed. Please use `set` method of `NzGlobalConfigService` instead.

- **empty:** - `NZ_DEFAULT_EMPTY_CONTENT` is removed. Please use `NzConfigService` instead.
- **carousel:** Carousel

* `nzVertical` is removed. Please use 'nzDotPosition' instead.

- Removed deprecated API `NgZorroAntdModule.forRoot()`

- docs: update README.md and getting-started.md

- chore: fix tslint hook

- style: fix lint

- build: fix generate-iframe script

- style: fix lint
- **icon:** - `i[nz-icon]`: `twoToneColor` `theme` `spin` `iconfont` `type` inputs has been removed, use `nzTwoToneColor` `nzTheme` `nzSpin` `nzIconfont` `nzType` instead.

* `i.anticon` selector has been removed, use `i[nz-icon]` instead.

- **calendar:** `<nz-calendar>` `nzCard` input has been removed, use `nzFullscreen` instead.
- **tooltip,popover,popconfirm:** `<nz-tooltip>` `<nz-popover>` `<nz-popconfirm>` components has been removed, use its directives instead.

## [8.5.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.5.0...8.5.1) (2019-11-18)

### Bug Fixes

- **code-editor:** fix config ([#4436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4436)) ([5283a32](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5283a32))
- **core:** add type guard for isNotNil ([#4431](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4431)) ([b3c686c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b3c686c))
- **drawer:** content overflow when placement is top or bottom ([#4423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4423)) ([9451de5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9451de5)), closes [#4354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4354)
- **tooltip:** fix hiding when hover popover ([#4418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4418)) ([a6b5901](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6b5901)), closes [#4417](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4417)
- **tree-select:** click label behavior is incorrect in strict mode ([#4424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4424)) ([7a11124](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7a11124)), closes [#4422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4422)

## [8.5.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.4.1...8.5.0) (2019-11-08)

### Bug Fixes

- **auto-complete:** default value not selected ([#4366](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4366)) ([09f1ec6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f1ec6)), closes [#4362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4362)
- **date-picker:** `nzDefaultOpenValue` not work in time panel ([#4357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4357)) ([dfa3d39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dfa3d39)), closes [#4331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4331)
- **date-picker:** animation start after overlay open ([#4315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4315)) ([931fd48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/931fd48))
- **mention:** unable to select on mobile device ([#4309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4309)) ([1be6d51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1be6d51)), closes [#4281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4281)
- **modal:** `nzMaskClosable` not working in the confirm mode ([#4347](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4347)) ([475bbc4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/475bbc4)), closes [#4344](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4344)
- **page-header:** has footer or breadcrumb style bug ([#4363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4363)) ([dcc7deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcc7deb))
- **pagination:** replace full-width character with half-width ([#4371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4371)) ([cc3868e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc3868e))
- **select:** prevent hidden options from being selected ([#4382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4382)) ([cf22133](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf22133)), closes [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377) [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377)
- **table:** support nzWidthConfig null undefined value ([#4342](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4342)) ([761e8e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/761e8e0))
- **tooltip:** fix not undefined value not updated ([#4392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4392)) ([2a71c43](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a71c43))
- **tooltip:** fix tooltip accessing destroyed view ([#4387](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4387)) ([8e9e6a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e9e6a9)), closes [#3875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3875) [#4317](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4317) [#4386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4386)
- **tree-select:** default tags incorrect in strictly mode ([#4368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4368)) ([a6547a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6547a0)), closes [#4364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4364)

### Features

- **monaco-editor:** support static loading ([#4341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4341)) ([29f732b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29f732b))
- **page-header:** add `nzGhost` property ([#4306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4306)) ([4c78cca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c78cca)), closes [#4303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)
- **tooltip:** support changing trigger ([#4397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4397)) ([48d7122](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d7122)), closes [#4365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4365)

## [8.4.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.4.0...8.4.1) (2019-10-23)

### Bug Fixes

- **core:** fix global config not working in prod mode ([#4325](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4325)) ([cc9308d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc9308d)), closes [#4319](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4319)
- **drawer:** fix the HTML structure of the drawer header ([#4311](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4311)) ([5cdd5db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cdd5db)), closes [#4304](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4304)
- **page-header:** fix break change on the style ([#4303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)) ([4c10e5b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c10e5b))
- **table:** fix table nzWidth bug without the first column ([#4329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4329)) ([c6bdf15](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6bdf15)), closes [#4312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4312)

## [8.4.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.3.1...8.4.0) (2019-10-15)

### Bug Fixes

- **tree:** fix nzHideUnMatched bug ([#4286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4286)) ([87dd59e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87dd59e)), closes [#3970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3970)
- **tree:** update when property isLeaf is changed ([#4289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4289)) ([4b90577](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4b90577)), closes [#4037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4037)
- **\*:** fix style error with 3.23.6 ([#4258](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4258)) ([120c5be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/120c5be))
- **auto-complete:** not emit changes when retype same value while open ([#4215](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4215)) ([21e91e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21e91e3))
- **i18n:** update and add translations for de_DE ([#4239](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4239)) ([f819fad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f819fad))
- **pagination:** add space between page size and slash ([#4038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4038)) ([#4039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4039)) ([b1bba9e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1bba9e))
- **select:** fix select dropdown position error ([#4267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4267)) ([0ccc62a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0ccc62a)), closes [#3855](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3855)
- **select:** fix select focus & blur & autoFocus event ([#4270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4270)) ([c7d90b7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c7d90b7)), closes [#3991](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3991) [#3757](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3757) [#3708](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3708)
- **select:** fix select input not grow correctly in IE ([#4262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4262)) ([9be58d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9be58d9)), closes [#2427](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2427) [#3907](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3907)
- **select:** fix select scroll bottom not emit with search ([#4272](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4272)) ([e9c5541](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e9c5541)), closes [#3777](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3777)
- **table:** fix table fixed style when nzData change ([#4274](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4274)) ([b33533c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b33533c)), closes [#4253](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4253)
- **tag:** nzNoAnimation not working ([#4257](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4257)) ([63f947e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/63f947e)), closes [#4244](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4244)
- **time-picker:** add null input judgement when using datefns ([#4283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4283)) ([a05bc02](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a05bc02)), closes [#3854](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3854)
- **tooltip:** fix properties updated before origin is set ([#4229](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4229)) ([b2b9c13](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b2b9c13)), closes [#4250](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4250)
- **tooltip:** fix tooltip component not destory ([#4291](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4291)) ([05cbd9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/05cbd9f)), closes [#4103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4103)

### Features

- **breadcrumb:** add `nzRouteLabel` property ([#4167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4167)) ([34a8b0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/34a8b0a))
- **cascader:** support option render template ([#4127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4127)) ([8345c54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8345c54)), closes [#3699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3699)
- **mention:** support for adaptive boundary ([#4263](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4263)) ([812e1c5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/812e1c5)), closes [#4260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4260)
- **page-header:** new pageheader style and support avatar ([#4208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4208)) ([c2fc616](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2fc616))
- **select:** support default value not in the option list ([#4261](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4261)) ([51b26b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51b26b4)), closes [#3672](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3672) [#4000](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4000)
- **spin:** support global indicator ([#4221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4221)) ([a7ecb8b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a7ecb8b)), closes [#2792](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2792)
- **table:** support extra panel with nz-th-extra selector ([#4278](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4278)) ([4701ee6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4701ee6))
- **table:** support td break-word display ([#4273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4273)) ([93ab305](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93ab305))
- **tree-select:** support `nzCheckStrictly` property ([#4149](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4149)) ([1f8cf1d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f8cf1d)), closes [#4120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4120)

### Performance Improvements

- **tree:** change the collapsed of the treeNode to ngIf ([#3947](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3947)) ([cbfc5ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbfc5ed))
- **typography, tabs:** make the `destroy$` complete when destroy ([#4271](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4271)) ([51f4713](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51f4713))

## [8.3.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.3.0...8.3.1) (2019-09-24)

### Bug Fixes

- **affix:** fix affix not working in some browsers ([#4161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4161)) ([d9bf4af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9bf4af)), closes [#4070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4070)
- **core:** fix HTML entities highlight error ([#4162](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4162)) ([2665762](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2665762)), closes [#4152](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4152)
- **date-picker:** optimized interaction by using input box ([#4146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4146)) ([f0ddb79](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0ddb79))
- **i18n:** add fallback mechanism ([#4163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4163)) ([9f87b77](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f87b77))
- **i18n:** added property missing in Arabic ([#4165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4165)) ([36a5ebb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36a5ebb))
- **progress:** fix circle gradient not sorted ([#4178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4178)) ([7d37b1c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d37b1c))
- **select:** fix select compareWith array not work ([#4140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4140)) ([2b4776d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b4776d)), closes [#4139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4139)
- **steps:** fix progress dot in vertical mode ([#4193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4193)) ([50b86be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/50b86be)), closes [#4184](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4184)
- **table:** fix nzWidthConfig conflict with nzWidth ([#4141](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4141)) ([a9900ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9900ed)), closes [#4083](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4083) [#4142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4142)
- **time-picker:** place ViewChild decorator on correct f… ([#4156](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4156)) ([b0ed836](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b0ed836))

## [8.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.2.1...8.3.0) (2019-09-09)

### Bug Fixes

- **cascader:** support falsy value expect for undefined and null ([#4119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4119)) ([0cb44ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cb44ac)), closes [#4110](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4110)
- **editor:** fix type any ([#4105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4105)) ([bd720fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bd720fb)), closes [#4099](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4099)
- **i18n:** fix i18n interface and Traditional Chinese ([#4102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4102)) ([bb9e89f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb9e89f)), closes [#4080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4080)
- **i18n:** fix Russian i18n file ([f267bdd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f267bdd))
- **i18n:** missing catalan translations added ([#4116](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4116)) ([c530c74](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c530c74))
- **tabs:** fix selected index not updated ([#4094](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4094)) ([1e76e37](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e76e37)), closes [#3873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3873)

### Features

- **\*:** support global config ([#3613](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3613)) ([6eb041a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6eb041a))
- **i18n:** support for Romanian locale ([#4068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4068)) ([207e178](https://github.com/NG-ZORRO/ng-zorro-antd/commit/207e178))
- **modal:** support for custom close icons ([#4072](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4072)) ([06b895e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/06b895e))
- **progress:** support nzTooltipPlacement ([#4007](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4007)) ([d6a2968](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6a2968))
- **steps:** support navigation type and nzDisable nzSubtitle ([#4064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4064)) ([272dc98](https://github.com/NG-ZORRO/ng-zorro-antd/commit/272dc98)), closes [#3931](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3931)

### Performance Improvements

- **resizable:** listen document events when resizing start ([#4021](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4021)) ([66afcf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/66afcf0))

## [8.2.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.2.0...8.2.1) (2019-08-26)

### Bug Fixes

- **cascader:** fix column is not dropped in hover mode ([#3916](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3916)) ([906849b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/906849b))
- **code-editor:** fix destroying error when editor is not initialized ([#4002](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4002)) ([a35fb09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a35fb09))
- **code-editor:** remove overflow styles ([#4016](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4016)) ([ab832d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab832d9))
- **descriptions:** fix colspan calcuation in horizontal bordered ([#4014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4014)) ([345712f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/345712f))
- **table:** fix border-right of small size and bordered table ([#4027](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4027)) ([a3bd531](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a3bd531))
- **tabs:** fix tabs still shows when no route is matched ([#4034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4034)) ([7ca0a52](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ca0a52))

## [8.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.1.2...8.2.0) (2019-08-13)

### Bug Fixes

- **badge:** fix init animations ([#3925](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3925)) ([353c95b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/353c95b)), closes [#3686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3686)
- **date-picker:** keep the time value while clicking date ([#3911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3911)) ([9499aec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9499aec))
- **date-picker:** open on enter and focus on inner input ([#3804](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3804)) ([3f03ee1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f03ee1)), closes [#3146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3146)
- **date-picker:** sort range picker value when start is after end ([#3956](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3956)) ([117b453](https://github.com/NG-ZORRO/ng-zorro-antd/commit/117b453)), closes [#3940](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3940) [#1642](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1642)
- **message:** fix container instance not destroyed in HMR ([#3859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3859)) ([07e86a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07e86a5))
- **table:** fix nzWidthConfig in nzTemplateMode ([#3958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3958)) ([baab74b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baab74b)), closes [#3957](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3957)
- **tooltip:** empty judgement ([#3993](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3993)) ([a853e96](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a853e96)), closes [#3909](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3909)

### Features

- **avatar:** support image load error event ([#3893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3893)) ([ab4bcbe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab4bcbe)), closes [#3223](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3223)
- **badge:** support nzTitle and nzOffset property ([#3977](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3977)) ([ffb7219](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffb7219))
- **code-editor:** add code editor component ([#3706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3706)) ([df78b2e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df78b2e))
- **descriptions:** add nzColon to toggle colon ([#3923](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3923)) ([8e95cb1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e95cb1))
- **drawer:** support `nzKeyboard` property ([#3896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3896)) ([38062fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38062fb))
- **i18n:** support Malay and Tamil language ([#3924](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3924)) ([b87f1fe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b87f1fe))
- **page-header:** add default behavior for the back button ([#3891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3891)) ([41bc285](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41bc285)), closes [#3421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3421)
- **resizable:** add resizable component ([#3771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3771)) ([5e71739](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e71739)), closes [#3701](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3701)
- **statistics:** countdown support finish event ([#3902](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3902)) ([9ea40da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ea40da))
- **steps:** support for clickable steps ([#3934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3934)) ([ac866ce](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac866ce))
- **tabs:** add router exact active parameter ([#3862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3862)) ([6b13faf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b13faf)), closes [#3858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3858)
- **timeline:** add gray as a default color ([#3922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3922)) ([f889f34](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f889f34))
- **schematics:** use the project's style extension ([#3930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3930)) ([84b0355](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84b0355))

## [8.1.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.1.1...8.1.2) (2019-07-29)

### Bug Fixes

- **slider:** change mark style in horizontal mode ([#3879](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3879)) ([e6a6221](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e6a6221)), closes [#3876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3876)
- **tree-select:** should not close when the selectable is false ([#3843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3843)) ([329ec22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/329ec22)), closes [#3833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3833)
- **schematics:** fix template files suffix ([#3884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3884)) ([5b4714f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5b4714f))

## [8.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.1.0...8.1.1) (2019-07-29)

### Bug Fixes

- **\*:** import PlatformModule when use platform in component ([#3823](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3823)) ([6ec85a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6ec85a4))
- **dropdown:** hide backdrop when disabled and restore escape ([#3831](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3831)) ([b758572](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b758572)), closes [#3835](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3835)
- **form:** fix form feedback error when init with tips ([#3868](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3868)) ([7c0aa51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c0aa51)), closes [#3865](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3865)
- **select:** fix select with tokenization bug ([#3869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3869)) ([fa462c7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa462c7)), closes [#3825](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3825)
- **table:** fix table small sticky style ([#3849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3849)) ([c4de8ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4de8ff))
- **tabs:** fix the pagnation padding-right when scrolling ([#3539](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3539)) ([#3709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3709)) ([9a4df38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a4df38))
- **tooltip:** fix position change not set back ([#3857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3857)) ([3dbb6dc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dbb6dc))
- **schematics:** fix parse module name error ([#3848](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3848)) ([d4e7210](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d4e7210)), closes [#3844](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3844)
- **schematics:** update copy-resources script to support Windows path ([#3856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3856)) ([915b67d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/915b67d))

## [8.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.0.3...8.1.0) (2019-07-19)

### Bug Fixes

- **date-picker:** missing nzUse12Hours binding ([#3781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3781)) ([feae069](https://github.com/NG-ZORRO/ng-zorro-antd/commit/feae069))
- **descriptions:** fix changes to inputs of children not working ([#3798](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3798)) ([3c65697](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c65697)), closes [#3795](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3795)
- **descriptions:** fix span calculation ([#3799](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3799)) ([aaa5852](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aaa5852))
- **message:** fix lazy load problem ([#3797](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3797)) ([679fdea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/679fdea)), closes [#3794](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3794)
- **modal:** buttons cannot disable when confirm mode ([#3707](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3707)) ([3847250](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3847250)), closes [#3679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3679)
- **page-header:** fix page-header style break change ([#3803](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3803)) ([39d1f45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39d1f45))
- **select:** fix single selection choice content display issues ([#3802](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3802)) ([4dd93e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4dd93e6)), closes [#3710](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3710)
- **table:** fix table header scroll when fixed change ([#3806](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3806)) ([0677540](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0677540))
- **table:** fix table scrollbar bug ([#3801](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3801)) ([7e00e52](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e00e52)), closes [#3796](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3796)
- **tree:** unexpected disappear of tree-node ([#3748](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3748)) ([1ff176e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ff176e)), closes [#3739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3739)

### Features

- **dropdown:** allow backdrop to be disabled ([#3769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3769)) ([cb51069](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb51069))
- **i18n:** add locale files ([#3818](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3818)) ([7eac09e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7eac09e))
- **modal:** support use directive to define the footer ([#3036](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3036)) ([f022a0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f022a0f)), closes [#3035](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3035)
- **result:** add component ([#3731](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3731)) ([eb6377e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb6377e)), closes [#2759](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2759)
- **tabs:** support link router ([#3718](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3718)) ([ab8a58c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab8a58c))
- **tree-select:** add `[nzHideUnMatched]` property ([#3729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3729)) ([3a3b33a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a3b33a)), closes [#3527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3527)

## [8.0.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.0.2...8.0.3) (2019-07-14)

### Bug Fixes

- **dropdown:** fix dropdown contextmenu ([#3782](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3782)) ([cce920d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cce920d)), closes [#3768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3768)
- **input:** fix input disabled OnPush ([#3786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3786)) ([dd81155](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dd81155)), closes [#3732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3732)
- **menu:** fix menu nzMatchRouter in nested menu ([#3785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3785)) ([eb5d544](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb5d544)), closes [#3736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3736)
- **switch:** fix switch ViewChild static ([#3784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3784)) ([f59d79f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f59d79f)), closes [#3760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3760)
- **table:** fix table custom filter panel ([#3787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3787)) ([b9a7267](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b9a7267)), closes [#3721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3721)

## [8.0.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.0.1...8.0.2) (2019-07-03)

Fix the dependencies version ranges.

## [8.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/8.0.0...8.0.1) (2019-07-01)

### Bug Fixes

- **tree:** fix warning bug ([#3692](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3692)) ([637c334](https://github.com/NG-ZORRO/ng-zorro-antd/commit/637c334))
- **breadcrumb:** fix warning startWith operators ([fe28a0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe28a0d))
- **schematics:** missing routing module in sidemenu template ([#3695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3695)) ([fdcef82](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdcef82))

## [8.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.5.1...8.0.0) (2019-06-29)

### Bug Fixes

- **button:** fix order of DOM nodes in button ([#3578](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3578)) ([c3df8b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3df8b5)), closes [#3079](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3079)
- **card:** fix card tab ng-template ([#3654](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3654)) ([7585ba4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7585ba4))
- **descriptions:** fix warning without logger ([#3663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3663)) ([5826fc1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5826fc1))
- **dropdown:** dropdown should close when set disabled ([0bd1ae3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bd1ae3)), closes [#3420](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3420)
- **dropdown:** fix dropdown change after checked bug ([16d5c2d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/16d5c2d))
- **dropdown:** fix dropdown SSR bug ([#3628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3628)) ([ade1abd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ade1abd))
- **form:** fix form control validate with formControl ([bc54e90](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc54e90)), closes [#3551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3551)
- **form:** fix form overlap ([#3633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3633)) ([0fc7d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0fc7d05)), closes [#3607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3607)
- **form:** fix nzValidateStatus & nzHasFeedback overlap ([fb4965b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb4965b)), closes [#3607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3607)
- **grid:** Make all properties in EmbeddedProperty optional ([#3473](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3473)) ([107e731](https://github.com/NG-ZORRO/ng-zorro-antd/commit/107e731))
- **input:** fix ng-content nzAddOnBeforeIcon transclusion ([#3597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3597)) ([a37ec0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a37ec0a)), closes [#3596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3596)
- **mention:** fix cannot to switch trigger ([#3632](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3632)) ([c8b5b09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c8b5b09)), closes [#3629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3629)
- **menu:** fix menu title ExpressionChangedAfterItHasBeenCheckedError ([52975ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/52975ff)), closes [#3023](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3023)
- **menu:** fix submenu not active when collapsed ([67f6fa2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67f6fa2)), closes [#3345](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3345)
- **pagination:** fix pagination nzTotal 0 bug ([#3651](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3651)) ([d28fc49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d28fc49)), closes [#3648](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3648)
- **select:** fix nzOpen state when nzOnSearch trigger ([3ca816d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ca816d)), closes [#3626](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3626)
- **select:** fix select enter open when disabled ([36db36c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36db36c)), closes [#3408](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3408)
- **select:** fix the bug of duplication when keyboard input chinese char ([#3440](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3440)) ([3c82f26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c82f26)), closes [#3439](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3439)
- **table:** compatible with @angular/material/table ([79b02ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79b02ca))
- **table:** fix sortChange with dynamic columns ([#3603](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3603)) ([#3605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3605)) ([c85743d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c85743d))
- **typography:** fix the actions button order ([#3677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3677)) ([c2c28a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2c28a4))
- **typography:** not render when the edit text has no changes ([51b9ce0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51b9ce0))

### Features

- **avatar:** add nzSrcSet & nzAlt properites ([#3583](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3583)) ([d0ad5e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0ad5e8)), closes [#3543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3543)
- **breadcrumb:** support dropdown ([#3636](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3636)) ([9dfab45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9dfab45))
- **carousel:** support dot position ([#3575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3575)) ([0566331](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0566331))
- **core:** add universal logger funcs and deprecation warnings ([#3538](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3538)) ([b893520](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b893520))
- **form:** refactor form to support better template driven ([10d0e28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10d0e28))
- **input-number:** support nzId ([a6500c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6500c8))
- **menu:** support auto active menu-item via routerLink ([c9e84c7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9e84c7))
- **menu:** support nzTitle & nzIcon in nz-submenu ([0cde4d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cde4d7))
- **pagination:** support pagination nzDisabled ([141bef8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/141bef8))
- **select:** support custom template in select component ([#3071](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3071)) ([aad02a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aad02a5)), closes [#2946](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2946)
- **table:** support nzVirtualForTrackBy ([cb14096](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb14096))
- **transfer:** add nzShowSelectAll & nzRenderList properties ([#3588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3588)) ([1619f30](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1619f30)), closes [#3567](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3567) [#2870](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2870)
- **typography:** add typography component ([#3119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3119)) ([4d739ef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d739ef))
- **schematics:** add template option in `ng-add` ([#3674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3674)) ([69072de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69072de))

## [7.5.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.4.1...7.5.0) (2019-06-05)

### Bug Fixes

- **cascader:** fix reset trigger redraw ([#3481](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3481)) ([7c0e30c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c0e30c)), closes [#3480](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3480)
- **date-picker:** replace DatePipe with formatDate function ([#3500](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3500)) ([19ad7fd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/19ad7fd)), closes [#3487](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3487)
- **layout:** fix width type ([#3525](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3525)) ([fd803bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd803bd))
- **select:** display error when in tag and search mode ([#3442](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3442)) ([a05f5a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a05f5a5)), closes [#3424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3424)

### Features

- **button:** support link type ([#3503](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3503)) ([050f141](https://github.com/NG-ZORRO/ng-zorro-antd/commit/050f141)), closes [#3479](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3479)
- **carousel:** support custom strategies ([#3501](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3501)) ([a53a43a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a53a43a))
- **descriptions:** add component ([#3327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3327)) ([11bf89e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/11bf89e)), closes [#2847](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2847)
- **drawer:** support pressing ESC to close drawer ([#3488](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3488)) ([2928f84](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2928f84))
- **dropdown:** support customize icons ([#3517](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3517)) ([4329b51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4329b51))

## [7.4.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.4.0...7.4.1) (2019-05-21)

### Bug Fixes

- **build:** unable to build in production when importing secondary module ([#3266](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3266))

## [7.4.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.3.3...7.4.0) (2019-05-19)

### Bug Fixes

- **breadcrumb:** fix input boolean and router event not caught error ([#3185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3185)) ([fd43ec5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd43ec5)), closes [#3186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3186)
- **carousel:** fix carousel in entry components ([#3367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3367)) ([9d495fc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d495fc))
- **cascader,checkbox,switch,tooltip:** fix memory leak problem ([#3416](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3416)) ([c63849f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c63849f))
- **drawer:** fix z-index level ([#3405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3405)) ([663f6c1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/663f6c1)), closes [#3402](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3402)
- **menu:** submenu should not remain highlighted ([#3455](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3455)) ([fd47605](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd47605))
- **modal:** cannot to close in order of overlay opens when using esc ([#3339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3339)) ([0533c32](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0533c32)), closes [#3338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3338)
- **modal:** content not work in confirm mode when the type is component ([#3415](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3415)) ([6458c57](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6458c57)), closes [#3407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3407)
- **modal:** should not close when mousedown in the body ([#3400](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3400)) ([82e488a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82e488a)), closes [#3394](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3394)
- **progress:** fix stroke color is not updated ([#3445](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3445)) ([80c6ed4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80c6ed4)), closes [#3441](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3441)
- **tree,tree-select:** fix the styles of connecting line ([#3385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3385)) ([f7e9a7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f7e9a7c)), closes [#3382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3382)

### Features

- **card:** support setting size ([#3429](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3429)) ([2015021](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2015021))
- **drawer:** support `nzOnCancel` for service mode ([#3376](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3376)) ([3742eda](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3742eda)), closes [#3372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3372)
- **tree-select:** support customized icon ([#3395](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3395)) ([0deda73](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0deda73))

## [7.3.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.3.2...7.3.3) (2019-04-25)

### Bug Fixes

- **auto-complete:** enter-keydown event should not be prevent when the panel is closed ([#3342](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3342)) ([414b428](https://github.com/NG-ZORRO/ng-zorro-antd/commit/414b428)), closes [#3340](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3340)
- **radio, tab:** Fixed memory leak problem. ([#3354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3354)) ([7d18fef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d18fef))
- **table:** fix table custom filter icon position & virtual scroll style ([#3365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3365)) ([6435ee5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6435ee5)), closes [#3357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3357) [#3348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3348) [#3359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3359)
- **tree-select:** add the public methods ([#3335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3335)) ([ee6d18b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee6d18b))

## [7.3.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.3.1...7.3.2) (2019-04-22)

### Bug Fixes

- **build:** fix bundling error of components.less ([#3331](https://github.com/NG-ZORRO/ng-zorro-antd/pull/3331)) ([fb19921](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb19921))

## [7.3.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.3.0...7.3.1) (2019-04-22)

### Bug Fixes

- **tree:** fix nodes list to render correctly ([#3326](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3326)) ([6d759a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d759a8)), closes [#3320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3320)
- **select:** fix select search display ([#3324](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3324)) ([d91af03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d91af03)), closes [#3322](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3322)

## [7.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.2.0...7.3.0) (2019-04-21)

### Features

- support server-side rendering ([#3295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3295)) ([2088459](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2088459)), closes [#3222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3222) [#43](https://github.com/NG-ZORRO/ng-zorro-antd/issues/43) [#2025](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2025) [#2474](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2474)
- support standalone/secondary entry modules ([#3234](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3234))
- **modal:** support `nzMask` and `nzMaskClosable` global config ([#3033](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3033)) ([12cac9e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/12cac9e))
- **tree:** support nzBlockNode ([#3270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3270)) ([5129f73](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5129f73))
- **date-picker:** `nzRanges` support callback ([#3304](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3304)) ([a231cb5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a231cb5)), closes [#1629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1629)
- **date-picker:** support `nzOnCalendarChange` ([#3169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3169)) ([4446005](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4446005))
- **form:** support hide the label colon ([#3136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3136)) ([663169f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/663169f))
- **table:** expose CdkVirtualScrollViewport ([#3297](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3297)) ([a942312](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a942312)), closes [#3144](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3144) [#3073](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3073) [#2886](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2886)
- **table:** support nzLoadingIndicator ([#3299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3299)) ([1f339b3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f339b3)), closes [#3008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3008)
- **time-picker:** support 12-hour with `nzUse12Hours` ([#3127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3127)) ([7c52774](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c52774))
- **tree, tree-select:** support customize icons ([#2933](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2933)) ([a77f6c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a77f6c9))
- **schematics:** enhance component generator ([#3265](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3265)) ([c22eae5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c22eae5))

### Bug Fixes

- **anchor:** fix scroll bar misplacement in target container ([#3242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3242)) ([37ac541](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37ac541))
- **drawer:** create focus trap error when `nzVisible` default value is true ([#3203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3203)) ([327ceca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/327ceca)), closes [#3200](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3200)
- **dropdown:** fix dropdown expands outside the bounds of the page ([#3289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3289)) ([47f0aef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47f0aef)), closes [#3288](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3288)
- **dropdown:** fix dropdown style conflict with material style ([#3290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3290)) ([e30a9be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e30a9be)), closes [#3241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3241)
- **dropdown:** fix dropdown ul list-style ([#3284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3284)) ([2845b57](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2845b57)), closes [#3268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3268)
- **form:** fix form control template driven ([#3305](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3305)) ([032d193](https://github.com/NG-ZORRO/ng-zorro-antd/commit/032d193)), closes [#3211](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3211)
- **i18n:** fix catalan translations ([#3080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3080)) ([81f917a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/81f917a)), closes [#2569](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2569)
- **input-number:** blur event can't get correct current value from validation info ([#3315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3315)) ([ee3d94c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee3d94c)), closes [#3134](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3134)
- **modal:** integration problem with select component ([#3245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3245)) ([3da4b68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3da4b68)), closes [#3213](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3213)
- **select:** fix select disable cursor ([#3287](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3287)) ([f5528d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f5528d9)), closes [#3246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3246)
- **select:** fix select not change after option input changes ([#3313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3313)) ([74d996b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74d996b)), closes [#3029](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3029)
- **select:** fix select scroll top trigger ([#3285](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3285)) ([1478e59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1478e59)), closes [#3258](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3258)
- **steps:** updateChildrenSteps bug ([#3194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3194)) ([8198b23](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8198b23)), closes [#3193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3193)
- **table:** fix table border in firefox ([#3294](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3294)) ([82407e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82407e7)), closes [#3164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3164)
- **tree:** duplicated module import ([#3286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3286)) ([5c8b923](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c8b923))
- **tree, tree-select:** fix the key validity check ([#3247](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3247)) ([87f2386](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87f2386)), closes [#3163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3163)
- **upload:** fix deprecated icon class property ([#3230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3230)) ([bc4e7da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc4e7da)), closes [#3228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3228)
- **rate** click event is stopped ([#3262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3262)) ([2b4bde4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b4bde4)), closes [#3252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3252)
- **style** fix patch not included ([#3317](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3317)) ([5b02e48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5b02e48))

## [7.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.1.0...7.2.0) (2019-03-27)

### Bug Fixes

- **affix:** set correct style of Affix after trigger resize ([#3089](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3089)) ([ff482e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff482e0)), closes [#3040](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3040)
- fix type of some API ([#3166](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3166)) ([c685836](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c685836))
- **breadcrumb:** fix auto generate not working in lazy modules ([#3174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3174)) ([4260a40](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4260a40)), closes [#2538](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2538)
- **dropdown:** fix the style of CDK conflicts ([#3133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3133)) ([a9cd84d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9cd84d)), closes [#3075](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3075)
- **progress:** should not set success when success percent is … ([#3135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3135)) ([f85c766](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f85c766))
- **transfer:** fix invalid trigger checked event in blank area ([#3161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3161)) ([92097b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92097b2)), closes [#3160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3160) [#3159](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3159)
- **upload:** fix missing remove event when type is drag ([#3114](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3114)) ([2b1fdd9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b1fdd9)), closes [#3034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3034) [#3139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3139) [#3171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3171)

### Features

- **collapse:** support `nzExtra` ([#3177](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3177)) ([fbfb4da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fbfb4da))
- **menu:** support `nzMenuClassName` for the submenu ([#3176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3176)) ([15b6724](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15b6724))
- **page-header:** add page-header component ([#2732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2732)) ([cf51c1f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf51c1f)), closes [#2710](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2710)
- **schematics:** do not set boot page when the target file is modified ([#3178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3178)) ([0a3f62c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a3f62c))

## [7.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.0.3...7.1.0) (2019-03-21)

### Bug Fixes

- **tree:** fix nzMultiple and rollback code ([#3060](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3060)) ([c917938](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c917938)), closes [#3076](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3076)
- **cascader:** fix columns not dropped ([#3037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3037)) ([72a9e67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/72a9e67)), closes [#3034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3034)
- **date-picker:** export `year-picker` component ([#3125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3125)) ([c5b0af9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5b0af9))
- **modal:** integrate with tabs and autosize ([#3065](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3065)) ([4cab26f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cab26f)), closes [#2286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2286) [#2713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2713)
- **modal:** simple confirm should not have cancel button ([#3115](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3115)) ([f0a2b51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0a2b51)), closes [#3107](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3107)
- **tooltip:** fix tooltip not render after set ([#3091](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3091)) ([2841a2f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2841a2f))

### Features

- **message:** support `nzTop` ([#3047](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3047)) ([351135b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/351135b)), closes [#3041](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3041)
- **message:** support template ([#3102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3102)) ([d3f6655](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d3f6655)), closes [#3081](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3081)

## [7.0.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.0.2...7.0.3) (2019-03-14)

### Bug Fixes

- **select:** fix select init touched state error when disabled ([#3084](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3084)) ([ba9d454](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba9d454)), closes [#3059](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3059)

### Build

- **build:** add strictNullCheck config ([#2126](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2977))
- **build:** upgrade icon to 2.0.2 ([#3085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3085)) ([fc72d7d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc72d7d))

## [7.0.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.0.1...7.0.2) (2019-03-11)

### Bug Fixes

- **pagination:** fix pagination bug ([#3067](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3067)) ([f4948d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f4948d7)), closes [#3049](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3049)
- **steps:** fix steps state change error under onpus strategy ([#3061](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3061)) ([97adb2c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/97adb2c))
- **table:** fix table small size virtual scroll style ([#3063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3063)) ([4fa16de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4fa16de)), closes [#3050](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3050)
- **table:** fix th check not trigger bug ([#3064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3064)) ([dbc33ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dbc33ae)), closes [#3028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3028) [#3056](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3056) [#3058](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3058)
- **transfer:** fix click checkbox can't trigger selection ([#3030](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3030)) ([f077294](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f077294)), closes [#3026](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3026)

## [7.0.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.0.0...7.0.1) (2019-03-04)

### Bug Fixes

- **tree:** fix default keys bug with setTimeOut ([#3003](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3003)) ([050faa0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/050faa0)), closes [#3001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3001)
- **tree:** fix expand state bug for tree-select ([#2997](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2997)) ([623a9ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/623a9ff))
- **checkbox:** fix checkbox a11y error ([#3009](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3009)) ([42ed317](https://github.com/NG-ZORRO/ng-zorro-antd/commit/42ed317)), closes [#3000](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3000)
- **fesm2015:** fix fesm2015 build error ([#3015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3015)) ([e5b388a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5b388a))
- **icon:** remove icon test module export ([#3002](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3002)) ([28edb53](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28edb53))
- **schematics:** fix `add-icon-assets` schema path ([#3005](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3005)) ([5101928](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5101928))
- **select:** fix select reset in form ([#3017](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3017)) ([30b3d86](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30b3d86)), closes [#3014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3014)
- **table:** fix table crash with double binding ([#3007](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3007)) ([a2202b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a2202b4)), closes [#3004](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3004)

## [7.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.0.0-rc.3...7.0.0) (2019-02-28)

### Update Guidance

1. Update Angular and other packages to newest versions.

2. Update ng-zorro-antd to 7.0.

**Notice**

Pay attention to these changes to ensure that your code works as expected:

1. All components now work with OnPush strategy. Components with this strategy would not respond to mutations on object properties or array child items, even decorated with @Input(). So you should make all your @Input properties immutable objects. Not only this would ensure your code works correctly but also improve performance if you use [immutable objects](https://www.sitepoint.com/immutability-javascript/) right. Please checkout our example below.
2. We correct the meaning of nzDropdownMatchSelectWidth of Select component. Now it means exactly opposite of the old one.
3. If you want to add a button to an input-group in search mode, you should use nzAddOnAfter instead of nzSuffix.

### Bug Fixes

- **tree:** fix animation of expand method ([#2989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2989)) ([5142d18](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5142d18))
- **tree:** fix remove and clearChildren missing origin ([#2995](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2995)) ([41b0e67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41b0e67))
- **tree-select:** fix nzNodes type ([#2992](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2992)) ([c435853](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c435853))
- **affix:** fix should reset placeholder size when trigger resize event ([#2835](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2835)) ([7068a5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7068a5e)), closes [#2818](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2818)
- **all:** move hostbinding to constructor to fix angular transition bug ([#2895](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2895)) ([e39f6bf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e39f6bf))
- **anchor:** fix called detectChanges when component destroy ([#2864](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2864)) ([0e5c937](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e5c937)), closes [#2860](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2860)
- **cascader:** fix children state not changed in async demo ([#2985](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2985)) ([b87e8bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b87e8bb)), closes [#2984](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2984)
- **cascader:** fix empty shown when searching value ([#2906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2906)) ([89c94ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89c94ee)), closes [#2903](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2903)
- **cascader:** fix searching error when nzOptions is an empty … ([#2846](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2846)) ([e33cc50](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e33cc50)), closes [#2784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2784)
- **core:** fix the style of CDK conflicts ([#2917](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2917)) ([37cf6f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37cf6f3)), closes [#2874](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2874)
- **drawer:** ngOnDestory may called before onInit ([#2037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2037)) ([9bf9299](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9bf9299))
- **empty:** fix locale cannot change dynamically ([#2866](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2866)) ([2a2fbca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a2fbca))
- **empty:** show no empty when use pass null ([#2768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2768)) ([48d5333](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d5333))
- **grid:** fix grid responsive ([#2915](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2915)) ([ab05619](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab05619)), closes [#2908](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2908)
- **i18n:** Danish locale is exported and mentioned in i18n docs ([6554cf5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6554cf5))
- **input:** fix antd input style change & input password demo ([#2969](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2969)) ([bd03a91](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bd03a91)), closes [#2945](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2945) [#2956](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2956)
- **radio:** children unable to focus in radio label ([#2850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2850)) ([58743b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/58743b8)), closes [#2774](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2774)
- **select & module:table:** fix table style error & select error ([#2987](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2987)) ([0d6fc9e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d6fc9e)), closes [#2983](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2983)
- **slider:** fix defaultValue check error ([#2986](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2986)) ([c3649bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3649bc))
- **switch:** fix switch error when loading or disabled ([#2896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2896)) ([a67984c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a67984c)), closes [#2787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2787)
- **tooltip:** fix setTitle proxy to nzTitle ([#2698](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2698)) ([f6dfbd9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f6dfbd9)), closes [#2695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2695)
- **tree:** word misspelling(destory -> destroy) ([#2914](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2914)) ([a7b4e09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a7b4e09))
- **tree-select:** fix tree-select overlay's index problem ([#2764](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2764)) ([599ae1a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/599ae1a)), closes [#2730](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2730)

### Features

- **all:** support disable animations in every components ([#2975](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2975)) ([0d7736e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d7736e)), closes [#2401](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2401) [#2922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2922)
- **auto-complete:** close panel when the trigger element blur ([#2916](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2916)) ([1e075f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e075f9)), closes [#2885](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2885)
- **auto-complete,mention,select,tree-select:** prevent loss of focus when the options click ([#2979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2979)) ([fcaa6d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fcaa6d1)), closes [#2448](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2448)
- **calendar:** sync some changes from ant-design ([#2769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2769)) ([#2963](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2963)) ([35a6f0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/35a6f0d)), closes [#2796](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2796)
- **cascader:** reposition cascader when column opens ([#2836](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2836)) ([289ba54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/289ba54)), closes [#2181](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2181) [#2809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2809)
- **collapse:** add extra field ([#2923](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2923)) ([dd0cec2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dd0cec2)), closes [#1911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1911)
- **collapse:** support custom icon ([#2783](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2783)) ([a530f80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a530f80))
- **comment:** add comment component ([#2767](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2767)) ([1d68e44](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1d68e44)), closes [#2731](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2731)
- **date-picker:** support nzDisabledDate for year-picker ([#2949](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2949)) ([71dda9b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71dda9b)), closes [#2194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2194)
- **empty:** add empty component ([#2722](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2722)) ([8906dff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8906dff)), closes [#2711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2711)
- **i18n:** update missing fields in fr_FR(NG-ZORRO[#2586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2586)) ([#2737](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2737)) ([c821d56](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c821d56))
- **icon:** fix falsy render ([#2912](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2912)) ([6dd3cbf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6dd3cbf)), closes [#2911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2911)
- **icon:** support rotate ([#2891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2891)) ([07f76af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07f76af)), closes [#2888](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2888)
- **icon:** update dependency to support namespace ([#2641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2641)) ([a2000fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a2000fa))
- **input:** fix \*fix icon new api capability ([#2841](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2841)) ([3c954cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c954cb))
- **layout:** support zeroTrigger ([#2938](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2938)) ([4e4231d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4e4231d)), closes [#1950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1950) [#1951](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1951)
- **message,notification:** add close event ([#2952](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2952)) ([f2e45ea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f2e45ea)), closes [#2458](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2458)
- **modal:** support set `nzOkDisabled` and `nzCancelDisabled` ([#2856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2856)) ([fa6a8e9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa6a8e9)), closes [#1838](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1838)
- **notification:** support nzData as context in template ([#2926](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2926)) ([51940f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51940f7)), closes [#2755](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2755)
- **popconfirm:** support custom icon ([#2964](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2964)) ([ff030ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff030ff)), closes [#2196](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2196)
- **rate:** add tooltip support ([#2794](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2794)) ([e121bd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e121bd3))
- **slider:** support nzTooltipVisible ([#2930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2930)) ([d3e61d4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d3e61d4)), closes [#2373](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2373)
- **statistic:** add statistic and countdown component ([#2760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2760)) ([abb9ae4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/abb9ae4))
- **tabs:** support lazy load tabs ([#2968](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2968)) ([626a0f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/626a0f4)), closes [#2716](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2716)
- **tree-select:** support set `nzNotFoundContent` ([#2740](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2740)) ([d9055f5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9055f5))
- **tree-select:** support set the max count for tags ([#2970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2970)) ([4081abb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4081abb)), closes [#2488](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2488)
- **upload:** support with non-image format file preview ([#2709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2709)) ([4c41715](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c41715))

## [7.0.0-rc.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.0.0-rc.2...7.0.0-rc.3) (2018-12-26)

### Bug Fixes

- **table:** fix table sticky style ([#2688](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2688)) ([50d4fc4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/50d4fc4))
- **transfer:** fix the `Not Found` display condition ([#2687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2687)) ([3df5779](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3df5779)), closes [#2686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2686)

## [7.0.0-rc.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.0.0-rc.1...7.0.0-rc.2) (2018-12-24) [deprecated]

### Bug Fixes

- **input:** fix input autoresize ([#2662](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2662)) ([0621ce8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0621ce8)), closes [#2646](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2646)
- **layout:** fix sider nzBreakPoint ([#2665](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2665)) ([4fbfccb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4fbfccb)), closes [#2603](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2603)
- **radio:** fix radio ContentChildren error ([#2660](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2660)) ([36b2099](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36b2099)), closes [#2206](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2206) [#2611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2611)
- **tabs:** fix tabs style error ([#2673](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2673)) ([458c062](https://github.com/NG-ZORRO/ng-zorro-antd/commit/458c062))

### Features

- **autocomplete,dropdown:** add class & style properties in overlay panel ([#2639](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2639)) ([b7f41f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7f41f8)), closes [#2634](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2634)
- **i18n:** add Slovenian support, ICU locale sl_SI, [#2545](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2545) ([#2652](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2652)) ([d0b9a2a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0b9a2a))
- make the doc website a pwa ([#2661](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2661)) ([4f48ecd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f48ecd))

## [7.0.0-rc.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/7.0.0-rc.0...7.0.0-rc.1) (2018-12-12)

### Bug Fixes

- **drawer, modal:** fix focus bug of IE ([#2589](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2589)) ([0458604](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0458604)), closes [#2388](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2388)
- **collapse:** fix collapse ([#2597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2597)) ([5bb1a99](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5bb1a99)), closes [#2567](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2567)
- **icon:** add missing icons used by ng-zorro-ant itself ([ef10595](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ef10595))
- **select:** add title property for select component ([#2575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2575)) ([3444634](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3444634)), closes [#1974](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1974)
- **table:** should prevent tr click trigger when clicking expand ([#2618](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2618)) ([88be1c3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/88be1c3)), closes [#2419](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2419)
- **schematics:** compatible with old version options ([#2622](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2622)) ([bb1489b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb1489b))

### Features

- **tabs:** support forceRender in tabs ([#2619](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2619)) ([fa9160c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa9160c))
- **upload:** support Observable in nzFilter ([#2590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2590)) ([c664c6f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c664c6f)), closes [#2389](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2389)

## [7.0.0-rc.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.8.0...7.0.0-rc.0) (2018-11-30)

### Bug Fixes

- **menu:** fix dropdown menu item selected className ([#2434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2434)) ([acbe5da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/acbe5da)), closes [#2433](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2433)
- **menu:** fix fold menu ([#2454](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2454)) ([f228013](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f228013)), closes [#2449](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2449)
- **timeline:** fix loading icon ([#2386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2386)) ([cebfff7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cebfff7)), closes [#2377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2377)
- **readme:** fix misspelling ([#2472](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2472)) ([e5535d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5535d2))

### Features

- Adds danish locale ([#2486](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2486)) ([1c7f983](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c7f983)), closes [#2485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2485)
- **avatar:** support custom size ([#2416](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2416)) ([0bf8a36](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bf8a36)), closes [#2380](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2380)
- **drawer:** add input property in NzDrawerRef ([#2464](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2464)) ([9565cd5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9565cd5)), closes [#2403](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2403)
- **modal:** support clicking ESC to close modal ([#2483](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2483)) ([c72f431](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c72f431)), closes [#1999](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1999)
- **progress:** support custom strokeColor and strokeLinecap ([#2404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2404)) ([167a110](https://github.com/NG-ZORRO/ng-zorro-antd/commit/167a110)), closes [#2378](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2378)

## [1.8.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.8.0...1.8.1) (2018-11-24)

### Bug Fixes

- **collapse:** can't fold up active panel with accordion ([#2440](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2440)) ([a17ea49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a17ea49)), closes [#2437](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2437)
- **list:** fix invalid render empty style when unspecified data source ([#2415](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2415)) ([7ae325f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ae325f)), closes [#2385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2385)
- **menu:** fix dropdown menu item selected className ([#2434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2434)) ([e6e2369](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e6e2369)), closes [#2433](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2433)
- **menu:** fix fold menu ([#2454](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2454)) ([e41640a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e41640a)), closes [#2449](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2449)

### Features

- Adds danish locale ([#2486](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2486)) ([811a009](https://github.com/NG-ZORRO/ng-zorro-antd/commit/811a009)), closes [#2485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2485)

## [1.8.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.7.1...1.8.0) (2018-10-26)

### Bug Fixes

- **calendar:** fix calendar year picker ([#2355](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2355)) ([a4a948c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a4a948c)), closes [#2351](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2351)
- **esm5:** fix esm5 package ([#2357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2357)) ([e06b9a7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e06b9a7)), closes [#2339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2339)
- **layout:** fix layout init breakpoint nzCollapsed value ([#2350](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2350)) ([8f58fae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8f58fae)), closes [#2343](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2343)
- **menu:** fix menu level 4 padding error ([#2356](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2356)) ([7906066](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7906066)), closes [#2327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2327)
- **spin:** fix spin hang error with submenu ([#2352](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2352)) ([65fc10a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65fc10a)), closes [#2346](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2346)
- **tree:** fix icon to svg & draggable event listener ([#2338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2338)) ([8bc488e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8bc488e)), closes [#2332](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2332) [#2205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2205) [#2336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2336)
- **tree-select:** can't work default values in OnPush mode ([#2364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2364)) ([04cf7aa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/04cf7aa)), closes [#2318](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2318) [#2085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2085)

### Features

- **icon:** add injectiontoken config and default twotone color ([#2353](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2353)) ([bea1d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bea1d05))
- **list:** list empty style ([#2365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2365)) ([e2d09a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e2d09a0)), closes [#2362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2362)

### Performance Improvements

- **upload:** optimize invalid parameter warning ([#2363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2363)) ([ee31a4e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee31a4e)), closes [#2322](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2322)

## [1.7.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.7.0...1.7.1) (2018-10-23)

### Bug Fixes

- **drawer:** style error when the unit is percentage ([#2334](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2334)) ([9e07702](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e07702)), closes [#2333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2333)
- **icon:** fix icon miss in components ([#2321](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2321)) ([af4ddfb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af4ddfb)), closes [#2326](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2326)
- **icon:** fix icons problems ([#2325](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2325)) ([8a0d412](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8a0d412))
- **schematics:** fix object comparisons method ([#2328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2328)) ([a7beda8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a7beda8))

## [1.7.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.6.0...1.7.0) (2018-10-18)

### Bug Fixes

- **tabs:** hide next and prev buttons when nzTabPosition is left or right ([#2239](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2239)) ([3bb8be5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bb8be5))
- **breadcrumb:** navigate within angular ([#2283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2283)) ([0c41306](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0c41306)), closes [#2254](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2254)
- **button:** fix button loading bug ([#2251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2251)) ([cb71e9b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb71e9b)), closes [#2191](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2191)
- **cascader:** fix error when nzOptions change and in search mode ([#2241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2241)) ([c3c2d26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3c2d26)), closes [#2105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2105)
- **cascader:** fix support to nzLabelProperty ([#2231](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2231)) ([37523c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37523c8)), closes [#2103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2103)
- **date-picker:** fix the calendar not shown up when click on the icon ([#2235](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2235)) ([8ffcfac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8ffcfac)), closes [#2221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2221)
- **date-picker:** use fixed width when "nzShowTime" settled for picker ([#2236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2236)) ([463a14c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/463a14c))
- **icon:** fix broken icons ([#2248](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2248)) ([e0d9987](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e0d9987))
- **icon:** fix icon classname writeback ([#2259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2259)) ([c6337c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6337c2))
- **list:** fix does not trigger change detection correctly when from empty array to data array ([#2199](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2199)) ([92c1a85](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92c1a85))
- **select:** fix space closing select panel ([#2240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2240)) ([3d7fe39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d7fe39)), closes [#2201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2201)
- **select,tree-select:** prevent pop the dropdown when click remove ([#2290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2290)) ([4fa9367](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4fa9367)), closes [#2276](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2276)
- **spin:** fix cdk change detection ([#2255](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2255)) ([25671b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/25671b6)), closes [#1819](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1819)
- **table:** fix filter table header in ant design 3.10 ([#2260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2260)) ([ebf151a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ebf151a))
- **upload:** fix only allow type is picture or picture-card generate thumbnail ([#2219](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2219)) ([8306111](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8306111)), closes [#2216](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2216)

### Features

- **icon:** switch to SVG icons ([#2171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2171)) ([7bdb79b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7bdb79b))
- **modal:** auto focus when open and restore focus when close ([#2188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2188)) ([7c0ced4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c0ced4)), closes [#2124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2124)
- **schematics:** add fix icon schematic ([#2238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2238)) ([8861beb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8861beb))

## [1.6.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.5.0...1.6.0) (2018-09-22)

### Bug Fixes

- **date-picker:** fix year-picker and month-picker style error within compacted input group ([#2136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2136)) ([049212f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/049212f))
- **calendar:** fix calendar year list ([#2140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2140)) ([e485d02](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e485d02)), closes [#2091](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2091)
- **cascader:** search correctly when a root node is a leaf node ([#2108](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2108)) ([28556e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28556e4)), closes [#2104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2104)
- **drawer:** drawer content cannot scroll ([#2120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2120)) ([e8dad8f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e8dad8f)), closes [#2119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2119)
- **steps:** fix dynamic steps error ([#2149](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2149)) ([ee3fa7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee3fa7e)), closes [#2148](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2148)
- **publish:** add version number validation and rename script ([#2117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2117)) ([bc1f6fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc1f6fa))
- **schematics:** compatibility with Angular CLI 6.2.0 ([#2131](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2131)) ([ac428db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac428db))
- **test:** fix test coverage dependency ([#2146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2146)) ([310771f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/310771f))
- **upload:** fix typo ([#2173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2173)) ([69c5210](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69c5210))

### Features

- **drawer:** support service to create drawer ([#1981](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1981)) ([a232d59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a232d59)), closes [#1937](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1937)
- **upload:** add directory support ([#2164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2164)) ([3ef8bcf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ef8bcf)), closes [#2167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2167) [#2154](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2154)
- **tree:** support more functions & property ([#2121](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2121))
- **skeleton:** add skeleton component ([#1829](https://github.com/NG-ZORRO/ng-zorro-antd/pull/1829))

### Build

- **build:** use ng-packagr to generate library ([#2126](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2126))

### Performance Improvements

- **table:** improve table performance ([#2157](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2157)) ([cde5fb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cde5fb0))

## [1.5.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.4.1...1.5.0) (2018-09-09)

### Bug Fixes

- **drawer:** provide custom scroll strategy ([#2095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2095)) ([b993068](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b993068)), closes [#2070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2070)
- **modal:** fix generic type of the "nzComponentParams" for user to gain more type intellisense ([#1812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1812)) ([6ef1185](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6ef1185))

### Features

- **breadcrumb:** support auto generated breadcrumb ([#2050](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2050)) ([64d191c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64d191c)), closes [#2001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2001)
- **button:** support block style ([#2051](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2051)) ([2858ba1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2858ba1)), closes [#2047](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2047)
- **drawer:** support top and bottom placement ([#2039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2039)) ([693b4eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/693b4eb)), closes [#2015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2015)
- **modal:** support customized modal config (current "autoBodyPadding") ([#2006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2006)) ([1d5e06c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1d5e06c)), closes [#1720](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1720)
- **select:** support open and close panel via keyboard ([#2038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2038)) ([b2ea96a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b2ea96a)), closes [#1909](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1909)
- **steps:** support customized starting index ([#2021](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2021)) ([bc7bf17](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc7bf17)), closes [#1994](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1994)
- **publish:** add publish script ([#1979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1979)) ([98cb651](https://github.com/NG-ZORRO/ng-zorro-antd/commit/98cb651)), closes [#1925](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1925)

## [1.4.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.4.0...1.4.1) (2018-09-02)

### Bug Fixes

- **auto-complete:** can't select option when touch ([#2054](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2054)) ([2e8e63d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2e8e63d)), closes [#2053](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2053)
- **modal:** close modal itself before destructing by the angular's lifecycle ([#1769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1769)) ([075c7a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/075c7a4)), closes [#1663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1663)
- **pagination:** take minimum of page range and total ([#2046](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2046)) ([30bccd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30bccd1)), closes [#2036](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2036)
- **table:** fix row spaces ([#2061](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2061)) ([cb34983](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb34983)), closes [#2059](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2059)
- **tree-select:** unable close when used OnPush ([#2028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2028)) ([fb83354](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb83354)), closes [#2012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2012)

## [1.4.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.3.0...1.4.0) (2018-08-19)

### Bug Fixes

- **avatar:** tolerate error src ([#2008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2008)) ([d55cdf2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d55cdf2))
- **carousel:** carousel on desktop can't slide images ([#1970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1970)) ([02a84a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/02a84a9))
- **cascader:** fix dynamic loading error ([#1931](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1931)) ([d4d24fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d4d24fb)), closes [#1927](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1927)
- **cascader:** should not change on hover work ([#1991](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1991)) ([577ae47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/577ae47)), closes [#1966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1966)
- **select:** fix input not blur after user hits enter key ([#1943](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1943)) ([a64d04c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a64d04c)), closes [#1940](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1940)
- **tooltip,popconfirm,popover:** not create element when use directive ([#1968](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1968)) ([fa40145](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa40145)), closes [#1967](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1967)
- **tree-select:** update selected nodes when after set nodes ([#1946](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1946)) ([cd928e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd928e1)), closes [#1934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1934)
- **tree:** fix loading style ([#1942](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1942)) ([19fc2ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/19fc2ee))

### Features

- **modal:** smart to determine whether to add padding-right ([#1877](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1877)) ([a5d631d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a5d631d)), closes [#1422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1422)
- **timeline:** custom circle color ([#1959](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1959)) ([fb3daa1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb3daa1)), closes [#1956](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1956)

## [1.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.2.0...1.3.0) (2018-08-03)

### Bug Fixes

- **auto-complete:** reposition when open the first time ([#1863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1863)) ([c80bc8d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c80bc8d)), closes [#1840](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1840)
- **date-picker:** restrict the date when it overflows at the month panel ([#1903](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1903)) ([3c654a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c654a5)), closes [#1899](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1899)

### Features

- **cascader:** add cascader search ([#1873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1873)) ([633bc87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/633bc87)), closes [#1773](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1773)
- **date-picker:** refactoring and add new feature of year-picker ([#1906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1906)) ([f1f5625](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1f5625)), closes [#416](https://github.com/NG-ZORRO/ng-zorro-antd/issues/416)
- **drawer:** add drawer component ([#1789](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1789)) ([33aff47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/33aff47)), closes [#1565](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1565)
- **radio:** add solid button style ([#1892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1892)) ([945a924](https://github.com/NG-ZORRO/ng-zorro-antd/commit/945a924)), closes [#1891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1891)
- **table:** support default filter ([#1893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1893)) ([cea0e51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cea0e51)), closes [#1872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1872)

## [1.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.1.1...1.2.0) (2018-07-22)

### Bug Fixes

- **carousel:** resize content after window resized ([#1815](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1815)) ([1e0a029](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e0a029)), closes [#1811](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1811)
- **input-number:** NzAutoFocus doesn't work or work as expected ([#1833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1833)) ([739b353](https://github.com/NG-ZORRO/ng-zorro-antd/commit/739b353)), closes [#1706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1706)
- **tree:** sync checked node status and push to checkedNodeList ([#1809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1809)) ([5305723](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5305723)), closes [#1802](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1802)
- **input:** mix using addon and affix ([#1857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1857)) ([ca2d7e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca2d7e0)), closes [#1795](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1795)
- **input-number:** fix touched event ([#1858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1858)) ([7c90a72](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c90a72)), closes [#1785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1785)
- **tabs:** prevent focus cause scroll offset ([#1845](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1845)) ([bbcb0de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bbcb0de)), closes [#1821](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1821)
- **upload:** fix parameter value muse be a function or boolean in nzRemove ([#1851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1851)) ([3532bbe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3532bbe)), closes [#1850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1850)

### Features

- **carousel:** add swipe gesture support ([#1856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1856)) ([bb5bdd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb5bdd3)), closes [#1816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1816)
- **carousel:** support dot render template ([#1860](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1860)) ([c1f15b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1f15b6)), closes [#1743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1743)
- **form:** support touched status update ([#1861](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1861)) ([27ca5bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/27ca5bc)), closes [#1665](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1665)
- **tree-select:** support custom display in the trigger ([#1832](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1832)) ([1cc3646](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1cc3646)), closes [#1823](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1823)

## [1.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.1.0...1.1.1) (2018-07-02)

### Bug Fixes

- **tree:** fix disabled node status & doc ([#1737](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1737)) ([92675e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92675e4)), closes [#1721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1721)
- **auto-complete, mention, tree-select:** update cdk overlay positioning strategy ([#1761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1761)) ([82af2ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82af2ff)), closes [#1756](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1756)
- **date-picker:** support changing language at runtime ([#1768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1768)) ([9caabb5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9caabb5)), closes [#1717](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1717)
- **list:** fix loading style misplacement of spin ([#1767](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1767)) ([336cc08](https://github.com/NG-ZORRO/ng-zorro-antd/commit/336cc08)), closes [#1739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1739)
- **radio:** fix radio disabled bug in group ([#1746](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1746)) ([86fc773](https://github.com/NG-ZORRO/ng-zorro-antd/commit/86fc773)), closes [#1734](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1734)
- **radio:** fix radio in reactive form ([#1748](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1748)) ([b7a831d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7a831d)), closes [#1735](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1735)
- **select:** trigger keyboard on ios ([#1653](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1653)) ([#1751](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1751)) ([89d05f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89d05f9)), closes [#1752](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1752) [#1274](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1274)
- **transfer:** fix title dislocation when form-item layout ([#1745](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1745)) ([4005c7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4005c7c)), closes [#1732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1732)
- **tree-select:** fix unable to set null ([#1760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1760)) ([689f8b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/689f8b4)), closes [#1740](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1740)
- **tree-select:** width is 0 when trigger element is invisible ([#1775](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1775)) ([4eb039a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4eb039a)), closes [#1772](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1772)
- **table:** fix selector error ([#1742](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1742)) ([aeb485f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aeb485f)), closes [#1736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1736)

### Features

- **carousel:** support autoplay speed ([#1741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1741)) ([a516949](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a516949)), closes [#1711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1711)

## [1.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.0.0...1.1.0) (2018-06-25)

### Bug Fixes

- **cascader:** fix custom render with nzClear ([#1676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1676)) ([c683bc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c683bc3)), closes [#1646](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1646)
- **autocomplete:** AOT compiler requires public properties ([#1686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1686)) ([a1f326d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a1f326d)), closes [#1683](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1683)
- **card:** fix card loading style ([#1696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1696)) ([70cb591](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70cb591)), closes [#1695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1695)
- **date-picker:** fix date display of the end part is not as expected ([#1709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1709)) ([b1a1235](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1a1235)), closes [#1693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1693)
- **nz-alert:** emit close after fade animation is done ([#1667](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1667)) ([6b31ca3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b31ca3)), closes [#1666](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1666)
- **select:** move select ovarlay to the last of container ([#1673](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1673)) ([442e3f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/442e3f3)), closes [#1672](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1672) [#1643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1643)
- **th:** fix table th filter & style bug ([#1674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1674)) ([1a4332a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a4332a)), closes [#1671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1671) [#1660](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1660)
- **tree-select:** position error when in the modal-box ([#1687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1687)) ([43910f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/43910f9)), closes [#1681](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1681)
- **ng-add:** remove compiled css from styles when use custom theme ([#1655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1655)) ([fc67ce5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc67ce5))
- **showcase:** use differenceInCalendarDays to do judgement with days for date-picker's demo ([#1648](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1648)) ([7d593e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d593e6))

### Features

- **table:** support nzSimple option ([#1699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1699)) ([4868c41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4868c41)), closes [#1599](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1599)

## [1.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.1...1.0.0) (2018-06-11)

### Bug Fixes

- **tree:** fix nzOnSearchChange & folder tree demo ([#1602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1602)) ([b8e4432](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b8e4432)), closes [#1601](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1601)
- **tree:** support custom property ([#1584](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1584)) ([1ca696a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ca696a)), closes [#1580](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1580)
- **checkbox:** fix invalid setting width via style ([#1577](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1577)) ([ec4be6b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec4be6b)), closes [#1359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1359)
- **modal:** fix multiple nzOnCancel calls ([#1590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1590)) ([bc07be2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc07be2)), closes [#958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/958)
- **modal:** miss returned value from nzOnOk or nzOnCancel ([#1456](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1456)) ([9d6e93b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d6e93b))
- **pagination:** fix still show when total is 0 and nzHideOnSinglePage is true ([#1583](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1583)) ([c5c33d0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5c33d0))
- **popover:** fix popover nzTemplate value ([#1608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1608)) ([7cf6ee1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7cf6ee1))
- **radio:** fix nzDisabled in radio-group ([#1574](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1574)) ([024c488](https://github.com/NG-ZORRO/ng-zorro-antd/commit/024c488)), closes [#1543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1543)
- **spin:** fix spin error in antd 3.6.1 ([#1607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1607)) ([8a1a9ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8a1a9ca))
- **transfer:** fix TransferItem type to work with strictNullChecks ([#1589](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1589)) ([7601af1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7601af1)), closes [#1588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1588)
- **ng-add:** duplicate add bugs ([#1623](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1623)) ([214a00d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/214a00d))
- **ng-add:** fix import path in theme file ([#1611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1611)) ([aa953dc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa953dc))

### Features

- **tree:** sync ant style & add dir demo ([#1559](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1559)) ([0fbf135](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0fbf135))
- **table:** add nzHideOnSinglePage property ([#1585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1585)) ([3bc2e90](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bc2e90))
- **schematic:** support ng add & ng generate ([#1430](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1430)) ([9ed3590](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ed3590)), closes [#1405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1405)

## [0.7.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0...0.7.1) (2018-05-24)

### Bug Fixes

- **tab:** fix vertical-bar error in docs ([#1499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1499)) ([e5d5860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5d5860))
- **autocomplete:** form related bugs ([#1451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1451)) ([c91a0f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c91a0f8)), closes [#1437](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1437)
- **date-picker:** improve the horizontal position adaptability ([#1495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1495)) ([64f5ce5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64f5ce5)), closes [#1450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1450)
- **input-number:** fix focused style could not be removed after blur ([#1453](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1453)) ([80a559f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a559f)), closes [#1449](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1449)
- **menu:** fix menu ngfor bug ([#1519](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1519)) ([4f6c266](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f6c266))
- **message:** increase the overlay's zindex tobe the same with… ([#1461](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1461)) ([5a51344](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5a51344)), closes [#1457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1457)
- **popconfirm:** add nzOkType support ([#1492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1492)) ([6f394a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f394a4)), closes [#1312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1312)
- **sider:** fix typo - isSiderTrgger to isSiderTrigger ([#1434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1434)) ([f1f26ad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1f26ad))

### Features

- **input-number:** support input-number placeholder ([#1512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1512)) ([7e3d4e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e3d4e4))
- **autocomplete:** support bind any types to the nzModule of trigger element ([#1397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1397)) ([b44296e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b44296e)), closes [#1298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1298)
- **switch:** support fully control by user ([#1514](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1514)) ([70ca8bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70ca8bd))

## [0.7.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.5...0.7.0) (2018-05-15)

### Bug Fixes

- **tree:** fix wrong checked nodes ([#1425](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1425)) ([5a06694](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5a06694)), closes [#1423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1423)
- **autocomplete:** fix styles ([#1393](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1393)) ([5ad0452](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ad0452)), closes [#1384](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1384)
- **steps:** fix steps ngfor ([#1421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1421)) ([35da659](https://github.com/NG-ZORRO/ng-zorro-antd/commit/35da659)), closes [#1418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1418)

## [0.7.0-beta.5](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.4...0.7.0-beta.5) (2018-05-01)

### Bug Fixes

- **input-number:** fix display value after formatter changed ([#1371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1371)) ([179c1e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/179c1e2))
- **upload:** fix ngModel was changed to nzPercent in nz-progress ([#1320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1320)) ([9b7336e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b7336e)), closes [#1209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1209)

### Features

- **time-picker:** support null value in time-picker-panel ([#1388](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1388)) ([1ca1490](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ca1490))

## [0.7.0-beta.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.3...0.7.0-beta.4) (2018-04-12)

### Bug Fixes

- **tree:** add origin param to NzTreeNode ([#1221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1221)) ([c9686ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9686ca))
- **card:** fix avatar and detail alignment ([#1255](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1255)) ([6b13ce0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b13ce0))
- **carousel:** fix carousel autoplay bug ([#1309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1309)) ([dd3265d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dd3265d)), closes [#1242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1242)
- **i18n:** fix i18n error without locale ([#1220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1220)) ([880f0e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/880f0e8))
- **mention:** getMention method should kepp the mention prefix ([#1287](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1287)) ([7925f48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7925f48))
- **menu:** fix menu ExpressionChangedAfterItHasBeenCheckedError ([#1306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1306)) ([e63668d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e63668d)), closes [#1216](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1216)
- **docs:** change the homepage url of angular.cn ([#1289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1289)) ([471e064](https://github.com/NG-ZORRO/ng-zorro-antd/commit/471e064))
- **message,notification:** fix message/notification cause multi-detection error while used in dynamic creating component ([#1218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1218)) ([f2624cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f2624cb)), closes [#391](https://github.com/NG-ZORRO/ng-zorro-antd/issues/391)
- **select:** fix select zero value & scroll bug ([#1299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1299)) ([0552141](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0552141)), closes [#1229](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1229) [#1245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1245)
- **table:** fix scrollbar calc ([#1315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1315)) ([0416900](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0416900)), closes [#1205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1205)
- **table:** fix table th filter style ([#1300](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1300)) ([29c559a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29c559a)), closes [#1238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1238)
- **tag:** fix default color when empty color values ([#1256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1256)) ([ba3a323](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba3a323))
- **transfer:** removed change detection ([#1260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1260)) ([d507848](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d507848)), closes [#996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/996)

### Features

- **mention:** add mention component ([#1182](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1182)) ([e28c1b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e28c1b5))
- **mention:** add prefix property to nzOnSearchChange payload ([#1296](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1296)) ([1af5b42](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1af5b42))

## [0.7.0-beta.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.1...0.7.0-beta.3) (2018-03-26)

### Bug Fixes

- **i18n:** fix doc ([#1186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1186)) ([4ba77c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4ba77c2))
- **card:** fix card style ([#1194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1194)) ([ad80297](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad80297)), closes [#1191](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1191)
- **form:** fix form init style miss & fix doc ([#1174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1174)) ([ab37862](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab37862)), closes [#1170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1170) [#1173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1173)
- **input:** fix input disable style in reactive form ([#1167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1167)) ([5c07161](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c07161))
- **table & i18n:** fix table style & export i18n interface ([#1163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1163)) ([fdd03d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdd03d7))

### Features

- **modal:** add afterOpen/afterClose/afterAllClose/closeAll/openModals, adjust the boolean props and changeBodyOverflow and complete testing. ([#1165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1165)) ([10227b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10227b8)), closes [#1155](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1155) [#1162](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1162)
- **modal:** support triggerOk/triggerCancel to trigger nzOnOk/nzOnCancel manually ([#1201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1201)) ([8cc016e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8cc016e))

## [0.7.0-beta.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.10...0.7.0-beta.1) (2018-03-15)

### Bug Fixes

- **back-top:** fix style ([#1125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1125)) ([60fe850](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60fe850))
- **calendar:** use correct classNames ([#1118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1118)) ([5392fde](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5392fde))
- **list:** change contentchild to input ([#1100](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1100)) ([5d9133b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5d9133b))
- **progress:** fix 100% when specify invalid value ([#905](https://github.com/NG-ZORRO/ng-zorro-antd/issues/905)) ([8afedaa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8afedaa))
- **spin:** remove spin container if no content ([7639eac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7639eac))
- **spin:** support dynamic ng-content in spin ([#925](https://github.com/NG-ZORRO/ng-zorro-antd/issues/925)) ([cc7a83b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc7a83b))
- **transfer:** change contentchild to input ([#1099](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1099)) ([abb7de0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/abb7de0))

### Features

- **affix anchor backtop:** refactor affix anchor backtop ([#1025](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1025)) ([24abd10](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24abd10))
- **autocomplete:** add autocomplete component ([#1093](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1093)) ([1461293](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1461293))
- **avatar:** add avatar component ([#1028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1028)) ([65535d5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65535d5))
- **divider:** add divider component ([#1029](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1029)) ([7895e80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7895e80))
- **divider:** add nzOrientation property ([#1126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1126)) ([e100681](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e100681))
- **doc:** support sync single demo dir ([#936](https://github.com/NG-ZORRO/ng-zorro-antd/issues/936)) ([73e4a95](https://github.com/NG-ZORRO/ng-zorro-antd/commit/73e4a95))
- **list:** add list component ([#1031](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1031)) ([9e71deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e71deb))
- **list:** add nz-list component ([6481a88](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6481a88))
- **menu dropdown:** refactor menu dropdown & add test & add doc ([#990](https://github.com/NG-ZORRO/ng-zorro-antd/issues/990)) ([ca1d4e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca1d4e2))
- **tree:** add tree component ([#1147](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1147)) ([7ca5de3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ca5de3))
- **upload:** add upload component ([#1040](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1040)) ([a9efbaa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9efbaa))

## [0.6.10](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.9...0.6.10) (2018-01-06)

### Bug Fixes

- **affix:** fix affix nzOffsetTop bug ([#868](https://github.com/NG-ZORRO/ng-zorro-antd/issues/868)) ([f0bad26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0bad26))
- **radio:** fix radio button click bug ([#867](https://github.com/NG-ZORRO/ng-zorro-antd/issues/867)) ([2de24ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2de24ee)), closes [#854](https://github.com/NG-ZORRO/ng-zorro-antd/issues/854) [#857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/857) [#855](https://github.com/NG-ZORRO/ng-zorro-antd/issues/855)

### Features

- **datepicker:** add range-picker component ([#656](https://github.com/NG-ZORRO/ng-zorro-antd/issues/656)) ([9df3eb9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9df3eb9))
- **locale:** support russian locale ([#853](https://github.com/NG-ZORRO/ng-zorro-antd/issues/853)) ([8d65a83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d65a83))

## [0.6.9](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.8...0.6.9) (2018-01-02)

### Bug Fixes

- **calendar:** fix month/year view switched ([#768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/768)) ([383a0f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/383a0f4))
- **transfer:** 1.fix the "checkAll" status not updated 2.change "ArrayObservable.of" to "of" ([#834](https://github.com/NG-ZORRO/ng-zorro-antd/issues/834)) ([9c023fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9c023fa))

### Features

- **radio:** use nz-radio components alone ([#825](https://github.com/NG-ZORRO/ng-zorro-antd/issues/825)) ([15c968c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15c968c))
- **transfer:** add canMove property & make component using OnPush ([#824](https://github.com/NG-ZORRO/ng-zorro-antd/issues/824)) ([d31c596](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d31c596))

## [0.6.8](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.7...0.6.8) (2017-12-21)

### Bug Fixes

- **modal:** fix modal type error ([#784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/784)) ([cb0ab64](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb0ab64))
- **overlay:** update overlay width when the host component's width change ([#780](https://github.com/NG-ZORRO/ng-zorro-antd/issues/780)) ([62fc733](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62fc733)), closes [#779](https://github.com/NG-ZORRO/ng-zorro-antd/issues/779)
- **popconfirm:** fix backdrop of popconfirm ([#786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/786)) ([60cf7a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60cf7a9)), closes [#785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/785)
- **table:** fix the missing of init table sort class ([#781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/781)) ([b828025](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b828025)), closes [#771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/771)

## [0.6.7](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.6...0.6.7) (2017-12-15)

### Bug Fixes

- **datepicker:** disable datepicker when user input ([#738](https://github.com/NG-ZORRO/ng-zorro-antd/issues/738)) ([84c0f23](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84c0f23))
- **select:** reset select component this.\_value ([#754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/754)) ([4a50d0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4a50d0d))
- **slider:** fix set value in slider ([#743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/743)) ([d0a6793](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0a6793)), closes [#739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/739)

### Features

- **calendar:** use months short format ([#737](https://github.com/NG-ZORRO/ng-zorro-antd/issues/737)) ([805538c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/805538c)), closes [#736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/736)
- **tooltip,popover,popconfirm:** support "nzMouseEnterDelay" and "nzMouseLeaveDelay" ([#758](https://github.com/NG-ZORRO/ng-zorro-antd/issues/758)) ([3a894f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a894f0)), closes [#757](https://github.com/NG-ZORRO/ng-zorro-antd/issues/757)

## [0.6.6](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.5...0.6.6) (2017-12-11)

### Bug Fixes

- **datepicker:** enable simplified boolean usage ([#726](https://github.com/NG-ZORRO/ng-zorro-antd/issues/726)) ([6cf80b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6cf80b0))
- **rate:** ensure value to be number ([#728](https://github.com/NG-ZORRO/ng-zorro-antd/issues/728)) ([35687c3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/35687c3))
- **slider:** fix slider min & max ([#732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/732)) ([6eda3a7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6eda3a7))
- **slider:** rectify return value ([#729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/729)) ([6b095a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b095a8))

### Features

- **input-number:** use boundary value instead of previous value ([#731](https://github.com/NG-ZORRO/ng-zorro-antd/issues/731)) ([48e40f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48e40f4))

## [0.6.5](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.4...0.6.5) (2017-12-10)

## [0.6.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.3...0.6.4) (2017-12-10)

### Bug Fixes

- **input-number:** check value when press tab key ([#706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/706)) ([9923a86](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9923a86)), closes [#651](https://github.com/NG-ZORRO/ng-zorro-antd/issues/651)

### Features

- **form:** support default nzValidateStatus & support more error status ([#696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/696)) ([3d4213f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d4213f)), closes [#693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/693) [#692](https://github.com/NG-ZORRO/ng-zorro-antd/issues/692)
- **grid:** support zero input in grid ([#704](https://github.com/NG-ZORRO/ng-zorro-antd/issues/704)) ([e50b72f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e50b72f)), closes [#702](https://github.com/NG-ZORRO/ng-zorro-antd/issues/702)
- **select:** support placeholder for basic select ([#703](https://github.com/NG-ZORRO/ng-zorro-antd/issues/703)) ([a842cdd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a842cdd)), closes [#413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/413)
- **tooltip,popover,popconfirm:** do not show tooltip when it's content is empty ([54ff189](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54ff189)), closes [#631](https://github.com/NG-ZORRO/ng-zorro-antd/issues/631)
- **tooltip,popover,popconfirm:** support hover on the content of it's overlay ([e712d87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e712d87)), closes [#701](https://github.com/NG-ZORRO/ng-zorro-antd/issues/701)

## [0.6.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.2...0.6.3) (2017-12-06)

### Bug Fixes

- **affix:** fix position offset when has deferred render componets. ([#672](https://github.com/NG-ZORRO/ng-zorro-antd/issues/672)) ([74b01da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74b01da)), closes [#671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/671)
- **radio:** value can not be dynamically update ([#677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/677)) ([bedcf96](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bedcf96)), closes [#668](https://github.com/NG-ZORRO/ng-zorro-antd/issues/668)
- **select:** fix choose disabled item via direction key control ([#675](https://github.com/NG-ZORRO/ng-zorro-antd/issues/675)) ([80d637d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80d637d)), closes [#674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/674)
- **select:** usage public property in accessing other components ([#679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/679)) ([8ba3ea8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8ba3ea8))

### Features

- **turkish:** create tr-TR.ts ([#634](https://github.com/NG-ZORRO/ng-zorro-antd/issues/634)) ([a731817](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a731817))
- **i18n:** support zh-TW ([#687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/687)) ([05c1f87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/05c1f87))
- **carousel:** add enhancement API and methods ([#688](https://github.com/NG-ZORRO/ng-zorro-antd/issues/688)) ([c22dad3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c22dad3)), closes [#652](https://github.com/NG-ZORRO/ng-zorro-antd/issues/652)
- **select:** support custom option template ([#689](https://github.com/NG-ZORRO/ng-zorro-antd/issues/689)) ([d76763c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d76763c)), closes [#227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/227)
- **select:** support nzScrollToBottom event ([#678](https://github.com/NG-ZORRO/ng-zorro-antd/issues/678)) ([b7cc148](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7cc148)), closes [#676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/676)
- **all:** simplify boolean attributes ([#459](https://github.com/NG-ZORRO/ng-zorro-antd/issues/459)) ([08f10e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/08f10e4))
- **packaging:** generate sourcemaps ([#666](https://github.com/NG-ZORRO/ng-zorro-antd/issues/666)) ([8665639](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8665639)), closes [#662](https://github.com/NG-ZORRO/ng-zorro-antd/issues/662)

### BREAKING CHANGES

- **packaging:** umd file name simplified from 'ng-zorro-antd.js' to 'antd.js'

## [0.6.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.1...0.6.2) (2017-11-29)

### Features

- **slider:** support dynamic update nzMarks from outside ([#636](https://github.com/NG-ZORRO/ng-zorro-antd/issues/636)) ([aea80c4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aea80c4)), closes [#624](https://github.com/NG-ZORRO/ng-zorro-antd/issues/624)
- **table and pagination:** support custom the page size changer select values([#608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/608)) ([#626](https://github.com/NG-ZORRO/ng-zorro-antd/issues/626)) ([034bd71](https://github.com/NG-ZORRO/ng-zorro-antd/commit/034bd71))

## [0.6.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0...0.6.1) (2017-11-26)

### Bug Fixes

- **datepicker:** fix disabled today button ([#611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/611)) ([5203614](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5203614)), closes [#604](https://github.com/NG-ZORRO/ng-zorro-antd/issues/604)
- **select:** fix duplicated option bug ([#609](https://github.com/NG-ZORRO/ng-zorro-antd/issues/609)) ([9385826](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9385826)), closes [#590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/590)
- **transfer:** fix select all items in search ([#602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/602)) ([072c97a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/072c97a)), closes [#599](https://github.com/NG-ZORRO/ng-zorro-antd/issues/599)

### Features

- **datepicker:** support string and number type as value ([#593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/593)) ([aee7abe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aee7abe))

## [0.6.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0-rc.3...0.6.0) (2017-11-18)

### Bug Fixes

- **menu:** do not remove submenu when click title ([#576](https://github.com/NG-ZORRO/ng-zorro-antd/issues/576)) ([37cef47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37cef47)), closes [#454](https://github.com/NG-ZORRO/ng-zorro-antd/issues/454)
- **popover,steps:** fix popover always show title placeholder & steps nzDescription property support TemplateRef ([#556](https://github.com/NG-ZORRO/ng-zorro-antd/issues/556)) ([4a4e393](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4a4e393)), closes [#555](https://github.com/NG-ZORRO/ng-zorro-antd/issues/555) [#523](https://github.com/NG-ZORRO/ng-zorro-antd/issues/523)
- **select:** fix multiple select width ([#575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/575)) ([7006766](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7006766)), closes [#560](https://github.com/NG-ZORRO/ng-zorro-antd/issues/560)

### Features

- **modal:** support disable the esc key to close ([#567](https://github.com/NG-ZORRO/ng-zorro-antd/issues/567)) ([75bc6b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/75bc6b6))
- **timepicker:** support dynamic binding [nzDisabledHours] ([#568](https://github.com/NG-ZORRO/ng-zorro-antd/issues/568)) ([22e2931](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22e2931)), closes [#286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/286)
- **tooltip:** support usage like: <a nz-tooltip="This is a prompt text">test</a> ([#545](https://github.com/NG-ZORRO/ng-zorro-antd/issues/545)) ([b4824d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b4824d9)), closes [#345](https://github.com/NG-ZORRO/ng-zorro-antd/issues/345)
- **transfer:** add transfer component ([#578](https://github.com/NG-ZORRO/ng-zorro-antd/issues/578)) ([84895cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84895cb)), closes [#132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/132)

## [0.6.0-rc.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0-rc.2...0.6.0-rc.3) (2017-11-04)

### Bug Fixes

- **affix:** fix FPS drops ([#490](https://github.com/NG-ZORRO/ng-zorro-antd/issues/490)) ([50b2606](https://github.com/NG-ZORRO/ng-zorro-antd/commit/50b2606)), closes [#477](https://github.com/NG-ZORRO/ng-zorro-antd/issues/477)
- **pagination:** wrong event by changing the page size ([#486](https://github.com/NG-ZORRO/ng-zorro-antd/issues/486)) ([ad5bc29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad5bc29)), closes [#482](https://github.com/NG-ZORRO/ng-zorro-antd/issues/482)
- **tabs:** repeat rendering the TabBarExtra when used nested tabs ([#489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/489)) ([3289e7f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3289e7f)), closes [#452](https://github.com/NG-ZORRO/ng-zorro-antd/issues/452)

### Features

- **datepicker:** support [nzDisabledDate] property in month mode ([#451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/451)) ([cdc0716](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdc0716)), closes [#442](https://github.com/NG-ZORRO/ng-zorro-antd/issues/442)

### Performance Improvements

- **classMap:** improve classMap performance ([#528](https://github.com/NG-ZORRO/ng-zorro-antd/issues/528)) ([e5b5cc9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5b5cc9))
- **polyfill:** polyfill all request animation ([#527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/527)) ([8c5a41a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8c5a41a))

## [0.6.0-rc.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0-rc.1...0.6.0-rc.2) (2017-10-29)

## [0.6.0-rc.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.5...0.6.0-rc.1) (2017-10-28)

### Bug Fixes

- **table:** fix the wrong semantics about param "nzShowExpand" of nz-row-expand-icon ([e4f8337](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e4f8337))

### build

- **packaging:** update [@angular](https://github.com/angular)/cdk to 2.0.0-beta.11 ([3e007a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e007a2)), closes [#238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/238) [#290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/290)

### Features

- **i18n:** support i18n functionality (zh-CN, en-US currently) ([552fa50](https://github.com/NG-ZORRO/ng-zorro-antd/commit/552fa50)), closes [#427](https://github.com/NG-ZORRO/ng-zorro-antd/issues/427)
- **locale:** support change locale at the runtime (globally) ([af6c926](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af6c926))

### BREAKING CHANGES

- **packaging:** 1. usage related to cdk is changed 2. @angular version dependence update to ^4.4.3 (due to @angular/cdk)
- **table:** the usage of param "nzShowExpand" is changed to the opposite value. The former, "nzShowExpand" represent as "hide the expand icon", now this change correct it to "show the expand icon".

And the default value of "nzShowExpand" has changed to "true".

## [0.5.5](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.4...0.5.5) (2017-10-21)

### Bug Fixes

- **dropdown:** fix dropdown trigger events ([#466](https://github.com/NG-ZORRO/ng-zorro-antd/issues/466)) ([6034f54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6034f54)), closes [#390](https://github.com/NG-ZORRO/ng-zorro-antd/issues/390)
- **dropdown:** fix unsubscribe undefined bug ([#464](https://github.com/NG-ZORRO/ng-zorro-antd/issues/464)) ([a0dcad3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a0dcad3)), closes [#269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/269)

### Features

- **calendar:** add year number to month template ([#465](https://github.com/NG-ZORRO/ng-zorro-antd/issues/465)) ([0eba3ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0eba3ae)), closes [#461](https://github.com/NG-ZORRO/ng-zorro-antd/issues/461)
- **steps:** support [nzProgressDot] property in vertical mode ([#446](https://github.com/NG-ZORRO/ng-zorro-antd/issues/446)) ([98e2579](https://github.com/NG-ZORRO/ng-zorro-antd/commit/98e2579))

## [0.5.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.3...0.5.4) (2017-10-14)

### Bug Fixes

- **datepicker:** data binding not work when mode is month ([#421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/421)) ([dca0895](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dca0895))
- **modal:** restore body overflow before destroyed the component ([#415](https://github.com/NG-ZORRO/ng-zorro-antd/issues/415)) ([083dd03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/083dd03)), closes [#412](https://github.com/NG-ZORRO/ng-zorro-antd/issues/412)

### Features

- **input-number:** add nzBlur & nzFocus property ([#406](https://github.com/NG-ZORRO/ng-zorro-antd/issues/406)) ([a49a382](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a49a382)), closes [#396](https://github.com/NG-ZORRO/ng-zorro-antd/issues/396)

## [0.5.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.2...0.5.3) (2017-09-30)

### Bug Fixes

- **demo:** fix demo site performance ([#403](https://github.com/NG-ZORRO/ng-zorro-antd/issues/403)) ([2e88b56](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2e88b56)), closes [#187](https://github.com/NG-ZORRO/ng-zorro-antd/issues/187)
- **table:** fix nzIsPageIndexReset for wrong display ([#372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/372)) ([#373](https://github.com/NG-ZORRO/ng-zorro-antd/issues/373)) ([90f0333](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90f0333))

### Features

- **all:** export all components when build ([#404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/404)) ([802a98c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/802a98c)), closes [#275](https://github.com/NG-ZORRO/ng-zorro-antd/issues/275)
- **collapse:** support custom header ([#383](https://github.com/NG-ZORRO/ng-zorro-antd/issues/383)) ([ca42f00](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca42f00))
- **datepicker:** support month picker ([#397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/397)) ([4cb03fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cb03fa)), closes [#351](https://github.com/NG-ZORRO/ng-zorro-antd/issues/351)
- **menu:** animate expand/collapse menu ([#330](https://github.com/NG-ZORRO/ng-zorro-antd/issues/330)) ([7edba94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7edba94)), closes [#25](https://github.com/NG-ZORRO/ng-zorro-antd/issues/25)

## [0.5.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.1...0.5.2) (2017-09-23)

### Bug Fixes

- **cascader:** select and render leaf label & reset in reactive form ([#335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/335)) ([#336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/336)) ([#356](https://github.com/NG-ZORRO/ng-zorro-antd/issues/356)) ([c80bb8e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c80bb8e))
- **menu:** fix submenu ExpressionChangedAfterItHasBeenCheckedError ([#368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/368)) ([10989ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10989ae)), closes [#367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/367)
- **select:** fix select style in inline form ([#362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/362)) ([ae06649](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ae06649)), closes [#306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/306)
- **table:** fix nzWidth with ngIf ([#349](https://github.com/NG-ZORRO/ng-zorro-antd/issues/349)) ([d5d379b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d5d379b)), closes [#302](https://github.com/NG-ZORRO/ng-zorro-antd/issues/302)
- **moment:** rollup compile with incorrect sourcemap ([#331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/331)) ([aec9f83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aec9f83))

### Features

- **modal:** show confirm loading status of modal opened by nzModalService ([#340](https://github.com/NG-ZORRO/ng-zorro-antd/issues/340)) ([90b7e12](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90b7e12)), closes [#365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/365)
- **select:** support undefined reset select ([#363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/363)) ([1a997c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a997c2)), closes [#284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/284)
- **table:** add nzIsPageIndexReset option ([#348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/348)) ([#359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/359)) ([60e3da9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60e3da9))

## [0.5.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0...0.5.1) (2017-09-16)

### Bug Fixes

- **datepicker:** end decade cell text ([#301](https://github.com/NG-ZORRO/ng-zorro-antd/issues/301)) ([d16061f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d16061f)), closes [#300](https://github.com/NG-ZORRO/ng-zorro-antd/issues/300)
- **input:** fix type error ([#283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/283)) ([cd84e47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd84e47)), closes [#282](https://github.com/NG-ZORRO/ng-zorro-antd/issues/282)
- **layout:** fix slider breakpoint in mobile device ([#299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/299)) ([47c4d86](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47c4d86)), closes [#292](https://github.com/NG-ZORRO/ng-zorro-antd/issues/292)
- **pagination:** prevent repeated emit events ([#281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/281)) ([ec66e13](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec66e13)), closes [#280](https://github.com/NG-ZORRO/ng-zorro-antd/issues/280)
- **pagination:** prevent selection after double click ([#268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/268)) ([46ae81a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/46ae81a)), closes [#267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/267)

### Features

- **menu:** selected child item, its parent highlight ([#264](https://github.com/NG-ZORRO/ng-zorro-antd/issues/264)) ([970e968](https://github.com/NG-ZORRO/ng-zorro-antd/commit/970e968)), closes [#262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/262)

## [0.5.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.4...0.5.0) (2017-09-09)

### Bug Fixes

- **all:** patch all components with setDisabledState ([#188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/188)) ([69b8979](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69b8979)), closes [#134](https://github.com/NG-ZORRO/ng-zorro-antd/issues/134)
- **carousel:** carousel slide height depend on inner content ([#242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/242)) ([94bac1b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/94bac1b)), closes [#162](https://github.com/NG-ZORRO/ng-zorro-antd/issues/162) [#170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/170)
- **cascader:** fix nz-cascader don't refresh when nzOptions binding data changed ([#219](https://github.com/NG-ZORRO/ng-zorro-antd/issues/219)) ([#221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/221)) ([74b2506](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74b2506))
- **checkbox:** fix trigger twitce in safari ([#256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/256)) ([cd5b511](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd5b511))
- **core,root:** ensure compatibility to v4 ([#233](https://github.com/NG-ZORRO/ng-zorro-antd/issues/233)) ([2b5c083](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b5c083))
- **datepicker:** year and month display in opposite way ([#243](https://github.com/NG-ZORRO/ng-zorro-antd/issues/243)) ([4b5ea54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4b5ea54)), closes [#232](https://github.com/NG-ZORRO/ng-zorro-antd/issues/232)
- **dropdown:** should always debouce before subscribe visibleChange$ ([#237](https://github.com/NG-ZORRO/ng-zorro-antd/issues/237)) ([0180e1c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0180e1c)), closes [#234](https://github.com/NG-ZORRO/ng-zorro-antd/issues/234)
- **input,datepicker,input-number,select,slider:** still dirty when "form.reset()" called ([#257](https://github.com/NG-ZORRO/ng-zorro-antd/issues/257)) ([4233db1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4233db1)), closes [#114](https://github.com/NG-ZORRO/ng-zorro-antd/issues/114)
- **inputnumber:** validate inputnumber value & rewrite strategy ([#230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/230)) ([28669ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28669ae)), closes [#42](https://github.com/NG-ZORRO/ng-zorro-antd/issues/42) [#203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/203)
- **select, datepicker, timepicker:** close dropdown when change to disable status ([#222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/222)) ([6e1b144](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e1b144)), closes [#190](https://github.com/NG-ZORRO/ng-zorro-antd/issues/190) [#195](https://github.com/NG-ZORRO/ng-zorro-antd/issues/195)
- **select, datepicker, timepicker, radio, checkbox, input-number:** fix touched state ([#248](https://github.com/NG-ZORRO/ng-zorro-antd/issues/248)) ([07f48bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07f48bc)), closes [#228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/228)

### Features

- **grid:** support embedded col option ([#247](https://github.com/NG-ZORRO/ng-zorro-antd/issues/247)) ([248c7e5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/248c7e5)), closes [#101](https://github.com/NG-ZORRO/ng-zorro-antd/issues/101)
- **input:** support nzAutosize property ([#251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/251)) ([5e950ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e950ab)), closes [#252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/252)
- **input:** support nzReadonly property ([#236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/236)) ([6b69cf9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b69cf9))
- **menu:** support unfolds/folds & add demo and api docs ([#225](https://github.com/NG-ZORRO/ng-zorro-antd/issues/225)) ([23b73bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/23b73bb)), closes [#206](https://github.com/NG-ZORRO/ng-zorro-antd/issues/206)
- **table:** support filter & fixed header add more table demo ([#210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/210)) ([5f11664](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5f11664)), closes [#86](https://github.com/NG-ZORRO/ng-zorro-antd/issues/86) [#174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/174) [#218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/218)
- **table:** support table expand feature ([#259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/259)) ([578819d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/578819d)), closes [#185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/185)

## [0.5.0-rc.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.3...0.5.0-rc.4) (2017-08-31)

### Bug Fixes

- **pagination:** fix nzPageIndexChange event does not emit ([#189](https://github.com/NG-ZORRO/ng-zorro-antd/issues/189)) ([371b98a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/371b98a))

### Features

- **modal:** provide open & close & setConfirmLoading function ([#125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/125)) ([0f87f6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0f87f6c)), closes [#118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/118)
- **tooltip,popconfirm,popover:** support OnPush ([#143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/143)) ([2f2c9ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f2c9ac)), closes [#136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/136)

## [0.5.0-rc.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.2...0.5.0-rc.3) (2017-08-26)

### Bug Fixes

- **affix,anchor,back-top:** fix and improve rxjs usage ([#159](https://github.com/NG-ZORRO/ng-zorro-antd/issues/159)) ([152b654](https://github.com/NG-ZORRO/ng-zorro-antd/commit/152b654))
- **carousel:** fix carousel auto play bug ([#164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/164)) ([01012e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/01012e4)), closes [#161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/161)
- **checkbox:** fix checkbox host class lost bug ([#116](https://github.com/NG-ZORRO/ng-zorro-antd/issues/116)) ([81cbae9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/81cbae9)), closes [#104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/104)
- **input:** fix input disabled style bug ([#108](https://github.com/NG-ZORRO/ng-zorro-antd/issues/108)) ([5d666fc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5d666fc)), closes [#103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/103)
- **input:** fix input disabled style bug ([#160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/160)) ([b7a073c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7a073c))
- **input:** fix input touched property ([#129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/129)) ([143c080](https://github.com/NG-ZORRO/ng-zorro-antd/commit/143c080)), closes [#65](https://github.com/NG-ZORRO/ng-zorro-antd/issues/65) [#117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/117)
- **select:** fix option incorrect active status ([#141](https://github.com/NG-ZORRO/ng-zorro-antd/issues/141)) ([49e3741](https://github.com/NG-ZORRO/ng-zorro-antd/commit/49e3741))
- **select:** fix select reset bug in form ([#153](https://github.com/NG-ZORRO/ng-zorro-antd/issues/153)) ([2bf24e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2bf24e0)), closes [#128](https://github.com/NG-ZORRO/ng-zorro-antd/issues/128)

### Features

- **affix&anchor&back-top&avatar:** add components to library ([#88](https://github.com/NG-ZORRO/ng-zorro-antd/issues/88)) ([468e80b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/468e80b))
- **root:** make nz-root optional ([#36](https://github.com/NG-ZORRO/ng-zorro-antd/issues/36)) ([9de3de1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9de3de1))
- **showcase:** auto scroll to top when router change & sync code icon with antd ([#124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/124)) ([9a1de83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a1de83)), closes [#26](https://github.com/NG-ZORRO/ng-zorro-antd/issues/26)

## [0.5.0-rc.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.0...0.5.0-rc.2) (2017-08-19)

### Bug Fixes

- **pagination:** Pagination QuickJumper bug [#37](https://github.com/NG-ZORRO/ng-zorro-antd/issues/37) ([a122238](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a122238))
- **carousel:** support dynamic change of nz-carousel-content ([#60](https://github.com/NG-ZORRO/ng-zorro-antd/issues/60)) ([44865c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44865c2)), closes [#56](https://github.com/NG-ZORRO/ng-zorro-antd/issues/56)
- **menu:** fix submenu level bug & fix menu routerLinkActive bug in lazyload module ([#77](https://github.com/NG-ZORRO/ng-zorro-antd/issues/77)) ([b914afd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b914afd)), closes [#35](https://github.com/NG-ZORRO/ng-zorro-antd/issues/35) [#52](https://github.com/NG-ZORRO/ng-zorro-antd/issues/52) [#74](https://github.com/NG-ZORRO/ng-zorro-antd/issues/74)
- **pagination:** remove active class when reach first and last page index ([#93](https://github.com/NG-ZORRO/ng-zorro-antd/issues/93)) ([2bcddc7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2bcddc7)), closes [#17](https://github.com/NG-ZORRO/ng-zorro-antd/issues/17)
- **steps:** fix steps width bug in tab component ([#94](https://github.com/NG-ZORRO/ng-zorro-antd/issues/94)) ([ee4428d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee4428d)), closes [#83](https://github.com/NG-ZORRO/ng-zorro-antd/issues/83)
- **timeline:** eliminate ExpressionChangedAfterItHasBeenCheckedError when use ngFor to render ([67df061](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67df061))

### Features

- **input:** provide nzFocus event ([#80](https://github.com/NG-ZORRO/ng-zorro-antd/issues/80)) ([ffc1d49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffc1d49)), closes [#73](https://github.com/NG-ZORRO/ng-zorro-antd/issues/73)

### Performance Improvements

- **all:** improve rxjs imports ([#29](https://github.com/NG-ZORRO/ng-zorro-antd/issues/29)) ([f3aa2cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f3aa2cb))

# 0.5.0-rc.0 (2017-08-15)
