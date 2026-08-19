---
category: Components
type: Other
title: BorderBeam
tag: 22.1.0
description: Add a decorative moving beam around a container border.
---

## When To Use

- Use to visually emphasize a container without adding business-state meaning.
- Suitable for login panels, recommendation cards, AI modules, and key call-to-action blocks.
- This is decorative only. Do not use it as a replacement for focus indicators, validation borders, or status feedback.

## API

After importing the directive, apply `nzBorderBeam` to the container to decorate. The host needs `position: relative` (or another positioning context).

| Property                | Description                                                                                                                                | Type                                   | Default |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ------- |
| `nzBorderBeam`          | Whether to show the beam.                                                                                                                  | `boolean`                              | `true`  |
| `nzBorderBeamColor`     | Beam color. Supports one color or gradient stops. `percent` accepts `0` to `100`; the trailing range is reserved for the transparent fade. | `string \| NzBorderBeamGradientStop[]` | -       |
| `nzBorderBeamCount`     | Number of evenly distributed beams.                                                                                                        | `number`                               | `1`     |
| `nzBorderBeamDuration`  | Seconds for one loop.                                                                                                                      | `number`                               | `6`     |
| `nzBorderBeamLineWidth` | Beam line width; numbers are pixels.                                                                                                       | `number \| string`                     | `1`     |
| `nzBorderBeamOutset`    | Distance to extend the beam layer from the host edge; omit to follow the host border width.                                                | `number \| string`                     | -       |
| `nzBorderBeamSize`      | Visible beam segment size; numbers are pixels.                                                                                             | `number \| string`                     | `100`   |

### NzBorderBeamGradientStop

| Property  | Description                      | Type     |
| --------- | -------------------------------- | -------- |
| `color`   | Color at this stop.              | `string` |
| `percent` | Stop position from `0` to `100`. | `number` |

## FAQ

### How does it behave with reduced motion?

The beam is hidden when the browser has `prefers-reduced-motion: reduce` enabled.

### What does `percent` mean in `nzBorderBeamColor`?

`percent` is the authored stop position from `0` to `100`. BorderBeam maps the stops into the visible beam segment and reserves the trailing range for a transparent fade-out.

### Are there size limits?

The beam is a square gradient layer whose side length is `nzBorderBeamSize`. Keep it below twice the shorter side of the decorated element: `size < 2 × min(width, height)`. Otherwise the square can visibly overlap opposite edges.

### Why is the beam not visible?

The host needs a positioning context because the beam is absolutely positioned. In most cases, add `position: relative` to the element that has `nzBorderBeam`.

### How does the beam follow rounded corners?

The effect inherits the host element's `border-radius`, so changes made through classes, responsive styles, or CSS variables stay aligned automatically.
