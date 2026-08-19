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

Import `NzBorderBeamDirective` or `NzBorderBeamModule`, then apply `nzBorderBeam` to the container to decorate. The host needs `position: relative` (or another positioning context).

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

### Why is the beam not visible?

The host needs a positioning context because the beam is absolutely positioned. In most cases, add `position: relative` to the element that has `nzBorderBeam`.
