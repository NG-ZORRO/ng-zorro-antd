---
category: Components
type: Feedback
title: Spin
---

A spinner for displaying loading state of a page or a section.

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## API

### nz-spin

| Property | Description | Type | Default Value |
| -------- | ----------- | ---- | ------------- |
| `[nzDelay]` | specifies a delay in milliseconds for loading state (prevent flush), unit: milliseconds | `number` | - |
| `[nzIndicator]` | React node of the spinning indicator | `TemplateRef<void>` | - |
| `[nzSize]` | size of Spin | `'large'｜'small'｜'default'` | `'default'` |
| `[nzSpinning]` | whether Spin is spinning | `boolean` | `true` |
| `[nzTip]` | customize description content when Spin has children | `string` | - |
