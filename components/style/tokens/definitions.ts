/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type TokenLayer = 'seed' | 'alias' | 'component';

export type TokenStability = 'stable' | 'experimental' | 'internal';

export interface DesignTokenDefinition {
  path: string;
  layer: TokenLayer;
  stability: TokenStability;
  lessValue: string;
  cssVariable?: string;
  lessVariable?: string;
  description: string;
}

export const designTokenDefinitions: DesignTokenDefinition[] = [
  {
    path: 'color.primary',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@primary-color',
    lessValue: '@primary-color',
    description: 'Brand primary color.'
  },
  {
    path: 'color.primary.hover',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@primary-color-hover',
    lessValue: '@primary-color-hover',
    description: 'Primary color for hover states.'
  },
  {
    path: 'color.primary.active',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@primary-color-active',
    lessValue: '@primary-color-active',
    description: 'Primary color for active states.'
  },
  {
    path: 'color.success',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@success-color',
    lessValue: '@success-color',
    description: 'Success status color.'
  },
  {
    path: 'color.warning',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@warning-color',
    lessValue: '@warning-color',
    description: 'Warning status color.'
  },
  {
    path: 'color.error',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@error-color',
    lessValue: '@error-color',
    description: 'Error status color.'
  },
  {
    path: 'color.info',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@info-color',
    lessValue: '@info-color',
    description: 'Info status color.'
  },
  {
    path: 'color.text',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@text-color',
    lessValue: '@text-color',
    description: 'Default text color.'
  },
  {
    path: 'color.text.secondary',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@text-color-secondary',
    lessValue: '@text-color-secondary',
    description: 'Secondary text color.'
  },
  {
    path: 'color.text.heading',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@heading-color',
    lessValue: '@heading-color',
    description: 'Heading text color.'
  },
  {
    path: 'color.text.inverse',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@text-color-inverse',
    lessValue: '@text-color-inverse',
    description: 'Text color on strong colored backgrounds.'
  },
  {
    path: 'color.bg.container',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@component-background',
    lessValue: '@component-background',
    description: 'Container background color.'
  },
  {
    path: 'color.bg.light',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@background-color-light',
    lessValue: '@background-color-light',
    description: 'Light background color.'
  },
  {
    path: 'color.border',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@border-color-base',
    lessValue: '@border-color-base',
    description: 'Default border color.'
  },
  {
    path: 'color.border.split',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@border-color-split',
    lessValue: '@border-color-split',
    description: 'Split border color.'
  },
  {
    path: 'font.size.base',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@font-size-base',
    lessValue: '@font-size-base',
    description: 'Base font size.'
  },
  {
    path: 'font.size.sm',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@font-size-sm',
    lessValue: '@font-size-sm',
    description: 'Small font size.'
  },
  {
    path: 'font.size.lg',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@font-size-lg',
    lessValue: '@font-size-lg',
    description: 'Large font size.'
  },
  {
    path: 'line.height.base',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@line-height-base',
    lessValue: '@line-height-base',
    description: 'Base line height.'
  },
  {
    path: 'radius.base',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@border-radius-base',
    cssVariable: '--ant-border-radius',
    lessValue: '@border-radius-base',
    description: 'Base border radius.'
  },
  {
    path: 'radius.sm',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@border-radius-sm',
    cssVariable: '--ant-border-radius-sm',
    lessValue: '@border-radius-sm',
    description: 'Small border radius.'
  },
  {
    path: 'radius.lg',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@border-radius-lg',
    cssVariable: '--ant-border-radius-lg',
    lessValue: '@border-radius-lg',
    description: 'Large border radius.'
  },
  {
    path: 'spacing.xs',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@padding-xs',
    lessValue: '@padding-xs',
    description: 'Extra-small spacing.'
  },
  {
    path: 'spacing.sm',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@padding-sm',
    lessValue: '@padding-sm',
    description: 'Small spacing.'
  },
  {
    path: 'spacing.md',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@padding-md',
    lessValue: '@padding-md',
    description: 'Medium spacing.'
  },
  {
    path: 'spacing.lg',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@padding-lg',
    lessValue: '@padding-lg',
    description: 'Large spacing.'
  },
  {
    path: 'shadow.base',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@box-shadow-base',
    cssVariable: '--ant-box-shadow',
    lessValue: '@box-shadow-base',
    description: 'Base shadow.'
  },
  {
    path: 'motion.duration.fast',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@animation-duration-fast',
    lessValue: '@animation-duration-fast',
    description: 'Fast motion duration.'
  },
  {
    path: 'motion.duration.base',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@animation-duration-base',
    lessValue: '@animation-duration-base',
    description: 'Base motion duration.'
  },
  {
    path: 'motion.duration.slow',
    layer: 'seed',
    stability: 'stable',
    lessVariable: '@animation-duration-slow',
    lessValue: '@animation-duration-slow',
    description: 'Slow motion duration.'
  },
  {
    path: 'zIndex.modal',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@zindex-modal',
    lessValue: '@zindex-modal',
    description: 'Modal z-index.'
  },
  {
    path: 'zIndex.notification',
    layer: 'alias',
    stability: 'stable',
    lessVariable: '@zindex-notification',
    lessValue: '@zindex-notification',
    description: 'Notification z-index.'
  },
  {
    path: 'tag.defaultBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@tag-default-bg',
    lessValue: '@background-color-light',
    description: 'Default Tag background.'
  },
  {
    path: 'tag.defaultColor',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@tag-default-color',
    lessValue: '@text-color',
    description: 'Default Tag text color.'
  },
  {
    path: 'tag.borderRadius',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@tag-border-radius',
    lessValue: '@border-radius-base',
    description: 'Tag border radius.'
  },
  {
    path: 'tag.fontSize',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@tag-font-size',
    lessValue: '@font-size-sm',
    description: 'Tag font size.'
  },
  {
    path: 'tag.lineHeight',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@tag-line-height',
    lessValue: '20px',
    description: 'Tag line height.'
  },
  {
    path: 'alert.successBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-success-bg-color',
    lessValue: '@success-color-deprecated-bg',
    description: 'Success Alert background.'
  },
  {
    path: 'alert.successBorder',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-success-border-color',
    lessValue: '@success-color-deprecated-border',
    description: 'Success Alert border color.'
  },
  {
    path: 'alert.successIcon',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-success-icon-color',
    lessValue: '@success-color',
    description: 'Success Alert icon color.'
  },
  {
    path: 'alert.infoBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-info-bg-color',
    lessValue: '@info-color-deprecated-bg',
    description: 'Info Alert background.'
  },
  {
    path: 'alert.infoBorder',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-info-border-color',
    lessValue: '@info-color-deprecated-border',
    description: 'Info Alert border color.'
  },
  {
    path: 'alert.infoIcon',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-info-icon-color',
    lessValue: '@info-color',
    description: 'Info Alert icon color.'
  },
  {
    path: 'alert.warningBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-warning-bg-color',
    lessValue: '@warning-color-deprecated-bg',
    description: 'Warning Alert background.'
  },
  {
    path: 'alert.warningBorder',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-warning-border-color',
    lessValue: '@warning-color-deprecated-border',
    description: 'Warning Alert border color.'
  },
  {
    path: 'alert.warningIcon',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-warning-icon-color',
    lessValue: '@warning-color',
    description: 'Warning Alert icon color.'
  },
  {
    path: 'alert.errorBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-error-bg-color',
    lessValue: '@error-color-deprecated-bg',
    description: 'Error Alert background.'
  },
  {
    path: 'alert.errorBorder',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-error-border-color',
    lessValue: '@error-color-deprecated-border',
    description: 'Error Alert border color.'
  },
  {
    path: 'alert.errorIcon',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-error-icon-color',
    lessValue: '@error-color',
    description: 'Error Alert icon color.'
  },
  {
    path: 'alert.messageColor',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-message-color',
    lessValue: '@heading-color',
    description: 'Alert message color.'
  },
  {
    path: 'alert.closeColor',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-close-color',
    lessValue: '@text-color-secondary',
    description: 'Alert close color.'
  },
  {
    path: 'alert.paddingVertical',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-padding-vertical',
    lessValue: '@padding-xs',
    description: 'Alert vertical padding.'
  },
  {
    path: 'alert.withDescriptionIconSize',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@alert-with-description-icon-size',
    lessValue: '24px',
    description: 'Alert description icon size.'
  },
  {
    path: 'card.background',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@card-background',
    lessValue: '@component-background',
    description: 'Card background.'
  },
  {
    path: 'card.headColor',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@card-head-color',
    lessValue: '@heading-color',
    description: 'Card header text color.'
  },
  {
    path: 'card.headBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@card-head-background',
    lessValue: 'transparent',
    description: 'Card header background.'
  },
  {
    path: 'card.headFontSize',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@card-head-font-size',
    lessValue: '@font-size-lg',
    description: 'Card header font size.'
  },
  {
    path: 'card.headHeight',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@card-head-height',
    lessValue: '48px',
    description: 'Card header height.'
  },
  {
    path: 'card.padding',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@card-padding-base',
    lessValue: '24px',
    description: 'Card body padding.'
  },
  {
    path: 'card.actionsBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@card-actions-background',
    lessValue: '@component-background',
    description: 'Card actions background.'
  },
  {
    path: 'card.radius',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@card-radius',
    lessValue: '@border-radius-base',
    description: 'Card border radius.'
  },
  {
    path: 'card.shadow',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@card-shadow',
    lessValue: '0 1px 2px -2px rgb(0, 0, 0, 0.16), 0 3px 6px 0 rgb(0, 0, 0, 0.12), 0 5px 12px 4px rgb(0, 0, 0, 0.09)',
    description: 'Card hover shadow.'
  },
  {
    path: 'button.primaryBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-primary-bg',
    lessValue: '@primary-color',
    description: 'Primary Button background.'
  },
  {
    path: 'button.primaryColor',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-primary-color',
    lessValue: '#fff',
    description: 'Primary Button text color.'
  },
  {
    path: 'button.defaultColor',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-default-color',
    lessValue: '@text-color',
    description: 'Default Button text color.'
  },
  {
    path: 'button.defaultBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-default-bg',
    lessValue: '@component-background',
    description: 'Default Button background.'
  },
  {
    path: 'button.defaultBorder',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-default-border',
    lessValue: '@border-color-base',
    description: 'Default Button border color.'
  },
  {
    path: 'button.dangerBg',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-danger-bg',
    lessValue: '@error-color',
    description: 'Danger Button background.'
  },
  {
    path: 'button.dangerBorder',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-danger-border',
    lessValue: '@error-color',
    description: 'Danger Button border color.'
  },
  {
    path: 'button.borderRadius',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-border-radius-base',
    lessValue: '@border-radius-base',
    description: 'Button border radius.'
  },
  {
    path: 'button.borderRadiusSm',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-border-radius-sm',
    lessValue: '@border-radius-base',
    description: 'Small Button border radius.'
  },
  {
    path: 'button.shadow',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-shadow',
    lessValue: '0 2px 0 rgb(0, 0, 0, 0.015)',
    description: 'Default Button shadow.'
  },
  {
    path: 'button.primaryShadow',
    layer: 'component',
    stability: 'stable',
    lessVariable: '@btn-primary-shadow',
    lessValue: '0 2px 0 rgb(0, 0, 0, 0.045)',
    description: 'Primary Button shadow.'
  }
];
