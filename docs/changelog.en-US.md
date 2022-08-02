---
order: 13
title: Change Log
toc: false
timeline: true
---
`ng-zorro-antd` strictly follows [Semantic Versioning 2.0.0](https://semver.org).

#### Release Schedule

* Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
* Monthly release: minor version at the end of every month for new features.
* Major version release is not included in this schedule for breaking change and new features.

---
## 13.4.0

`2022-07-25`

### Bug Fixes

* **datepicker:** focus input when opened programmatically ([#7512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7512)) ([b3a27d8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b3a27d82900b455c32226100a7dbad87f20fd18a))
* **transfer:** uncheck "Select all" checkbox when filtered items are moved ([#7419](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7419)) ([1e9c11e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e9c11e2b60dafd4320da1a3d852c17fcce1dafa))


### Features

* **notification:** support top and bottom placement ([#7540](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7540)) ([d8b26dd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d8b26dd6377d9546121122bd1c0498be7eaf4aa8))
* **anchor:** sync new properties ([#7494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7494)) ([254b429](https://github.com/NG-ZORRO/ng-zorro-antd/commit/254b4294473fdcb495ea5e7a81a81e4331e50fc2))
* **badge:** support size ([#7405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7405)) ([f40dd38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f40dd38702bec197742b38afc075af8ec4bc6170))
* **date-picker:** support date-picker placement ([#7527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7527)) ([a652470](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a65247012bce98a891e6f46242e95cecfbbc0641))
* **input-number:** add borderless support ([#7539](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7539)) ([ea1138b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ea1138b9a47a9c3678ce60babea5cd59b2278002))
* **switch:** add nzId input ([#6815](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6815)) ([4c71bdb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c71bdb6a46d4e590ab6cc1f3eb9dd3d05b49eee))
* **time-picker:** support borderless ([#7547](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7547)) ([a8c3f95](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a8c3f957cb66315350d50b4b8d164c8e6de19d76))


### Performance Improvements

* **transfer:** add `trackBy` to the list and track by the `hide` property ([#7424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7424)) ([0587236](https://github.com/NG-ZORRO/ng-zorro-antd/commit/058723643e7b52b0a470cbbc42de91be3b2275e6))


## 13.3.2

`2022-06-26`

### Bug Fixes

* **input-number:** fix errors before initialization ([#7531](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7531)) ([800e6f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/800e6f4f1495d63edcb0f992836a75a40e3ca5b6))


## 13.3.1

`2022-06-20`

### Bug Fixes

* **input, input-number, steps:** fix styles in components ([#7522](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7522)) ([222b225](https://github.com/NG-ZORRO/ng-zorro-antd/commit/222b225ed4d4e56de049b08d7e6e8a77d476d481))


## 13.3.0

`2022-06-15`

### Bug Fixes

* **icon:** add missing zorro used icon: deleteOutline ([#7499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7499)) ([ba6bade](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba6badee1fff04eeb811ef50ac03cf9ccfeaebf7))
* **tooltip:** is not aligned on first display ([#7457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7457)) ([23a2fd5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/23a2fd567af598625267187dea2db487e570b9b7)), closes [#7453](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7453)
* **transfer:** `submit` behavior for button inside form ([#7413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7413)) ([0cfebca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cfebca5ebe4f7239212f99753cbbfd1d2790f63)), closes [#7410](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7410)


### Features

* **cascader:** support setting status ([#7452](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7452)) ([e10908e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e10908e505b93f2e2d76f24c3f0dc7972fda266c))
* **date-picker:** support setting status ([#7479](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7479)) ([c3d0874](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3d08742247a2f2e12d070e352aa7932f9a0d326))
* **form:** make form work with status ([#7489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7489)) ([98ac620](https://github.com/NG-ZORRO/ng-zorro-antd/commit/98ac620a1eac4e307505450fbf7890f5b3da20ff))
* **input-number:** support input number group ([#7488](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7488)) ([b038fa2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b038fa26703ab010dab1b03946986e6f5c6ee66c))
* **input-number:** support setting status ([#7462](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7462)) ([0c9287a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0c9287a2005149f2ecd1b6b3ad58d7374013bb6b))
* **input:** support setting status ([#7472](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7472)) ([999215e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/999215e6ba45f1e3e32f561052ce8a902af895d7))
* **mentions:** support setting status ([#7467](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7467)) ([ac38b2d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac38b2d64697f307e79720a691fbdf60c32fb8d0))
* **segmented:** implement new component ([#7404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7404)) ([95a31da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/95a31dab42dce3895d012bd2458ef51ec90ef33f))
* **select:** support setting status ([#7478](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7478)) ([44b7fe0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44b7fe0e1f8892a2da9e9950da40081bab767d4d))
* **time-picker:** support setting status ([#7473](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7473)) ([0d8249b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d8249b31e70c28ea47f37b818ff1c5fe0ac8239))
* **transfer:** support setting status ([#7475](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7475)) ([9b98fe1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b98fe11f4832c774067b10e50f6b981b9147dbe))
* **tree-select:** add status ([#7477](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7477)) ([40815ad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40815ad90d4160be4a6a9dd29ee7b072ecde5f75))


## 13.2.2

`2022-05-12`

### Bug Fixes

* **tree-view:** trigger markforcheck after nodes changed ([#7426](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7426)) ([a702674](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a702674d76974bcc8fa854394bd6681d8dfe8347))


## 13.2.1

`2022-04-27`

### Bug Fixes

* **code-editor:** remove monaco-editor dependency in config.ts ([#7392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7392)) ([929084d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/929084d5ba65c4e9661ccaea300c58e85e39bed6))


## 13.2.0

`2022-04-26`

### Bug Fixes

* **carousel:** fix nzAfterChange callback value not correctly ([#7326](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7326)) ([b517bd4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b517bd442fa36f4cfc5e4a37d587b4f26cfb940c)), closes [#7323](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7323)
* **cascader:** fix the problem of disappearing drop-down menu ([#7381](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7381)) ([3d41ce0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d41ce08769bcbf337590169ded3559b092bc5cd))
* **cascader:** update position when click menu item ([#7306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7306)) ([4c669a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c669a58f0bf02bc835e2d68402b5ea0c98511c5))
* **i18n:** update fr translations ([#7364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7364)) ([64e1c7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64e1c7cf2bd3b094a0124ed8ddb51edab284b927))
* **list:** re-enter the Angular zone when the `NgZone.onStable` emits ([#7314](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7314)) ([425f8df](https://github.com/NG-ZORRO/ng-zorro-antd/commit/425f8dff39f29ba620cdeb6f4a6f45471845b819))
* **modal:** no longer trigger any action when closing ([#7336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7336)) ([d169452](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d16945249a28338ba480af46ff037d69b67b4af4))
* **popconfirm:** reverting missing nzPopconfirmVisibleChange ([#7338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7338)) ([561041c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/561041c3e7ce643cc57cfd2c18c22dd36da389c8))
* **upload:** fix upload drag drop will open new tab in firefox 91 and 92 ([#7190](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7190)) ([9b51874](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b518742e3be8c85c0b2e2e66d4ffe108e43a2d0))


### Features

* **code-editor:** add global configuration to support monaco require config ([#7121](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7121)) ([21ec517](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21ec517ba55cd20aa78298cd1050069308a9f98b))
* **code-editor:** support MonacoEnvironment config in NZ_CONFIG ([#7359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7359)) ([4dfd9cd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4dfd9cd21507fcf4382d5f28f03fd969d8fc425c)), closes [#6502](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6502)
* **image:** nz-image add press `left` or `right` to switch image ([#7321](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7321)) ([b5f82b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5f82b51eed45f9bc7f7418c90185693887b202a))
* **input-number:** add `nzReadOnly` property ([#7372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7372)) ([0da7496](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0da7496ba4dcc03be2827b6783a977382e487da1)), closes [#7369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7369)


### Performance Improvements

* **anchor:** mark `scroll` listener as passive ([#7330](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7330)) ([aab060f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aab060ffcebae479954355bf02804882935ef8d2))
* **back-top:** mark `scroll` listener as passive ([#7329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7329)) ([7f3c4e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f3c4e1c5e8330597b5b0024c7b9075bccf93f44))
* **cascader:** do not run change detection on `change` event ([#7312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7312)) ([cb803f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb803f9a8c040157d83e095ce9ab0bd28a161b64))
* **image:** do not run change detection when the image preview is clicked ([#7309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7309)) ([752a5b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/752a5b6f3e76d467a839a39aa587deaed953ed72))
* **input-number:** do not run change detection when `mouseup` and `mouseleave` events are dispatched on handlers ([#7313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7313)) ([54386ef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54386efaac97982675c8c1e1b3504cfed9671248))
* **modal:** call `focus()` on the next rendering frame to prevent frame drop ([#7293](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7293)) ([106d346](https://github.com/NG-ZORRO/ng-zorro-antd/commit/106d346d72568f8256a942478d808d002f5421c7))
* **resizable:** mark `mousedown` and `touchstart` listeners as passive ([#7331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7331)) ([518997b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/518997bcf193a59510a0dfc1db4ef306475eb990))
* **tree-view:** do not run change detection when the `nz-tree-node-checkbox` is clicked ([#7307](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7307)) ([1e0872b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e0872b30873644032917f6242f585ba9bd1db30))


## 13.1.1

`2022-03-03`

### Bug Fixes

* **collapse:** markForCheck after collapse title clicked ([#7284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7284)) ([b7433a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7433a9d22e82a21d1557c026ba78e07b9541bec))
* **icon:** do not try to load SVG on the Node.js side since it will throw an error ([#7290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7290)) ([fe0484f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe0484f348c73fc85bf721167f6d4e6f278b98f1)), closes [#7240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7240)
* **select:** exact match while searching should be active ([#6816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6816)) ([48d2a25](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d2a2538c9ddef5f77804cbecbf4c157f4e9f22)), closes [#6812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6812)
* **upload:** fix the problem that the transformed file is lost ([#7206](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7206)) ([b82d2f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b82d2f3a3f74c3f915f17a650dd86b51f22ae922))


## 13.1.0

`2022-02-25`

### Bug Fixes

* **button:** prevent default event fire ([#7267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7267)) ([2306e0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2306e0d61a232e79249e31357f3cbdc769312f2c))
* **date-picker:** fix `z-index` to `auto` in inline mode ([#7172](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7172)) ([26006f6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/26006f60f9b9bdf860adef8dbfc98a5f6922899d))
* **date-picker:** fix disable time when date changes ([#7236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7236)) ([ae67952](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ae6795238146833d7813e3882bb2593df155ea1b))
* **i18n:** update fa-IR.ts translations ([#7249](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7249)) ([a7a0b41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a7a0b413c9539cb801058c1956242f50a3923972))
* **i18n:** update pt_BR.ts translations ([#7218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7218)) ([95c7816](https://github.com/NG-ZORRO/ng-zorro-antd/commit/95c7816b369ed8efbd89b5bb3ba67d133b1ad71d))
* **input:** do not set box-sizing when measuring ([#7214](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7214)) ([035dc94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/035dc94b58766e8565e8f4d400b9dc67c3673a08)), closes [#7203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7203)
* **input:** incorrect background color in disabled state ([#7250](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7250)) ([7acb8db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7acb8db6ff858a4daec20173fde3535b024f6d89))
* **radio:** emit `false` to the `ngModel` whenever the radio button is deselected ([#7270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7270)) ([2704237](https://github.com/NG-ZORRO/ng-zorro-antd/commit/270423707363514112bd75ed0384c5e70d7d3755))
* **select:** fix keyboard event error when option data is empty ([#7222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7222)) ([4bd86ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4bd86ca0a72baf653fdb93d311159d97f3d36b84)), closes [#7242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7242)
* **slider:** fix keydown not trigger nzOnAfterChange ([#7252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7252)) ([f419c07](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f419c07644f6fe0148a4a9990ad3f85aec590359)), closes [#7251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7251)


### Features

* **alert:** support nzAction for customizing actions ([#7246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7246)) ([eb3b1ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb3b1bafaedaff09d8f547a1cb7ecd4eb9aea67f))
* **drawer:** support new apis nzSize and nzExtra ([#7227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7227)) ([d2e5b76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d2e5b76d176c9574dfe4a79c285e9d09e6edcc28))
* **i18n:** add `kk_KZ` to i18n ([#7261](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7261)) ([3580fb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3580fb038c5d4c88bf2efe845b8b86fb47df7ee3))
* **i18n:** add `km_KH` ([#7220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7220)) ([f972391](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f9723918ea7a4646cb282a4254054bc3b3fd5564))

### Performance Improvements

* **auto-complete:** do not run change detection when the promise resolves ([#7138](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7138)) ([e95d941](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e95d941c17c31504438fef770ff5dd9f7e157534))
* **back-top:** do not run change detection if there are no `nzClick` listeners ([#7179](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7179)) ([7d091bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d091bba409ee9321215696568928d5684032ccf))
* **carousel:** do not run change detection when the timer fires ([#7136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7136)) ([fc991d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc991d180c1c8f006b294b3ab18950ed06e181e8))
* **collapse:** do not run change detection if the panel is disabled ([#7181](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7181)) ([3c3eac9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c3eac9875556134118c60c3bcdf10dc7136beea))
* **dropdown:** do not run change detection if the dropdown has been clicked inside ([#7135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7135)) ([4679592](https://github.com/NG-ZORRO/ng-zorro-antd/commit/467959298f57c81574ac7b25f3714e734026ac12))
* **image:** do not run change detection if there are no `containerClick` listeners ([#7147](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7147)) ([f0f52a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0f52a4765da8ae26fd2fe36fe9024b8f574d204))
* **mention:** do not run change detection when the dropdown cannot be closed ([#7146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7146)) ([b72bd27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b72bd2735da5d07713b6895db2842d132f62e131))
* **mention:** do not trigger change detections if there are no event listeners ([#7130](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7130)) ([73af728](https://github.com/NG-ZORRO/ng-zorro-antd/commit/73af728527bb38ced9941e5ce29760bbae5b4a68))
* **resizable:** do not run change detection on `mousedown` and `touchstart` events ([#7170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7170)) ([9a8d794](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a8d79476be545be181e11a92d849e7e543d38c6))
* **select:** do not run change detection on events if the `nz-option-item` is disabled ([#7133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7133)) ([a1bbdab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a1bbdabca53bd61423564448298892c54260d48e))
* **select:** do not run change detection unnecessarily on click events ([#7175](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7175)) ([fd63d22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd63d225e5ebdd800eae0be80685537746bfeb61))
* **table:** do not run change detection if the sorting is not shown ([#7174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7174)) ([e541761](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5417611976bdcdde43f202bacd8b031bd8d0fab))
* **table:** do not unnecessarily re-enter the Angular zone ([#7142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7142)) ([5a5df13](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5a5df13bbdfe8575ef6b1fdd6df73d6100b82407))
* **table:** spawn timers and add listener outside of the zone ([#7140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7140)) ([ec248c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec248c95162bdb7c23dda1926d156ae9cb7c7ace))
* **tabs:** do not run change detection when the promise resolves ([#7144](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7144)) ([148f84d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/148f84d11b6bf234544cfe06d1506519496e0628))
* **time-picker:** do not run change detection when the timer fires ([#7143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7143)) ([72da774](https://github.com/NG-ZORRO/ng-zorro-antd/commit/72da774dfd0927699c9c5f8613086a1e5d0e53c0))
* **tree-view:** do not run change detection on click events if the `nz-tree-node-option` is disabled or there are no `nzClick` listeners ([#7178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7178)) ([0054f59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0054f59a383f937f6e0f71435da41c74264be6ae))
* **typography:** do not run change detection on `input` and `keydown` events ([#7185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7185)) ([ad547fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad547fb7193999735396d12c07124c70d9941daa))


## 13.0.1

`2022-01-18`

### Bug Fixes

* **back-top:** fix more reliable scrolling listener ([#7208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7208)) ([3bcd343](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bcd343e38aefc35af1c2386a539d19a1d0ca279)), closes [#7199](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7199)
* **drawer:** fix close icon position without `nzTitle` property ([#7176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7176)) ([a6195b9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6195b991a531e914faef2237dadf7226b8d6390)), closes [#7164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7164)
* **icon:** fix old icon element not removed ([#7188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7188)) ([67ac573](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67ac573d2e0a9b19263c600f020842532844566a)), closes [#7186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7186)
* **statistic:** re-enter the Angular zone when the `nzCountdownFinish` emits ([#7137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7137)) ([6835544](https://github.com/NG-ZORRO/ng-zorro-antd/commit/68355448198b31d9a064710cfc4d790739909616))
* **tree-view:** fix innerTrackBy function ([#7150](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7150)) ([4484674](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4484674e212f67dea3aad8b56f27e9de61e6d21e)), closes [#7118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7118)

### Performance Improvements

* **auto-complete:** memory leak ([#7112](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7112)) ([3806250](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38062508fb7e0df13e528e1c9d5bf3720bd76200))
* **cdk:** resolve leak ([#7139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7139)) ([2a93d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a93d05c48ebba1a1f6a3add74b71f4049907337))
* **checkbox:** reduce change detection cycles ([#7127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7127)) ([15abe33](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15abe33053ee888e31c1ad629fd5a5ecae79db43))
* **code-editor:** always initialize outside of the Angular zone ([#7151](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7151)) ([f73be80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f73be80ca8e55604a683827f0693455c20978214))
* **core:** remove `resize` listener when the app is destroyed ([#7125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7125)) ([8437111](https://github.com/NG-ZORRO/ng-zorro-antd/commit/843711117a8bd7b6feb6410b4b824bd9741147a7))
* **image:** unsubscribe old src ([#7102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7102)) ([87a3e27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87a3e276fc1f1a50ecc6da9edc28dd4f77ac8482))
* **input-number:** reduce change detection cycles ([#7129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7129)) ([9971faa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9971faa7d9c54db40c19fa6333dce8a65d38ccd4))
* **modal:** do not run change detection on mouse events ([#7169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7169)) ([c20bb80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c20bb8076b9d0e5e63880921cdfc738de12fc5a0))
* **modal:** resolve memory leaks ([#7123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7123)) ([3664efe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3664efe1d6e9f5a93ed85e958652f8a898c0b987))
* **graph:** do not run change detection on animation frame ([#7132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7132)) ([1ceaf70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ceaf70e215ab854a94897aebbf6acb4bd5c2006))
* **rate:** do not run change detection on `focus` and `blur` events if there are no output listeners ([#7182](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7182)) ([3e9e035](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e9e035d0273427f47eb4c0200930e549711d5d4))
* **steps:** do not run change detection if there are no `nzIndexChange` listeners ([#7183](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7183)) ([cbfc558](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbfc558c255e7f70e2b931f751c800501474a791))
* **transfer:** do not trigger change detection when the checkbox is clicked ([#7124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7124)) ([b12f43a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b12f43afe78d03687000471f164ff1f5d2631d3b))


## 13.0.0

`2021-12-29`

#### Removal of View Engine Support

`ng-zorro-antd@13` remove support for View Engine and use Ivy library for distribution, you will get faster building and smaller bundle size.

See [Angular Ivy](https://angular.io/guide/ivy).

#### Removal of IE11 Support
- Removing IE11 support allows Angular to leverage modern browser features such as CSS variables and web animations via native web APIs
- What’s more is that apps will be smaller and load faster because we can remove IE specific polyfills and code paths

See [Issue #41840](https://github.com/angular/angular/issues/41840).


#### Enhanced Performance

Fix the problems that may cause memory leak.

### BREAKING CHANGES
**dropdown**
- `[nzHasBackdrop]` input value are no longer supported, please use `[nzBackdrop]` instead.


## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
