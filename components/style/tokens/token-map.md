# Design Token Mapping

CSS Variables use the `--ant-*` prefix. Tailwind preset output is intentionally out of scope for this phase.

| Token path | Layer | Stability | Less variable | CSS variable | Default Less value |
| --- | --- | --- | --- | --- | --- |
| `color.primary` | seed | stable | `@primary-color` | `--ant-color-primary` | `@primary-color` |
| `color.primary.hover` | alias | stable | `@primary-color-hover` | `--ant-color-primary-hover` | `@primary-color-hover` |
| `color.primary.active` | alias | stable | `@primary-color-active` | `--ant-color-primary-active` | `@primary-color-active` |
| `color.success` | seed | stable | `@success-color` | `--ant-color-success` | `@success-color` |
| `color.warning` | seed | stable | `@warning-color` | `--ant-color-warning` | `@warning-color` |
| `color.error` | seed | stable | `@error-color` | `--ant-color-error` | `@error-color` |
| `color.info` | alias | stable | `@info-color` | `--ant-color-info` | `@info-color` |
| `color.text` | alias | stable | `@text-color` | `--ant-color-text` | `@text-color` |
| `color.text.secondary` | alias | stable | `@text-color-secondary` | `--ant-color-text-secondary` | `@text-color-secondary` |
| `color.text.heading` | alias | stable | `@heading-color` | `--ant-color-text-heading` | `@heading-color` |
| `color.text.inverse` | alias | stable | `@text-color-inverse` | `--ant-color-text-inverse` | `@text-color-inverse` |
| `color.bg.container` | alias | stable | `@component-background` | `--ant-color-bg-container` | `@component-background` |
| `color.bg.light` | alias | stable | `@background-color-light` | `--ant-color-bg-light` | `@background-color-light` |
| `color.border` | alias | stable | `@border-color-base` | `--ant-color-border` | `@border-color-base` |
| `color.border.split` | alias | stable | `@border-color-split` | `--ant-color-border-split` | `@border-color-split` |
| `font.size.base` | seed | stable | `@font-size-base` | `--ant-font-size-base` | `@font-size-base` |
| `font.size.sm` | seed | stable | `@font-size-sm` | `--ant-font-size-sm` | `@font-size-sm` |
| `font.size.lg` | seed | stable | `@font-size-lg` | `--ant-font-size-lg` | `@font-size-lg` |
| `line.height.base` | seed | stable | `@line-height-base` | `--ant-line-height-base` | `@line-height-base` |
| `radius.base` | seed | stable | `@border-radius-base` | `--ant-border-radius` | `@border-radius-base` |
| `radius.sm` | seed | stable | `@border-radius-sm` | `--ant-border-radius-sm` | `@border-radius-sm` |
| `radius.lg` | seed | stable | `@border-radius-lg` | `--ant-border-radius-lg` | `@border-radius-lg` |
| `spacing.xs` | seed | stable | `@padding-xs` | `--ant-spacing-xs` | `@padding-xs` |
| `spacing.sm` | seed | stable | `@padding-sm` | `--ant-spacing-sm` | `@padding-sm` |
| `spacing.md` | seed | stable | `@padding-md` | `--ant-spacing-md` | `@padding-md` |
| `spacing.lg` | seed | stable | `@padding-lg` | `--ant-spacing-lg` | `@padding-lg` |
| `shadow.base` | alias | stable | `@box-shadow-base` | `--ant-box-shadow` | `@box-shadow-base` |
| `motion.duration.fast` | seed | stable | `@animation-duration-fast` | `--ant-motion-duration-fast` | `@animation-duration-fast` |
| `motion.duration.base` | seed | stable | `@animation-duration-base` | `--ant-motion-duration-base` | `@animation-duration-base` |
| `motion.duration.slow` | seed | stable | `@animation-duration-slow` | `--ant-motion-duration-slow` | `@animation-duration-slow` |
| `zIndex.modal` | alias | stable | `@zindex-modal` | `--ant-z-index-modal` | `@zindex-modal` |
| `zIndex.notification` | alias | stable | `@zindex-notification` | `--ant-z-index-notification` | `@zindex-notification` |
| `tag.defaultBg` | component | stable | `@tag-default-bg` | `--ant-tag-default-bg` | `@background-color-light` |
| `tag.defaultColor` | component | stable | `@tag-default-color` | `--ant-tag-default-color` | `@text-color` |
| `tag.borderRadius` | component | stable | `@tag-border-radius` | `--ant-tag-border-radius` | `@border-radius-base` |
| `tag.fontSize` | component | stable | `@tag-font-size` | `--ant-tag-font-size` | `@font-size-sm` |
| `tag.lineHeight` | component | stable | `@tag-line-height` | `--ant-tag-line-height` | `20px` |
| `alert.successBg` | component | stable | `@alert-success-bg-color` | `--ant-alert-success-bg` | `@success-color-deprecated-bg` |
| `alert.successBorder` | component | stable | `@alert-success-border-color` | `--ant-alert-success-border` | `@success-color-deprecated-border` |
| `alert.successIcon` | component | stable | `@alert-success-icon-color` | `--ant-alert-success-icon` | `@success-color` |
| `alert.infoBg` | component | stable | `@alert-info-bg-color` | `--ant-alert-info-bg` | `@info-color-deprecated-bg` |
| `alert.infoBorder` | component | stable | `@alert-info-border-color` | `--ant-alert-info-border` | `@info-color-deprecated-border` |
| `alert.infoIcon` | component | stable | `@alert-info-icon-color` | `--ant-alert-info-icon` | `@info-color` |
| `alert.warningBg` | component | stable | `@alert-warning-bg-color` | `--ant-alert-warning-bg` | `@warning-color-deprecated-bg` |
| `alert.warningBorder` | component | stable | `@alert-warning-border-color` | `--ant-alert-warning-border` | `@warning-color-deprecated-border` |
| `alert.warningIcon` | component | stable | `@alert-warning-icon-color` | `--ant-alert-warning-icon` | `@warning-color` |
| `alert.errorBg` | component | stable | `@alert-error-bg-color` | `--ant-alert-error-bg` | `@error-color-deprecated-bg` |
| `alert.errorBorder` | component | stable | `@alert-error-border-color` | `--ant-alert-error-border` | `@error-color-deprecated-border` |
| `alert.errorIcon` | component | stable | `@alert-error-icon-color` | `--ant-alert-error-icon` | `@error-color` |
| `alert.messageColor` | component | stable | `@alert-message-color` | `--ant-alert-message-color` | `@heading-color` |
| `alert.closeColor` | component | stable | `@alert-close-color` | `--ant-alert-close-color` | `@text-color-secondary` |
| `alert.paddingVertical` | component | stable | `@alert-padding-vertical` | `--ant-alert-padding-vertical` | `@padding-xs` |
| `alert.withDescriptionIconSize` | component | stable | `@alert-with-description-icon-size` | `--ant-alert-with-description-icon-size` | `24px` |
| `card.background` | component | stable | `@card-background` | `--ant-card-background` | `@component-background` |
| `card.headColor` | component | stable | `@card-head-color` | `--ant-card-head-color` | `@heading-color` |
| `card.headBg` | component | stable | `@card-head-background` | `--ant-card-head-bg` | `transparent` |
| `card.headFontSize` | component | stable | `@card-head-font-size` | `--ant-card-head-font-size` | `@font-size-lg` |
| `card.headHeight` | component | stable | `@card-head-height` | `--ant-card-head-height` | `48px` |
| `card.padding` | component | stable | `@card-padding-base` | `--ant-card-padding` | `24px` |
| `card.actionsBg` | component | stable | `@card-actions-background` | `--ant-card-actions-bg` | `@component-background` |
| `card.radius` | component | stable | `@card-radius` | `--ant-card-radius` | `@border-radius-base` |
| `card.shadow` | component | stable | `@card-shadow` | `--ant-card-shadow` | `0 1px 2px -2px rgb(0, 0, 0, 0.16), 0 3px 6px 0 rgb(0, 0, 0, 0.12), 0 5px 12px 4px rgb(0, 0, 0, 0.09)` |
| `button.primaryBg` | component | stable | `@btn-primary-bg` | `--ant-button-primary-bg` | `@primary-color` |
| `button.primaryColor` | component | stable | `@btn-primary-color` | `--ant-button-primary-color` | `#fff` |
| `button.defaultColor` | component | stable | `@btn-default-color` | `--ant-button-default-color` | `@text-color` |
| `button.defaultBg` | component | stable | `@btn-default-bg` | `--ant-button-default-bg` | `@component-background` |
| `button.defaultBorder` | component | stable | `@btn-default-border` | `--ant-button-default-border` | `@border-color-base` |
| `button.dangerBg` | component | stable | `@btn-danger-bg` | `--ant-button-danger-bg` | `@error-color` |
| `button.dangerBorder` | component | stable | `@btn-danger-border` | `--ant-button-danger-border` | `@error-color` |
| `button.borderRadius` | component | stable | `@btn-border-radius-base` | `--ant-button-border-radius` | `@border-radius-base` |
| `button.borderRadiusSm` | component | stable | `@btn-border-radius-sm` | `--ant-button-border-radius-sm` | `@border-radius-base` |
| `button.shadow` | component | stable | `@btn-shadow` | `--ant-button-shadow` | `0 2px 0 rgb(0, 0, 0, 0.015)` |
| `button.primaryShadow` | component | stable | `@btn-primary-shadow` | `--ant-button-primary-shadow` | `0 2px 0 rgb(0, 0, 0, 0.045)` |

## Less Compatibility Boundary

Tokens that participate in Less functions or arithmetic should keep compile-time Less values until the derived value is generated explicitly. Direct CSS property tokens may be mapped to `var(--ant-*)` in the variable theme.
