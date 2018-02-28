---
category: Components
type: Feedback
title: Spin
---

A spinner for displaying loading state of a page or a section.

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## API

| Property | Description | Type | Default Value |
| -------- | ----------- | ---- | ------------- |
| nzDelay | specifies a delay in milliseconds for loading state (prevent flush) | number (milliseconds) | - |
| nzIndicator | React node of the spinning indicator | `TemplateRef<void>` | - |
| nzSize | size of Spin, options: `small`, `default` and `large` | string | `default` |
| nzSpinning | whether Spin is spinning | boolean | true |
| nzTip | customize description content when Spin has children | string | - |
