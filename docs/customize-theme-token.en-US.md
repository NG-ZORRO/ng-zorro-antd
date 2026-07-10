---
order: 6.2
title: Design Tokens (Experimental)
---

Besides the [less customization](/docs/customize-theme/en) and the [CSS variable theme](/docs/customize-theme-variable/en), ng-zorro-antd provides an Ant Design v5 style **design token** system: a `seed → map → alias → component` token model resolved in TypeScript and rendered as CSS custom properties — no style compilation at build or run time.

> This feature is experimental. The default token values reproduce the current default theme exactly, so opting in does not change how your app looks until you customize the theme.

## How to use

### Import the token stylesheet

Replace your imported style file with the token version:

```diff
- @import "~ng-zorro-antd/ng-zorro-antd.min.css";
+ @import "~ng-zorro-antd/ng-zorro-antd.token.min.css";
```

The stylesheet ships with built-in defaults, so it renders the standard theme even before any theme is provided.

### Provide a theme

```typescript
import { provideNzTheme } from 'ng-zorro-antd/core/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzTheme({
      token: { colorPrimary: '#00b96b', borderRadius: 4 }
    })
  ]
};
```

`provideNzTheme` resolves the tokens and writes them into a `<style nz-theme>` element as CSS custom properties (e.g. `--ant-color-primary`, `--ant-button-padding-inline`). Server-side rendering is supported: the style element is serialized into the SSR HTML, so there is no flash of unthemed content.

### Algorithms

Algorithms derive the full token set from the seed tokens and can be composed, exactly like Ant Design v5:

```typescript
import { nzDarkAlgorithm, nzCompactAlgorithm, provideNzTheme } from 'ng-zorro-antd/core/theme';

provideNzTheme({
  algorithm: [nzDarkAlgorithm, nzCompactAlgorithm],
  token: { colorPrimary: '#1890ff' }
});
```

- `nzDefaultAlgorithm` — the default (light) derivation, used when no algorithm is given.
- `nzDarkAlgorithm` — reproduces the dark theme derivation (palettes mixed with the dark background).
- `nzCompactAlgorithm` — reproduces the compact theme sizing.

### Component tokens

Migrated components expose their own token namespace, overridable per component:

```typescript
provideNzTheme({
  components: {
    button: { paddingInline: 24, fontWeight: 500 }
  }
});
```

### Dynamic theme switching

Inject `NzThemeService` to change the theme at runtime. All token layers are exposed as signals:

```typescript
import { NzThemeService, nzDarkAlgorithm } from 'ng-zorro-antd/core/theme';

@Component({
  /* ... */
})
export class ThemeSwitcherComponent {
  private themeService = inject(NzThemeService);

  toDark(): void {
    this.themeService.setAlgorithm(nzDarkAlgorithm);
  }

  changePrimaryColor(color: string): void {
    this.themeService.updateTheme({ token: { colorPrimary: color } });
  }
}
```

## Component coverage

The token system rolls out progressively. Components not yet migrated render with the standard theme and are only affected by the status-color tokens (via the same CSS variables as the [CSS variable theme](/docs/customize-theme-variable/en)).

| Component                                                                                                                                                                                                                    | Since  | Coverage                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------- |
| `button`                                                                                                                                                                                                                     | 22.0.0 | full                                                 |
| `input`                                                                                                                                                                                                                      | 22.0.0 | full                                                 |
| `select`, `date-picker`, `input-number`, `mention`, `radio` (button), `segmented`, `typography` (edit), `form` (RTL feedback)                                                                                                | 22.0.0 | metrics derived from the input control only          |
| global size primitives (`fontSize*`, `lineHeight*`, `controlHeight*`, `borderRadius*`, `padding*`, `margin*`, `controlPaddingHorizontal*`)                                                                                   | 22.0.0 | all components                                       |
| `alert`, `calendar`, `dropdown`, `float-button`, `menu`, `modal` (close button), `pagination`, `skeleton`, `spin`, `steps`, `switch` (loading icon), `table` (expand icon), `tabs`, `timeline`, `transfer`, `tree`, `upload` | 22.0.0 | metrics derived from the global size primitives only |

For a fully dark UI today, keep using the precompiled `ng-zorro-antd.dark.css`; token-based dark theming reaches full coverage as components migrate.

## Coexistence with existing theming

- The Less customization and all precompiled bundles are unaffected by this feature.
- `provideNzTheme` also emits the legacy `--ant-primary-color` family, so it fully replaces `NzConfigService.set('theme', ...)` — do not use both at once (a dev-mode warning is printed).
- In token mode, theme customization is done via `provideNzTheme`, not via Less variable overrides.

## Notes

- Custom CSS variable prefix: `provideNzTheme({ cssVarPrefix: 'myapp' })` (pair it with a rebuilt stylesheet using the `@ant-prefix` Less variable).
- A [CSP nonce](https://angular.dev/best-practices/security) provided via `CSP_NONCE` is applied to the injected style element.
