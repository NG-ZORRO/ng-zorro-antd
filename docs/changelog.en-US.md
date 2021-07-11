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

## 12.0.0

`2021-07-11`

### Bug Fixes

* **pagination:** mark for check when the total number of pages changes ([#6780](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6780)) ([2f1f8dc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f1f8dcb1c7eb4f89b1ff21bf8c64d7f8a75f344))
* **pagination:** pagination in form will trigger submit ([#6744](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6744)) ([f77ab28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f77ab28341489e9df7f757294a6a5ad6030700f4))
* **cascader:** add nzClear functionality to cascader ([#6761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6761)) ([3dd9534](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dd9534d8059985dba3389fc52ea463bbf3381c5)), closes [#6751](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6751)
* **select:** focus input when selector is clicked ([#6786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6786)) ([1c9331a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c9331a4f8a32a91eaaf6128bdb335f26bd6fcab))
* **time-picker:** close time-picker after tabbing out ([#6602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6602)) ([0e53053](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e530538ee954ce6ccc5891c0556cfb338f00b56))
* **tree:** stop change url in firefox ([#6771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6771)) ([be20114](https://github.com/NG-ZORRO/ng-zorro-antd/commit/be20114f6b83f326045dd98b5ad3aa9fab61af03))
* **typography:** single line ellipsis style ([#6776](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6776)) ([e192a70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e192a70aa034913d87b00f863e27e0f6acc280de))


### Features

* **checkbox:** add nzId input ([#6813](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6813)) ([52235c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/52235c97aaf75802cca9e81c9071fa2bdfe0208e))
* **core:** support reset NZ_CONFIG inside component & overflow component ([#6601](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6601)) ([edd410a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/edd410ac8426c2fde490192125a66b0074227a87))
* **date-picker:** nz-range-picker support nzId ([#6814](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6814)) ([28074e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28074e1749a38a19cc64bd52aefc85d3e6f1a53b))
* **experimental/image:** add experimental image component ([#6590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6590)) ([7e2fba3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e2fba39354de78219be1237eea8edf19b5799e7))
* **popconfirm:** support `nzAutoFocus` ([#6256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6256)) ([91e5d49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91e5d49f83c8e833e70400c65b69a2e4787fc91d)), closes [#6249](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6249)
* **rate:** support customize character ([#6787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6787)) ([7163e36](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7163e360fc97d48cd718c65ffa301c0253801851))
* **steps:** steps support circular progress bar ([#6132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6132)) ([466a093](https://github.com/NG-ZORRO/ng-zorro-antd/commit/466a093d10da6d8996adc636447be3531c5d1d76)), closes [#5684](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5684)
* **timeline:** support `nzLabel` ([#6687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6687)) ([86c587d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/86c587d7be4b7b6e936cf50e2cafa4499d735407)), closes [#6682](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6682)

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


## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
