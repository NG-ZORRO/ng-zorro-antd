# Design Tokens

NG-ZORRO keeps Less variables as the compatibility layer and introduces structured design tokens as the source for CSS Variables.

## Layers

- `seed`: base design decisions such as primary color, font size, radius, spacing, shadow, motion, and z-index.
- `alias`: semantic tokens consumed across components, such as text color, split border color, and container background.
- `component`: component-scoped tokens for local visual semantics, such as `tag.defaultBg`, `alert.infoBg`, `card.padding`, and `button.primaryBg`.

## Stability

- `stable`: documented tokens that users may override with CSS Variables.
- `experimental`: public but still subject to naming or coverage changes.
- `internal`: implementation details that are not part of the public token API.

## CSS Variables

All public CSS Variables use the `--ant-*` prefix. `--nz-*` aliases are intentionally not generated.

The generator reads `definitions.ts` and writes:

- `components/style/themes/token-css-variables.less`
- `components/style/tokens/token-map.md`

Run:

```bash
npx tsx scripts/build/generate-design-tokens.ts
```

## Less Boundary

Less variables that participate in Less functions or arithmetic keep compile-time values until their derived values are generated explicitly. Variables that are written directly to CSS properties can be mapped to `var(--ant-*)` in `components/style/themes/variable.less`.
