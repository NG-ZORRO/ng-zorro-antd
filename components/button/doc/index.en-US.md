---
category: Components
type: General
title: Button
cover: 'https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg'
description: To trigger an operation.
---

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

In Ant Design, we provide 5 types of buttons.

- 🔵 Primary button: indicate the main action, one primary button at most in one section.
- ⚪️ Default button: indicate a series of actions without priority.
- 🫥 Dashed button: used for adding action commonly.
- 🔤 Text button: used for the most secondary action.
- 🔗 Link button: used for external links.

And 4 other properties additionally.

- ⚠️ `danger`: used for risk actions, like deletion or authorization.
- 👻 `ghost`: usually used in situations with a complex background, home pages.
- 🚫 `disabled`: when actions are not available.
- 🔃 `loading`: add loading spinner in button, avoiding multiple submit.

## API

### [nz-button]

> Note：nz-button is a Directive, it accepts all props which are supported by [native button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button).

To get a customized button, just set `nzType`/`nzShape`/`nzSize`/`nzLoading`/`disabled`.

| Property      | Description                                                                   | Type                                  | Default     | Global Config |
| ------------- | ----------------------------------------------------------------------------- | ------------------------------------- | ----------- | ------------- |
| `[disabled]`  | prevents a user from interacting with the button                              | `boolean`                             | `false`     |
| `[nzGhost]`   | make background transparent and invert text and border colors                 | `boolean`                             | `false`     |
| `[nzLoading]` | set the loading status of button                                              | `boolean`                             | `false`     |
| `[nzShape]`   | can be set to `circle` `round` or omitted                                     | `'circle'\|'round'`                   | -           |               |
| `[nzSize]`    | can be set to `small` `large` or omitted                                      | `'large'\|'small'\|'default'`         | `'default'` | ✅            |
| `[nzType]`    | can be set to `primary` `dashed` `text` `link` or omitted (meaning `default`) | `'primary'\|'dashed'\|'link'\|'text'` | -           |
| `[nzBlock]`   | option to fit button width to its parent width                                | `boolean`                             | `false`     |
| `[nzDanger]`  | set the danger status of button                                               | boolean                               | `false`     |               |
